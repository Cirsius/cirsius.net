window.refreshAscii = function() {
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
        output += '\n';
      }
      document.getElementById('ascii-bg').textContent = output;
    };
    img.src = data[0].url;
  }).catch(() => {});
};
window.refreshAscii();
