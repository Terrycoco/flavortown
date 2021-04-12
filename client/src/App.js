import React, { Fragment } from 'react';
import './App.css';
//import useToggle from './useToggle';


//components
import ErrorBoundary from "./components/errorBoundary";


//pages
import EnterPairing from "./pages/enterPairing";

//import ItemsList from './components/itemsList';
//import ItemInput from "./components/itemInput";
//import Autocomplete from "./components/autocomplete";



const App = () => {
 // const [open, setOpen] = useToggle(true);

  return (
    <Fragment>

     <ErrorBoundary>
      <div className="App">

        <h1>FlavorWorld</h1>


  
     <EnterPairing />

      </div>
      </ErrorBoundary>
   
    </Fragment>
  );
}

export default App;
