import React from 'react';
import Header from './Header';
import './App.css';
import ClosetControl from './ClosetControl';
import SignIn from "./auth/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import CalendarView from './CalendarView';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/sign-in" element= {<SignIn />} />
        <Route path="/" element= {<ClosetControl />} />
        {/* <Route path="/calendar-view" element= {<CalendarView />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
