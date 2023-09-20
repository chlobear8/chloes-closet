import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import localforage from 'localforage';
import { auth, db } from '../firebase';

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [account, setAccount] = useState();
  //const [currentAssignment, setCurrentAssignment] = useState();
  const [alert, setAlert] = useState();
  const [student, setStudent] = useState();
  const [ fireAlert, setFireAlert ] = useState(true)
  const alertRef = useRef();

  // LOCAL FORAGE CONFIG FOR ACCOUNT STORE
  localforage.config({
    name        : 'accountStore',
    storeName   : 'accountStore', // Should be alphanumeric, with underscores.
  });
  const accountStore = localforage.createInstance({name: 'accountStore', storeName: 'accountStore'});
  const studentStore = localforage.createInstance({name: 'studentStore', storeName: 'studentStore'});

  useEffect(() => {
    getAccountStore();
  }, [])

  const getAccountStore = async () => {
    try {
      const accountValue = await accountStore.getItem('accountInfo');
      setAccount(accountValue);

    } catch (err) {
        // This code runs if there were any errors.
        console.log('Error setting account state:', err);
    }

    try {
      const assignmentValue = await accountStore.getItem('assignmentInfo');
      setCurrentAssignment(assignmentValue);

    } catch (err) {
        // This code runs if there were any errors.
        console.log('Error setting current assignment state:', err);
    }
  }


  // SET AN ALERT
  const handleAlert = (message) => {
    return new Promise(async (resolve, reject) => {
      try {
        // setAlert(message)
        alertRef.current = message;

        // being instantiated because useRef doesnt cause rerender -- this lets component recognize an update
        setFireAlert(!fireAlert)
        
      } catch (error) {
        reject(error);
        console.log('Error setting alert', error);
      }
    })
  }

  // UNSUBSCRIBE FUNCTION
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user)
      } else {
        setUser(false)
        accountStore.clear();
      }
    });

    return () => unsubscribe();
  })

  // START LOGOUT FUNCTION
  const logoutUser = async () => {
      try {
        await signOut(auth);
        setUser();
        setAccount();
        
      } catch (error) {
        console.log('Error logging in user', error);
      }
  }

  // START LOGIN FUNCTION
  const loginUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        setUser(credential.user);

        const userAccount = await getAccount(credential.user.uid);

        resolve(credential.user);
        
      } catch (error) {
        loginError(error.code);
        // reject(error);
        console.log('Error logging in user', error);
      }
    })
  }

  // START ERROR FUNCTION
  const loginError = (authCode) => {
    switch (authCode) {
      case "auth/invalid-email":
        return (handleAlert("Email or password is not correct"))
  
      case "auth/user-disabled":
        return (handleAlert('This user has been disabled'))
  
      case "auth/user-not-found":
        return (handleAlert("User not found"))
  
        case "auth/wrong-password":
          return (handleAlert("Email or password is not correct"))
    
      case "auth/missing-email":
        return (handleAlert("Email or password is not correct"))
  
      case "auth/too-many-requests":
        return (handleAlert("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."))
  
        default:
        return (handleAlert("There was an error logging in"))
    }
  }
  // END LOGIN FUNCTION
  

  // START ACCOUNT FUNCTION
  const getAccount = (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log('getAccount user', user);
        const docRef = doc(db, 'users', `${user}`);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setAccount(docSnap.data());
          accountStore.setItem('accountInfo', docSnap.data());
          // console.log('account retrieved', docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          // console.log("No such document!");
        }
      } catch (error) {
        reject(error);
        console.log('Error retrieving user account', error);
      }
    })
  }
  // END ACCOUNT FUNCTION

  // START UPDATE EMAIL FUNCTION
  const changeEmail = (email) => {
    return updateEmail(auth.currentUser, email);
  }
  // END UPDATE EMAIL FUNCTION

  // START UPDATE PASSWORD FUNCTION
  const changePassword = (password) => {
    return updatePassword(auth.currentUser, password);
  }
  // END UPDATE PASSWORD FUNCTION

  // START PASSWORD RECOVERY FUNCTION
  const recoverPassword = async (email) => {
    try {
      return sendPasswordResetEmail(auth.currentUser, email);
    } catch (error) {
      console.log('Error resetting password', error);
    }
  }
  // END PASSWORD RECOVERY FUNCTION

  // GETS ASSIGNMENT BY ID.  
  // const [courseState, setCourseState] = useState('id');
  // const [assignmentState, setAssignmentState] = useState('id');
  
  // const getAssignment = (courseId, assignmentId) => {
  //   const newCourseId = courseId;
  //   const newAssignmentId = assignmentId;

  //   const oldCourseId = courseState
  //   const oldAssignmentId = assignmentState

  //   if (oldAssignmentId !== newAssignmentId || oldCourseId !== newCourseId) {
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         const docRef = doc(db, 'courses', courseId, 'assignments', assignmentId);  
  //         onSnapshot(docRef, (docSnap) => {
  //           setCurrentAssignment({...docSnap.data(), id: docSnap.id})
  //           accountStore.setItem('assignmentInfo', {...docSnap.data(), id: docSnap.id});
  //         })   
  //         setCourseState(courseId);
  //         setAssignmentState(newAssignmentId);

  //       } catch (error) {
  //         reject(error);
  //         console.log('Error on getting assignment doc', error);
  //       }
  //     })}
  // }

  return (
    <>
      <authContext.Provider
        value={{
          user,
          loginUser,
          logoutUser,
          account,
          getAccount,
          changePassword,
          changeEmail,
          recoverPassword,
          currentAssignment,
          getAssignment,
          alert,
          handleAlert,
          fireAlert,
          setFireAlert,
          alertRef
        }}
      >
        {children}
      </authContext.Provider>
    </>
  )
}