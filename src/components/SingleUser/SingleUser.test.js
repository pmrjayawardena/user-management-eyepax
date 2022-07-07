import { fireEvent, render, screen } from '@testing-library/react';
import SingleUser from './SingleUser';

test('renders learn react link', () => {
	render(<SingleUser />);
	const firstNameInputEl = screen.getByPlaceholderText('firstName');
	const testValue = 'test';
	fireEvent.change(firstNameInputEl, { target: { value: testValue } });
	expect(firstNameInputEl.value).toBe(testValue);
	// const inputElementFirstName =  screen.
});
