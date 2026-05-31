
export default function NavItems({ items = [] }) {
	return (
		<>
			{items.map((item) => (
				<a
					key={item.href + item.label}
					href={item.href}
					className="text-sm text-gray-700 hover:text-gray-900"
				>
					{item.label}
				</a>
			))}
		</>
	);
}
