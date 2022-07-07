import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './SingleUser.css';
import Input from '@mui/material/Input';
import { CustomButton } from '../UI/Button/Button';
const ariaLabel = { 'aria-label': 'description' };
import Loader from '../UI/Loader/Loader';
import { Toast } from '../UI/Toast/Toast';
import { ToastContainer, toast } from 'react-toastify';

export const SingleUser = () => {
	let { id } = useParams();
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const getUser = async () => {
		setLoading(true);
		const data = await axios.get(`https://reqres.in/api/users/${id}`);
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
		const data = await axios.put(`https://reqres.in/api/users/${id}`, {
			first_name: firstName,
			last_name: lastName,
		});

		console.log(data);
	};
	const handleFormSubmit = (e) => {
		e.preventDefault();
		updateUserData();
		console.log('form submitted');
		Toast('Updated Successfully');
	};

	useEffect(() => {
		getUser();
	}, [id]);

	return loading ? (
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
			<div className='single-user-card'>
				<Card sx={{ maxWidth: 345 }}>
					<CardActionArea>
						<CardMedia
							component='img'
							image={user.avatar}
							alt={user.first_name}
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

				<form onSubmit={handleFormSubmit}>
					<label>
						<Input
							value={firstName}
							inputProps={ariaLabel}
							onChange={handleInputChange}
						/>
					</label>
					<br />
					<label>
						<Input
							value={lastName}
							inputProps={ariaLabel}
							onChange={handleInputChangeLastName}
						/>
					</label>
					<div className='action-btn'>
						<Link to={`/`}>
							<CustomButton variant='outlined' size='medium'>
								Go back
							</CustomButton>
						</Link>
						<button
							variant='outlined'
							size='medium'
							type='submit'
							className='submit-btn'
						>
							update
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
