export interface LetterVariant {
	id: string;
	filename?: string;
	path?: string;
	url?: string;
	location?: string;
	width?: number;
	height?: number;
}

export interface LetterEntry {
	character: string;
	variants: LetterVariant[];
}

export interface LetterDataset {
	[character: string]: LetterVariant[];
}

export interface CaptureResponse {
	success: boolean;
	text: string;
	imagePath: string;
	letters: string[];
	variantSeed: string;
}

export interface ApiError {
	success: false;
	error: string;
}

export interface RenderOptions {
	width: number;
	height: number;
	backgroundColor: string;
}

export interface GalleryImage {
	id: string;
	name: string;
	url: string;
	downloadPath: string;
}
