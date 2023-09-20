import React from 'react'
import RegisterStaging from '../components/auth/RegisterStaging'
import MainPageTemplate from './MainPageTemplate';

const RegisterPage = () => {
  const currentEnv = process.env.REACT_APP_CURRENT_ENV

  return (
    <MainPageTemplate title="Registration">
      {currentEnv == <RegisterStaging />}
    </MainPageTemplate>
  )
}

export default RegisterPage;
