import axios from 'axios';
import { Toast } from '../components/UI/Toast/Toast';
export const fetchAllUsers = async (currentPage) => {
	try {
		const allUsers = await axios.get(
			`https://reqres.in/api/users?page=${currentPage}`
		);
		return allUsers;
	} catch (error) {
		console.log('Fetching data failed');
	}
};
export const fetchAUser = async (id) => {
	try {
		const fetchedUser = await axios.get(`https://reqres.in/api/users/${id}`);
		return fetchedUser;
	} catch (error) {
		console.log('Fetching data failed');
	}
};
export const updateUser = async (body, id) => {
	try {
		const updated = axios.put(`https://reqres.in/api/users/${id}`, body);
		return updated;
	} catch (error) {
		console.log('something went wrong');
	}
};

export const deleteUser = async (id) => {
	try {
		const updated = await axios.delete(`https://reqres.in/api/users/${id}`);
		return updated;
	} catch (error) {
		console.log('something went wrong');
	}
};
