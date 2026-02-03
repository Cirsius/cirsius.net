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
