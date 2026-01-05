import { Hono } from "hono";
import {
  html,
  homeContent,
  aboutContent,
  projectsContent,
  contactContent,
} from "./pages";

const app = new Hono();

app.get("/", (c) => {
  return c.html(html(homeContent));
});

app.get("/about", (c) => {
  return c.html(aboutContent);
});

app.get("/projects", (c) => {
  return c.html(projectsContent);
});

app.get("/contact", (c) => {
  return c.html(contactContent);
});

app.get("/api/neko", async (c) => {
  try {
    const res = await fetch(
      "https://api.nekosapi.com/v4/images/random?rating=safe&limit=1"
    );
    return c.json(await res.json());
  } catch {
    return c.json([]);
  }
});

const port = 8008;

export default {
  port,
  fetch: app.fetch,
};
