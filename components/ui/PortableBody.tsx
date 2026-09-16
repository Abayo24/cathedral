import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

const components: PortableTextComponents = {
	marks: {
		link: ({ value, children }) => {
			const href: string = value?.href ?? '#';
			const external = /^https?:\/\//.test(href);
			return (
				<a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
					{children}
				</a>
			);
		},
	},
};

export function PortableBody({ value }: { value: PortableTextBlock[] }) {
	return (
		<div className='prose-church'>
			<PortableText value={value} components={components} />
		</div>
	);
}
