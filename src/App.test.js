
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useHistory } from 'react-router-dom';

import App from './App';

// Simplifica os componentes visuais que não são o foco dos testes.
jest.mock('./components/Provider', () => ({ children }) => children);
jest.mock('./components/Layout', () => ({ children }) => <div>{children}</div>);
jest.mock('./components/Map', () => ({ children }) => <div>{children}</div>);

jest.mock('./components/AsideIndex', () => () => (
  <div>Lista inicial de cinemas</div>
));

jest.mock('./components/CinemaList', () => ({
  FranchiseCinemasList: () => <div>Lista de franquias</div>,
  NearbyCinemasList: () => <div>Lista de cinemas próximos</div>,
}));

// Substitui o carregamento dinâmico por um marcador controlável.
jest.mock('@loadable/component', () => {
  const React = require('react');

  return () => {
    return function MockCinemaMarkers() {
      const { useCinemaSelection } = require(
        './components/CinemaSelection/context'
      );
      const cinemas = require('./data/cinemas').default;
      const { setSelectedCinema } = useCinemaSelection();

      return (
        <button onClick={() => setSelectedCinema(cinemas[0])}>
          Selecionar cinema no mapa
        </button>
      );
    };
  };
});

const NavigationControl = () => {
  const history = useHistory();

  return (
    <button onClick={() => history.push('/nearby')}>
      Ir para cinemas próximos
    </button>
  );
};

const renderApp = () => {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <NavigationControl />
      <App />
    </MemoryRouter>
  );
};

describe('App integration', () => {
  test('should display cinema details after selecting a marker', () => {
    renderApp();

    userEvent.click(
      screen.getByRole('button', { name: 'Selecionar cinema no mapa' })
    );

    expect(screen.getByText('Endereço')).toBeInTheDocument();
    expect(screen.getByText('Coordenadas')).toBeInTheDocument();
  });

  test('should return to the cinema list after clearing selection', () => {
    renderApp();

    userEvent.click(
      screen.getByRole('button', { name: 'Selecionar cinema no mapa' })
    );

    userEvent.click(
      screen.getByRole('button', { name: 'Voltar para lista' })
    );

    expect(screen.getByText('Lista inicial de cinemas')).toBeInTheDocument();
  });

  test('should clear the selected cinema when the route changes', () => {
    renderApp();

    userEvent.click(
      screen.getByRole('button', { name: 'Selecionar cinema no mapa' })
    );

    expect(screen.getByText('Endereço')).toBeInTheDocument();

    userEvent.click(
      screen.getByRole('button', { name: 'Ir para cinemas próximos' })
    );

    expect(
      screen.getByText('Lista de cinemas próximos')
    ).toBeInTheDocument();

    expect(screen.queryByText('Endereço')).not.toBeInTheDocument();
  });
});
