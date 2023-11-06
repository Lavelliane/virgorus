import IAddPackage from '../types/types';

async function createPackage(data: IAddPackage) {
	try {
		const response = await fetch('/api/package/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			const createdPackage = await response.json();
			console.log('Package created:', createdPackage);
		} else {
			console.error('Failed to create package:', response.statusText);
		}
	} catch (error) {
		console.error('An error occurred:', error);
	}
}

async function deletePackage(data: number) {
    try {
        const response = await fetch('/api/package/delete', {
            method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('Package deleted successfully');
        } else {
            console.error('Failed to delete package:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

export { createPackage, deletePackage };