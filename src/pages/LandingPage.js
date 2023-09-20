import React from 'react'
import Landing from '../components/landing/Landing'
import MainPageTemplate from './MainPageTemplate'

const LandingPage = () => {
  return (
    <MainPageTemplate title="Welcome" background="#fcfcfc">
      <Landing />
    </MainPageTemplate>
  )
}

export default LandingPage;