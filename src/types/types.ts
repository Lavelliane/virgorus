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
	itinerary: [DaySchedule];
	inclusions: [string];
	exclusions: [string];
	expectations: [string];
	photos: [string];
}

interface RatesAndInclusions {
	numberOfPax: string;
	ratePerPax: string;
}

interface DaySchedule {
	day: string;
	itinerary: [Itinerary];
}

interface Itinerary {
	time: string;
	activity: string;
}
