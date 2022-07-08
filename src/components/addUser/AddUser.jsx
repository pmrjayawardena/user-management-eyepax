import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CustomButton } from '../UI/button/Button';
const ariaLabel = { 'aria-label': 'description' };
import Loader from '../UI/loader/Loader';
import { Toast } from '../UI/toast/Toast';
import { ToastContainer } from 'react-toastify';
import { addUser } from '../../requests/UserRequest';
import { SpinnerContainer } from '../UI/loader/LoaderStyle';
import TextField from '@mui/material/TextField';
import {
	UserCardContainer,
	SubmitButton,
	ActionButtonContainer,
	FormContainer,
	SmallLoader,
} from './AddUserStyle';

export const AddUser = () => {
	let { id } = useParams();
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [adding, setAdding] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

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
	const addUserData = async () => {
		if (firstName != '' && lastName != '' && email != '') {
			setAdding(true);
			const data = await addUser({
				first_name: firstName,
				last_name: lastName,
				email: email,
			});
			setAdding(false);
		} else {
			Toast('Please check your input feilds');
			setAdding(false);
		}

		setAdding(false);

		Toast('User added Successfully');
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		addUserData();
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
				<FormContainer>
					<form onSubmit={handleFormSubmit}>
						<TextField
							label='Firstname'
							color='primary'
							focused
							placeholder='Firstname'
							value={firstName}
							inputProps={ariaLabel}
							onChange={handleInputChange}
							size='small'
						/>

						<br />
						<br />
						<TextField
							label='Lastname'
							color='primary'
							focused
							placeholder='Lastname'
							value={lastName}
							inputProps={ariaLabel}
							onChange={handleInputChangeLastName}
							size='small'
						/>
						<br />
						<br />
						<TextField
							label='Email'
							color='primary'
							focused
							placeholder='Email'
							value={email}
							inputProps={ariaLabel}
							onChange={handleInputChangeEmail}
							size='small'
						/>

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
									'Add'
								)}
							</SubmitButton>
						</ActionButtonContainer>
					</form>
				</FormContainer>
			</UserCardContainer>
		</>
	);
};
