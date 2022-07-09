import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Loader from '../UI/loader/Loader';
import { Toast } from '../UI/toast/Toast';
import { ToastContainer } from 'react-toastify';
import { updateUser, fetchAUser } from '../../requests/UserRequest';
import { SpinnerContainer } from '../UI/loader/LoaderStyle';
import { UserCardContainer } from './SingleUserStyle';

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
			<UserCardContainer style={{ margin: '0 20px' }}>
				<Card sx={{ maxWidth: 500 }}>
					<CardActionArea>
						<CardMedia
							component='img'
							image={user.avatar}
							alt={user.first_name}
							style={{ height: '200px', width: '100%' }}
						/>
						<CardContent>
							<p>
								{user.email} <br />
								{user.first_name} {user.last_name}
							</p>
						</CardContent>
					</CardActionArea>
				</Card>
			</UserCardContainer>
		</>
	);
};
