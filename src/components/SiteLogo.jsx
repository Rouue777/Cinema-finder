import React from 'react';
import { SvgIcon } from '@mui/material';
import { GiFilmProjector } from 'react-icons/gi';

const SiteLogo = (props) => (
  <SvgIcon
    component={GiFilmProjector}
    inheritViewBox
    fontSize="large"
    sx={{ mr: 1 }}
    {...props}
  />
);

export default SiteLogo;