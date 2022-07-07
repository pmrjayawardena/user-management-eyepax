import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { SpinnerContainer } from './LoaderStyle';
const Loader = () => {
	return (
		<SpinnerContainer>
			<CircularProgress />
		</SpinnerContainer>
	);
};

export default Loader;
