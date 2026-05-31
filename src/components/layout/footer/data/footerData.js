export const footerData = {
	platformName: "Navakarana",
	columns: [
		{
			title: "Product",
			links: [
				{ label: "Classes", href: "/streams" },
				{ label: "Mat Studio", href: "/mat/info" },
				{ label: "My Practice", href: "/my-library", auth: true },
			],
		},
		{
			title: "Company",
			links: [
				{ label: "About", href: "/about" },
				{ label: "Careers", href: "/careers" },
				{ label: "Contact", href: "/contact" },
			],
		},
		{
			title: "Support",
			links: [
				{ label: "Help Center", href: "/help" },
				{ label: "Notifications", href: "/notifications", auth: true },
				{ label: "Terms", href: "/terms" },
				{ label: "Privacy", href: "/privacy" },
			],
		},
		{
			title: "Follow",
			links: [
				{ label: "Twitter", href: "https://twitter.com/your_handle", external: true },
				{ label: "Instagram", href: "https://instagram.com/your_handle", external: true },
				{ label: "YouTube", href: "https://youtube.com/your_channel", external: true },
			],
		},
	],
	contact: {
		email: "support@navakarana.example",
		address: null,
	},
	copyright: `© ${new Date().getFullYear()} Navakarana. All rights reserved.`,
};

export default footerData;
