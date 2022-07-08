import { USER_ACTION_TYPES } from '../actionTypes/userActionTypes';

export const setUsersData = (user) => {
	return { type: USER_ACTION_TYPES.SET_USERS, payload: user };
};

export const setCurrentPage = (currentPage) => {
	return { type: USER_ACTION_TYPES.SET_CURRENT_PAGE, payload: currentPage };
};

export const setCurrentUsers = (currentUsers) => {
	return { type: USER_ACTION_TYPES.SET_CURRENT_USERS, payload: currentUsers };
};
