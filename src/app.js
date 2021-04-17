import React, { Fragment } from 'react';
import './App.css';


//components
import ErrorBoundary from "./components/errorBoundary";


//pages
//import TestPage from './pages/testPage';
//import EnterPairing from "./pages/enterPairing";
import CreateDish from './pages/createDish';

const App = () => {
 // const [open, setOpen] = useToggle(true);

  return (
    <Fragment>

     <ErrorBoundary>
      <div className="App">

        <h1>FlavorWorld</h1>


      
           <CreateDish />
   
      </div>
      </ErrorBoundary>

    </Fragment>
  );
}

export default App;
