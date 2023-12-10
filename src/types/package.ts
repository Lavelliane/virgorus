export default interface Package {
	id?: string;
	name?: string;
	description?: string;
	type?: string;
	location?: string;
	duration?: string;
	cancellation?: string;
	availability?: string;
	language?: string;
	notice?: string;
	photos?: string[];
	inclusions?: string[];
	exclusions?: string[];
	rates?: Rates[];
	itinerary?: DaySchedule[];
}

interface Rates {
	id?: number;
	numberOfPax?: string;
	ratePerPax?: string;
	packageId?: number;
}

export interface DaySchedule {
	day?: string;
	itineraries?: Itinerary[];
}

interface Itinerary {
	id: string | null | undefined;
	time?: string;
	activity?: string;
}

export type CatalogPackage = {
	id: number;
	name: string;
	description: string;
	type: string;
	location: string;
	rate: string;
	photos: string[];
};
