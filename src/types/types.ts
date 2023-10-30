export default interface IAddPackage {
	name: string;
	description: string;
	type: string;
	location: string;
	duration: string;
	cancellation: string;
	availability: string;
	language: string;
	notice: string;
	ratesAndInclusions: [RatesAndInclusions];
	itinerary: [Itinerary];
	expectations: [string];
	photos: [string];
}

interface RatesAndInclusions {
	numberOfPax: string;
	ratePerPax: string;
	inclusions: [string];
	exclusions: [string];
}

interface Itinerary {
	time: string;
	activity: string;
}
