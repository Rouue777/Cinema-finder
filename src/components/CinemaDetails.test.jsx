
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CinemaDetails from './CinemaDetails';
import {
  CinemaSelectionProvider,
  useCinemaSelection,
} from './CinemaSelection/context';

const mockCinema = {
  name: 'BCC Cinema Townsville Central',
  address: '10 Little Fletcher Street\nTownsville, QLD 4810',
  phoneNumber: '+61(0)7-4431-1500',
  lat: -19.2671078,
  lng: 146.8114545,
};


const TestComponent = ({ cinema = mockCinema }) => {
  const { selectedCinema, setSelectedCinema } = useCinemaSelection();

  return (
    <>
      <CinemaDetails />

      <button onClick={() => setSelectedCinema(cinema)}>
        Selecionar cinema
      </button>

      <span data-testid="selection-status">
        {selectedCinema ? 'Cinema selecionado' : 'Nenhum cinema selecionado'}
      </span>
    </>
  );
};


describe('CinemaDetails', () => {
  test('should not render when there is no selected cinema', () => {
    render(
      <CinemaSelectionProvider>
        <TestComponent />
      </CinemaSelectionProvider>
    );

    expect(screen.queryByText(mockCinema.name)).not.toBeInTheDocument();
  });

  test('should display the selected cinema information', () => {
    render(
      <CinemaSelectionProvider>
        <TestComponent />
      </CinemaSelectionProvider>
    );

    userEvent.click(screen.getByRole('button', {
      name: 'Selecionar cinema',
    }));

    expect(screen.getByText(mockCinema.name)).toBeInTheDocument();
    expect(screen.getByText(/10 Little Fletcher Street/)).toBeInTheDocument();
    expect(screen.getByText(/Latitude: -19.2671078/)).toBeInTheDocument();
    expect(screen.getByText(/Longitude: 146.8114545/)).toBeInTheDocument();
  });

  test('should display the phone number as a telephone link', () => {
    render(
      <CinemaSelectionProvider>
        <TestComponent />
      </CinemaSelectionProvider>
    );

    userEvent.click(screen.getByRole('button', {
      name: 'Selecionar cinema',
    }));

    const phoneLink = screen.getByRole('link', {
      name: mockCinema.phoneNumber,
    });

    expect(phoneLink).toHaveAttribute(
      'href',
      `tel:${mockCinema.phoneNumber}`
    );
  });



test('should display fallback when address is missing', () => {
  const cinemaWithoutAddress = {
    ...mockCinema,
    address: '',
  };

  render(
    <CinemaSelectionProvider>
      <TestComponent cinema={cinemaWithoutAddress} />
    </CinemaSelectionProvider>
  );

  userEvent.click(screen.getByRole('button', {
    name: 'Selecionar cinema',
  }));

  expect(screen.getByText('Endereço não informado')).toBeInTheDocument();
});



test('should display fallback when phone number is missing', () => {
  const cinemaWithoutPhone = {
    ...mockCinema,
    phoneNumber: '',
  };

  render(
    <CinemaSelectionProvider>
      <TestComponent cinema={cinemaWithoutPhone} />
    </CinemaSelectionProvider>
  );

  userEvent.click(screen.getByRole('button', {
    name: 'Selecionar cinema',
  }));

  expect(screen.getByText('Telefone não informado')).toBeInTheDocument();

  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});


});
