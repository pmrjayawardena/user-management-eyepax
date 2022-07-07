import React from 'react';
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
export const TableUsers = ({ users, deleteUser }) => {
	return (
		<TableContainer component={Paper}>
			<Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell align='right'>
							First Name{' '}
							<ArrowDropUp onClick={() => handleSort('firstName', 'ASC')} />
							{/* <ArrowDropDown onClick={() => handleSortA('DESC')} /> */}
						</TableCell>
						<TableCell align='right'>Last Name</TableCell>
						<TableCell align='right'>Email</TableCell>
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
									<div className='action-buttons'>
										<Link to={`/user/${user.id}`}>
											<CustomButton
												variant='outlined'
												size='medium'
											>
												View
											</CustomButton>
										</Link>
										<CustomButton variant='outlined' size='medium'>
											<a href={`mailto:${user.email}`}> Contact</a>
										</CustomButton>
										<CustomButton
											variant='outlined'
											color='error'
											onClick={() => deleteUser(user.id)}
										>
											Delete
										</CustomButton>
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
