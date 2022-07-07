import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { NoResults } from '../NoResults/NoResults';
import { CustomButton } from '../UI/Button/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import {
	UserContainer,
	SearchBoxContainer,
	ActionButtonContainer,
	DeleteButton,
} from './UserStyle';

const Users = ({ users, deleteUser, handleSearch, handleSort }) => {
	// const users = useSelector((state) => state.user.users);
	const dispatch = useDispatch();
	const [firstNameArrow, setFirstNameArrow] = useState(true);

	return (
		<UserContainer>
			<h1>User Administration</h1>
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
			<SearchBoxContainer>
				<TextField
					id='outlined-search'
					label='Search field'
					type='search'
					onChange={(e) => handleSearch(e)}
					size='small'
				/>
			</SearchBoxContainer>
			<TableContainer component={Paper}>
				<Table stickyHeader aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell
								align='right'
								onClick={() => handleSort('firstName', 'ASC')}
							>
								First Name
								{firstNameArrow ? <ArrowDropUp /> : <ArrowDropDown />}
							</TableCell>
							<TableCell
								align='right'
								onClick={() => handleSort('lastName', 'ASC')}
							>
								Last Name
								<ArrowDropUp />
								<ArrowDropDown />
							</TableCell>
							<TableCell
								align='right'
								onClick={() => handleSort('email', 'ASC')}
							>
								Email
								<ArrowDropUp />
								<ArrowDropDown />
							</TableCell>
							<TableCell align='right'>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.length == 0 ? (
							<tr>
								<td colSpan='4'>
									<NoResults />
								</td>
							</tr>
						) : (
							users.map((user) => (
								<TableRow
									key={user.id}
									sx={{
										'&:last-child td, &:last-child th': {
											border: 0,
										},
									}}
								>
									<TableCell component='th' scope='row'>
										{user.id}
									</TableCell>
									<TableCell align='right'>{user.first_name}</TableCell>
									<TableCell align='right'>{user.last_name}</TableCell>
									<TableCell align='right'>{user.email}</TableCell>
									<TableCell align='right'>
										<ActionButtonContainer>
											<Link to={`/user/${user.id}`}>
												<CustomButton
													variant='outlined'
													size='medium'
												>
													View
												</CustomButton>
											</Link>
											<CustomButton
												variant='outlined'
												size='medium'
											>
												<a href={`mailto:${user.email}`}>
													Contact
												</a>
											</CustomButton>
											<DeleteButton
												className='submit-btn'
												onClick={() => deleteUser(user.id)}
											>
												Delete
											</DeleteButton>
										</ActionButtonContainer>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</UserContainer>
	);
};

export default Users;
