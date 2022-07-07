export const sort = (users, field, type) => {
	const sorted = users.sort((a, b) => {
		// if (a.first_name < b.first_name) {
		// 	return -1;
		// }
		// if (a.first_name > b.first_name) {
		// 	return 1;
		// }

		return a.first_name - b.first_name;
	});

	console.log('came soryed', sorted);
	return sorted;
};
