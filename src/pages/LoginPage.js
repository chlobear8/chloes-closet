import React from 'react'
import LoginStaging from '../components/auth/LoginStaging'
import MainPageTemplate from './MainPageTemplate';

const LoginPage = () => {
  const currentEnv = process.env.REACT_APP_CURRENT_ENV

  return (
    <MainPageTemplate title="Login">
      {currentEnv == "STAGING" ? <LoginStaging /> : <LoginStaging />}
    </MainPageTemplate>
  )
}

export default LoginPage;
