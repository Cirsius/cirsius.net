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

  </style>
</head>
<body>
  <div id="ascii-bg"></div>
  <div class="container">
    ${content}
  </div>
  <script>
    fetch('/api/neko').then(r => r.json()).then(data => {
      if (!data[0]?.url) return
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const c = document.createElement('canvas')
        const ctx = c.getContext('2d')
        const w = 120, h = Math.floor(120 * img.height / img.width * 0.5)
        c.width = w; c.height = h
        ctx.drawImage(img, 0, 0, w, h)
        const px = ctx.getImageData(0, 0, w, h).data
        const chars = ' .:-=+*#%@'
        let out = ''
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4
            const b = (px[i] + px[i+1] + px[i+2]) / 3
            out += chars[Math.floor(b / 255 * (chars.length - 1))]
          }
          out += '\\n'
        }
        document.getElementById('ascii-bg').textContent = out
      }
      img.src = data[0].url
    }).catch(() => {})
  </script>
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

app.get('/api/neko', async (c) => {
  try {
    const res = await fetch('https://api.nekosapi.com/v4/images/random?rating=safe&limit=1')
    return c.json(await res.json())
  } catch { return c.json([]) }
})

const port = 8008
console.log(`running on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch
}