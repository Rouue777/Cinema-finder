
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import allCinemas from '../data/cinemas';
import { useMapContext } from './Map/context';
import { useCinemaSelection } from './CinemaSelection/context';

const CinemaMarkers = () => {
  const { Marker } = useMapContext();
  const { setSelectedCinema } = useCinemaSelection();
  const params = useParams();

  const cinemas = useMemo(() => {
    if (params.franchiseId || params.countryCode) {
      const { franchiseId, countryCode } = params;

      return allCinemas.filter(cinema => {
        return (
          (franchiseId === 'all-cinemas' ||
            cinema.franchise === franchiseId) &&
          cinema.countryCode === countryCode
        );
      });
    }

    return allCinemas;
  }, [params]);

  return cinemas.map((cinema, idx) => (
    <Marker
      lat={cinema.lat}
      lon={cinema.lng}
      key={idx}
      onClick={() => {
        console.log('Cinema selecionado:', cinema);
        setSelectedCinema(cinema);
      }}
    />
  ));
};

export default CinemaMarkers;
