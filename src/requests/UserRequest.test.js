import { fetchAllUsers, fetchAUser, updateUser, deleteUser } from './UserRequest';
import axios from 'axios';

it('Fetching users data', async () => {
	const data = await fetchAllUsers(1);
	const usersArray = data.data.data;
	expect(usersArray.length).toBe(6);
});

it('Fetching a singleUser', async () => {
	const data = await fetchAUser(1);
	let testName = data.data.data.email;
	expect(testName).toBe('george.bluth@reqres.in');
	expect(data.data.data).toEqual({
		id: 1,
		email: 'george.bluth@reqres.in',
		first_name: 'George',
		last_name: 'Bluth',
		avatar: 'https://reqres.in/img/faces/1-image.jpg',
	});
});

it('Updating a singleUser', async () => {
	const data = await updateUser(
		{ first_name: 'prabodha', last_name: 'jayawardena' },
		1
	);

	expect(data.data.first_name).toBe('prabodha');
});

it('delete a singleUser', async () => {
	const data = await deleteUser(1);
	expect(data.data.status).not.toBe(200);
});
