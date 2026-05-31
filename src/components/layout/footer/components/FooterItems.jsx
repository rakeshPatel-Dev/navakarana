import React from "react";

export default function FooterItems({ links = [] }) {
	return (
		<ul className="space-y-2">
			{links.map((link) => (
				<li key={link.href + link.label}>
					<a
						href={link.href}
						className="text-sm text-gray-600 hover:text-gray-900"
						{...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
					>
						{link.label}
					</a>
				</li>
			))}
		</ul>
	);
}
