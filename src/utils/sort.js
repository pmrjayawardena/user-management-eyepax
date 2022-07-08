export const sort = (users, field, type) => {
	let sorted;
	if (field == 'firstName' && type) {
		sorted = users.sort((a, b) => {
			if (a.first_name < b.first_name) {
				return -1;
			}
			if (a.first_name > b.first_name) {
				return 1;
			}
		});
	} else {
		sorted = users.reverse();
	}

	if (field == 'lastName' && type) {
		sorted = users.sort((a, b) => {
			if (a.last_name < b.last_name) {
				return -1;
			}
			if (a.last_name > b.last_name) {
				return 1;
			}
		});
	} else {
		sorted = users.reverse();
	}

	if (field == 'email' && type) {
		sorted = users.sort((a, b) => {
			if (a.email < b.email) {
				return -1;
			}
			if (a.email > b.email) {
				return 1;
			}
		});
	} else {
		sorted = users.reverse();
	}

	return sorted;
};
