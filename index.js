const { Hono } = require('hono')

const app = new Hono()

const html = (content) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>cirsius</title>
  <script src="https://unpkg.com/htmx.org@1.9.10"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: monospace;
      background: #0a0a0a;
      color: #ccc;
      min-height: 100vh;
      padding: 40px;
      line-height: 1.6;
    }

    .container {
      max-width: 700px;
      margin: 0 auto;
      border: 1px solid #ffb3c6;
      padding: 30px;
    }

    .header {
      border-bottom: 1px solid #ffb3c6;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }

    h1 {
      font-weight: normal;
      font-size: 24px;
      margin-bottom: 10px;
      color: #ffb3c6;
    }

    .tagline, .section-title { font-size: 14px; }
    .section-title { margin-bottom: 15px; text-transform: lowercase; }

    .section {
      border: 1px solid #333;
      padding: 20px;
      margin-bottom: 20px;
    }

    .nav { display: flex; gap: 20px; margin-bottom: 30px; }

    .nav-link {
      color: #ccc;
      text-decoration: none;
      cursor: pointer;
      padding: 5px 0;
      border-bottom: 1px solid transparent;
    }

    .nav-link:hover, a:hover { color: #ffb3c6; }
    .nav-link:hover { border-bottom-color: #ffb3c6; }

    .content { min-height: 200px; }

    ul { list-style: none; }
    li { padding: 8px 0; border-bottom: 1px solid #1a1a1a; }
    li:last-child { border-bottom: none; }

    a { color: #ffb3c6; text-decoration: none; }

    .project { display: flex; justify-content: space-between; align-items: center; }
    .project-name { color: #ffb3c6; }
    .project-desc { font-size: 13px; }

    .contact-item { display: flex; gap: 15px; }
    .contact-label { min-width: 80px; }
  </style>
</head>
<body>
  <div class="container">
    ${content}
  </div>
</body>
</html>`
const aboutContent = `
<div class="section">
  <div class="section-title">about</div>
  <p>
    i run <a href="https://tuff.ws" target="_blank">mc server</a> and <a href="https://degloved.net" target="_blank">ubg site</a>
  </p>
</div>
`

const projectsContent = `
<div class="section">
  <div class="section-title">projects</div>
  <ul>
    <li>
      <div class="project">
        <span class="project-name"><a href="https://github.com/cirsius/wispbot" target="_blank">wispbot</a></span>
        <span class="project-desc">discord bot for wisp server registry</span>
      </div>
    </li>
    <li>
      <div class="project">
        <span class="project-name"><a href="https://github.com/cirsius/wispmotd" target="_blank">wispmotd</a></span>
        <span class="project-desc">queries mc servers through wisp proxies</span>
      </div>
    </li>
  </ul>
</div>
`

const contactContent = `
<div class="section">
  <div class="section-title">contact</div>
  <ul>
    <li>
      <div class="contact-item">
        <span class="contact-label">github</span>
        <a href="https://github.com/cirsius" target="_blank">github.com/cirsius</a>
      </div>
    </li>
    <li>
      <div class="contact-item">
        <span class="contact-label">discord</span>
        <span><a href="https://discord.com/users/647943341865959457" target="_blank">cirsius</a></span>
      </div>
    </li>
  </ul>
</div>
`

const homeContent = `
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
`

app.get('/', (c) => {
    return c.html(html(homeContent))
})

app.get('/about', (c) => {
    return c.html(aboutContent)
})

app.get('/projects', (c) => {
    return c.html(projectsContent)
})

app.get('/contact', (c) => {
    return c.html(contactContent)
})

const port = 8008
console.log(`running on http://localhost:${port}`)

export default {
    port,
    fetch: app.fetch
}