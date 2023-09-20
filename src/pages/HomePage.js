import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import { collection, collectionGroup, getDocs, onSnapshot, orderBy, query, where } from '@firebase/firestore';
// import { useTheme } from '@emotion/react'
// import { useMediaQuery } from '@mui/material'
import { useAuth } from '../context/authContext';
import Loading from '../components/ui/Loading';
import UserDashboardSideMenu from '../components/users/UserDashboardSideMenu';
import { useGetClosets, useGetArticlesUserId, useGetCategoryUserId } from '../hooks/mutations';
import MainPageTemplate from './MainPageTemplate';

const HomePage = () => {
  const authContext = useAuth();
  const closets = useGetClosets('userId');
  const categories = useGetCategoryUserId();
  const articles = useGetArticlesUserId();

  useEffect(() => {
    if (authContext.account) {
      authContext.getAccount(authContext.user.id);
    }
  }, [authContext.account])


  return (
    <MainPageTemplate title="Closet Update">
      {categories ? (
        <UserDashboardSideMenu
          closets={closets}
          categories={categories}
          articles={articles}
        />
      ) : (
        <Loading
          bars={4}
          barHeight={60}
          barWidth4="70%"
          totalWidth="50%"
        />
      )}
    </MainPageTemplate>
  )
}

export default HomePage;
