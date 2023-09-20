import React from 'react'
import { Box, Grid } from '@mui/material'

const MainWrapperSideMenu = (props) => {
  const {children, alignItems, sx, stickyMenu} = props;

  return (
    <Grid
      className="MainWrapperSideMenu container"
      container
      sx={{
        justifyContent:'center',
        alignItems: alignItems ? alignItems : 'inherit'
      }}
    >
      <Grid
        className="MainWrapperSideMenu item"
        item
        sx={sx ? sx : 0}
        xs={11.5}
        sm={10}
        lg={8}
      >
        <Grid
          container
          sx={{

          }}
        >
          <Grid
            sx={{
              position:'relative',
              p:2,
              width:100
            }}
            xs="auto"
          >
            <Box
              sx={{
                borderRadius:3,
                background:'#fff',
                boxShadow:'0 0 10px #00000030',
                position: stickyMenu ? 'sticky' : 'relative',
                top: stickyMenu ? 136 : 0,  
              }}
            >
              {children[0]}
            </Box>
          </Grid>
          <Grid
            xs
          >
            <Grid
              container
              sx={{
                p:2,
                justifyContent:'center',
                alignItems: alignItems ? alignItems : 'inherit'
              }}
            >
            {children[1]}

            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  )
}

export default MainWrapperSideMenu;