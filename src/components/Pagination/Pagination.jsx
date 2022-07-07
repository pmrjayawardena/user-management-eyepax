import React from 'react';
import './PaginationStyle.jsx';
import { PaginateContainer, PageItemList } from './PaginationStyle';

export const Pagination = ({ totalPages, paginate, pageNumber }) => {
	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
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
