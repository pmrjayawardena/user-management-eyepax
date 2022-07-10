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
import { setNewUsers, setUpdatedUsers, setUsersData } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {
	UserCardContainer,
	SubmitButton,
	ActionButtonContainer,
	FormContainer,
	SmallLoader,
} from './editUserStyle';
import { useForm } from 'react-hook-form';

export const EditUser = () => {
	let { id } = useParams();
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const usersData = useSelector((state) => state.user.users);
	const updatedUsers = useSelector((state) => state.user.updatedUsers);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [updating, setUpdating] = useState(false);
	const newUsersData = useSelector((state) => state.user.newUsers);
	const [defaultValues, setDefaultValues] = useState({});
	const getUser = async () => {
		setLoading(true);
		let singleUser = usersData.filter((user) => user.id == parseInt(id));
		setUser(singleUser[0]);
		setLoading(false);
		reset({
			Firstname: singleUser[0].first_name,
			Lastname: singleUser[0].last_name,
			Email: singleUser[0].email,
		});
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: defaultValues,
	});

	const onSubmit = async (formData) => {
		if (newUsersData.length !== 0) {
			for (let upUser of newUsersData) {
				if (upUser.id === parseInt(id)) {
					upUser.first_name = formData.Firstname;
					upUser.last_name = formData.Lastname;
					upUser.email = formData.Email;
					dispatch(setNewUsers([upUser]));
				}
			}
		}
		setUpdating(true);
		const data = await updateUser(
			{
				first_name: formData.Firstname,
				last_name: formData.Lastname,
				email: formData.Email,
			},
			id
		);
		const updated = usersData.filter((item) => item.id == parseInt(id));

		if (updatedUsers.length === 0) {
			const allUpdated = [
				...updatedUsers,
				{
					id: parseInt(id),
					first_name: formData.Firstname,
					last_name: formData.Lastname,
					email: formData.Email,
				},
			];
			dispatch(setUpdatedUsers(allUpdated));
		} else {
			for (let upUser of updatedUsers) {
				if (upUser.id === parseInt(id)) {
					upUser.first_name = formData.Firstname;
					upUser.last_name = formData.Lastname;
					upUser.email = formData.Email;
					dispatch(setUpdatedUsers([upUser]));
				} else {
					const allUpdated = [
						{ ...upUser },
						{
							id: parseInt(id),
							first_name: formData.Firstname,
							last_name: formData.Lastname,
							email: formData.Email,
						},
					];
					dispatch(setUpdatedUsers(allUpdated));
				}
			}
		}

		setUpdating(false);

		Toast('Updated Successfully');
		navigate('/');
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		updateUserData();
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
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack direction='column' spacing={1} alignItems='center'>
							<input
								type='text'
								placeholder='Firstname'
								ref={register}
								{...register('Firstname', {
									required: true,
									minLength: 3,
								})}
							/>
							<input
								type='text'
								placeholder='Lastname'
								ref={register}
								{...register('Lastname', {
									required: true,
									minLength: 3,
								})}
							/>
							<input
								type='text'
								placeholder='Email'
								ref={register}
								{...register('Email', {
									required: true,
									pattern: /^\S+@\S+$/i,
								})}
							/>

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
							<p className='errorClass'>{handleErrors()}</p>
						</Stack>
					</form>
					{/* <form onSubmit={handleFormSubmit}>
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
					</form> */}
				</FormContainer>
			</UserCardContainer>
		</>
	);
};
