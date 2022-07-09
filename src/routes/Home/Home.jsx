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
	const searchTerm = useSelector((state) => state.user.term);
	const meta = useSelector((state) => state.user.meta);

	const [loading, setLoading] = useState(false);

	const getUsers = async () => {
		try {
			if (term === null && sortType === null) {
				// setLoading(true);
				let data = await fetchAllUsers(currentPage);
				const usersDataArray = data.users;

				let storefinal = usersDataArray.filter((userObject) => {
					for (let item of usersData) {
						if (item.id == userObject.id) {
							return userObject;
						}
					}
				});

				dispatch(setUsersData(usersDataArray));
				dispatch(setMeta(data.meta));

				dispatch(setTerm(''));
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
		// setUsers(filteredUsers);
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

	let filterdData;
	const sorted = sort(usersData, fieldName, sortType == 'desc' ? 1 : 0);
	filterdData = sorted;
	filterdData = sorted.filter((item) => {
		if (
			item.first_name.toLowerCase().match(searchTerm.toLowerCase()) ||
			item.last_name.toLowerCase().match(searchTerm.toLowerCase()) ||
			item.email.toLowerCase().match(searchTerm.toLowerCase())
		) {
			return item;
		}
	});

	return (
		<>
			{loading ? (
				<SpinnerContainer>
					<Loader />
				</SpinnerContainer>
			) : (
				<HomeContainer>
					<Users
						users={filterdData}
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
