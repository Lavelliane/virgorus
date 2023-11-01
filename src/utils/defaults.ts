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
	expectations: [''],
	photos: [''],
	ratesAndInclusions: [
		{
			numberOfPax: '',
			ratePerPax: '',
		},
	],
	itinerary: [
		{
			day: '2',
			itineraries: [
				{
					time: 'peste',
					activity: 'kaw',
				},
			],
		},
	],
};

export default addPackageDefault;
