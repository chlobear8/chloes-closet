import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    <React.Fragment>
      <h1>Chloe's Closet</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link to="/calendar-view">Calendar</Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Header;