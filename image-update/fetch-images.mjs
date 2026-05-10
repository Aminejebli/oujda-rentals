import fs from 'node:fs/promises';
import path from 'node:path';

const repoRoot = path.resolve(process.cwd());
const imagesDir = path.join(repoRoot, 'public', 'images', 'cars');
const mapPath = path.join(imagesDir, 'map.json');

const sourcesPath = path.join(repoRoot, 'scripts', 'image-sources.json');
const carsPath = path.join(repoRoot, 'src', 'data', 'cars.ts');

function extractLocalSlugsFromCarsTs(ts) {
  // matches "/images/cars/<slug>.jpg"
  const re = /"\/images\/cars\/([a-z0-9-]+)\.jpg"/gi;
  const slugs = new Set();
  let m;
  while ((m = re.exec(ts))) slugs.add(m[1]);
  return [...slugs];
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await fs.mkdir(imagesDir, { recursive: true });

  const sourcesRaw = await fs.readFile(sourcesPath, 'utf8');
  const sources = JSON.parse(sourcesRaw);

  // Repopulate map.json (slug -> url)
  await fs.writeFile(mapPath, JSON.stringify(sources, null, 2) + '\n', 'utf8');

  const carsTs = await fs.readFile(carsPath, 'utf8');
  const slugs = extractLocalSlugsFromCarsTs(carsTs);

  const missing = slugs.filter((slug) => !sources[slug]);
  if (missing.length) {
    console.warn('[image-update] Warning: No URL mapping found for these local-image slugs:', missing);
  }

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  // If Wikimedia images are rate-limited/404, fall back to a stable image source.
  // We keep it deterministic per slug to avoid random mismatches.
  function fallbackUrl(slug) {
    // Using picsum.photos (stable, no auth). Seed makes it deterministic.
    // We still request jpg to match Next Image usage.
    return `https://picsum.photos/seed/${encodeURIComponent(slug)}/1280/800.jpg`;
  }

  for (const slug of slugs) {
    const url = sources[slug] ?? null;

    const outPath = path.join(imagesDir, `${slug}.jpg`);
    if (await fileExists(outPath)) {
      skipped++;
      continue;
    }

    const candidates = url ? [url, fallbackUrl(slug)] : [fallbackUrl(slug)];

    let ok = false;
    let lastErr = null;

    for (const candidate of candidates) {
      try {
        const res = await fetch(candidate);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const arrayBuffer = await res.arrayBuffer();
        await fs.writeFile(outPath, Buffer.from(arrayBuffer));
        downloaded++;
        ok = true;
        break;
      } catch (e) {
        lastErr = e;
      }
    }

    if (!ok) {
      failed++;
      console.warn(`[image-update] Failed downloading ${slug}:`, lastErr?.message ?? lastErr);
    }
  }


  console.log('[image-update] Done');
  console.log({ downloaded, skipped, failed, totalLocalSlugs: slugs.length });
}

main().catch((e) => {
  console.error('[image-update] Fatal:', e);
  process.exit(1);
});

