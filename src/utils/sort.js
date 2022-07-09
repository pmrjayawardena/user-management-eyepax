export const sort = (users, field = 'Firstname', type = 0) => {
	let usersArr = [...users];
	console.log(field);
	let sorted;
	if (field == 'Firstname') {
		sorted = usersArr.sort((a, b) => {
			if (a.first_name < b.first_name) {
				return -1;
			}
			if (a.first_name > b.first_name) {
				return 1;
			}
		});

		return type ? sorted : sorted.reverse();
	}

	if (field == 'Lastname') {
		sorted = usersArr.sort((a, b) => {
			if (a.last_name < b.last_name) {
				return -1;
			}
			if (a.last_name > b.last_name) {
				return 1;
			}
		});
		return type ? sorted : sorted.reverse();
	}

	if (field == 'Email') {
		sorted = usersArr.sort((a, b) => {
			if (a.email < b.email) {
				return -1;
			}
			if (a.email > b.email) {
				return 1;
			}
		});
		return type ? sorted : sorted.reverse();
	}

	return sorted;
};
