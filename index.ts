import { Hono } from "hono";
import { logger } from "hono/logger";
import { chat } from "./routes/chat";

const app = new Hono().use(logger()).route("/api/chat", chat);

export default {
  port: 3020,
  fetch: app.fetch,
};
