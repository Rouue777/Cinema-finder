
import React from 'react';
import {
  Box,
  Button,
  Divider,
  Typography,
} from '@mui/material';

import { useCinemaSelection } from './CinemaSelection/context';

const CinemaDetails = () => {
  const { selectedCinema, setSelectedCinema } = useCinemaSelection();

  if (!selectedCinema) return null;

  const { name, address, phoneNumber, lat, lng } = selectedCinema;

  return (
    <Box sx={{ p: 2 }}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => setSelectedCinema(null)}
        sx={{ mb: 2 }}
      >
        Voltar para lista
      </Button>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {name}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" color="text.secondary">
        Endereço
      </Typography>

      <Typography sx={{ mb: 2, whiteSpace: 'pre-line' }}>
        {address || 'Endereço não informado'}
      </Typography>

      <Typography variant="subtitle2" color="text.secondary">
        Telefone
      </Typography>

      {phoneNumber ? (
        <Typography
          component="a"
          href={`tel:${phoneNumber}`}
          sx={{ display: 'block', mb: 2 }}
        >
          {phoneNumber}
        </Typography>
      ) : (
        <Typography sx={{ mb: 2 }}>
          Telefone não informado
        </Typography>
      )}

      <Typography variant="subtitle2" color="text.secondary">
        Coordenadas
      </Typography>

      <Typography>
        Latitude: {lat}
      </Typography>

      <Typography>
        Longitude: {lng}
      </Typography>
    </Box>
  );
};

export default CinemaDetails;
