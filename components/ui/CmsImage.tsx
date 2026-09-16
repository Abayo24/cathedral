import Image, { type ImageProps } from 'next/image';
import type { Img } from '@/lib/types';

type Props = Omit<ImageProps, 'src' | 'alt' | 'placeholder' | 'blurDataURL'> & {
	image: Img;
	/** Override the image's own alt text ('' for decorative use). */
	alt?: string;
};

/**
 * next/image for CMS or /public images: blur-up placeholder, hotspot-aware
 * cropping, and Sanity originals pre-shrunk so the optimiser never has to
 * download multi-megabyte camera photos.
 */
export function CmsImage({ image, alt, style, ...rest }: Props) {
	const src =
		image.src.startsWith('https://cdn.sanity.io/') && !image.src.includes('?')
			? `${image.src}?w=2000&fit=max&auto=format`
			: image.src;

	return (
		<Image
			src={src}
			alt={alt ?? image.alt}
			placeholder={image.blur ? 'blur' : 'empty'}
			blurDataURL={image.blur}
			style={image.position ? { objectPosition: image.position, ...style } : style}
			{...rest}
		/>
	);
}
