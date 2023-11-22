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
<<<<<<< HEAD
	photos?: File[];
=======
	photos?: string[];
>>>>>>> 17684d9126b7af02c1663c8f917dfb56ebd54129
	inclusions?: string[];
	exclusions?: string[];
	rates?: Rates[];
}

interface Rates {
	id?: number;
	numberOfPax?: string;
	ratePerPax?: string;
	packageId?: number;
}

export type CatalogPackage = {
	id: number;
	name: string;
	description: string;
	type: string;
	rate: string;
	photos: string[];
};
