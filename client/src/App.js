import React, { Fragment } from 'react';
import './App.css';
//import useToggle from './useToggle';


//components
import ErrorBoundary from "./components/errorBoundary";

//import ItemsList from './components/itemsList';
//import ItemInput from "./components/itemInput";
import Autocomplete from "./components/autocomplete";



const App = () => {
 // const [open, setOpen] = useToggle(true);

  return (
    <Fragment>

     <ErrorBoundary>
      <div className="App">

        <h1>FlavorWorld!</h1>


      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">
  Launch demo modal
</button>
  
     <Autocomplete />

      </div>
      </ErrorBoundary>
   
    </Fragment>
  );
}

export default App;
