/**
 * One-off image optimisation for /public, plus generated icons and the
 * social sharing image.  Run with:  npm run optimize-images
 *
 * - Photos larger than 2400px are downscaled and recompressed (EXIF such as
 *   GPS location is stripped). Originals are copied to /image-originals first.
 * - Creates icon-192.png, icon-512.png, app/icon.png, app/apple-icon.png, og.jpg.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = 'public';
const BACKUP_DIR = 'image-originals';
const MAX_SIZE = 2400;
const GENERATED = new Set(['icon-192.png', 'icon-512.png', 'og.jpg']);

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function backup(file, buffer) {
	const target = path.join(BACKUP_DIR, file);
	try {
		await fs.access(target);
	} catch {
		await fs.writeFile(target, buffer);
	}
}

async function optimisePhotos() {
	let saved = 0;
	for (const file of await fs.readdir(PUBLIC_DIR)) {
		const ext = path.extname(file).toLowerCase();
		if (!['.jpg', '.jpeg', '.png'].includes(ext) || GENERATED.has(file)) continue;

		const src = path.join(PUBLIC_DIR, file);
		const input = await fs.readFile(src);
		const isLogo = file.toLowerCase() === 'logo.png';
		let pipeline = sharp(input).rotate().resize({
			width: isLogo ? 512 : MAX_SIZE,
			height: isLogo ? 512 : MAX_SIZE,
			fit: 'inside',
			withoutEnlargement: true,
		});
		pipeline = ext === '.png' ? pipeline.png({ compressionLevel: 9, effort: 10 }) : pipeline.jpeg({ quality: 80, mozjpeg: true });
		const output = await pipeline.toBuffer();

		if (output.length >= input.length * 0.9) {
			console.log(`  keep  ${file} (${kb(input.length)})`);
			continue;
		}
		await backup(file, input);
		await fs.writeFile(src, output);
		saved += input.length - output.length;
		console.log(`  ✔     ${file}: ${kb(input.length)} → ${kb(output.length)}`);
	}
	console.log(`\nSaved ${kb(saved)} in /public.\n`);
}

async function generateIcons() {
	const logo = await fs.readFile(path.join(BACKUP_DIR, 'logo.png')).catch(() => fs.readFile(path.join(PUBLIC_DIR, 'logo.png')));
	const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

	await sharp(logo).resize(192, 192, { fit: 'contain', background: transparent }).png().toFile(path.join(PUBLIC_DIR, 'icon-192.png'));
	await sharp(logo).resize(512, 512, { fit: 'contain', background: transparent }).png().toFile(path.join(PUBLIC_DIR, 'icon-512.png'));

	const appIcon = path.join('app', 'icon.png');
	await backup('app-icon.png', await fs.readFile(appIcon));
	const icon = await sharp(logo).resize(256, 256, { fit: 'contain', background: transparent }).png({ compressionLevel: 9 }).toBuffer();
	await fs.writeFile(appIcon, icon);

	await sharp(logo)
		.resize(150, 150, { fit: 'contain', background: '#ffffff' })
		.extend({ top: 15, bottom: 15, left: 15, right: 15, background: '#ffffff' })
		.flatten({ background: '#ffffff' })
		.png()
		.toFile(path.join('app', 'apple-icon.png'));
	console.log('  ✔     icons generated');
}

async function generateOgImage() {
	const width = 1200;
	const height = 630;
	const photo = await sharp(path.join(PUBLIC_DIR, 'church.jpg')).resize(width, height, { fit: 'cover' }).toBuffer();
	const overlay = Buffer.from(
		`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
			<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0" stop-color="#0F3872" stop-opacity="0.82"/>
				<stop offset="0.55" stop-color="#071325" stop-opacity="0.86"/>
				<stop offset="1" stop-color="#8B1220" stop-opacity="0.78"/>
			</linearGradient></defs>
			<rect width="100%" height="100%" fill="url(#g)"/>
		</svg>`,
	);
	const logoSource = await fs.readFile(path.join(BACKUP_DIR, 'logo.png')).catch(() => fs.readFile(path.join(PUBLIC_DIR, 'logo.png')));
	const logo = await sharp(logoSource).resize(300, 300, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();

	await sharp(photo)
		.composite([{ input: overlay }, { input: logo, gravity: 'center' }])
		.jpeg({ quality: 82, mozjpeg: true })
		.toFile(path.join(PUBLIC_DIR, 'og.jpg'));
	console.log('  ✔     og.jpg generated');
}

await fs.mkdir(BACKUP_DIR, { recursive: true });
await optimisePhotos();
await generateIcons();
await generateOgImage();
