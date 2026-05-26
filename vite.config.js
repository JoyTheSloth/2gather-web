import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ─── IMMEDIATE GLOBAL SYNC ──────────────────────────────────────────
// This executes the second Node.js parses the configuration during hot reload.
const assets = [
  { src: 'C:\\Users\\joyde\\.gemini\\antigravity\\brain\\77473246-4541-4f9e-939b-998e0ab736b8\\tech_banner_1779603417167.png', dest: 'tech_banner.png' },
  { src: 'C:\\Users\\joyde\\.gemini\\antigravity\\brain\\77473246-4541-4f9e-939b-998e0ab736b8\\wellness_banner_1779603432360.png', dest: 'wellness_banner.png' },
  { src: 'C:\\Users\\joyde\\.gemini\\antigravity\\brain\\77473246-4541-4f9e-939b-998e0ab736b8\\creative_banner_1779603447545.png', dest: 'creative_banner.png' },
  { src: 'C:\\Users\\joyde\\.gemini\\antigravity\\brain\\77473246-4541-4f9e-939b-998e0ab736b8\\adventure_banner_1779603462842.png', dest: 'adventure_banner.png' },
  { src: 'C:\\Users\\joyde\\.gemini\\antigravity\\brain\\77473246-4541-4f9e-939b-998e0ab736b8\\social_banner_1779603479526.png', dest: 'social_banner.png' },
  { src: 'C:\\Users\\joyde\\.gemini\\antigravity\\brain\\77473246-4541-4f9e-939b-998e0ab736b8\\tropical_couple_1779645520093.png', dest: 'tropical_couple.png' },
  { src: 'C:\\Users\\joyde\\.gemini\\antigravity\\brain\\77473246-4541-4f9e-939b-998e0ab736b8\\hibiscus_emblem_1779645540707.png', dest: 'hibiscus_emblem.png' },
  { src: 'C:\\Users\\joyde\\.gemini\\antigravity\\brain\\77473246-4541-4f9e-939b-998e0ab736b8\\tropical_bg_1779645559353.png', dest: 'tropical_bg.png' },
  { src: 'C:\\Users\\joyde\\.gemini\\antigravity\\brain\\f4e6e7e5-57e5-46fc-af0c-5f88d9332fea\\sloth_contact_illustration_1779736447699.png', dest: 'sloth_contact_illustration.png' }
];

const publicDir = path.resolve(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

assets.forEach(({ src, dest }) => {
  const destPath = path.join(publicDir, dest);
  if (fs.existsSync(src)) {
    try {
      fs.copyFileSync(src, destPath);
      console.log(`[AssetSync-Global] Instantly synced ${dest} to public folder.`);
    } catch (err) {
      console.error(`[AssetSync-Global] Failed to copy ${dest}:`, err);
    }
  } else {
    console.warn(`[AssetSync-Global] Source file not found: ${src}`);
  }
});

// Copy contact1 directory to public/contact1 if it exists
const contactSrcDir = path.resolve(__dirname, 'contact1');
const contactDestDir = path.resolve(publicDir, 'contact1');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

try {
  copyDirRecursive(contactSrcDir, contactDestDir);
  console.log('[AssetSync-Global] Successfully synced contact1 folder to public/contact1.');
} catch (err) {
  console.error('[AssetSync-Global] Failed to sync contact1 folder:', err);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
