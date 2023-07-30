import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav style={navStyles}>
          <h1 style={logoStyles}>Chloe's Closet</h1>
          <ul style={navLinksStyles}>
            <li style={navLinkStyle}>
              <Link to="/">Home</Link>
            </li>
            <li style={navLinkStyle}>
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li style={navLinkStyle}>
              <Link to="/calendar-view">Calendar</Link>
            </li>
          </ul>
        </nav>
      );
    }

    const navStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#FFC0CB',
      padding: '10px 20px',
      color: '#fff',
    };

    const logoStyles = {
      fontSize: '24px',
      fontWeight: 'bold',
      textDecoration: 'none',
    };

    const navLinksStyles = {
      listStyle: 'none',
      display: 'flex',
      gap: '20px',
    };

    const navLinkStyle = {
      textDecoration: 'none',
      color: '#FF69B4',
    };



export default Header;