export const css = `
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: monospace;
  background: #0a0a0a;
  color: #ccc;
  min-height: 100vh;
  padding: 40px;
  line-height: 1.7;
}

.container {
  max-width: 700px;
  margin: 0 auto;
  border: 2px solid #ffb3c6;
  border-radius: 16px;
  padding: 32px;
  background: #0f0f0f;
}

.header {
  border-bottom: 2px dashed #ffb3c633;
  padding-bottom: 20px;
  margin-bottom: 30px;
}

h1 {
  font-weight: normal;
  font-size: 26px;
  margin-bottom: 10px;
  color: #ffb3c6;
}

.tagline { font-size: 14px; }

.section-title {
  font-size: 14px;
  margin-bottom: 15px;
  text-transform: lowercase;
  color: #ffb3c6;
}

.section {
  border: 1px solid #333;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  background: #111;
}

.nav {
  display: flex;
  margin-bottom: 30px;
  position: relative;
  background: #111;
  border: 1px solid #333;
  border-radius: 20px;
  padding: 4px;
  width: fit-content;
}

.nav-slider {
  position: absolute;
  height: calc(100% - 8px);
  background: #ffb3c6;
  border-radius: 16px;
  top: 4px;
  left: 4px;
  transition: transform 0.3s ease, width 0.3s ease;
}

.nav-link {
  color: #ccc;
  text-decoration: none;
  cursor: pointer;
  padding: 6px 16px;
  border-radius: 16px;
  position: relative;
  z-index: 1;
}

.nav-link.active { color: #0a0a0a; }
.nav-link:hover:not(.active) { color: #ffb3c6; }

.content { min-height: 200px; }

ul { list-style: none; }

li {
  padding: 10px 12px;
  border-bottom: 1px solid #1a1a1a;
  border-radius: 8px;
  margin-bottom: 4px;
}

li:hover { background: #1a1a1a; }
li:last-child { border-bottom: none; margin-bottom: 0; }

a { color: #ffb3c6; text-decoration: none; }
a:hover { color: #fff; }

.project {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.project-desc { font-size: 13px; color: #888; }

.contact-item { display: flex; gap: 15px; }
.contact-label { min-width: 80px; color: #888; }

#ascii-bg {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: -1;
  font-size: 5px;
  line-height: 5px;
  color: #ffb3c6;
  opacity: 0.4;
  white-space: pre;
  pointer-events: none;
}
`;

export const navScript = `
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.nav-slider');
  const links = document.querySelectorAll('.nav-link');

  const moveSlider = (link) => {
    slider.style.width = link.offsetWidth + 'px';
    slider.style.transform = \`translateX(\${link.offsetLeft - 4}px)\`;
  };

  moveSlider(document.querySelector('.nav-link.active'));

  links.forEach((link) => {
    link.addEventListener('click', () => {
      links.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
      moveSlider(link);
    });
  });
});
`;

export const asciiScript = `
fetch('/api/neko').then(r => r.json()).then(data => {
  if (!data[0]?.url) return;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 120;
    const height = Math.floor(120 * img.height / img.width * 0.5);
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    const pixels = ctx.getImageData(0, 0, width, height).data;
    const chars = ' .:-=+*#%@';
    let output = '';
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const brightness = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
        output += chars[Math.floor(brightness / 255 * (chars.length - 1))];
      }
      output += '\\n';
    }
    document.getElementById('ascii-bg').textContent = output;
  };
  img.src = data[0].url;
}).catch(() => {});
`;
