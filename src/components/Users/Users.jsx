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
import TextField from '@mui/material/TextField';
import { ToastContainer } from 'react-toastify';
import {
	UserContainer,
	SearchBoxContainer,
	ActionButtonContainer,
	DeleteButton,
} from './UserStyle';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const Users = ({ users, deleteUser, handleSearch, handleSort }) => {
	const [open, setOpen] = React.useState(false);
	const [userId, setUserId] = useState(null);
	const [order, setOrder] = useState(true);
	const handleClickOpen = (id) => {
		setOpen(true);
		setUserId(id);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleDelete = () => {
		deleteUser(userId);
		setOpen(false);
	};

	const changeArrows = (colName) => {
		setOrder(!order);
		handleSort(colName, order);
	};

	return (
		<UserContainer>
			<h1>User Administration</h1>
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<DialogTitle id='alert-dialog-title'>
						{'Are you sure you want to delete the user?'}
					</DialogTitle>

					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleDelete} autoFocus>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</div>
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
								onClick={() => changeArrows('firstName')}
							>
								First Name
								{!order ? <ArrowDropUp /> : <ArrowDropDown />}
							</TableCell>
							<TableCell
								align='right'
								onClick={() => changeArrows('lastName')}
							>
								Last Name
								{!order ? <ArrowDropUp /> : <ArrowDropDown />}
							</TableCell>
							<TableCell
								align='right'
								onClick={() => changeArrows('email')}
							>
								Last Name
								{!order ? <ArrowDropUp /> : <ArrowDropDown />}
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
												onClick={() => handleClickOpen(user.id)}
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
