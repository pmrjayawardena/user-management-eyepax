export const sort = (users, field, type) => {
	const sorted = users.sort(function (a, b) {
		if (a.first_name < b.first_name) {
			return -1;
		}
		if (a.first_name > b.first_name) {
			return 1;
		}
		return 0;
	});

	console.log('came soryed', sorted);
	return sorted;
};
