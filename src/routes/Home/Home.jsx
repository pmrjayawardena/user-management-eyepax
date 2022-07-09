import React, { useState, useEffect } from 'react';
import Users from '../../components/users/Users';
import { Pagination } from '../../components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
	setUsersData,
	setCurrentPage,
	setMeta,
	setTerm,
} from '../../actions/userActions';
import Loader from '../../components/UI/loader/Loader';
import { Toast } from '../../components/UI/toast/Toast';
import { sort } from '../../utils/sort';
import { fetchAllUsers, deleteUser } from '../../requests/UserRequest';
import { SpinnerContainer } from '../../components/UI/loader/LoaderStyle';
import { HomeContainer } from './HomeStyle';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { setDeletedUsers } from '../../actions/userActions';

const useNavigateSearch = () => {
	const navigate = useNavigate();
	return (pathname, params) => navigate(`${pathname}?${createSearchParams(params)}`);
};

// Hook
function useLocalStorage(key, initialValue) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState(() => {
		if (typeof window === 'undefined') {
			return initialValue;
		}
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue
			console.log(error);
			return initialValue;
		}
	});
	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			// Save state
			setStoredValue(valueToStore);
			// Save to local storage
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	};
	return [storedValue, setValue];
}
export const Home = () => {
	const navigateSearch = useNavigateSearch();
	const [searchParams] = useSearchParams();

	let term = searchParams.get('term');
	let sortType = searchParams.get('sort');
	let fieldName = searchParams.get('field');

	const dispatch = useDispatch();
	const usersData = useSelector((state) => state.user.users);
	const currentPage = useSelector((state) => state.user.currentPage);
	const searchTerm = useSelector((state) => state.user.term);
	const meta = useSelector((state) => state.user.meta);
	const deletedUsers = useSelector((state) => state.user.deletedUsers);

	// const [deletedUsers, setDeletedUsers] = useLocalStorage([]);

	const [loading, setLoading] = useState(false);

	const getUsers = async () => {
		try {
			// setLoading(true);
			let data = await fetchAllUsers(currentPage);
			const usersDataArray = data.users;
			let storefinal = usersDataArray.filter((item) => {
				if (!deletedUsers.includes(item.id)) {
					return item;
				}
			});

			console.log({ storefinal });
			dispatch(setUsersData(storefinal));
			dispatch(setMeta(data.meta));

			dispatch(setTerm(''));
			setLoading(false);
		} catch (error) {
			setLoading(false);
			Toast('something went wrong');
		}
	};
	useEffect(() => {
		getUsers();
	}, [currentPage]);

	const deleteUserById = async (user) => {
		const filteredUsers = usersData.filter((item) => item.id != user.id);
		const deleted = usersData.filter((item) => item.id == user.id);

		const includes = deletedUsers.includes(deleted[0].id);
		if (!includes) {
			const allDeleted = [...deletedUsers, deleted[0].id];
			dispatch(setDeletedUsers(allDeleted));
		}

		dispatch(setUsersData(filteredUsers));
		Toast(`user ${user.first_name} ${user.last_name} deleted`);
		await deleteUser(user);
	};

	var setPaginationPage = (page) => {
		dispatch(setCurrentPage(page));
	};

	const handleSort = (field, type) => {
		navigateSearch('', {
			term: searchTerm,
			sort: type ? 'desc' : 'asc',
			field: field,
		});
	};

	let filterdData = usersData.filter((item) => {
		if (
			item.first_name.toLowerCase().match(searchTerm.toLowerCase()) ||
			item.last_name.toLowerCase().match(searchTerm.toLowerCase()) ||
			item.email.toLowerCase().match(searchTerm.toLowerCase())
		) {
			return item;
		}
	});

	const sorted = sort(filterdData, fieldName, sortType == 'desc' ? 1 : 0);

	return (
		<>
			{loading ? (
				<SpinnerContainer>
					<Loader />
				</SpinnerContainer>
			) : (
				<HomeContainer>
					<Users
						users={sorted}
						deleteUser={deleteUserById}
						handleSort={handleSort}
					/>

					{!searchTerm && (
						<Pagination
							totalUsers={usersData.length}
							paginate={setPaginationPage}
							pageNumber={currentPage}
							totalPages={meta.total_pages}
						/>
					)}
				</HomeContainer>
			)}
		</>
	);
};
