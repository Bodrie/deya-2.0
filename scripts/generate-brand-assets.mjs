/**
 * Generates favicons, app icons and the social preview image from the
 * vector logo in app/assets/brand. Run with `npm run brand` after changing
 * the logo; the output in public/ is committed.
 *
 * The SVG logo parts were traced once from app/assets/brand/logo-original.png.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const brandDir = path.join(root, "app/assets/brand");
const publicDir = path.join(root, "public");

const PLUM = "#241A2A";
const GOLD_STOPS = [
  ["0%", "#F8DC85"],
  ["55%", "#EEB64B"],
  ["100%", "#E59C36"],
];

async function loadPart(name) {
  const svg = await fs.readFile(path.join(brandDir, `${name}.svg`), "utf8");
  const [, , w, h] = svg
    .match(/viewBox="([^"]+)"/)[1]
    .split(/\s+/)
    .map(Number);
  const inner = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  return { w, h, inner };
}

function goldGradient(id, y1, y2) {
  const stops = GOLD_STOPS.map(
    ([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`,
  ).join("");
  return `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y1}" x2="0" y2="${y2}">${stops}</linearGradient>`;
}

/** Places a logo part centred in a square tile, scaled to `fill` of the tile width. */
function iconSvg(
  part,
  size,
  { fill = 0.78, radius = 0, background = PLUM } = {},
) {
  const k = (size * fill) / Math.max(part.w, part.h);
  const tx = (size - part.w * k) / 2;
  const ty = (size - part.h * k) / 2;
  const bg = background
    ? `<rect width="${size}" height="${size}" rx="${radius}" fill="${background}"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
<defs>${goldGradient("gold", ty, ty + part.h * k)}</defs>
${bg}
<g fill="url(#gold)" transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${k.toFixed(5)})">${part.inner}</g>
</svg>`;
}

/** Minimal .ico writer: PNG payloads are valid ICO entries. */
function toIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + pngs.length * 16;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const png = (svg) =>
  sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

async function main() {
  await fs.mkdir(publicDir, { recursive: true });
  const emblem = await loadPart("emblem");
  const full = await loadPart("logo");

  // Browser tab icons: the emblem alone reads best at small sizes.
  const faviconSvg = iconSvg(emblem, 64, { fill: 0.84, radius: 14 });
  await fs.writeFile(path.join(publicDir, "favicon.svg"), faviconSvg);
  const ico = toIco([
    {
      size: 16,
      data: await png(iconSvg(emblem, 16, { fill: 0.9, radius: 3 })),
    },
    {
      size: 32,
      data: await png(iconSvg(emblem, 32, { fill: 0.86, radius: 7 })),
    },
    {
      size: 48,
      data: await png(iconSvg(emblem, 48, { fill: 0.84, radius: 10 })),
    },
  ]);
  await fs.writeFile(path.join(publicDir, "favicon.ico"), ico);

  // Home-screen icons: full logo with the wordmark.
  await fs.writeFile(
    path.join(publicDir, "apple-touch-icon.png"),
    await png(iconSvg(full, 180, { fill: 0.7 })),
  );
  await fs.writeFile(
    path.join(publicDir, "icon-192.png"),
    await png(iconSvg(full, 192, { fill: 0.7, radius: 40 })),
  );
  await fs.writeFile(
    path.join(publicDir, "icon-512.png"),
    await png(iconSvg(full, 512, { fill: 0.7, radius: 108 })),
  );
  // Maskable icons are cropped by the OS; keep the logo inside the safe zone.
  await fs.writeFile(
    path.join(publicDir, "icon-maskable-512.png"),
    await png(iconSvg(full, 512, { fill: 0.56 })),
  );

  // Social preview (1200×630): studio photo in an arch, gold logo on plum.
  const W = 1200;
  const H = 630;
  const arch = { x: 90, y: 70, w: 400, h: 560 };
  const photo = await sharp(
    path.join(root, "app/assets/images/studio-session-room.jpg"),
  )
    .resize(arch.w, arch.h, { fit: "cover", position: "centre" })
    .modulate({ saturation: 0.9, brightness: 1.03 })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${arch.w}" height="${arch.h}"><path d="M0 ${arch.h} V${arch.w / 2} A${arch.w / 2} ${arch.w / 2} 0 0 1 ${arch.w} ${arch.w / 2} V${arch.h} Z" fill="#fff"/></svg>`,
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();
  const logoH = 330;
  const k = logoH / full.h;
  const lx = 600 + (W - 600 - full.w * k) / 2;
  const ly = (H - logoH) / 2;
  const backdrop = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<defs>
  <radialGradient id="glow" cx="0.68" cy="0.5" r="0.55">
    <stop offset="0%" stop-color="#5a3d3a" stop-opacity="0.85"/>
    <stop offset="100%" stop-color="${PLUM}" stop-opacity="0"/>
  </radialGradient>
  ${goldGradient("gold", ly, ly + logoH)}
</defs>
<rect width="${W}" height="${H}" fill="${PLUM}"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<path d="M${arch.x - 14} ${H} V${arch.y + arch.w / 2} A${arch.w / 2 + 14} ${arch.w / 2 + 14} 0 0 1 ${arch.x + arch.w + 14} ${arch.y + arch.w / 2} V${H}" fill="none" stroke="#EDBE63" stroke-opacity="0.45" stroke-width="1.5"/>
<g fill="url(#gold)" transform="translate(${lx.toFixed(2)} ${ly.toFixed(2)}) scale(${k.toFixed(5)})">${full.inner}</g>
</svg>`;
  await sharp(Buffer.from(backdrop))
    .composite([{ input: photo, left: arch.x, top: arch.y }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(publicDir, "og-image.jpg"));

  console.log("Brand assets written to public/");
}

await main();
