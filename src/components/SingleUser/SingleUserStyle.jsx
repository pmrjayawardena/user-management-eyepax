import styled from 'styled-components';

export const UserCardContainer = styled.nav`
	width: 300px;
	margin: auto;
	margin-top: 5rem;
`;

export const FormContainer = styled.div`
	margin-top: 2rem;
`;
export const ActionButtonContainer = styled.nav`
	display: flex;
	margin-top: 2rem;
	gap: 20px;
	a {
		text-decoration: none;
		color: #000;
	}
`;

export const SubmitButton = styled.button`
	border: 1px solid rgba(25, 118, 210, 0.5);
	height: 36px;
	border-radius: 4px;
	width: 100px;
	background: transparent;
	color: #1976d2;
	font-size: 16px;
	cursor: pointer;
`;
