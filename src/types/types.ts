export default interface IAddPackage {
	id: any;
	name: string;
	description: string;
	type: string;
	location: string;
	duration: string;
	cancellation: string;
	availability: string;
	language: string;
	notice: string;
	rates: [Rates];
	itinerary: [DaySchedule];
	inclusions: [string];
	exclusions: [string];
	photos: [string];
}

interface Rates {
	numberOfPax: string;
	ratePerPax: string;
}

interface DaySchedule {
	day: string;
	itineraries: [Itinerary];
}

interface Itinerary {
	time: string;
	activity: string;
}
