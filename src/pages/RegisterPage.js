import React from 'react'
import RegisterLive from '../components/auth/RegisterLive'
import RegisterStaging from '../components/auth/RegisterStaging'
import MainPageTemplate from './MainPageTemplate';

const RegisterPage = () => {
  const currentEnv = process.env.REACT_APP_CURRENT_ENV

  return (
    <MainPageTemplate title="Registration">
      {currentEnv == "STAGING" ? <RegisterStaging /> : <RegisterLive />}
    </MainPageTemplate>
  )
}

export default RegisterPage;
