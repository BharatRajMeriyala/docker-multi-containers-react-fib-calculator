import React from 'react';
import { Link } from 'react-router-dom';

//
import logo from './logo.svg';
import './App.css';

//
const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Changed ~~~</h1>
      <Link to="/"> Home </Link>
      <Link to="/other-page"> OTHER PAGE </Link>
    </header>
  );
};

export default Header;
