import type { FC, PropsWithChildren } from "hono/jsx"
import { readFileSync } from "fs"
import { css } from "./styles"

const navScript = readFileSync("src/pages/scripts/nav.js", "utf-8")
const asciiScript = readFileSync("src/pages/scripts/ascii.js", "utf-8")
const projectsScript = readFileSync("src/pages/scripts/projects.js", "utf-8")

const Layout: FC = ({ children }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>cirsius</title>
      <link rel="icon" type="image/x-icon" href="/api/avatar"/>
      <style dangerouslySetInnerHTML={{ __html: css }}></style>
    </head>
    <body>
      <div id="ascii-bg" />
      <div class="container">
        {children}
      </div>
      <script dangerouslySetInnerHTML={{ __html: asciiScript }}></script>
    </body>
  </html>
)

const Nav: FC = () => (
  <>
    <nav class="nav">
      <div class="nav-slider" />
      <button type="button" class="nav-link active" data-page="about">about</button>
      <button type="button" class="nav-link" data-page="projects">projects</button>
      <button type="button" class="nav-link" data-page="contact">contact</button>
    </nav>
    <script dangerouslySetInnerHTML={{ __html: navScript }}></script>
  </>
)

const Section: FC<PropsWithChildren<{ title: string }>> = ({ title, children }) => (
  <div class="section">
    <div class="section-title">{title}</div>
    {children}
  </div>
)

const About: FC = () => (
  <Section title="about">
    <p>
      i run <a href="https://tuff.ws" target="_blank">mc server</a> and <a href="https://degloved.net" target="_blank">ubg site.</a> l sysadmin but w speed. ❤︎⁠ steins;gate and psychological anime.
    </p>
  </Section>
)

const Projects: FC = () => (
  <div class="section projects-section">
    <div class="section-title">projects</div>
    <ul id="projects-list">
      <li>loading repos...</li>
    </ul>
    <script dangerouslySetInnerHTML={{ __html: projectsScript }}></script>
  </div>
)

const Contact: FC = () => (
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
    <div class="masthead">
      <div class="header">
        <h1>cirsius</h1>
        <p class="tagline">jav/js dev</p>
      </div>
      <img src="/api/avatar" alt="pfp" class="avatar" />
      <Nav />
    </div>
    <div id="content" class="content">
      <div data-page-content="about"><About /></div>
      <div data-page-content="projects" hidden><Projects /></div>
      <div data-page-content="contact" hidden><Contact /></div>
    </div>
  </Layout>
)
