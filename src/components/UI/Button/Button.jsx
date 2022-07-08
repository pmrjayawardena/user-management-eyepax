import React from 'react';
import Button from '@mui/material/Button';

export const CustomButton = (props) => {
	const { variant, size, color } = props;
	return (
		<Button variant={variant} size={size} color={color} style={{ fontSize: '12px' }}>
			{props.children}
		</Button>
	);
};
