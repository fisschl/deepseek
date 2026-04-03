import { Hono } from "hono";
import { api } from "./api";

export const routes = new Hono().route("/api", api);
