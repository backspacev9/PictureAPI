import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('test App', () => {
  test('Click link', () => {
    render(
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    );
    //screen.debug();
    const app = screen.getByTestId('App');

    expect(app).toBeInTheDocument();
  });
});
