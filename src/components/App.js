import React from 'react';
import Header from './Header';
import './App.css';
import ClosetControl from './ClosetControl';
import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/sign-in" element= {<SignIn/>} />
        <Route path="/" element= {<ClosetControl />} />
      </Routes>
    </Router>
  );
}

export default App;
