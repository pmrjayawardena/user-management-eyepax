import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './SingleUserStyle.jsx';
import { CustomButton } from '../UI/button/Button';
const ariaLabel = { 'aria-label': 'description' };
import Loader from '../UI/loader/Loader';
import { Toast } from '../UI/toast/Toast';
import { ToastContainer } from 'react-toastify';
import { updateUser, fetchAUser } from '../../requests/UserRequest';
import { SpinnerContainer } from '../UI/loader/LoaderStyle';
import TextField from '@mui/material/TextField';
import {
	UserCardContainer,
	SubmitButton,
	ActionButtonContainer,
	FormContainer,
	SmallLoader,
} from './SingleUserStyle';

export const SingleUser = ({ id }) => {
	// let { id } = useParams();
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [updating, setUpdating] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const getUser = async () => {
		setLoading(true);
		const data = await fetchAUser(id);
		setLoading(false);
		setUser(data.data.data);
		setFirstName(data.data.data.first_name);
		setLastName(data.data.data.last_name);
	};

	const handleInputChange = (event) => {
		const target = event.target.value;
		setFirstName(target);
	};

	const handleInputChangeLastName = (event) => {
		const target = event.target.value;
		setLastName(target);
	};
	const updateUserData = async () => {
		setUpdating(true);
		const data = await updateUser(
			{
				first_name: firstName,
				last_name: lastName,
			},
			id
		);

		setUpdating(false);

		Toast('Updated Successfully');
		console.log(data);
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
				<Card sx={{ maxWidth: 345 }}>
					<CardActionArea>
						<CardMedia
							component='img'
							image={user.avatar}
							alt={user.first_name}
							style={{ height: '250px', width: '250px' }}
						/>
						<CardContent>
							<Typography gutterBottom variant='h5' component='div'>
								{user.first_name} {user.last_name}
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								{user.email}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
				<FormContainer>
					<form onSubmit={handleFormSubmit}>
						<TextField
							label='Outlined primary'
							color='primary'
							focused
							placeholder='firstName'
							value={firstName}
							inputProps={ariaLabel}
							onChange={handleInputChange}
						/>

						<br />
						<br />
						<TextField
							label='Outlined primary'
							color='primary'
							focused
							placeholder='lastName'
							value={lastName}
							inputProps={ariaLabel}
							onChange={handleInputChangeLastName}
						/>

						<ActionButtonContainer>
							<Link to={`/`}>
								<CustomButton variant='outlined' size='medium'>
									Go back
								</CustomButton>
							</Link>
							<SubmitButton
								variant='outlined'
								size='medium'
								type='submit'
								className='submit-btn'
							>
								{updating ? (
									<SmallLoader>
										<Loader size={20} /> Updating..
									</SmallLoader>
								) : (
									'Update'
								)}
							</SubmitButton>
						</ActionButtonContainer>
					</form>
				</FormContainer>
			</UserCardContainer>
		</>
	);
};
