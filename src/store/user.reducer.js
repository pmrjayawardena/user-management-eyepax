const INITIAL_STATE = {
	users: [],
	meta: [],
	count: 0,
};
export const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'SET_USERS':
			return {
				...state, //previus state
				users: payload,
			};
		case 'SET_META_DATA':
			return {
				...state, //previus state
				meta: payload,
			};
		case 'SET_COUNT':
			return {
				...state, //previus state
				count: state.count + 1,
			};
		default:
			return state;
	}
};
