export const sort = (users, field, type) => {
	let usersArr = [...users];
	let sorted;
	if (field == 'Firstname' && type) {
		sorted = usersArr.reverse();
	} else {
		sorted = usersArr.sort((a, b) => {
			if (a.first_name < b.first_name) {
				return -1;
			}
			if (a.first_name > b.first_name) {
				return 1;
			}
		});
	}

	if (field == 'Lastname' && type) {
		sorted = usersArr.sort((a, b) => {
			if (a.last_name < b.last_name) {
				return -1;
			}
			if (a.last_name > b.last_name) {
				return 1;
			}
		});
	} else {
		sorted = usersArr.reverse();
	}

	if (field == 'Email' && type) {
		sorted = usersArr.sort((a, b) => {
			if (a.email < b.email) {
				return -1;
			}
			if (a.email > b.email) {
				return 1;
			}
		});
	} else {
		sorted = usersArr.reverse();
	}

	return sorted;
};
