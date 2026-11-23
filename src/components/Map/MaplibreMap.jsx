import React, { useEffect } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { Marker, useMap } from 'react-map-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from 'maplibre-gl';
import useEventListener from '@use-it/event-listener';
import { useSnackbar } from 'notistack';
import { MapContextProvider } from './context';
import { totalBounds } from '../../data/bounds';
import maplibreglWorker from "maplibre-gl/dist/maplibre-gl-csp-worker";
import { useCinemaSelection } from '../CinemaSelection/context';
maplibregl.workerClass = maplibreglWorker;

const MaplibreMarker = ({ lat, lon, onClick }) => (
  <Marker longitude={lon} latitude={lat} anchor="bottom">
    <button
      type="button"
      onClick={onClick}
      aria-label="Select cinema"
      style={{
        cursor: 'pointer',
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: '2px solid white',
        backgroundColor: '#1976d2',
      }}
    />
  </Marker>
);

const convertBounds = ([w, s, e, n]) => ([
  // MapLibre expects bounds to be [LngLatBoundsLike](https://maplibre.org/maplibre-gl-js-docs/api/geography/#lnglatboundslike)
  // as such the are either LngLat objects in [sw, ne] order or an array of numbers in [w, s, e, n] order.
  [w, s], [e, n]
]);

const MapSnappingEventListener = () => {
  const { enqueueSnackbar } = useSnackbar();
  const map = useMap().current;
  useEventListener('map.snapTo', ({ detail: { lat, lng } }) => {
    // This hook sets up an event listener for the map.snapTo event which
    // is currently dispatched be an onClick function in CinemaListItem 
    console.log('executing `map.snapTo` event with maplibre')

    try {
      // [Docs](https://maplibre.org/maplibre-gl-js-docs/api/map/#map#flyto)
      map.flyTo({
        center: [lng, lat],
        zoom: 14,
      })
    } catch (e) {
      console.error(e);
      enqueueSnackbar('Unexpected error while attempting map navigation', { variant: 'error' });
    }
  })
  return null;
};

///context observation for change the at specifi point using the data given by marker

const CinemaSelectionListener = () => {
  const map = useMap().current;
  const { selectedCinema } = useCinemaSelection();

  useEffect(() => {
    if (!selectedCinema || !map) return;

    map.flyTo({
      center: [selectedCinema.lng, selectedCinema.lat],
      zoom: 14,
      duration: 1000,
    });
  }, [map, selectedCinema]);

  return null;
};


const MaplibreMap = ({ children }) => {
  console.log("render Maplibre map");
  return (
    <Map
      mapLib={maplibregl}
      mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=46DCXvzkGNIvqAgCljGV"
      initialViewState={{
        bounds: convertBounds(totalBounds),
      }}
      maxBounds={convertBounds(totalBounds)}
      padding={24}
    >
      <MapSnappingEventListener />
      <CinemaSelectionListener />
      <MapContextProvider value={{ Marker: MaplibreMarker }}>
        {children}
      </MapContextProvider>
    </Map>
  );
};
export default MaplibreMap;
