// extract-poster.mjs — run with: node extract-poster.mjs
// Extracts first frame of hero-video.mp4 as hero-poster.webp using a headless canvas approach
// Requires: puppeteer-core or just uses the file directly via canvas

import { createCanvas } from "canvas";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// We'll use a simpler approach: a temporary HTML file + screenshot via browser subagent
// This script instead creates a minimal HTML that captures the first frame

const html = `<!DOCTYPE html>
<html>
<head><style>body{margin:0;background:#000;}canvas{display:block;}</style></head>
<body>
<video id="v" src="./public/hero-video.mp4" preload="auto" muted playsInline style="display:none"></video>
<canvas id="c"></canvas>
<script>
const v = document.getElementById('v');
const c = document.getElementById('c');
v.addEventListener('loadeddata', () => {
  v.currentTime = 0.1;
});
v.addEventListener('seeked', () => {
  c.width = v.videoWidth;
  c.height = v.videoHeight;
  const ctx = c.getContext('2d');
  ctx.drawImage(v, 0, 0);
  const dataUrl = c.toDataURL('image/webp', 0.85);
  document.title = dataUrl;
});
v.load();
</script>
</body>
</html>`;

fs.writeFileSync("extract-poster.html", html);
console.log("Created extract-poster.html — open in browser to extract poster");
