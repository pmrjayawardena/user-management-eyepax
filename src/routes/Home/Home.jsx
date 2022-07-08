import React, { useState, useEffect } from 'react';
import Users from '../../components/users/Users';
import { Pagination } from '../../components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
	setUsersData,
	setCurrentPage,
	setCurrentUsers,
	setMeta,
} from '../../actions/userActions';
import Loader from '../../components/UI/loader/Loader';
import { Toast } from '../../components/UI/toast/Toast';
import { sort } from '../../utils/sort';
import { fetchAllUsers, deleteUser } from '../../requests/UserRequest';
import { SpinnerContainer } from '../../components/UI/loader/LoaderStyle';
import { HomeContainer } from './HomeStyle';
import {
	useSearchParams,
	Navigate,
	NavLink,
	useNavigate,
	createSearchParams,
} from 'react-router-dom';

const useNavigateSearch = () => {
	const navigate = useNavigate();
	return (pathname, params) => navigate(`${pathname}?${createSearchParams(params)}`);
};
export const Home = () => {
	const navigateSearch = useNavigateSearch();
	const [searchParams] = useSearchParams();

	let term = searchParams.get('term');
	let sortType = searchParams.get('sort');
	let fieldName = searchParams.get('field');
	const dispatch = useDispatch();
	const usersData = useSelector((state) => state.user.users);
	const currentPage = useSelector((state) => state.user.currentPage);
	const currentUsers = useSelector((state) => state.user.currentUsers);
	const searchTerm = useSelector((state) => state.user.term);
	const meta = useSelector((state) => state.user.meta);

	const [users, setUsers] = useState(usersData);

	const [loading, setLoading] = useState(false);
	const [usersPerPage, setUsersPerPage] = useState(6);

	const getUsers = async () => {
		try {
			let data;

			if (term == null && sortType == null) {
				setLoading(true);
				data = await fetchAllUsers(currentPage);
				const usersData = data.users;
				setUsers(usersData);
				// changeData(usersData);
				dispatch(setMeta(data.meta));
				dispatch(setUsersData(usersData));
				setLoading(false);
			}
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
		setUsers(filteredUsers);
		dispatch(setUsersData(filteredUsers));
		Toast(`user ${user.first_name} ${user.last_name} deleted`);
		const data = await deleteUser(user);
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

	const sortData = () => {
		const sorted = sort(users, fieldName, sortType == 'asc' ? 1 : 0);
		setUsers(sorted);
	};
	useEffect(() => {
		sortData();
		// dispatch(setUsersData(sorted.slice()));
	}, [sortType]);
	const changeData = (userData) => {
		const searchedData = usersData.filter((item) => {
			if (
				item.first_name.toLowerCase().match(searchTerm.toLowerCase()) ||
				item.last_name.toLowerCase().match(searchTerm.toLowerCase()) ||
				item.email.toLowerCase().match(searchTerm.toLowerCase())
			) {
				return item;
			}
		});

		setUsers(searchedData);
	};
	useEffect(() => {
		changeData();
	}, [term]);

	return (
		<>
			{loading ? (
				<SpinnerContainer>
					<Loader />
				</SpinnerContainer>
			) : (
				<HomeContainer>
					<Users
						users={users}
						deleteUser={deleteUserById}
						handleSort={handleSort}
					/>

					<Pagination
						totalUsers={users.length}
						paginate={setPaginationPage}
						pageNumber={currentPage}
						totalPages={meta.total_pages}
					/>
				</HomeContainer>
			)}
		</>
	);
};
