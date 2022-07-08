import React, { useState, useEffect } from 'react';
import Users from '../../components/Users/Users';
import { Pagination } from '../../components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setUsersData, setCurrentPage } from '../../actions/userActions';
import Loader from '../../components/UI/Loader/Loader';
import { Toast } from '../../components/UI/Toast/Toast';
import { sort } from '../../utils/sort';
import { fetchAllUsers, deleteUser } from '../../requests/UserRequest';
import { SpinnerContainer } from '../../components/UI/Loader/LoaderStyle';

export const Home = () => {
	const dispatch = useDispatch();
	const usersData = useSelector((state) => state.user.users);
	const currentPage = useSelector((state) => state.user.currentPage);
	const [users, setUsers] = useState(usersData);
	const [loading, setLoading] = useState(true);
	const [usersPerPage, setUsersPerPage] = useState(6);
	const [searchTerm, setSearchTerm] = useState('');
	const getUsers = async () => {
		setLoading(true);
		try {
			let data;
			if (users == 0) {
				data = await fetchAllUsers(currentPage);
				const usersData = data.users;
				setUsers(usersData);
				dispatch(setUsersData(usersData));
				setLoading(false);
			} else {
				//get current posts

				setLoading(false);
				return;
			}
		} catch (error) {
			setLoading(false);
			Toast('something went wrong');
		}
	};

	const deleteUserById = async (id) => {
		const filteredUsers = users.filter((item) => item.id != id);
		setUsers(filteredUsers);
		dispatch(setUsersData(filteredUsers));
		Toast('Deleted record');
		const data = await deleteUser(id);
	};

	var setPaginationPage = (page) => {
		dispatch(setCurrentPage(page));
	};

	const handleSort = (field, type) => {
		const sorted = sort(users, field, type);
		setUsers(sorted);
		dispatch(setUsersData(sorted.slice()));
	};

	const handleSearch = (e) => {
		const searchTerm = e.target.value;
		setSearchTerm(searchTerm);
	};

	useEffect(() => {
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
	}, [searchTerm]);

	useEffect(() => {
		getUsers();
	}, []);
	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

	return (
		<>
			{loading ? (
				<SpinnerContainer>
					<Loader />
				</SpinnerContainer>
			) : (
				<>
					<Users
						users={currentUsers ? currentUsers : []}
						deleteUser={deleteUserById}
						handleSearch={handleSearch}
						handleSort={handleSort}
					/>

					<Pagination
						usersPerPage={usersPerPage}
						totalUsers={users.length}
						paginate={setPaginationPage}
						pageNumber={currentPage}
					/>
				</>
			)}
		</>
	);
};
