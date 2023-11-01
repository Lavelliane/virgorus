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
	ratesAndInclusions: [
		{
			numberOfPax: '',
			ratePerPax: '',
		},
	],
	itinerary: [
		{
			day: '',
			itinerary: [
				{
					time: '',
					activity: '',
				},
			],
		},
	],
	expectations: [''],
	photos: [''],
};

export default addPackageDefault;
