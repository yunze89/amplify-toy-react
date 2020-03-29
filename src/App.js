import React from 'react';
import logo from './logo.svg';
import './App.css';

import Login from './components/login'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/*login component*/}
        <Login></Login>
      </header>
    </div>
  );
}

export default App;
