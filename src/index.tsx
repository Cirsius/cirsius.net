import { Hono } from "hono"
import { Home } from "./pages"
const app = new Hono()

type GitHubRepo = {
  name: string
  html_url: string
  description: string | null
}

app.get("/", (c) => c.html(<Home />))

let avatar = { url: "", at: 0 }

app.get("/api/avatar", async (c) => {
  if (avatar.url && Date.now() - avatar.at < 3600000) return c.redirect(avatar.url)
  try {
    const res = await fetch("https://discord.com/api/v10/users/647943341865959457", {
      headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
    })
    const user = await res.json() as any
    if (!user?.avatar) return new Response("not found", { status: 404 })
    avatar = { url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`, at: Date.now() }
    return c.redirect(avatar.url)
  } catch {
    return new Response("error", { status: 500 })
  }
})

app.get("/api/projects", async (c) => {
  try {
    const res = await fetch("https://api.github.com/users/Cirsius/repos?per_page=100&sort=pushed")
    if (!res.ok) return c.json([], 500)

    const repos = await res.json() as GitHubRepo[]
    return c.json(repos.map(({ name, html_url, description }) => ({ name, url: html_url, description })))
  } catch {
    return c.json([], 500)
  }
})

app.get("/api/neko", async (c) => {
  try {
    const res = await fetch("https://api.nekosapi.com/v4/images/random?rating=safe&limit=1")
    return c.json(await res.json())
  } catch {
    return c.json([])
  }
})

const server = Bun.serve({
  port: 8008,
  fetch: app.fetch,
})

console.log(`running on ${server.port}`)
