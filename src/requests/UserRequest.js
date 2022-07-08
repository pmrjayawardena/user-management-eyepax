import axios from 'axios';
import { Toast } from '../components/UI/Toast/Toast';
const BASE_API_URL = process.env.REACT_APP_BASE_URL;

export const fetchAllUsers = async (currentPage) => {
	try {
		let usersCombined = [];
		let promiseArray = [];
		const allUsers = await axios.get(`${BASE_API_URL}/users?page=${currentPage}`);
		for (let i = 1; i <= allUsers.data.total_pages; i++) {
			promiseArray.push(axios.get(`${BASE_API_URL}/users?page=${i}`));
		}

		const data = await Promise.all(promiseArray);

		for (let response of data) {
			for (let item of response.data.data) {
				const includes = usersCombined.includes(item.id);
				if (!includes) {
					usersCombined.push(item);
				}
			}
		}

		return {
			users: usersCombined,
		};
	} catch (error) {
		return {
			error: 'error fetching users',
		};
	}
};
export const fetchAUser = async (id) => {
	try {
		const fetchedUser = await axios.get(`${BASE_API_URL}/users/${id}`);
		return fetchedUser;
	} catch (error) {
		return {
			error: 'error fetching the user',
		};
	}
};
export const updateUser = async (body, id) => {
	try {
		const updated = axios.put(`${BASE_API_URL}/users/${id}`, body);
		return updated;
	} catch (error) {
		return {
			error: 'error updating the user',
		};
	}
};

export const deleteUser = async (id) => {
	try {
		const updated = await axios.delete(`${BASE_API_URL}/users/${id}`);
		return updated;
	} catch (error) {
		console.log('something went wrong');
	}
};
