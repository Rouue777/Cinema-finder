
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  CinemaSelectionProvider,
  useCinemaSelection,
} from './context';

const mockCinema = {
  name: 'BCC Cinema Townsville Central',
  lat: -19.2671078,
  lng: 146.8114545,
  address: '10 Little Fletcher Street',
};

const TestComponent = () => {
  const { selectedCinema, setSelectedCinema } = useCinemaSelection();

  return (
    <div>
      <p data-testid="selected-cinema">
        {selectedCinema ? selectedCinema.name : 'Nenhum cinema selecionado'}
      </p>

      <button onClick={() => setSelectedCinema(mockCinema)}>
        Selecionar cinema
      </button>

      <button onClick={() => setSelectedCinema(null)}>
        Limpar seleção
      </button>
    </div>
  );
};

describe('CinemaSelectionContext', () => {
  test('should initialize with no selected cinema', () => {
    render(
      <CinemaSelectionProvider>
        <TestComponent />
      </CinemaSelectionProvider>
    );

    expect(screen.getByTestId('selected-cinema')).toHaveTextContent(
      'Nenhum cinema selecionado'
    );
  });

  test('should update selected cinema', () => {
    render(
      <CinemaSelectionProvider>
        <TestComponent />
      </CinemaSelectionProvider>
    );

    userEvent.click(screen.getByRole('button', {
      name: 'Selecionar cinema',
    }));

    expect(screen.getByTestId('selected-cinema')).toHaveTextContent(
      mockCinema.name
    );
  });

  test('should clear selected cinema', () => {
    render(
      <CinemaSelectionProvider>
        <TestComponent />
      </CinemaSelectionProvider>
    );

    userEvent.click(screen.getByRole('button', {
      name: 'Selecionar cinema',
    }));

    userEvent.click(screen.getByRole('button', {
      name: 'Limpar seleção',
    }));

    expect(screen.getByTestId('selected-cinema')).toHaveTextContent(
      'Nenhum cinema selecionado'
    );
  });

  test('should throw an error when used outside the provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'useCinemaSelection must be used within CinemaSelectionProvider'
    );

    consoleError.mockRestore();
  });
});
