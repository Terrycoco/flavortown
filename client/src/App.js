import React, { Fragment } from 'react';
import './App.css';
//components
import ErrorBoundary from "./components/errorBoundary";
//import ItemsList from './components/itemsList';
//import ItemInput from "./components/itemInput";
import Autocomplete from "./components/autocomplete";

// const data = [
// {id: 1, name: "item 1"}, 
// {id: 2, name: "item 2"}, 
// {id: 3, name: "whatever"}
// ];

function App() {

  return (
    <Fragment>
     <ErrorBoundary>
      <div className="App">
        <h1>FlavorWorld!</h1>
          <Autocomplete />
      </div>
      </ErrorBoundary>
    </Fragment>
  );
}

export default App;
