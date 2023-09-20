import React from 'react'
import { Grid } from '@mui/material'

const MainWrapper = (props) => {
  const {children, alignItems, style} = props;

  return (
    <Grid
      className="MainWrapper container"
      container
      sx={{
        justifyContent:'center',
        alignItems: alignItems ? alignItems : 'inherit'
      }}
    >
      <Grid
        className="MainWrapper item"
        item
        sx={style ? style : {}}
        xs={11.5}
        sm={10}
        lg={8}
      >
        {children}
      </Grid>
    </Grid>
  )
}

export default MainWrapper;