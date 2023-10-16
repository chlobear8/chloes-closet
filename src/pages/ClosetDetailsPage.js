import React, { useState, useEffect } from 'react'
import {db} from '../firebase';
import { collection, collectionGroup, getDocs, onSnapshot, orderBy, query, where } from '@firebase/firestore';
import { useAuth } from '../context/authContext';
import ClosetUpdate from '../components/closets/ClosetUpdate'
import ClosetUpdateUserTemplate from '../components/closets/ClosetUpdateUserTemplate'
import Loading from '../components/ui/Loading';
import { useGetCloset, useGetClosetUserId } from '../hooks/mutations';
import { useParams } from 'react-router-dom';
import MainPageTemplate from './MainPageTemplate';
import { Grid, Typography } from '@mui/material';
import ClosetDetailsTemplate from '../components/closets/ClosetDetailsTemplate';


const ClosetDetailsPage = () => {
  const { closetId } = useParams();
  const closet = useGetCloset(closetId);

  const backLight = "#FFFFFF"
  const backMid = "#f4ebf5"
  const backDark = "#ccc0ce"

  return (
    <MainPageTemplate title="Closet Update" hideNav background={backMid}>
      {closetId
        ?
          closet
            ?
              <ClosetDetailsTemplate
                initCloset={closet}
                backLight={backLight}
                backMid={backMid}
                backDark={backDark}
              />
            :
              <Loading
                bars={4}
                barHeight={60}
                barWidth4="70%"
                totalWidth="50%"
              />

        :
          <Grid
            sx={{
              height:'80vh',
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <Typography>
              This closet does not appear to exist...
            </Typography>
          </Grid>
      }

    </MainPageTemplate>
  )
}

export default ClosetDetailsPage;