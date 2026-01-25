import { Hono } from "hono";
import render from "preact-render-to-string";
import { Home, About, Projects, Contact } from "./pages";

const app = new Hono();

app.get("/", (c) => c.html(render(<Home />)));
app.get("/about", (c) => c.html(render(<About />)));
app.get("/projects", (c) => c.html(render(<Projects />)));
app.get("/contact", (c) => c.html(render(<Contact />)));

app.get("/api/neko", async (c) => {
  try {
    const res = await fetch("https://api.nekosapi.com/v4/images/random?rating=safe&limit=1");
    return c.json(await res.json());
  } catch {
    return c.json([]);
  }
});

export default {
  port: 8008,
  fetch: app.fetch,
};
