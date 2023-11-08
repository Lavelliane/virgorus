import IAddPackage from '../types/types';

const addPackageDefault: IAddPackage = {
	name: '',
	description: '',
	type: '',
	location: '',
	duration: '',
	cancellation: '',
	availability: '',
	language: '',
	notice: '',
	inclusions: [''],
	exclusions: [''],
	photos: [''],
	ratesAndInclusions: [
		{
			numberOfPax: '',
			ratePerPax: '',
		},
	],
	itinerary: [
		{
			day: '',
			itineraries: [
				{
					time: '',
					activity: '',
				},
			],
		},
	],
};

export default addPackageDefault;
