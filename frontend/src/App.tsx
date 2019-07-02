import React from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <NavBar/> 
      </header>
    </div>
  );
}

export default App;
