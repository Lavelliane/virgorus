export default interface Package {
	id: number;
	name: string;
	description: string;
	type: string;
	location: string;
	duration: string;
	cancellation: string;
	availability: string;
	language: string;
	notice: string;
	expectations: string[];
	photos: string[];
	inclusions: string[];
	exclusions: string[];
}