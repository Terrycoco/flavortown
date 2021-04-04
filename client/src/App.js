import React, { Fragment } from 'react';
import './App.css';

//components
import ItemsList from './components/itemsList';

function App() {
  return (
    <Fragment>
      <div className="App">
        <h1>FlavorWorld!</h1>
        <ItemsList />
      </div>
    </Fragment>
  );
}

export default App;
