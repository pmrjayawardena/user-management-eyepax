import React, { useState, useEffect } from 'react';
import Users from '../../components/Users/Users';
import { Pagination } from '../../components/Pagination/Pagination';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUsersData, setMetaData, setCount } from '../../store/user.action';
import Loader from '../../components/UI/Loader/Loader';
export const Home = () => {
	const dispatch = useDispatch();

	const usersData = useSelector((state) => state.user.users);
	const [users, setUsers] = useState(usersData);
	const meta = useSelector((state) => state.user.meta);
	const count = useSelector((state) => state.user.count);

	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	const getUsers = async () => {
		setLoading(true);
		const data = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
		const usersData = data.data.data;
		setUsers(usersData);
		dispatch(setUsersData(usersData));
		dispatch(setMetaData(data.data));
		setLoading(false);
	};

	var setPaginationPage = (page) => {
		console.log({ page });
		setCurrentPage(page);
	};

	const deleteUserById = async (id) => {
		const filteredUsers = users.filter((item) => item.id != id);
		dispatch(setUsersData(filteredUsers));
		const data = await axios.delete(`https://reqres.in/api/users/${id}`);
	};

	const handleCount = () => {
		dispatch(setCount());
	};
	const handleSort = (field, type) => {
		const sorted = users.sort(function (a, b) {
			if (a.first_name < b.first_name) {
				return -1;
			}
			if (a.first_name > b.first_name) {
				return 1;
			}
			return 0;
		});
		console.log('came soryed', sorted);
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
			{/* count : {count}
			<button onClick={() => dispatch(setCount())}>count increase</button> */}
		</>
	);
};
