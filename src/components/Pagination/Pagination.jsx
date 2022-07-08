import React from 'react';
import './PaginationStyle.jsx';
import { PaginateContainer, PageItemList } from './PaginationStyle';

export const Pagination = ({ totalUsers, paginate, pageNumber, totalPages }) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalPages); i++) {
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
