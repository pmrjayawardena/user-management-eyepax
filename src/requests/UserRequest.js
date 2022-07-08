import axios from 'axios';
import { Toast } from '../components/UI/Toast/Toast';
export const fetchAllUsers = async (currentPage) => {
	try {
		const allUsers = await axios.get(
			`https://reqres.in/api/users?page=${currentPage}`
		);
		return allUsers;
	} catch (error) {
		return {
			error: 'error fetching users',
		};
	}
};
export const fetchAUser = async (id) => {
	try {
		const fetchedUser = await axios.get(`https://reqres.in/api/users/${id}`);
		return fetchedUser;
	} catch (error) {
		return {
			error: 'error fetching the user',
		};
	}
};
export const updateUser = async (body, id) => {
	try {
		const updated = axios.put(`https://reqres.in/api/users/${id}`, body);
		return updated;
	} catch (error) {
		return {
			error: 'error updating the user',
		};
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
