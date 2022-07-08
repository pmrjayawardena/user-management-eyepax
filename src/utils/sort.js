export const sort = (users, field, type) => {
	let sorted;
	if (field == 'Firstname' && type) {
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

	if (field == 'Lastname' && type) {
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

	if (field == 'Email' && type) {
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
