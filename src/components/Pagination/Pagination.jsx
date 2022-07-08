import React from 'react';
import './PaginationStyle.jsx';
import { PaginateContainer, PageItemList } from './PaginationStyle';

export const Pagination = ({ usersPerPage, totalUsers, paginate, pageNumber }) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<PaginateContainer>
			{pageNumbers.map((number) => {
				return (
					<PageItemList
						key={number}
						className={`page-item ${pageNumber == number ? 'active' : ''}`}
						onClick={() => paginate(number)}
					>
						<span className='page-link'>{number}</span>
					</PageItemList>
				);
			})}
		</PaginateContainer>
	);
};
