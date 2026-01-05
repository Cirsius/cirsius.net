import { styles, asciiScript } from "./styles";
import { aboutContent } from "./content";

export const html = (content: string): string => `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>cirsius</title>
  <script src="https://unpkg.com/htmx.org@1.9.10"></script>
  ${styles}
</head>
<body>
  <div id="ascii-bg"></div>
  <div class="container">
    ${content}
  </div>
  ${asciiScript}
</body>
</html>`;

export const homeContent = `
<div class="header">
  <h1>cirsius</h1>
  <p class="tagline">jav/js dev</p>
</div>

<nav class="nav">
  <span class="nav-link" hx-get="/about" hx-target="#content" hx-swap="innerHTML">about</span>
  <span class="nav-link" hx-get="/projects" hx-target="#content" hx-swap="innerHTML">projects</span>
  <span class="nav-link" hx-get="/contact" hx-target="#content" hx-swap="innerHTML">contact</span>
</nav>

<div id="content" class="content">
  ${aboutContent}
</div>
`;
