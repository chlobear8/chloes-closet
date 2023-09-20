import React, { useEffect, useState } from 'react';
import { Box, Button, FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material';
import { useAuth } from '../../context/authContext';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
//import { useTheme } from '@emotion/react';
import MainWrapper from '../templates/MainWrapper';
//import { BgGraphic01 } from '../../assets/graphics';
//import { Logo } from '../../assets/logos';


const LoginStaging = (props) => {
  const { title, content, setAuthenticated, bgColor } = props;

  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [reset, setReset] = useState();
  const [user, setUser] = useState({});

  const auth = getAuth();
  //const theme = useTheme();
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext.account) {
      navigate('/home');
    }

  }, [authContext.account])

  const userLogin = async () => {
    try {
      authContext.loginUser(loginEmail, loginPassword);
      authContext.getAccount();
      
    } catch (error) {
      console.log('Error logging in user', error);
    }
  }

  const recoverPassword = () => {
    try {
      return sendPasswordResetEmail(auth, loginEmail);
    } catch (error) {
      console.log('Error resetting password', error);
    }
  }


  const handlePasswordReset = () => {
    setReset(!reset);
  }

  const LoginButton = (props) => {
    const { email, name, type } = props;

    return (
      <Button
        onClick={() => studentLogin(email, 'opine123')}
        color={type === "student" ? 'primary' : 'secondary'}
        sx={{
          px:1,
          py:.5,
          fontSize:12
        }}
      >
        {name}
      </Button>
    )
  }

  // const LoginRealButton = (props) => {
  //   const { email, name, type } = props;

  //   return (
  //     <Button
  //       onClick={() => studentLogin(email, 'opineschool')}
  //       color={type === "student" ? 'primary' : 'secondary'}
  //       sx={{
  //         px:1,
  //         py:.5,
  //         fontSize:12
  //       }}
  //     >
  //       {name}
  //     </Button>
  //   )
  // }


  return (
    <Grid
      container
      sx={{
        backgroundColor:'background.main'
      }}
    >
      <MainWrapper>

        <Grid
          container
          sx={{
            position:'relative',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh',
            zIndex:100
          }}
        >
          <Grid
            item
            sx={{
              mt:-10
            }}
            xs={12}
            sm={10}
            md={8}
          >
            <Grid
              container
              sx={{
                justifyContent:'center',
                mb:6
              }}
                xs={12}
            >
              <Link
                to="/"
              >
                <Logo
                  mt={7}
                  width='300px'
                  color1={theme.palette.brand.five}
                  color2={theme.palette.background.main}
                  color3={theme.palette.brand.five}
                  color4={theme.palette.brand.five}
                />
              </Link>
            </Grid>
            <Grid
              container
              sx={{
                justifyContent:'center',
                backgroundColor:'#fff',
                borderRadius:3,
                p:2,
                boxShadow:'0 0 10px #00000050'
              }}
                xs={12}
            >
              <Grid
                container
                justifyContent="center"
                sx={{
                  gap:1,
                  p:3,
                }}
                xs={12}
              >
                <Grid
                  item
                  xs={12}
                >
                  <Grid
                    container
                    justifyContent="space-between"mb={1}
                  >
                    <Typography sx={{fontSize:12, fontWeight:600, backgroundColor:'#444', color:'#fff', px:1}}>TEACHERS</Typography>
                    <Grid
                      container
                      sx={{
                        width:'100%',
                        border:'1px solid #444',
                        p:1,
                        mb:1
                      }}
                    >
                    </Grid>

                    <Typography sx={{fontSize:12, fontWeight:600, backgroundColor:'#444', color:'#fff', px:1}}>STUDENTS</Typography>
                    <Grid
                      container
                      sx={{
                        width:'100%',
                        border:'1px solid #444',
                        p:1,
                        mb:1
                      }}
                    >
                    </Grid>

                    <Typography sx={{fontSize:12, fontWeight:600, backgroundColor:'#444', color:'#fff', px:1}}>DEVELOPERS</Typography>
                    <Grid
                      container
                      sx={{
                        width:'100%',
                        border:'1px solid #444',
                        p:1,
                        mb:1
                      }}
                    >
                    </Grid>
                  </Grid>
                  <TextField
                    label="Email"
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </Grid>
                {!reset ? (
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      label="Password"
                      type="password"
                      fullWidth
                      sx={{
                        mt:1
                      }}
                      InputLabelProps={{ shrink: true }}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </Grid>

                ) : (
                  <Typography>Enter your email and we will send you a recovery email if your email has an account at Opine.</Typography>
                )}
                <Grid
                  item
                  xs={12}
                >

                  <Button variant="contained" color="primary" fullWidth sx={{p:2}} onClick={reset ? recoverPassword : userLogin}>
                    {reset ? 'Reset password' : 'Login'}
                  </Button>

                </Grid>
                <FormControlLabel
                  value="end"
                  control={<Switch checked={reset} onChange={handlePasswordReset} color="primary" />}
                  label="I forget my password"
                  labelPlacement="end"
                />
              </Grid>


            </Grid>
          </Grid>
        </Grid>

      </MainWrapper>
      <Box
        sx={{
          position:'fixed',
          width:'100%',
          maxHeight:'100%',
          bottom:0,
          zIndex:10
        }}
      >
        <BgGraphic01
          width="100%"
          height="100%"
          stop1={theme.palette.brandPastel.eight}
          stop2={theme.palette.brandPastel.ten}
        />
      </Box>
    </Grid>
  );
}

export default LoginStaging;
