import React from 'react';
import { render, screen } from '@testing-library/react';
// import App from '../App';
// import { BrowserRouter, MemoryRouter } from 'react-router-dom';
// import Card from '../components/card/card';
// import { cardsArray } from '../constants';

// describe('test cards', () => {
//   test('Check single card', () => {
//     const card = {
//       tittle: 'I Miss You',
//       artist: 'blink-182',
//       album: 'blink-182',
//       imgAlbum: 'Images/blink-182.jpg',
//     };
//     render(<Card {...card} />);

//     const cardName = screen.getByTestId('card');
//     expect(cardName).toBeInTheDocument();
//   });

//   test('Check all cards', () => {
//     render(
//       <BrowserRouter>
//         <App></App>
//       </BrowserRouter>
//     );
//     screen.debug();

//     const cardName = screen.getAllByTestId('card');
//     expect(cardName).toHaveLength(cardsArray.length);
//   });
// });
