import React from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import SiteLogo from './SiteLogo';
import MapTypeMenu from './MapTypeMenu';

const TopBar = () => (
  <AppBar position="static" elevation={0}>
    <Container maxWidth="xl">
      <Toolbar
        disableGutters
        sx={{
          minHeight: 72,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <SiteLogo />

        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          Cinema Finder
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <MapTypeMenu />
      </Toolbar>
    </Container>
  </AppBar>
);

export default TopBar;