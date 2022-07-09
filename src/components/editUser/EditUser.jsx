import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { CustomButton } from '../UI/button/button';
const ariaLabel = { 'aria-label': 'description' };
import Loader from '../UI/loader/loader';
import { Toast } from '../UI/toast/toast';
import { ToastContainer } from 'react-toastify';
import { updateUser, fetchAUser } from '../../requests/userRequest';
import { SpinnerContainer } from '../UI/loader/loaderStyle';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { setUpdatedUsers, setUsersData } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {
	UserCardContainer,
	SubmitButton,
	ActionButtonContainer,
	FormContainer,
	SmallLoader,
} from './editUserStyle';

export const EditUser = () => {
	let { id } = useParams();
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const usersData = useSelector((state) => state.user.users);
	const updatedUsers = useSelector((state) => state.user.updatedUsers);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [updating, setUpdating] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const getUser = async () => {
		setLoading(true);
		let singleUser = usersData.filter((user) => user.id == parseInt(id));
		setLoading(false);
		setUser(singleUser[0]);
		setFirstName(singleUser[0].first_name);
		setLastName(singleUser[0].last_name);
		setEmail(singleUser[0].email);
	};

	const handleInputChange = (event) => {
		const target = event.target.value;
		setFirstName(target);
	};

	const handleInputChangeLastName = (event) => {
		const target = event.target.value;
		setLastName(target);
	};
	const handleInputChangeEmail = (event) => {
		const target = event.target.value;
		setEmail(target);
	};
	const updateUserData = async () => {
		// setUsersData
		// dispatch(setUsersData())

		if (firstName !== '' && lastName !== '' && email !== '') {
			setUpdating(true);
			const data = await updateUser(
				{
					first_name: firstName,
					last_name: lastName,
					email: email,
				},
				id
			);
			const updated = usersData.filter((item) => item.id == parseInt(id));

			if (updatedUsers.length === 0) {
				const allUpdated = [
					...updatedUsers,
					{
						id: parseInt(id),
						first_name: firstName,
						last_name: lastName,
						email: email,
					},
				];
				dispatch(setUpdatedUsers(allUpdated));
			} else {
				for (let upUser of updatedUsers) {
					if (upUser.id === parseInt(id)) {
						upUser.first_name = firstName;
						upUser.last_name = lastName;
						upUser.email = email;
						dispatch(setUpdatedUsers([upUser]));
					} else {
						const allUpdated = [
							{ ...upUser },
							{
								id: parseInt(id),
								first_name: firstName,
								last_name: lastName,
								email: email,
							},
						];
						dispatch(setUpdatedUsers(allUpdated));
					}
				}
			}

			setUpdating(false);

			Toast('Updated Successfully');
			navigate('/');
		} else {
			Toast('Please check your fields');
		}
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		updateUserData();
	};

	useEffect(() => {
		getUser();
	}, [id]);

	return loading ? (
		<SpinnerContainer>
			<Loader />
		</SpinnerContainer>
	) : (
		<>
			<ToastContainer
				position='bottom-right'
				autoClose={100}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				limit={1}
			/>
			<UserCardContainer>
				<h3>UPDATE USER</h3>
				<Card sx={{ maxWidth: 345 }}>
					<CardActionArea>
						<CardMedia
							component='img'
							image={user.avatar}
							alt={user.first_name}
							style={{ height: '200px', width: '100%' }}
						/>
					</CardActionArea>
				</Card>
				<FormContainer>
					<form onSubmit={handleFormSubmit}>
						<Stack direction='column' spacing={4} alignItems='center'>
							<TextField
								label='Firstname'
								color='primary'
								focused
								placeholder='Firstname'
								value={firstName}
								inputProps={ariaLabel}
								onChange={handleInputChange}
								size='small'
								required
							/>

							<TextField
								label='Lastname'
								color='primary'
								focused
								placeholder='Lastname'
								value={lastName}
								inputProps={ariaLabel}
								onChange={handleInputChangeLastName}
								size='small'
								required
							/>

							<TextField
								label='Email'
								color='primary'
								focused
								placeholder='Email'
								value={email}
								inputProps={ariaLabel}
								onChange={handleInputChangeEmail}
								size='small'
								required
							/>
						</Stack>
						<ActionButtonContainer>
							<Link to={`/`}>
								<CustomButton
									color='primary'
									variant='contained'
									disableElevation
									size='small'
								>
									Go back
								</CustomButton>
							</Link>
							<SubmitButton
								variant='contained'
								size='small'
								type='submit'
								disableElevation
								className='submit-btn'
							>
								{updating ? (
									<SmallLoader>
										<Loader size={20} /> Updating..
									</SmallLoader>
								) : (
									'UPDATE'
								)}
							</SubmitButton>
						</ActionButtonContainer>
					</form>
				</FormContainer>
			</UserCardContainer>
		</>
	);
};
