import styled from 'styled-components';

export const UserContainer = styled.nav`
	margin-top: 5rem;
	width: 80%;
	margin: auto;
`;

export const ActionButtonContainer = styled.nav`
	display: flex;
	gap: 10px;
	justify-content: flex-end;
	a {
		text-decoration: none;
	}
`;

export const SearchBoxContainer = styled.nav`
	display: flex;
	justify-content: flex-end;
`;

export const DeleteButton = styled.button`
	border: 1px solid red;
	background: transparent;
	padding: 6px 10px;
	border-radius: 4px;
	font-size: 14px;
	color: red;
	cursor: pointer;
`;

// .user-item {
// 	display: flex;
// 	align-items: center;
// 	justify-content: space-between;
// }

// .custom-btn {
// 	background: #aef5ae;
// 	padding: 6px 10px;
// 	border-radius: 6px;
// 	font-size: 13px;
// }
