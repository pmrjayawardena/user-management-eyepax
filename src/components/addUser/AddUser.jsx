import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from '../UI/button/button';
const ariaLabel = { 'aria-label': 'description' };
import Loader from '../UI/loader/loader';
import { Toast } from '../UI/toast/toast';
import { ToastContainer } from 'react-toastify';
import { addUser } from '../../requests/userRequest';
import { SpinnerContainer } from '../UI/loader/loaderStyle';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { setNewUsers } from '../../actions/userActions';
import {
	UserCardContainer,
	SubmitButton,
	ActionButtonContainer,
	FormContainer,
	SmallLoader,
} from './addUserStyle';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
export const AddUser = () => {
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [adding, setAdding] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const usersData = useSelector((state) => state.user.users);
	const newUsersData = useSelector((state) => state.user.newUsers);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const addUserData = async (formData) => {
		let randomId = parseInt(Math.random() * (20 - 6) + 6, 10);

		setAdding(true);
		const data = await addUser({
			first_name: formData.Firstname,
			last_name: formData.Lastname,
			email: formData.Email,
		});
		setAdding(false);

		dispatch(
			setNewUsers([
				...newUsersData,
				{
					id: randomId,
					avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJzfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
					first_name: formData.Firstname,
					last_name: formData.Lastname,
					email: formData.Email,
				},
			])
		);
		Toast('User added Successfully');
		navigate('/');
	};

	const handleErrors = () => {
		if (Object.keys(errors).length !== 0) {
			if (errors.Firstname && errors.Firstname.type == 'required') {
				return `Firstname is required`;
			} else if (errors.Firstname && errors.Firstname.type == 'minLength') {
				return `Minimum length should be greater than 3`;
			}
			if (errors.Lastname && errors.Lastname.type == 'required') {
				return `Lastname is required`;
			} else if (errors.Lastname && errors.Lastname.type == 'minLength') {
				return `Minimum length should be greater than 3`;
			}
			if (errors.Email && errors.Email.type == 'required') {
				return `Email is required`;
			} else if (errors.Email && errors.Email.type == 'pattern') {
				return `Valid Email is required`;
			}
		}
	};

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
				<Stack direction='row' spacing={2} alignItems='center'>
					<Avatar sx={{ bgcolor: deepOrange[500] }} variant='square'>
						N
					</Avatar>
					<h3 style={{ color: '#1976d2' }}> ADD NEW USER</h3>
				</Stack>
				<FormContainer>
					<form onSubmit={handleSubmit(addUserData)}>
						<Stack direction='column' spacing={1} alignItems='center'>
							<input
								type='text'
								placeholder='Firstname'
								{...register('Firstname', {
									required: true,
									minLength: 3,
								})}
							/>
							<input
								type='text'
								placeholder='Lastname'
								{...register('Lastname', {
									required: true,
									minLength: 3,
								})}
							/>
							<input
								type='text'
								placeholder='Email'
								{...register('Email', {
									required: true,
									pattern: /^\S+@\S+$/i,
								})}
							/>

							<SubmitButton
								variant='outlined'
								size='medium'
								type='submit'
								className='submit-btn'
							>
								{adding ? (
									<SmallLoader>
										<Loader size={20} /> Adding..
									</SmallLoader>
								) : (
									'ADD'
								)}
							</SubmitButton>
							<p className='errorClass'>{handleErrors()}</p>
							<div></div>
						</Stack>
					</form>
					{/* <Stack direction='column' spacing={4} alignItems='center'>
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
						</Stack> */}
					{/* <ActionButtonContainer>
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
								variant='outlined'
								size='medium'
								type='submit'
								className='submit-btn'
							>
								{adding ? (
									<SmallLoader>
										<Loader size={20} /> Adding..
									</SmallLoader>
								) : (
									'ADD'
								)}
							</SubmitButton>
						</ActionButtonContainer> */}
				</FormContainer>
			</UserCardContainer>
		</>
	);
};
