# Frontend Rebuild Specification

This document describes every page, its purpose, data requirements, and user flows to be preserved in the new frontend. No implementation or UI direction is prescribed — this is purely a functional specification derived from the existing application.

---

## Architecture Overview

### Tech Stack (current)
- React + Vite
- React Router v6 (file-based route structure)
- Axios for API calls
- GetStream.io Video SDK (`@stream-io/video-react-sdk`) for live streaming
- GetStream.io Chat SDK (`stream-chat-react`) for live chat
- Stripe Checkout (redirect-based, not embedded)

### State / Context

Three global contexts must be maintained:

**AuthContext** — student/teacher session  
- Stores: `user`, `token`, `refresh_token`, `initialized`  
- Persists to: localStorage  
- Exposes: `login(credentials)`, `logout()`, `isTeacherUnlocked()`, `refreshToken()`  
- Token refresh: intercept 401 responses, call `POST /auth/refresh`, retry once, else logout  
- `initialized` must be `true` before any route guard renders (prevents flash redirects on load)

**AdminAuthContext** — mat_dashboard / admin session  
- Stores: `admin`, `adminToken`  
- Persists to: localStorage  
- Separate session from student auth — admin login does not affect student session

**ThemeContext** — branding  
- On app load, call `GET /settings/public`  
- Apply returned color values as CSS custom properties on `:root`  
- Expose `platform_name` and `logo_url` to all pages

### Route Guards

| Guard | Logic |
|---|---|
| `StudentRoute` | Must be logged in; redirects admin/mat_dashboard roles to `/admin/login` |
| `NonTeacherRoute` | Must be logged in; redirects teachers to `/teacher/dashboard`, admins to `/admin/dashboard` |
| `AuthRequired` | Must be logged in; waits for `initialized` before rendering |
| `TeacherRoute` | Must be logged in with `role=teacher` |
| `TeacherUnlockedRoute` | Teacher + `isTeacherUnlocked()` true; else → `/teacher/unlock` |
| `AdminRoute` | Must have admin session with `role=mat_dashboard` or `role=admin` |
| `AdminOnlyRoute` | Must have admin session with `role=admin` specifically |

---

## Pages

---

### `/` — Landing Page

**Access:** Public  
**Purpose:** Marketing/entry point for the platform.

**Data needed:**
- `GET /settings/public` for branding (handled by ThemeContext)

**Flows:**
- Links to `/login`, `/register`, `/streams`, `/mat/info`
- No API calls of its own beyond ThemeContext

---

### `/login` — Student Login

**Access:** Public  
**Purpose:** Authenticate a student or teacher.

**Data needed:**
- `POST /auth/login`

**Flows:**
1. User submits email + password
2. On success, store `token`, `refresh_token`, and `user` from response
3. Redirect based on role:
   - `teacher` → `/teacher` (which redirects to `/teacher/dashboard` or `/teacher/unlock` depending on lock status)
   - `admin` / `mat_dashboard` → show an error (admin has a separate login)
   - `student` → redirect to the page they were trying to access (from `location.state.from`) or `/`
4. Show field-level validation errors on failure

---

### `/register` — Student/Teacher Registration

**Access:** Public  
**Purpose:** Create a new account.

**Data needed:**
- `POST /auth/register`

**Fields:** name, email, password, password_confirmation, role (student | teacher)

**Flows:**
1. On success, store tokens + user, redirect same as login
2. Teacher registration: a welcome email is sent by the backend; inform the user
3. Show field-level errors on failure

---

### `/streams` — Browse Streams

**Access:** `NonTeacherRoute` (logged-in students only; teachers redirect to their portal)  
**Purpose:** Browse and discover live, upcoming, and past streams.

**Data needed:**
- `GET /streams` with optional filter params

**Flows:**
- Display streams ordered: live → scheduled → ended
- Support filtering by category, status, free-only, and search query
- Support pagination
- Clicking a stream navigates to `/streams/:uuid`
- Free streams and paid streams should be visually distinguishable

---

### `/streams/:uuid` — Stream Detail

**Access:** `NonTeacherRoute`  
**Purpose:** Show details about a single stream and allow purchase or watch initiation.

**Data needed:**
- `GET /streams/:uuid`

**Query param handling:**
- `?payment=cancelled` → show a cancellation notice (set by Stripe cancel_url)

**Flows:**

*Free stream, user not logged in:*  
- Prompt to log in to watch

*Free stream, user logged in:*  
- Link to `/watch/:uuid`

*Paid stream, user not logged in:*  
- Show price; prompt to log in to purchase

*Paid stream, user logged in, not purchased:*  
- Show price and a purchase button
- On purchase click: `POST /payments/stream-checkout` → redirect to returned `checkout_url`

*Paid stream, user has purchased:*  
- Show a "Watch" link to `/watch/:uuid`

*Ended stream with recording, not purchased:*  
- If `recording_price` is set: show recording purchase option
- On purchase click: `POST /payments/recording-checkout` → redirect to `checkout_url`

*Cancelled stream:*  
- Show cancelled state; no purchase option

---

### `/watch/:uuid` — Watch Page

**Access:** `AuthRequired` + `NonTeacherRoute`  
**Purpose:** Stream player with live chat.

**Data needed:**
- `GET /streams/:uuid/viewer-token`
- `GET /streams/:uuid/chat-token`

**Query param handling:**
- `?payment=success&session_id=cs_xxx` → confirm payment, show success banner, then poll for token availability  
  - Poll `GET /payments/stream-checkout/confirm?session_id=cs_xxx` or `GET /payments/recording-checkout/confirm?session_id=cs_xxx` (check `?type=recording`)  
  - Once confirmed, attempt to fetch the viewer token

**Flows:**

1. Fetch viewer token from `GET /streams/:uuid/viewer-token`
2. On `403 RECORDING_AVAILABLE`: stream has ended; recording is for sale. Redirect to `/streams/:uuid` with appropriate message.
3. On `403 NOT_PURCHASED`: redirect to `/streams/:uuid`
4. On success: initialize `StreamVideoClient` with `api_key`, `token`, and current user ID
5. Join the call using `call_id`
6. For live streams: show live video feed
7. For ended streams with `recording_url`: show recording player
8. Simultaneously fetch chat token and initialize Chat SDK for the chat panel

**Chat panel:**
- Connects to GetStream Chat using `channel_id` and `api_key` from chat token response
- Shown alongside the video player
- Available for both live and ended (past) streams

---

### `/my-library` — Student Purchase Library

**Access:** `AuthRequired`  
**Purpose:** List all streams the student has purchased.

**Data needed:**
- `GET /student/purchases`

**Flows:**
- Display purchases grouped or listed by date
- Each entry shows stream title, thumbnail, teacher, status, and `purchase_type` (stream | recording)
- If stream is live or has a recording: link to `/watch/:uuid`
- Paginate results

---

### `/notifications` — Notification Preferences

**Access:** `AuthRequired`  
**Purpose:** Manage per-teacher email notification preferences.

**Data needed:**
- `GET /notifications/preferences`
- `PATCH /notifications/preferences/:teacher_uuid`

**Flows:**
- List all followed teachers with their current `notify_email` toggle state
- Toggling calls `PATCH /notifications/preferences/:teacher_uuid` with `{ notify_email: true|false }`
- Show teacher avatar, name, and channel link

---

### `/channel/:slug` — Public Instructor Channel

**Access:** Public  
**Purpose:** View a teacher's public channel with their bio and stream history.

**Data needed:**
- `GET /channels/:slug`
- `POST /channels/:slug/follow` (if logged in)
- `DELETE /channels/:slug/follow` (if logged in)

**Flows:**
- Show teacher name, avatar, bio, follower count
- Show `is_following` state if authenticated
- Follow/Unfollow button:
  - If not logged in: redirect to `/login`
  - If logged in: call follow/unfollow endpoint, update follower count and toggle state optimistically
- Stream list ordered: live → scheduled → ended; cancelled excluded
- Each stream card links to `/streams/:uuid`
- Paginate streams

---

### `/mat/info` — Mat Information Page

**Access:** Public  
**Purpose:** Information about the custom yoga mat product.

**Data needed:** None (static content)

**Flows:**
- Link to `/mat/order` for purchase

---

### `/mat/order` — Mat Order Page

**Access:** `StudentOnlyPage` + `StudentRoute` (not admin, not teacher)  
**Purpose:** Enter body measurements and place a mat order.

**Data needed:**
- `POST /mat/generate` — preview SVG before ordering
- `POST /mat/checkout` — initiate Stripe Checkout
- `POST /mat/orders` — submit measurements after payment

**Flows:**
1. User enters 9 required measurements (fm1–fm9), up to 3 optional (fm10–fm12), a motto (optional, max 18 chars), and line style (`solid` | `border`)
2. Preview: call `POST /mat/generate` to download a preview AI file
3. Checkout: call `POST /mat/checkout` → redirect to `checkout_url`  
   - `?cancelled=1` query param on return means user cancelled; show a notice
4. After successful payment, Stripe redirects to `/mat/checkout/success?session_id=cs_xxx`
5. On that page, confirm payment then show the measurement form again to collect shipping + measurements
6. Submit `POST /mat/orders` with measurements, shipping, and `pending_order_uuid`/`stripe_session_id`

---

### `/mat/checkout/success` — Mat Checkout Return

**Access:** `StudentRoute`  
**Purpose:** Handle Stripe return after mat payment.

**Data needed:**
- `GET /mat/checkout/confirm?session_id=cs_xxx`

**Flows:**
1. Extract `session_id` from query params
2. Call confirm endpoint to verify payment
3. If paid: show measurement/shipping form and allow submission via `POST /mat/orders`
4. If not paid: show error

---

### `/mat/orders` — My Mat Orders

**Access:** `StudentRoute`  
**Purpose:** List the student's mat orders.

**Data needed:**
- `GET /mat/orders`

**Flows:**
- Display each order with UUID, status, created date
- Status values: `pending`, `in_progress`, `shipped`, `completed`
- For completed/shipped orders: offer a download button → `GET /mat/orders/:uuid/download-svg`

---

### `/admin/login` — Admin Login

**Access:** Public  
**Purpose:** Authenticate admin and mat_dashboard users separately from students.

**Data needed:**
- `POST /auth/login`

**Flows:**
- On success, if `role` is `admin` or `mat_dashboard`: store in AdminAuthContext, redirect to `/admin/dashboard` or `/mat/dashboard`
- If role is `student` or `teacher`: show an error — wrong login page
- Separate localStorage key from student session

---

### `/mat/dashboard` — Mat Dashboard

**Access:** `AdminRoute` (mat_dashboard or admin)  
**Purpose:** Internal order management for custom mats.

**Data needed:**
- `GET /mat/dashboard`
- `PATCH /mat/dashboard/:uuid/status`
- `POST /mat/dashboard/:uuid/notes`
- `GET /mat/dashboard/:uuid/svg`

**Flows:**
- List all orders with pagination
- Update order status via dropdown/select
- Add notes to orders
- Download SVG/AI file for any order

---

### `/admin` — Admin Layout Wrapper

**Access:** `AdminRoute`  
Wraps all `/admin/*` routes with shared navigation.

---

### `/admin/dashboard` — Admin Overview

**Access:** `AdminRoute`  
**Purpose:** Platform at-a-glance statistics.

**Data needed:** Admin overview stats (check `AdminOverviewPage` for specific endpoints if needed).

---

### `/admin/teachers` — Teacher Management

**Access:** `AdminOnlyRoute`  
**Purpose:** Manage teacher accounts.

**Data needed:**
- `GET /admin/teachers`
- `POST /admin/teachers`
- `GET /admin/teachers/:id`
- `PATCH /admin/teachers/:id`
- `DELETE /admin/teachers/:id`
- `GET /admin/teachers/:id/payments`
- `POST /admin/teachers/:id/grant-free-access`
- `DELETE /admin/teachers/:id/grant-free-access`

**Flows:**
- List teachers with search/filter
- Create new teacher (sends welcome email)
- Edit teacher name, email, role
- View payment history
- Grant / revoke free dashboard access (bypasses the registration fee)
- Deactivate or delete teacher

---

### `/admin/users` — User Management

**Access:** `AdminOnlyRoute`  
**Purpose:** Manage student accounts.

**Data needed:**
- `GET /admin/users`
- `GET /admin/users/:id`
- `PATCH /admin/users/:id`

**Flows:**
- List users with search
- View user detail
- Deactivate accounts

---

### `/admin/streams` — Stream Management

**Access:** `AdminOnlyRoute`  
**Purpose:** Oversee all streams on the platform.

**Data needed:**
- `GET /admin/streams`
- `GET /admin/streams/:uuid`
- `DELETE /admin/streams/:uuid`

**Flows:**
- List all streams with status indicators
- View stream detail
- Delete any stream

---

### `/admin/settings` — Platform Settings

**Access:** `AdminOnlyRoute`  
**Purpose:** Configure platform-wide settings.

**Data needed:**
- `GET /admin/settings`
- `PATCH /admin/settings`

**Configurable settings include:**
- Platform name and logo URL
- Theme colors (all `theme_color_*` keys)
- Mat price (in cents)
- Teacher registration fee (in cents; set to 0 to waive)
- Currency

**Flows:**
- Fetch current settings
- Edit and save; changes to theme colors take effect globally via ThemeContext on next load

---

## Teacher Portal

All teacher routes are under `/teacher` and use a shared layout (`TeacherLayout`).

---

### `/teacher/unlock` — Teacher Unlock Page

**Access:** `TeacherRoute` (teacher, any lock state)  
**Purpose:** Gate behind registration fee payment.

**Data needed:**
- `GET /teacher/status` — check lock state and access source
- `POST /payments/teacher-fee-checkout` — initiate payment

**Flows:**
- If `dashboard_unlocked = true`: redirect to `/teacher/dashboard`
- If `admin_free_access = true`: show access granted message and link to dashboard
- Otherwise: show registration fee and a Pay button
- On Pay click: call `POST /payments/teacher-fee-checkout` → redirect to Stripe
- After Stripe redirect back, re-check `/teacher/status` and redirect to dashboard if now unlocked

---

### `/teacher/dashboard` — Teacher Dashboard

**Access:** `TeacherUnlockedRoute`  
**Purpose:** Overview of the teacher's streams and account.

**Data needed:**
- `GET /teacher/streams` — recent streams

**Flows:**
- Show recent/upcoming streams
- Link to create a new stream (`/teacher/streams`)
- Quick stats (upcoming count, live indicator if any stream is live)

---

### `/teacher/streams` — Teacher Stream Management

**Access:** `TeacherUnlockedRoute`  
**Purpose:** Full CRUD for the teacher's streams.

**Data needed:**
- `GET /teacher/streams`
- `POST /streams`
- `PATCH /streams/:uuid`
- `DELETE /streams/:uuid`
- `POST /streams/:uuid/cancel`
- `POST /streams/:uuid/host-token` — to go live
- `POST /streams/:uuid/go-live` — manual status update
- `POST /streams/:uuid/end` — manual status update

**Flows:**

*Create stream:*
- Form: title, description, category, thumbnail URL, free/paid toggle, price (if paid), scheduled datetime (optional)
- Submit → `POST /streams`
- If scheduled: subscribers are notified by email (handled server-side)

*Edit stream:*
- Same fields as create; submit → `PATCH /streams/:uuid`
- Can update `recording_price` for ended streams

*Delete stream:*
- Confirm, then `DELETE /streams/:uuid`

*Cancel stream:*
- For scheduled streams only; confirm, then `POST /streams/:uuid/cancel`

*Go live:*
- Call `POST /streams/:uuid/host-token` to get `{ token, call_id, api_key }`
- Initialize `StreamVideoClient` with these credentials
- Call `POST /streams/:uuid/go-live` to set status = live
- Show the live broadcast UI (camera preview, end stream button)
- On end: call `POST /streams/:uuid/end`

---

### `/teacher/channel` — Teacher Channel Page

**Access:** `TeacherUnlockedRoute`  
**Purpose:** Manage the teacher's public channel profile.

**Data needed:**
- `GET /teacher/channel`
- `PATCH /teacher/channel`
- `PATCH /teacher/channel/streams/:uuid/recording-price`

**Flows:**
- Display and edit: bio, avatar URL, channel slug
- Channel slug must be lowercase alphanumeric + hyphens, unique
- For each ended stream with a recording: show a field to set/update `recording_price`
- Setting `recording_price = 0` or `null` makes the recording free (or unavailable for separate purchase)
- Show a link to the public channel page at `/channel/:slug`

---

## Shared Components

### Navbar
- Shown on all student-facing pages (not admin portal, not teacher portal)
- Links: streams browse, my library, notifications, login/register or user menu
- If logged in as teacher: redirect clicks to teacher portal
- Uses `platform_name` and `logo_url` from ThemeContext

### Footer
- Shown on public pages
- Standard informational links

### GoLive Modal (within TeacherStreamsPage)
Contains the full go-live flow: request host token → initialize GetStream SDK → show live controls → end stream.

### Stream Chat Panel (within WatchPage)
Live chat sidebar. Connects to GetStream Chat SDK using credentials from `GET /streams/:uuid/chat-token`. Shown for both live and ended streams (if chat history is available).

### Delete Confirm Modal
Reusable confirmation dialog for destructive actions (delete stream, etc.).

### Stream Countdown
Displays a countdown timer to `scheduled_at` for upcoming streams.

---

## API Client Setup

Two Axios instances should be maintained:

**`axios` (student):**
- Base URL: `VITE_API_URL + /api/v1`
- Request interceptor: attach `Authorization: Bearer <token>` from AuthContext
- Response interceptor: on 401, attempt token refresh via `POST /auth/refresh`; if refresh succeeds, retry original request; if refresh fails, call `logout()` and redirect to `/login`

**`adminAxios` (admin):**
- Same base URL
- Attaches admin token from AdminAuthContext
- On 401: clear admin session, redirect to `/admin/login`

---

## Environment Variables

```
VITE_API_URL=<backend base URL>
VITE_GETSTREAM_API_KEY=<GetStream API key>
```

The `VITE_GETSTREAM_API_KEY` is also returned by the backend in token responses (`api_key` field) so the frontend does not need to hardcode it — prefer the server-returned value.

---

## Key Business Rules (preserve in rebuild)

1. **Single session policy:** logging in revokes all previous tokens. No multi-device sessions.
2. **Teacher dashboard lock:** teachers cannot access streams, channel, or profile management until they have paid the registration fee (or admin grants free access).
3. **Stream purchase types:** a student can purchase a stream (for live access) or a recording (for past access). Both grant viewer token access. Stream purchase also grants recording access.
4. **Free streams:** any authenticated user can watch; no purchase required.
5. **Admin can watch any stream** without purchase.
6. **Teacher can watch their own streams** without purchase.
7. **Stripe flow is redirect-based:** frontend creates a checkout session, redirects to Stripe, Stripe redirects back. The actual purchase row is created by a Stripe webhook, not by the frontend. The confirm endpoint is for UI verification only.
8. **Token rotation:** `POST /auth/refresh` invalidates old tokens and returns a new pair. Always store the new pair after refresh.
9. **Theme is runtime-configurable:** all color variables come from `GET /settings/public` and must be applied dynamically. Do not hardcode theme values.
10. **Channel slugs are unique and URL-safe:** lowercase, alphanumeric, hyphens only.
