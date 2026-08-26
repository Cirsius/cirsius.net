import type { FunctionalComponent, ComponentChildren } from "preact"
import { readFileSync } from "fs"
import { css } from "./styles"

const navScript = readFileSync("src/pages/scripts/nav.js", "utf-8")
const asciiScript = readFileSync("src/pages/scripts/ascii.js", "utf-8")
const musicScript = readFileSync("src/pages/scripts/music.js", "utf-8")

type FC<T = {}> = FunctionalComponent<T & { children?: ComponentChildren }>

const Layout: FC = ({ children }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>cirsius</title>
      <link rel="icon" type="image/x-icon" href="/api/avatar"/>
      <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      <style dangerouslySetInnerHTML={{ __html: css }}></style>
    </head>
    <body>
      <div id="ascii-bg" />
      <audio id="bg-music" preload="auto" />
      <div class="music-controls">
        <button id="music-toggle" class="music-btn" title="toggle music">
          <svg id="music-icon-off" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
          <svg id="music-icon-on" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </button>
        <button id="music-shuffle" class="music-btn" title="shuffle">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
            <line x1="4" y1="4" x2="9" y2="9" />
          </svg>
        </button>
      </div>
      <div class="container">
        {children}
      </div>
      <script dangerouslySetInnerHTML={{ __html: asciiScript }}></script>
      <script dangerouslySetInnerHTML={{ __html: musicScript }}></script>
    </body>
  </html>
)

const Nav: FC = () => (
  <>
    <nav class="nav">
      <div class="nav-slider" />
      <span class="nav-link active" hx-get="/about" hx-target="#content" hx-swap="innerHTML">about</span>
      <span class="nav-link" hx-get="/projects" hx-target="#content" hx-swap="innerHTML">projects</span>
      <span class="nav-link" hx-get="/contact" hx-target="#content" hx-swap="innerHTML">contact</span>
    </nav>
    <script dangerouslySetInnerHTML={{ __html: navScript }}></script>
  </>
)

const Section: FC<{ title: string }> = ({ title, children }) => (
  <div class="section">
    <div class="section-title">{title}</div>
    {children}
  </div>
)

export const About: FC = () => (
  <Section title="about">
    <p>
      i run <a href="https://tuff.ws" target="_blank">mc server</a> and <a href="https://degloved.net" target="_blank">ubg site.</a> l sysadmin but w speed. ❤︎⁠ steins;gate and psychological anime.
    </p>
  </Section>
)

export const Projects: FC = () => (
  <Section title="projects">
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
  </Section>
)

export const Contact: FC = () => (
  <Section title="contact">
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
  </Section>
)

export const Home: FC = () => (
  <Layout>
    <div class="header">
      <img src="/api/avatar" alt="pfp" class="avatar" />
      <h1>cirsius</h1>
      <p class="tagline">jav/js dev</p>
    </div>
    <Nav />
    <div id="content" class="content">
      <About />
    </div>
  </Layout>
)

