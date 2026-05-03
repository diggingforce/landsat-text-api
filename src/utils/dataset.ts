import { readFile } from "fs/promises";
import { resolve } from "path";
import type { LetterDataset, LetterVariant } from "../types/index.ts";

const data_dir = resolve(process.cwd(), "data");
const letters_json = "letters.json";

export async function load_dataset(): Promise<LetterDataset> {
	const p = resolve(data_dir, letters_json);
	const content = await readFile(p, "utf-8").catch((err) => {
		throw new Error(`can't load dataset: ${err?.message}`);
	});
	return JSON.parse(content);
}

export function select_letter_variant(
	variants: LetterVariant[],
	seed: string,
): LetterVariant {
	if (!variants.length) throw new Error("no variants");
	if (variants.length === 1) return variants[0];
	return variants[hash_it(seed) % variants.length];
}

function hash_it(str: string): number {
	let h = 0;
	for (let i = 0; i < str.length; i++) {
		h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
	}
	return Math.abs(h);
}

export const get_dataset_path = () => resolve(data_dir, letters_json);
export const get_dataset_dir = () => data_dir;
