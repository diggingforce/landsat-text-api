import { Hono } from "hono";
import type { CaptureResponse } from "../types/index.ts";
import { load_dataset } from "../utils/dataset.ts";
import { render_name_image } from "../utils/renderer.ts";

export const capture = new Hono();

capture.get("/capture", async (c) => {
	const text = c.req.query("text") ?? "";
	try {
		return c.json(await to_json(text));
	} catch (err) {
		console.error("capture error:", err);
		return c.json({ success: false, error: "failed" }, 500);
	}
});

capture.get("/capture.png", async (c) => {
	const text = c.req.query("text") ?? "";
	try {
		const { img_buf } = await to_png(text);
		return new Response(img_buf as unknown as BodyInit, {
			headers: { "Content-Type": "image/png" },
		});
	} catch {
		return new Response("error", { status: 500 });
	}
});

capture.post("/capture", async (c) => {
	let body: { text: string } | null = null;
	try {
		body = await c.req.json<{ text: string }>();
	} catch {
		return c.json({ success: false, error: "bad json" }, 400);
	}
	return c.json(await to_json(body?.text ?? ""));
});

async function to_json(text: string): Promise<CaptureResponse> {
	const upper = text.trim().toUpperCase();
	const letters = upper.replace(/[^A-Z]/g, "").split("");
	return {
		success: true,
		text: upper,
		imagePath: `/api/capture.png?text=${encodeURIComponent(upper)}`,
		letters,
		variantSeed: upper,
	};
}

async function to_png(text: string) {
	const upper = text.trim().toUpperCase();
	const dataset = await load_dataset();

	const variants = new Map<string, any[]>();
	for (const [char, letter_vars] of Object.entries(dataset)) {
		variants.set(char, letter_vars);
	}

	const img_buf = await render_name_image({ text: upper, variants });
	return { img_buf };
}
