import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const conversions = [
  ['WhatsApp Image 2026-10-05 at 16.02.32.jpeg', 'coiron-outcrop-01.webp'],
  ['WhatsApp Image 2026-10-05 at 16.02.32 (1).jpeg', 'coiron-outcrop-02.webp'],
  ['WhatsApp Image 2026-10-05 at 16.02.32 (2).jpeg', 'coiron-outcrop-03.webp'],
  ['WhatsApp Image 2026-10-05 at 16.02.33.jpeg', 'coiron-outcrop-04.webp'],
  ['WhatsApp Image 2026-10-05 at 16.02.33 (1).jpeg', 'coiron-outcrop-05.webp'],
  ['WhatsApp Image 2026-10-05 at 16.02.33 (2).jpeg', 'coiron-outcrop-06.webp'],
];

const outputDirectory = path.join(projectRoot, 'public', 'work');
await mkdir(outputDirectory, { recursive: true });

for (const [sourceName, outputName] of conversions) {
  const sourcePath = path.join(projectRoot, 'assets', sourceName);
  const outputPath = path.join(outputDirectory, outputName);
  const before = await stat(sourcePath);

  const result = await sharp(sourcePath)
    .rotate()
    .resize({ width: 1280, height: 1280, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(outputPath);

  const savedPercent = Math.round((1 - result.size / before.size) * 100);
  console.log(`${sourceName} → public/work/${outputName} (${Math.round(result.size / 1024)} KB, ${savedPercent}% smaller)`);
}
