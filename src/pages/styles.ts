export const css = `
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: monospace;
  background: #000;
  color: #ffe4ec;
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
}

.masthead {
  position: relative;
}

.header {
  position: relative;
  padding-bottom: 20px;
  margin-bottom: 30px;
}

.avatar {
  position: absolute;
  top: 0;
  right: 0;
  width: 190px;
  height: 190px;
  border-radius: 50%;
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
  border: 1px solid #ffb3c655;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.nav {
  --gap: 6px;
  --radius: 16px;
  --speed: 0.55s;
  --ease: cubic-bezier(0.22, 0.9, 0.25, 1);

  display: inline-grid;
  grid-auto-flow: column;
  margin-bottom: 30px;
  position: relative;
  background: #000;
  border: 1px solid #ffb3c655;
  border-radius: var(--radius);
  padding: var(--gap);
  width: fit-content;
  overflow: hidden;
}

.nav-slider {
  position: absolute;
  inset: var(--gap) auto var(--gap) var(--gap);
  background: #ffb3c6;
  border-radius: calc(var(--radius) - 4px);
  z-index: 1;
  transition:
    transform var(--speed) var(--ease),
    width var(--speed) var(--ease),
    background 0.3s ease;
}

.nav-slider::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.32),
    inset 0 -1px 2px rgba(0, 0, 0, 0.6);
}

.nav-link {
  color: #d98aa0;
  font-family: inherit;
  text-decoration: none;
  cursor: pointer;
  padding: 12px 28px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-radius: calc(var(--radius) - 4px);
  position: relative;
  z-index: 1;
  white-space: nowrap;
  border: 0;
  background: transparent;
  transition: color 0.35s ease, transform 0.2s ease;
}

.nav-link:active { transform: scale(0.97); }
.nav-link.active { color: #000; }
.nav-link:hover:not(.active) { color: #ffe4ec; }

.content { min-height: 200px; }

ul { list-style: none; }

li {
  padding: 10px 12px;
  border: 1px solid #ffb3c633;
  border-radius: 8px;
  margin-bottom: 4px;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

li:hover { border-color: #ffb3c6; box-shadow: 3px 3px 0 #ffb3c633; transform: translate(-1px, -1px); }
li:last-child { margin-bottom: 0; }

a { color: #ffb3c6; text-decoration: none; transition: color 0.2s ease; }
a:hover { color: #ffe4ec; }

.project {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.project-desc { font-size: 13px; color: #d98aa0; transition: color 0.2s ease; }
li:hover .project-desc { color: #ffe4ec; }

.contact-item { display: flex; gap: 15px; }
.contact-label { min-width: 80px; color: #d98aa0; transition: color 0.2s ease; }
li:hover .contact-label { color: #ffe4ec; }

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
  color: #d98aa0;
  text-decoration: none;
}

.back-link:hover { color: #ffb3c6; }

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
  .avatar { right: 8px; width: 96px; height: 96px; }
}

@media (min-width: 501px) {
  .masthead {
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr);
    grid-template-rows: auto auto;
    margin-bottom: 30px;
  }

  .header {
    grid-column: 1;
    grid-row: 1;
  }

  .masthead .nav {
    grid-column: 1;
    grid-row: 2;
    margin-bottom: 0;
  }

  .avatar {
    position: static;
    grid-column: 2;
    grid-row: 1 / span 2;
    justify-self: center;
    align-self: start;
  }
}

@media (min-width: 1800px) {
  .container { zoom: 1.25; }
}

@media (min-width: 2200px) {
  .container { zoom: 1.4; }
}
`;
