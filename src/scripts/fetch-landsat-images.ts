import { writeFile } from "fs/promises";
import { resolve } from "path";

const data_dir = resolve(process.cwd(), "data");
const letters_json = resolve(data_dir, "letters.json");

interface LetterImage {
	letter: string;
	variantIndex: number;
	url: string;
	location: string;
}

const landsat_imgs: LetterImage[] = [
	{
		letter: "a",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/a-0-hickman-Kentucky.png?w=600",
		location: "Hickman, Kentucky",
	},
	{
		letter: "a",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/a-1-FarmIsland-Maine.png?w=600",
		location: "Farm Island, Maine",
	},
	{
		letter: "a",
		variantIndex: 2,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/a-2-guakhmaz-azerbaijan.png?w=600",
		location: "Lake Guakhmaz, Azerbaijan",
	},
	{
		letter: "a",
		variantIndex: 3,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/a-3-YukonDelta-Alaska.png?w=600",
		location: "Yukon Delta, Alaska",
	},
	{
		letter: "a",
		variantIndex: 4,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/a-4-Lake-Mjøsa-Norway.png?w=600",
		location: "Lake Mjøsa, Norway",
	},
	{
		letter: "b",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/b-0-HollaBend-Arkansas.png?w=600",
		location: "Holla Bend, Arkansas",
	},
	{
		letter: "b",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/b-1-Humaitá-Brazil.png?w=600",
		location: "Humaitá, Brazil",
	},
	{
		letter: "c",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/c-0-BlackRockDesert-Nevada.png?w=600",
		location: "Black Rock Desert, Nevada",
	},
	{
		letter: "c",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/c-1-DeceptionIsland-Antarctica.png?w=600",
		location: "Deception Island, Antarctica",
	},
	{
		letter: "c",
		variantIndex: 2,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/c-2-FalseRiver-Louisiana.png?w=600",
		location: "False River, Louisiana",
	},
	{
		letter: "d",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/d-0-AkimiskiIsland-Canada.png?w=600",
		location: "Akimiski Island, Canada",
	},
	{
		letter: "d",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/d-1-LakeTandou-Australia.png?w=600",
		location: "Lake Tandou, Australia",
	},
	{
		letter: "e",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/e-0-FirnfilledFjords-Tibet.png?w=600",
		location: "Tibet",
	},
	{
		letter: "e",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/e-1-SeaofOkhotsk.png?w=600",
		location: "Sea of Okhotsk",
	},
	{
		letter: "e",
		variantIndex: 2,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/e-2-BellonaPlateau.png?w=600",
		location: "Bellona Plateau",
	},
	{
		letter: "e",
		variantIndex: 3,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/e-3-breiðamerkurjökull-iceland.png?w=600",
		location: "Breiðamerkurjökull, Iceland",
	},
	{
		letter: "f",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/f-0-MatoGrosso-Brazil.png?w=600",
		location: "Mato Grosso, Brazil",
	},
	{
		letter: "f",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/f-1-KrugerNationalPark-SouthAfrica.png?w=600",
		location: "Kruger National Park, South Africa",
	},
	{
		letter: "g",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/g-0-FonteBoa-Amazonas.png?w=600",
		location: "Fonte Boa, Amazonas",
	},
	{
		letter: "h",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/h-0-southwestern-kyrgystan.png?w=600",
		location: "Southwestern Kyrgyzstan",
	},
	{
		letter: "h",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/h-1-khorinsky-district-russia.png?w=600",
		location: "Khorinsky District, Russia",
	},
	{
		letter: "i",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/i-0-Borgarbyggð-Iceland.png?w=600",
		location: "Borgarbyggð, Iceland",
	},
	{
		letter: "i",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/i-1-Canandaigua-Lake-NewYork.png?w=600",
		location: "Canandaigua Lake, New York",
	},
	{
		letter: "i",
		variantIndex: 2,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/i-2-EtoshaNationalPark-Namibia.png?w=600",
		location: "Etosha National Park, Namibia",
	},
	{
		letter: "i",
		variantIndex: 3,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/i-3-djebelOuarkziz-morocco.png?w=600",
		location: "Djebel Ouarkziz, Morocco",
	},
	{
		letter: "i",
		variantIndex: 4,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/i-4-HoluhraunIceField-iceland.png?w=600",
		location: "Holuhraun Ice Field, Iceland",
	},
	{
		letter: "j",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/j-0-GreatBarrierReef.png?w=600",
		location: "Great Barrier Reef",
	},
	{
		letter: "j",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/j-1-KarakayaDam-Turkey.png?w=600",
		location: "Karakaya Dam, Turkey",
	},
	{
		letter: "j",
		variantIndex: 2,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/j-2-LakeSuperior-NorthAmerica.png?w=600",
		location: "Lake Superior, North America",
	},
	{
		letter: "k",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/k-0-SirmilikNationalPark-Canada.png?w=600",
		location: "Sirmilik National Park, Canada",
	},
	{
		letter: "k",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/k-1-Golmund-China.png?w=600",
		location: "Golmud, China",
	},
	{
		letter: "l",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/l-0-Nusantara-Indonesia.png?w=600",
		location: "Nusantara, Indonesia",
	},
	{
		letter: "l",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/l-1-Xinjiang-China.png?w=600",
		location: "Xinjiang, China",
	},
	{
		letter: "l",
		variantIndex: 2,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/l-2-ReginaSaskatchewan-Canada.png?w=600",
		location: "Regina, Saskatchewan, Canada",
	},
	{
		letter: "l",
		variantIndex: 3,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/l-3-ReginaSaskatchewan-Canada.png?w=600",
		location: "Regina, Saskatchewan, Canada",
	},
	{
		letter: "m",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/m-0-ShenandoahRiver-Virginia.png?w=600",
		location: "Shenandoah River, Virginia",
	},
	{
		letter: "m",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/m-1-PotomacRiver.png?w=600",
		location: "Potomac River",
	},
	{
		letter: "m",
		variantIndex: 2,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/m-2-TianShanMountains-Kyrgyzstan.png?w=600",
		location: "Tian Shan Mountains, Kyrgyzstan",
	},
	{
		letter: "n",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/n-0-YapacaniBolivia.png?w=600",
		location: "Yapacaní River, Bolivia",
	},
	{
		letter: "n",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/n-1-YapacaniBolivia.png?w=600",
		location: "Yapacaní River, Bolivia",
	},
	{
		letter: "n",
		variantIndex: 2,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/n-2-SãoMigueldoAraguaia-Brazil.png?w=600",
		location: "São Miguel do Araguaia, Brazil",
	},
	{
		letter: "o",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/o-0-CraterLake-Oregon.png?w=600",
		location: "Crater Lake, Oregon",
	},
	{
		letter: "o",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/o-1-ManicouaganReservoir.png?w=600",
		location: "Manicouagan Reservoir, Canada",
	},
	{
		letter: "p",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/p-0-MackenzieRiverDelta-Canada.png?w=600",
		location: "Mackenzie River Delta, Canada",
	},
	{
		letter: "p",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/p-1-RiberaltaBolivia.png?w=600",
		location: "Riberalta, Bolivia",
	},
	{
		letter: "q",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/q-0-LonarCrater-India.png?w=600",
		location: "Lonar Crater, India",
	},
	{
		letter: "q",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/q-1-MountTambora-Indonesia.png?w=600",
		location: "Mount Tambora, Indonesia",
	},
	{
		letter: "r",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/r-0-LagoMenendez-Argentina.png?w=600",
		location: "Lago Menendez, Argentina",
	},
	{
		letter: "r",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/r-1-ProvinceofSondrio-Italy.png?w=600",
		location: "Province of Sondrio, Italy",
	},
	{
		letter: "r",
		variantIndex: 2,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/r-2-florida-keys.png?w=600",
		location: "Florida Keys",
	},
	{
		letter: "r",
		variantIndex: 3,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/r-3-canyonlandsNationalPark-utah.png?w=600",
		location: "Canyonlands National Park, Utah",
	},
	{
		letter: "s",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/s-0-MackenzieRiver.png?w=600",
		location: "Mackenzie River, Canada",
	},
	{
		letter: "s",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/s-1-nDjamena-chad.png?w=600",
		location: "N'Djamena, Chad",
	},
	{
		letter: "s",
		variantIndex: 2,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/s-2-RioChapare-Bolivia.png?w=600",
		location: "Rio Chapare, Bolivia",
	},
	{
		letter: "t",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/t-0-Liwa-United%20Arab%20Emirates.png?w=600",
		location: "Liwa, United Arab Emirates",
	},
	{
		letter: "t",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/t-1-LenaRiverDelta.png?w=600",
		location: "Lena River Delta, Russia",
	},
	{
		letter: "u",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/u-0-CanyonlandsNationalPark-Utah.png?w=600",
		location: "Canyonlands National Park, Utah",
	},
	{
		letter: "u",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/u-1-BamforthNationalWildlifeRefuge-Wyoming.png?w=600",
		location: "Bamforth National Wildlife Refuge, Wyoming",
	},
	{
		letter: "v",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/v-0-CellinaandMedunaRivers-Italy.png?w=600",
		location: "Cellina and Meduna Rivers, Italy",
	},
	{
		letter: "v",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/v-1-NewSouthWales-Australia.png?w=600",
		location: "New South Wales, Australia",
	},
	{
		letter: "v",
		variantIndex: 2,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/v-2-PadmaRiver-Bangladesh.png?w=600",
		location: "Padma River, Bangladesh",
	},
	{
		letter: "v",
		variantIndex: 3,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/v-3-Mapleton-Maine.png?w=600",
		location: "Mapleton, Maine",
	},
	{
		letter: "w",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/w-0-PonoyRiver-Russia.png?w=600",
		location: "Ponoy River, Russia",
	},
	{
		letter: "w",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/w-1-LaPrimavera-Columbia.png?w=600",
		location: "La Primavera, Colombia",
	},
	{
		letter: "x",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/x-0-WolstenholmeFjord-Greenland.png?w=600",
		location: "Wolstenholme Fjord, Greenland",
	},
	{
		letter: "x",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/x-1-DavisStrait-Greenland.png?w=600",
		location: "Davis Strait, Greenland",
	},
	{
		letter: "x",
		variantIndex: 2,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/x-2-SermersooqMunicipality-Greenland.png?w=600",
		location: "Sermersooq Municipality, Greenland",
	},
	{
		letter: "y",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/y-0-BíobíoRiver-Chile.png?w=600",
		location: "Bíobío River, Chile",
	},
	{
		letter: "y",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/y-1-EstuariodeVirrila-Peru.png?w=600",
		location: "Estuario de Virrila, Peru",
	},
	{
		letter: "y",
		variantIndex: 2,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/y-2-tasmanGlacier-newZealand.png?w=600",
		location: "Tasman Glacier, New Zealand",
	},
	{
		letter: "z",
		variantIndex: 0,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/z-0-PrimaveradoLeste-Brazil.png?w=600",
		location: "Primavera do Leste, Brazil",
	},
	{
		letter: "z",
		variantIndex: 1,
		url: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/landsat/your-name-in-landsat-images/z-1-MohammedBoudiaf-Algeria.png?w=600",
		location: "Mohammed Boudiaf, Algeria",
	},
];

export async function build_dataset() {
	console.log("building dataset...");

	const dataset: Record<string, any[]> = {};

	for (const img of landsat_imgs) {
		const letter = img.letter.toUpperCase();
		if (!dataset[letter]) dataset[letter] = [];
		dataset[letter].push({
			id: `${img.letter}-${img.variantIndex}`,
			url: img.url,
			location: img.location,
		});
	}

	await writeFile(letters_json, JSON.stringify(dataset, null, 2));

	for (const [letter, variants] of Object.entries(dataset)) {
		console.log(`${letter}: ${variants.length}`);
	}

	console.log(`written to ${letters_json}`);
}

build_dataset().catch(console.error);
