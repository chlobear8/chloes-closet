import React, { useState } from 'react'
import { db } from '../../firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  IconButton,
  TextField
} from '@mui/material'
import * as yup from 'yup';
import { useAuth } from '../../context/authContext';
import { Close } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { useNavigate, Link } from 'react-router-dom';
import MainWrapper from '../templates/MainWrapper';
//import { BgGraphic01 } from '../../assets/graphics';
//import { Logo } from '../../assets/logos';


const RegisterStaging = () => {
  const [registerNew, setRegisterNew] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
  });
  const [registerEmail, setRegisterEmail] = useState();
  const [registerPassword, setRegisterPassword] = useState();
  const [registerUsername, setRegisterUsername] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const auth = getAuth();
  const authContext = useAuth();
  //const theme = useTheme();
  const navigate = useNavigate();


  const handleRegistration = async () => {

      // Proceed with Firebase registration
      try {
        // Register user in Authentication database
        const newUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);

        // Add display name to Authentication database
        updateProfile(auth.currentUser, {
          displayName: registerUsername
        })

        // Create Account doc for new user with same user id and save to "users" collection
        const userRef = doc(db, 'users', newUser.user.uid );
        const userPayload = {
          id: newUser.user.uid,
          active: true,
          displayName: registerUsername || '',
          firstName: registerNew.firstName || '',
          lastName: registerNew.lastName || '',
          type: userType,
          createdAt: serverTimestamp()
        }

        await setDoc(userRef, userPayload);

        setRegisterEmail();
        setRegisterUsername();
        setRegisterPassword();
        setConfirmPassword();
        setRegisterNew({});
        navigate('/home');  
      } catch (error) {
        registerError(error.code);
        console.log('Error creating user', error);
      }
  };


  // START ERROR FUNCTION
  const registerError = (authCode) => {
    switch (authCode) {
      case "auth/email-already-in-use":
        return (authContext.handleAlert("That email is already registered to a user"))

      case "auth/invalid-email":
        return (authContext.handleAlert('That email is invalid'))

      case "auth/operation-not-allowed":
        return (authContext.handleAlert("There was an error registering"))

        case "auth/weak-password":
          return (authContext.handleAlert("Your password needs to be stronger"))

        case "auth/missing-email":
          return (authContext.handleAlert("You didn't enter an email"))

        default:
        return (authContext.handleAlert("There was an error registering"))
    }
  }
  // END REGISTRATION FUNCTION

  // YUP SETUP
  const yupSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    userName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
  })


  // VERIFICATIONS
  const [openVerification, setOpenVerification] = useState(false);
  const [verifyContent, setVerifyContent] = useState();
  const [verifySeverity, setVerifySeverity] = useState();


  // UPDATE USER STATE FROM authContext
  const initializeAccount = async () => {
    await handleRegistration();
    if(auth.currentUser) {
      authContext.getAccount(auth.currentUser.uid);
    } else {
      console.log('user registration failed')
    }
  }


  // SET AUTH STATE CHANGE FUNCTIONALITY
  onAuthStateChanged(auth, (currentUser) => {
    // setUser(currentUser);
    authContext.getAccount();
  });
  //END AUTH STATE CHANGE FUNCTIONALITY

  // SHOW PASSWORD FUNCTIONALITY
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (e) => {
    setShowPassword(e.target.checked);
  }


  return (
    <Grid
      container
      sx={{
        backgroundColor:'background.main'
      }}
    >
      <>

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
            sx={{
              mt:-10
            }}
            xs={12}
            sm={10}
            md={8}
          >
            <Grid
              container
              href="/"
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
            sx={{
              justifyContent:'center',
            }}
            xs={12}
          >
            <Grid
              container
              justifyContent="center"
              sx={{
                gap:1,
                p:3,
                pt:0
              }}
              xs={12}
            >
              <Grid
                item
                xs={12}
              >
                <TextField
                  // disabled
                  label="First Name"
                  variant="standard"
                  fullWidth
                  value={registerNew?.firstName}
                  onChange={(e) => setRegisterNew({...registerNew, firstName: e.target.value})}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  label="Last Name"
                  variant="standard"
                  fullWidth
                  value={registerNew?.lastName}
                  onChange={(e) => setRegisterNew({...registerNew, lastName: e.target.value})}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="standard"
                  fullWidth
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="standard"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid
                item
                sx={{
                  display:'flex',
                  justifyContent:'center'
                }}
                xs={12}
              >
                <FormControlLabel
                  value={showPassword}
                  control={<Checkbox checked={showPassword} onChange={(e) => handleShowPassword(e)} />}
                  label="Show Password"
                  labelPlacement="end"
                />
              </Grid>

              <Collapse in={openVerification}>
                <Alert
                  severity={verifySeverity}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenVerification(false);
                      }}
                    >
                      <Close fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mt:1, mb: 2 }}
                >
                  {verifyContent}
                </Alert>
              </Collapse>

              <Grid
                item
                xs={12}
              >
                <Button
                  onClick={initializeAccount}
                >
                  {registerNew.firstName && registerNew.lastName && registerPassword && registerPassword === confirmPassword ? 'Register' : 'Fill out all fields'} 
                </Button>
              </Grid>
            </Grid>
          </Grid>

          </Grid>
          </Grid>
        </Grid>

      </>
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

export default RegisterStaging;
