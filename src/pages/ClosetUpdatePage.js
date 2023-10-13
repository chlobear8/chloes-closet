import React, { useState, useEffect } from 'react'
import {db} from '../firebase';
import { collection, collectionGroup, getDocs, onSnapshot, orderBy, query, where } from '@firebase/firestore';
import { useAuth } from '../context/authContext';
import ClosetUpdate from '../components/closets/ClosetUpdate';
import ClosetUpdateUserTemplate from '../components/closets/ClosetUpdateUserTemplate'
import Loading from '../components/ui/Loading';
import { useParams } from 'react-router-dom';
import MainPageTemplate from './MainPageTemplate';
import { useGetCategory, useGetCloset } from '../hooks/mutations';


const ClosetUpdatePage = () => {
  const { closetId } = useParams();
  const categories = useGetCategory('userId');
  const closet = useGetCloset(closetId);

  return (
    <MainPageTemplate title="Closet Update" hideNav>
      {closetId
        ?
        closet
            ?
              <ClosetUpdateUserTemplate
                categories={categories}
                initCloset={closet}
              />
            :
              <Loading
                bars={4}
                barHeight={60}
                barWidth4="70%"
                totalWidth="50%"
              />

        :
          <ClosetUpdateUserTemplate
          categories={categories}
          initCloset={closet}
          />
      }

    </MainPageTemplate>
  )
}

export default ClosetUpdatePage;