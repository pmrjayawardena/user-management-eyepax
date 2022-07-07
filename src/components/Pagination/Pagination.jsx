import React from 'react';
import './PaginationStyle.css';
export const Pagination = ({ totalPages, paginate, pageNumber }) => {
	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className='paginate-container'>
			{pageNumbers.map((number) => {
				return (
					<li
						key={number}
						className={`page-item ${pageNumber == number ? 'active' : ''}`}
						onClick={() => paginate(number)}
					>
						<span className='page-link'>{number}</span>
					</li>
				);
			})}
		</nav>
	);
};
