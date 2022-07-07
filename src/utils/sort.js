export const sort = (users, field, type) => {
	const sorted = users.sort((a, b) => {
		if (field == 'firstName') {
			if (a.first_name < b.first_name) {
				return -1;
			}
			if (a.first_name > b.first_name) {
				return 1;
			}
		} else if (field == 'lastName') {
			if (a.last_name < b.last_name) {
				return -1;
			}
			if (a.last_name > b.last_name) {
				return 1;
			}
		} else {
			if (a.email < b.email) {
				return -1;
			}
			if (a.email > b.email) {
				return 1;
			}
		}
	});

	return sorted;
};
