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
	ratesAndInclusions: [
		{
			numberOfPax: '',
			ratePerPax: '',
			inclusions: [''],
			exclusions: [''],
		},
	],
	itinerary: [
		{
			time: '',
			activity: '',
		},
	],
	expectations: [''],
	photos: [''],
};

export default addPackageDefault;
