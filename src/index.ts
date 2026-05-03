import { Hono } from "hono";
import { cors } from "hono/cors";
import { cache } from "./scripts/cache-landsat-images.ts"
import { build_dataset } from "./scripts/fetch-landsat-images.ts"
import { capture } from "./routes/capture.ts";
import { health } from "./routes/health.ts";

const app = new Hono();

app.use("*", cors());

app.route("/api", capture);
app.route("/api/health", health);

app.notFound((c) => c.json({ error: "not found" }, 404));

const port = parseInt(process.env.PORT || "3000");

await build_dataset
await cache() 

console.log(`running on :${port}`);

export default { port, fetch: app.fetch, idleTimeout: 60 };
