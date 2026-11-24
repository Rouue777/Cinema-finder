import React from 'react';
import { IconButton, Popover, Backdrop, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useRef, useState } from 'react';
import { MdSettings } from 'react-icons/md';
import { startCase } from 'lodash';
import { mapTypes, useMapType } from './Map';

const MapTypeMenu = () => {
  const [open, setOpen] = useState(false);
  const settingsButtonRef = useRef(null);

  const [mapType, setMapType] = useMapType();

  return (<>
    <IconButton
      ref={settingsButtonRef}
      color="inherit"
      aria-label="Configurações do mapa"
      aria-expanded={open}
      onClick={() => setOpen(true)}
      sx={{
        borderRadius: 2,
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(245, 240, 230, 0.15)',
        },
      }}
    >
      <MdSettings />
    </IconButton>
    <Backdrop
      open={open}
      sx={{ zIndex: 1000 }}
    />
    <Popover
      open={open}
      anchorEl={settingsButtonRef.current}
      onClose={() => setOpen(false)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      slotProps={{
        paper: {
          sx: {
            mt: 1,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            minWidth: 220,
          },
        },
      }}
    >
      <FormControl sx={{ p: 2 }}>
        <FormLabel sx={{ mb: 1, fontWeight: 600 }}>
          Biblioteca do mapa
        </FormLabel>

        <RadioGroup
          value={mapType}
          onChange={(evt) => setMapType(evt.target.value)}
        >
          {mapTypes.map((type) => (
            <FormControlLabel
              key={type}
              value={type}
              control={<Radio color="primary" />}
              label={startCase(type)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Popover>
  </>)
}
export default MapTypeMenu;