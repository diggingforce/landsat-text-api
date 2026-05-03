import { existsSync } from "fs";
import { Hono } from "hono";
import { get_dataset_path } from "../utils/dataset.ts";

export const health = new Hono();

health.get("/", async (c) => {
	const exists = existsSync(get_dataset_path());
	return c.json({
		status: exists ? "ok" : "degraded",
		dataset: exists ? "available" : "missing",
		timestamp: new Date().toISOString(),
	});
});
