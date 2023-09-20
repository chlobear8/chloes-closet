import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FeedbackPopout from '../components/feedback/FeedbackPopout';
import MainNavbar from '../components/nav/MainNavbar'

const MainPageTemplate = (props) => {
  const { children, background, title, hideNav } = props;
  const theme = useTheme();
  const location = useLocation();
  const currentPath = location.pathname;
  const currentPage = getCurrentPage(currentPath);

  function getCurrentPage(path) {
    if (path === '/closet') {
      return 'Closet';
    } else if (path === '/article') {
      return 'Articles';
    } else if (path === '/category') {
      return 'Categories';
    }
  }

  return (
    <div style={{ background: background ? background : theme.palette.backMid, minHeight: '100vh' }}>
      <Helmet>
        <title>{title ? title : `${currentPage}`} | Opine</title>
      </Helmet>
      <MainNavbar hide={hideNav ? hideNav : false} />
      <div
        style={{
          paddingTop: hideNav ? '0' : '40px'
        }}
      >
        {children}
      </div>
      <Box
        sx={{
          position: 'fixed',
          top: { sm: '50%' },
          bottom: { xs: 20 },
          right: 0,
          pointerEvents: { xs: 'inherit', sm: 'none' },
          zIndex: 5000
        }}
      >
        <FeedbackPopout />
      </Box>
    </div>
  )
}

export default MainPageTemplate;