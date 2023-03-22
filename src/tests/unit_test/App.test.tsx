import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../test-utils';
import { App } from '../../App';

test('renders capture button', () => {
	render(<App />);
	const buttonElement = screen.getByText(/capture/i);
	expect(buttonElement).toBeInTheDocument();
});

test('renders search button', () => {
	render(<App />);
	const searchElement = screen.getByText(/search/i);
	expect(searchElement).toBeInTheDocument();
});

test('renders empty input textbox', () => {
	render(<App />);
	const searchElement = screen.getByPlaceholderText('Search name/id');
	expect(searchElement).toBeInTheDocument();
});


