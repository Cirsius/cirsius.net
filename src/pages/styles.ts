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
  transition: background 0.2s ease;
}

li:hover { background: #1a1a1a; }
li:last-child { border-bottom: none; margin-bottom: 0; }

a { color: #ffb3c6; text-decoration: none; transition: color 0.2s ease; }
a:hover { color: #fff; }

.project {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.project-desc { font-size: 13px; color: #888; transition: color 0.2s ease; }
li:hover .project-desc { color: #aaa; }

.contact-item { display: flex; gap: 15px; }
.contact-label { min-width: 80px; color: #888; transition: color 0.2s ease; }
li:hover .contact-label { color: #aaa; }

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

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #888;
  text-decoration: none;
}

.back-link:hover { color: #ffb3c6; }

.status-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.status-indicator-wrapper { position: relative; }

.status-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.status-indicator.online { background: #4ade80; }
.status-indicator.offline { background: #f87171; }

.status-text {
  font-weight: bold;
  font-size: 14px;
  transition: color 0.3s;
}

.status-text.online { color: #4ade80; }
.status-text.offline { color: #f87171; }

.stat-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.stat-item { flex: 1; }

.stat-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 12px;
  font-weight: bold;
  color: #888;
}

.stat-value {
  font-size: 12px;
  font-weight: bold;
}

.stat-value.cpu { color: #fb923c; }
.stat-value.ram { color: #facc15; }

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-fill.cpu { background: #fb923c; }
.progress-fill.ram { background: #facc15; }

.stat-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 12px;
}

.stat-card-label {
  font-size: 11px;
  font-weight: bold;
  color: #888;
  margin-bottom: 4px;
}

.stat-card-value {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.uptime-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 12px;
}

.uptime-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.uptime-icon { fill: #888; }

.uptime-label {
  font-size: 11px;
  font-weight: bold;
  color: #888;
  text-transform: uppercase;
}

.uptime-value {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 4px;
}

.uptime-total {
  font-size: 12px;
  color: #888;
}

.uptime-total span { color: #ccc; }

.music-controls {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 100;
  display: flex;
  gap: 8px;
}

.music-btn {
  background: #111;
  border: 1px solid #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888;
  transition: color 0.2s, border-color 0.2s;
}

.music-btn:hover {
  color: #ffb3c6;
  border-color: #ffb3c6;
}

.music-btn.playing {
  color: #ffb3c6;
  border-color: #ffb3c6;
}

@media (max-width: 500px) {
  body { padding: 12px; }
  .container { padding: 16px; border-radius: 12px; }
  .header { padding-bottom: 14px; margin-bottom: 20px; }
  h1 { font-size: 22px; }
  .nav {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .nav::-webkit-scrollbar { display: none; }
  .nav-link { padding: 6px 12px; font-size: 13px; white-space: nowrap; }
  .section { padding: 14px; }
  .project { flex-direction: column; align-items: flex-start; gap: 4px; }
  .stat-row { grid-template-columns: 1fr; }
  .stat-cards { grid-template-columns: 1fr; }
  .music-controls { bottom: 12px; left: 12px; }
  .music-btn { width: 36px; height: 36px; }
}
`;

