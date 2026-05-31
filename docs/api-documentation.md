# API Documentation

**Base URL:** `/api/v1`  
**Auth:** Laravel Sanctum — pass `Authorization: Bearer <token>` on protected routes.  
**All responses are JSON.**

---

## Authentication

### POST `/auth/register`
Register a new user account.

**Auth:** None — rate-limited  
**Body:**
```json
{
  "name": "string (required, max 255)",
  "email": "string (required, unique)",
  "password": "string (required, min 8)",
  "password_confirmation": "string (required)",
  "role": "student | teacher (optional, defaults to student)"
}
```
**Response 201:**
```json
{
  "user": { "uuid": "...", "name": "...", "email": "...", "role": "...", "teacher_profile": { ... } },
  "token": "<access_token>",
  "refresh_token": "<refresh_token>"
}
```
**Notes:** If `role=teacher`, a `TeacherProfile` is created with `dashboard_unlocked: false` and a welcome email is sent.

---

### POST `/auth/login`
Log in and receive a token pair. Revokes all previous tokens (single-session policy).

**Auth:** None — rate-limited  
**Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```
**Response 200:**
```json
{
  "user": { "uuid": "...", "name": "...", "email": "...", "role": "...", "teacher_profile": { ... } },
  "token": "<access_token>",
  "refresh_token": "<refresh_token>"
}
```
**Errors:** `422` bad credentials · `403` account deactivated

---

### POST `/auth/logout`
Revoke all tokens for the current user.

**Auth:** Required  
**Response 200:** `{ "message": "Logged out successfully." }`

---

### GET `/auth/me`
Return the authenticated user's profile.

**Auth:** Required  
**Response 200:** `{ "uuid": "...", "name": "...", "email": "...", "role": "...", "teacher_profile": { ... } }`

---

### POST `/auth/refresh`
Rotate the token pair using a refresh token.

**Auth:** None  
**Body:** `{ "refresh_token": "string (required)" }`  
**Response 200:**
```json
{
  "token": "<new_access_token>",
  "refresh_token": "<new_refresh_token>"
}
```
**Errors:** `401` invalid/expired refresh token · `403` inactive account

---

### POST `/auth/send-verification`
Send an email verification link to the authenticated user.

**Auth:** Required  
**Response 200:** `{ "message": "Verification email sent." }`

---

### POST `/auth/verify-email`
Verify email address using the token from the verification email.

**Auth:** None  
**Body:** `{ "token": "string (required)" }`  
**Errors:** `422` invalid token · `410` expired token

---

## Public Settings

### GET `/settings/public`
Returns whitelisted platform branding and theme settings. Called on every page load.

**Auth:** None — cached 5 minutes  
**Response 200:**
```json
{
  "platform_name": "...",
  "logo_url": "...",
  "theme_color_forest": "...",
  "theme_color_saffron": "...",
  "theme_color_gold": "...",
  "theme_color_cream": "...",
  "theme_color_parchment": "...",
  "theme_color_sand": "...",
  "theme_color_bark": "...",
  "theme_color_charcoal": "...",
  "theme_color_ink": "...",
  "theme_color_forest_mid": "...",
  "theme_color_forest_lt": "...",
  "theme_color_saffron_lt": "...",
  "theme_color_gold_lt": "..."
}
```

---

## Streams (Public)

### GET `/streams`
Public paginated stream listing. Cancelled streams are excluded by default.

**Auth:** None  
**Query params:**
| Param | Type | Description |
|---|---|---|
| `category` | string | Filter by category |
| `status` | string | `live`, `scheduled`, `ended`, `cancelled` |
| `free_only` | boolean | Show only free streams |
| `search` | string | Search title, description, teacher name |
| `per_page` | integer | Default 20, max 100 |
| `page` | integer | Page number |

**Ordering:** live → scheduled (soonest first) → ended (newest first)

**Response 200:**
```json
{
  "status": "success",
  "data": [
    {
      "uuid": "...",
      "title": "...",
      "description": "...",
      "category": "...",
      "thumbnail_url": "...",
      "status": "scheduled | live | ended | cancelled",
      "is_free": true,
      "price": null,
      "recording_url": null,
      "recording_price": null,
      "getstream_call_id": "...",
      "scheduled_at": "ISO8601 | null",
      "started_at": "ISO8601 | null",
      "ended_at": "ISO8601 | null",
      "created_at": "ISO8601",
      "purchases_count": 42,
      "teacher": { "uuid": "...", "name": "..." }
    }
  ],
  "meta": {
    "pagination": { "total": 100, "per_page": 20, "current_page": 1, "last_page": 5 }
  }
}
```

---

### GET `/streams/{uuid}`
Public stream detail.

**Auth:** None  
**Response 200:** `{ "status": "success", "data": { ...stream object... } }`  
**Errors:** `404` not found

---

## Streams (Authenticated — Student)

### GET `/streams/{uuid}/viewer-token`
Get a GetStream.io viewer token to watch a stream or recording.

**Auth:** Required  
**Access rules:**
- Free stream → any authenticated user
- Paid stream → must have a `stream` or `recording` purchase
- Stream must be `live`, `ended`, or `interrupted` (or have a recording)

**Response 200:**
```json
{
  "status": "success",
  "data": {
    "token": "...",
    "call_id": "...",
    "api_key": "...",
    "status": "live | ended",
    "recording_url": "url | null"
  }
}
```
**Errors:**  
- `404` stream not available for viewing  
- `403 NOT_PURCHASED` no purchase found  
- `403 RECORDING_AVAILABLE` stream ended and recording is for sale (redirect to recording purchase)

---

### GET `/streams/{uuid}/chat-token`
Get a GetStream.io Chat token for live chat on the watch page.

**Auth:** Required  
**Access rules:** Same as viewer-token.

**Response 200:**
```json
{
  "status": "success",
  "data": {
    "token": "...",
    "channel_id": "...",
    "api_key": "..."
  }
}
```
**Errors:** `403` not purchased · `503 CHAT_UNAVAILABLE` channel init failed

---

### GET `/student/purchases`
List all streams the authenticated student has purchased (stream and recording types).

**Auth:** Required  
**Response 200:**
```json
{
  "status": "success",
  "data": [
    {
      "purchase_uuid": "...",
      "purchase_type": "stream | recording",
      "purchased_at": "ISO8601",
      "amount_paid": 25.00,
      "stream": {
        "uuid": "...",
        "title": "...",
        "status": "...",
        "thumbnail_url": "...",
        "recording_url": "...",
        "teacher": { "uuid": "...", "name": "...", "channel_slug": "..." }
      }
    }
  ],
  "meta": { "pagination": { ... } }
}
```

---

## Streams (Teacher)

All teacher stream routes require `role:teacher` and `dashboard.unlocked`.

### GET `/teacher/streams`
List the authenticated teacher's own streams (paginated, newest first).

**Auth:** Required · Teacher + Unlocked  
**Response 200:** Same pagination envelope as `GET /streams`, no `teacher` field inside each stream.

---

### POST `/streams`
Create a new stream.

**Auth:** Required · Teacher + Unlocked  
**Body:**
```json
{
  "title": "string (required, max 255)",
  "description": "string (optional, max 5000)",
  "category": "string (optional, max 100)",
  "thumbnail_url": "url (optional)",
  "is_free": "boolean (required)",
  "price": "number (required if is_free=false, min 0, max 9999.99)",
  "scheduled_at": "datetime (optional, must be future)"
}
```
**Response 201:** `{ "status": "success", "message": "Stream created.", "data": { ...stream... } }`  
**Notes:** If `scheduled_at` is set, subscribed students are notified by email.

---

### PATCH `/streams/{uuid}`
Update stream metadata. Teacher must own the stream.

**Auth:** Required · Teacher + Unlocked  
**Body** (all fields optional):
```json
{
  "title": "string",
  "description": "string | null",
  "category": "string | null",
  "thumbnail_url": "url | null",
  "is_free": "boolean",
  "price": "number | null",
  "scheduled_at": "datetime | null",
  "recording_price": "number | null"
}
```
**Response 200:** `{ "status": "success", "data": { ...stream... } }`

---

### DELETE `/streams/{uuid}`
Soft-delete a stream. Teacher must own it; admins may delete any.

**Auth:** Required · Teacher + Unlocked  
**Response 200:** `{ "status": "success", "message": "Stream deleted." }`  
**Errors:** `403` not the owner

---

### POST `/streams/{uuid}/cancel`
Cancel a scheduled stream.

**Auth:** Required · Teacher + Unlocked  
**Response 200:** `{ "status": "success", "message": "Stream cancelled." }`  
**Errors:** `409` stream is not in `scheduled` status

---

### POST `/streams/{uuid}/host-token`
Get a GetStream.io host token to go live.

**Auth:** Required · Teacher + Unlocked  
**Response 200:**
```json
{
  "status": "success",
  "data": {
    "token": "...",
    "call_id": "...",
    "api_key": "..."
  }
}
```
**Errors:** `403` not the owner · `409` stream already ended/cancelled

---

### POST `/streams/{uuid}/go-live`
*(Temporary)* Manually mark a stream as live (substitutes for GetStream webhook).

**Auth:** Required · Teacher + Unlocked  
**Response 200:** `{ "status": "success", "data": { ...stream... } }`

---

### POST `/streams/{uuid}/end`
*(Temporary)* Manually mark a stream as ended.

**Auth:** Required · Teacher + Unlocked  
**Response 200:** `{ "status": "success", "data": { ...stream... } }`

---

## Teacher Profile

### GET `/teacher/status`
Get teacher profile and dashboard lock status. (No `dashboard.unlocked` middleware — works for locked teachers.)

**Auth:** Required · Teacher  
**Response 200:**
```json
{
  "user": { "uuid": "...", "name": "...", "email": "...", "role": "teacher" },
  "profile": {
    "channel_slug": "...",
    "bio": "...",
    "avatar_url": "...",
    "dashboard_unlocked": false,
    "registration_fee_paid_at": "ISO8601 | null",
    "admin_free_access": false,
    "admin_free_access_granted_by": null,
    "admin_free_access_reason": null,
    "access_source": "paid | admin_grant | none"
  }
}
```

---

### GET `/teacher/profile`
Get the teacher's full profile. Requires dashboard unlocked.

**Auth:** Required · Teacher + Unlocked  
**Response 200:** Same shape as `/teacher/status`

---

### PATCH `/teacher/profile`
Update teacher channel slug, bio, and avatar.

**Auth:** Required · Teacher + Unlocked  
**Body** (all optional):
```json
{
  "channel_slug": "string (lowercase, alphanumeric + hyphens, min 3, max 100, unique)",
  "bio": "string | null (max 2000)",
  "avatar_url": "url | null"
}
```
**Response 200:** `{ "message": "Profile updated.", "profile": { ... } }`

---

## Teacher Channel Management

### GET `/teacher/channel`
Fetch the authenticated teacher's channel data for the management UI.

**Auth:** Required · Teacher + Unlocked  
**Response 200:**
```json
{
  "status": "success",
  "data": {
    "name": "...",
    "email": "...",
    "channel_slug": "...",
    "bio": "...",
    "avatar_url": "...",
    "dashboard_unlocked": true,
    "registration_fee_paid_at": "ISO8601 | null"
  }
}
```

---

### PATCH `/teacher/channel`
Update bio, avatar URL, or channel slug.

**Auth:** Required · Teacher + Unlocked  
**Body** (all optional):
```json
{
  "bio": "string | null (max 2000)",
  "avatar_url": "url | null",
  "channel_slug": "string (min 3, max 100, lowercase alphanumeric + hyphens, unique)"
}
```
**Response 200:** `{ "status": "success", "message": "Channel updated.", "data": { ...profile... } }`

---

### PATCH `/teacher/channel/streams/{uuid}/recording-price`
Set the price for a past stream's recording.

**Auth:** Required · Teacher + Unlocked  
**Body:** `{ "recording_price": "number | null (min 0, max 9999.99)" }`  
**Response 200:** `{ "status": "success", "data": { "uuid": "...", "recording_price": 15.00 } }`  
**Errors:** `403` not the owner · `409` stream not ended

---

## Channels (Public)

### GET `/channels/{slug}`
Public instructor channel page data.

**Auth:** None (is_following will be false unless authenticated)  
**Response 200:**
```json
{
  "status": "success",
  "data": {
    "teacher": {
      "uuid": "...",
      "name": "...",
      "channel_slug": "...",
      "bio": "...",
      "avatar_url": "..."
    },
    "follower_count": 123,
    "is_following": false,
    "streams": {
      "data": [ { ...stream object (no teacher field)... } ],
      "meta": { "pagination": { ... } }
    }
  }
}
```
**Notes:** Streams are ordered live → scheduled (soonest) → ended (newest). Cancelled excluded.

---

### POST `/channels/{slug}/follow`
Follow a teacher's channel.

**Auth:** Required  
**Response 200:**
```json
{
  "status": "success",
  "is_following": true,
  "follower_count": 124
}
```
**Errors:** `409` cannot follow yourself. Idempotent — following twice is a no-op.

---

### DELETE `/channels/{slug}/follow`
Unfollow a teacher's channel.

**Auth:** Required  
**Response 200:** `{ "status": "success", "is_following": false, "follower_count": 123 }`  
Idempotent.

---

## Notification Preferences

### GET `/notifications/preferences`
List all instructors the student follows with their current email notification preference.

**Auth:** Required  
**Response 200:**
```json
{
  "status": "success",
  "data": [
    {
      "teacher_uuid": "...",
      "teacher_name": "...",
      "channel_slug": "...",
      "avatar_url": "...",
      "notify_email": true,
      "followed_at": "ISO8601"
    }
  ]
}
```

---

### PATCH `/notifications/preferences/{teacher_uuid}`
Toggle email notification for a specific followed instructor.

**Auth:** Required  
**Body:** `{ "notify_email": true | false }`  
**Response 200:** `{ "status": "success", "notify_email": true, "message": "..." }`  
**Errors:** `404` not following this instructor

---

## Payments — Mat Orders

### POST `/mat/generate`
Generate a mat SVG/AI preview without creating an order. Returns a downloadable `.ai` file.

**Auth:** Required  
**Body:**
```json
{
  "fm1" – "fm9": "number (required, 1–300)",
  "fm10" – "fm12": "number (optional, 0–300)",
  "fline": "solid | border (required)"
}
```
**Response 200:** `Content-Type: application/pdf` — downloadable AI file.

---

### POST `/mat/checkout`
Create a Stripe Checkout session for a mat order.

**Auth:** Required  
**Response 200:** `{ "checkout_url": "https://checkout.stripe.com/...", "session_id": "cs_..." }`  
**Notes:** Price and currency are set by admin via platform settings.

---

### GET `/mat/checkout/confirm?session_id=cs_xxx`
Confirm a completed mat Stripe Checkout (polled after redirect).

**Auth:** Required  
**Response 200:** `{ "paid": true, "pending_order_uuid": "..." }` or `{ "paid": false }`

---

### POST `/mat/orders`
Submit mat measurements after payment is confirmed.

**Auth:** Required  
**Body:**
```json
{
  "fm1" – "fm9": "number (required)",
  "fm10" – "fm12": "number (optional)",
  "motto": "string (optional, max 18 chars)",
  "fline": "solid | border (required)",
  "shipping_address": {
    "name": "string (required)",
    "line1": "string (required)",
    "line2": "string (optional)",
    "city": "string (required)",
    "country": "string (required)",
    "postal": "string (required)"
  },
  "stripe_session_id": "string (optional)",
  "pending_order_uuid": "string (optional)"
}
```
**Response 201:**
```json
{
  "uuid": "...",
  "status": "pending",
  "dimensions": { ... },
  "message": "Order received..."
}
```

---

### GET `/mat/orders`
List all mat orders for the authenticated student.

**Auth:** Required  
**Response 200:** `{ "data": [ { ...order... } ] }`

---

### GET `/mat/orders/{uuid}`
Get a single mat order.

**Auth:** Required  
**Response 200:** Full order object.  
**Errors:** `404` not found or not owned

---

### GET `/mat/orders/{uuid}/download-svg`
Download the SVG file for a completed or shipped order.

**Auth:** Required  
**Response 200:** `Content-Type: application/pdf` — downloadable AI file.  
**Errors:** `404` order not completed/shipped · `422` no measurement data

---

## Payments — Streams

### POST `/payments/stream-checkout`
Create a Stripe Checkout session to purchase access to a stream.

**Auth:** Required  
**Body:** `{ "stream_uuid": "uuid (required)" }`  
**Response 200:** `{ "checkout_url": "...", "session_id": "cs_..." }`  
**Errors:**
- `409` stream is free · already purchased · recording not yet ready
- `410` stream cancelled

---

### GET `/payments/stream-checkout/confirm?session_id=cs_xxx`
Confirm a stream payment after Stripe redirect.

**Auth:** Required  
**Response 200:** `{ "paid": true, "stream_uuid": "..." }` or `{ "paid": false }`

---

### POST `/payments/recording-checkout`
Create a Stripe Checkout session to purchase a past stream recording.

**Auth:** Required  
**Body:** `{ "stream_uuid": "uuid (required)" }`  
**Response 200:** `{ "checkout_url": "...", "session_id": "cs_..." }`  
**Errors:**
- `409 RECORDING_NOT_READY` not ended or no recording
- `409 NOT_FOR_SALE` no `recording_price` set
- `409 ALREADY_PURCHASED` already has access

---

### GET `/payments/recording-checkout/confirm?session_id=cs_xxx`
Confirm a recording payment after Stripe redirect.

**Auth:** Required  
**Response 200:** `{ "paid": true, "stream_uuid": "...", "type": "recording" }`

---

### POST `/payments/teacher-fee-checkout`
Create a Stripe Checkout session to pay the teacher registration fee and unlock the dashboard.

**Auth:** Required · Teacher  
**Response 200:** `{ "checkout_url": "...", "session_id": "cs_..." }`  
**Errors:** `409` dashboard already unlocked · `404` profile not found  
**Notes:** If admin has set the fee to `0`, the dashboard is unlocked immediately.

---

## Mat Dashboard (Admin + mat_dashboard role)

All routes require `role:mat_dashboard` or `role:admin`.

### GET `/mat/dashboard`
List all mat orders with pagination.

### PATCH `/mat/dashboard/{uuid}/status`
Update an order's status (e.g. pending → in_progress → shipped → completed).

### POST `/mat/dashboard/{uuid}/notes`
Add an internal note to an order.

### GET `/mat/dashboard/{uuid}/svg`
Download the AI/SVG file for any order.

---

## Admin Routes

All admin routes require `role:admin` and use `/admin` prefix.

### Teachers

| Method | Path | Description |
|---|---|---|
| `GET` | `/admin/teachers` | List all teachers (paginated) |
| `POST` | `/admin/teachers` | Create a new teacher account |
| `GET` | `/admin/teachers/{id}` | Get teacher details |
| `PATCH` | `/admin/teachers/{id}` | Update teacher |
| `DELETE` | `/admin/teachers/{id}` | Delete teacher |
| `GET` | `/admin/teachers/{id}/payments` | List teacher fee payment records |
| `POST` | `/admin/teachers/{id}/grant-free-access` | Grant dashboard access without payment |
| `DELETE` | `/admin/teachers/{id}/grant-free-access` | Revoke free access grant |

---

### Users

| Method | Path | Description |
|---|---|---|
| `GET` | `/admin/users` | List all users |
| `GET` | `/admin/users/{id}` | Get user details |
| `PATCH` | `/admin/users/{id}` | Update user (e.g. deactivate account) |

---

### Streams

| Method | Path | Description |
|---|---|---|
| `GET` | `/admin/streams` | List all streams |
| `GET` | `/admin/streams/{uuid}` | Get stream details |
| `DELETE` | `/admin/streams/{uuid}` | Delete any stream |

---

### Settings

| Method | Path | Description |
|---|---|---|
| `GET` | `/admin/settings` | Get all platform settings |
| `PATCH` | `/admin/settings` | Update platform settings (theme colors, fees, currency) |

---

### Mat Orders

| Method | Path | Description |
|---|---|---|
| `GET` | `/admin/mat-orders` | List all mat orders |
| `GET` | `/admin/mat-orders/{uuid}` | Get mat order details |

---

## Webhooks

### POST `/webhooks/stripe`
Stripe webhook handler. Verified by Stripe signature. Processes: mat order completion, stream purchase, recording purchase, teacher fee payment.

**Auth:** Stripe signature (no Sanctum token)

---

### POST `/webhooks/getstream`
GetStream.io webhook handler. Verified by GetStream signature middleware. Handles stream lifecycle events (call started, call ended).

**Auth:** GetStream signature

---

## Error Format

Validation errors follow Laravel's standard format:
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "field_name": ["Error message."]
  }
}
```

HTTP status codes used: `200`, `201`, `402`, `403`, `404`, `409`, `410`, `422`, `503`.
