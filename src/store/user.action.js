export const setUsersData = (user) => {
	return { type: 'SET_USERS', payload: user };
};
export const setMetaData = (meta) => {
	return { type: 'SET_META_DATA', payload: meta };
};

export const setCount = () => {
	return { type: 'SET_COUNT' };
};
