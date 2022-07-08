import styled from 'styled-components';

export const UserCardContainer = styled.nav`
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 3rem;
`;

export const FormContainer = styled.div`
	margin-top: 2rem;
`;

export const SmallLoader = styled.div`
	display: flex;
	margin-left: 10px;
	align-items: center;
	font-size: 13px;
	gap: 10px;
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
	height: 30px;
	border-radius: 4px;
	width: 100px;
	background: #2e7d32;
	color: #fff;
	font-size: 12px;
	cursor: pointer;
`;
