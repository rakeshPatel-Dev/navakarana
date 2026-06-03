export const headerData = {
	platformName: "Navakarana",
	logo: {
		src: "/navakarana_logo.png",
		alt: "Navakarana Logo",
	},
	// Primary navigation shown to all users
	nav: [
		{ label: "Home", href: "/" },
		{ label: "Streams", href: "/streams" },
		{ label: "Custom Mat", href: "/mat/info" },
	],
	// Auth-related links (shown when user is not authenticated)
	auth: [
		{ label: "Sign In", href: "/login" },
		{ label: "Join Free", href: "/register" },
	],
	// Links that require authentication (components can use `auth: true` to gate)
	protected: [
		{ label: "My Library", href: "/my-library" },
	],
	// Optional call-to-action (used for teacher-facing flows)
	cta: { label: "Teach Yoga", href: "/teacher/dashboard" },
};

export default headerData;
