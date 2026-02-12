import { Hono } from "hono"
import render from "preact-render-to-string"
import { Home, About, Projects, Contact, Status } from "./pages"
import { getData, handleConnect, handleDisconnect, addPoint, startWorker } from "./computer"

const pass = process.env.PASS
const app = new Hono()

app.get("/", (c) => c.html(render(<Home />)))
app.get("/about", (c) => c.html(render(<About />)))
app.get("/projects", (c) => c.html(render(<Projects />)))
app.get("/contact", (c) => c.html(render(<Contact />)))
app.get("/status", (c) => c.html(render(<Status />)))

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

app.get("/api/puter", (c) => c.json(getData()))

startWorker()

const server = Bun.serve<{ authorized: boolean }>({
  port: 8008,
  fetch(req, server) {
    const url = new URL(req.url)

    if (url.pathname === "/api/puter/ws") {
      const auth = url.searchParams.get("auth")
      if (auth !== pass) return new Response("unauthorized", { status: 401 })

      const upgraded = server.upgrade(req, { data: { authorized: true } })
      if (upgraded) return undefined
      return new Response("upgrade failed", { status: 500 })
    }

    return app.fetch(req, server)
  },
  websocket: {
    open() { handleConnect() },
    message(ws, msg) {
      const text = typeof msg === "string" ? msg : msg.toString()

      if (text === "ping") {
        ws.send("pong")
        return
      }

      try {
        const data = JSON.parse(text)
        if (typeof data.cpu === "number" && typeof data.ram === "number") {
          addPoint(data.cpu, data.ram)
        }
      } catch { }
    },
    close() { handleDisconnect() },
  },
})

console.log(`running on ${server.port}`)
