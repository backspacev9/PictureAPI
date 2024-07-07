import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { Header } from '../components/header/header';
import App from '../App';

describe('test navigate', () => {
  test('Click link', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    //screen.debug();
    const linkMain = screen.getByTestId('main-link');
    const linkAbout = screen.getByTestId('about-link');

    userEvent.click(linkMain);
    expect(screen.getByTestId('mainPage')).toBeInTheDocument();
    userEvent.click(linkAbout);
    expect(screen.getByText(/This Page About/i)).toBeInTheDocument();
  });
});
