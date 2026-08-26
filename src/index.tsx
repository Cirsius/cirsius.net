import { Hono } from "hono"
import render from "preact-render-to-string"
import { Home, About, Projects, Contact } from "./pages"
const app = new Hono()

app.get("/", (c) => c.html(render(<Home />)))
app.get("/about", (c) => c.html(render(<About />)))
app.get("/projects", (c) => c.html(render(<Projects />)))
app.get("/contact", (c) => c.html(render(<Contact />)))

import { readdir } from "fs/promises"

app.get("/music/:file", async (c) => {
  const name = c.req.param("file")
  if (!name.endsWith(".mp3")) return new Response("not found", { status: 404 })
  const file = Bun.file(`./public/music/${name}`)
  if (!(await file.exists())) return new Response("not found", { status: 404 })
  return new Response(file, { headers: { "Content-Type": "audio/mpeg" } })
})

app.get("/api/music", async (c) => {
  try {
    const files = await readdir("./public/music")
    const tracks = files.filter((f) => f.endsWith(".mp3")).map((f) => `/music/${f}`)
    return c.json(tracks)
  } catch {
    return c.json([])
  }
})

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
