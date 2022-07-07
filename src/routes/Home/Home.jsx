import React, { useState, useEffect } from 'react';
import Users from '../../components/Users/Users';
import { Pagination } from '../../components/Pagination/Pagination';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUsersData, setMetaData, setCount } from '../../store/user.action';
import Loader from '../../components/UI/Loader/Loader';
import { Toast } from '../../components/UI/Toast/Toast';
import { ToastContainer, toast } from 'react-toastify';
import { sort } from '../../utils/sort';

export const Home = () => {
	const dispatch = useDispatch();

	const usersData = useSelector((state) => state.user.users);
	const [users, setUsers] = useState(usersData);
	const meta = useSelector((state) => state.user.meta);
	const count = useSelector((state) => state.user.count);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const getUsers = async () => {
		setLoading(true);
		try {
			const data = await axios.get(
				`https://reqres.in/api/users?page=${currentPage}`
			);
			const usersData = data.data.data;
			setUsers(usersData);
			dispatch(setUsersData(usersData));
			dispatch(setMetaData(data.data));
			setLoading(false);
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
		const data = await axios.delete(`https://reqres.in/api/users/${id}`);
	};

	var setPaginationPage = (page) => {
		setCurrentPage(page);
	};

	const handleSort = (field, type) => {
		const sorted = sort(users, field, type);
		setUsers(sorted);
	};
	const handleSearch = (e) => {
		const searchTerm = e.target.value;
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
		getUsers();
	}, [currentPage]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<ToastContainer
						position='bottom-right'
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
					<Users
						users={users ? users : []}
						deleteUser={deleteUserById}
						handleSearch={handleSearch}
						handleSort={handleSort}
					/>
					<Pagination
						totalPages={meta.total_pages}
						paginate={setPaginationPage}
						pageNumber={meta.page}
					/>
				</>
			)}
		</>
	);
};
