import React from 'react';
import { useState } from 'react';
import addSearch from './components/AddSearch';

import './App.css';

function App() {
  const [inputTerm, setInputTerm] = useState('');


  return (
      <AddSearch />
  );
}

export default App;
