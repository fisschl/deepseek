import { Hono } from "hono";
import { chat } from "./chat";

export const api = new Hono().route("/chat", chat);
