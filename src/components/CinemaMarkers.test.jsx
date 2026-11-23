
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import CinemaMarkers from './CinemaMarkers';
import allCinemas from '../data/cinemas';

import {
    MapContextProvider,
} from './Map/context';

import {
    CinemaSelectionProvider,
} from './CinemaSelection/context';

const MockMarker = ({ lat, lon, onClick }) => (
    <button
        data-testid="cinema-marker"
        data-lat={lat}
        data-lon={lon}
        onClick={onClick}
    >
        Marker
    </button>
);

import { useCinemaSelection } from './CinemaSelection/context';

const SelectionStatus = () => {
    const { selectedCinema } = useCinemaSelection();

    return (
        <span data-testid="selected-cinema">
            {selectedCinema?.name || 'Nenhum cinema selecionado'}
        </span>
    );
};

const renderCinemaMarkers = (route = '/') => {
    return render(
        <MemoryRouter initialEntries={[route]}>

            <Route
                exact
                path={['/', '/:franchiseId/:countryCode']}
                render={() => (
                    <MapContextProvider value={{ Marker: MockMarker }}>
                        <CinemaSelectionProvider>
                            <CinemaMarkers />
                            <SelectionStatus />
                        </CinemaSelectionProvider>
                    </MapContextProvider>
                )}
            />

        </MemoryRouter>
    );
};

describe('CinemaMarkers', () => {
    test('should render all cinema markers when no route filters are applied', () => {
        renderCinemaMarkers('/');

        const markers = screen.getAllByTestId('cinema-marker');

        expect(markers).toHaveLength(allCinemas.length);
    });


    test('should filter cinemas by franchise and country', () => {
        const franchiseId = allCinemas[0].franchise;
        const countryCode = allCinemas[0].countryCode;

        const expectedCinemas = allCinemas.filter(cinema => (
            cinema.franchise === franchiseId &&
            cinema.countryCode === countryCode
        ));

        renderCinemaMarkers(`/${franchiseId}/${countryCode}`);

        const markers = screen.getAllByTestId('cinema-marker');

        expect(markers).toHaveLength(expectedCinemas.length);
    });

    test('should filter all cinemas by country when franchise is all-cinemas', () => {
        const countryCode = allCinemas[0].countryCode;

        const expectedCinemas = allCinemas.filter(
            cinema => cinema.countryCode === countryCode
        );

        renderCinemaMarkers(`/all-cinemas/${countryCode}`);

        const markers = screen.getAllByTestId('cinema-marker');

        expect(markers).toHaveLength(expectedCinemas.length);
    });

    test('should select the correct cinema when clicking a marker', () => {
        renderCinemaMarkers('/');

        const markers = screen.getAllByTestId('cinema-marker');
        const expectedCinema = allCinemas[0];

        userEvent.click(markers[0]);

        expect(screen.getByTestId('selected-cinema')).toHaveTextContent(
            expectedCinema.name
        );
    });

    test('should update the selected cinema when clicking another marker', () => {
        renderCinemaMarkers('/');

        const markers = screen.getAllByTestId('cinema-marker');
        const secondCinema = allCinemas[1];

        userEvent.click(markers[0]);
        userEvent.click(markers[1]);

        expect(screen.getByTestId('selected-cinema')).toHaveTextContent(
            secondCinema.name
        );
    });
});
