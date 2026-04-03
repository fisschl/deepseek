import { Hono } from "hono";
import { api } from "./api";
import { logger } from "hono/logger";

export const routes = new Hono().use(logger()).route("/api", api);
