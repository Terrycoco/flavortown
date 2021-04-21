import React, { Fragment } from 'react';

import './styles/App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//components
import ErrorBoundary from "./components/errorBoundary";
import Navbar from './components/navbar';

//pages
import TestPage from './pages/testPage';
import EnterPairing from "./pages/enterPairing";
import CreateDish from './pages/createDish';

const App = () => {
 // const [open, setOpen] = useToggle(true);

  return (
    <Fragment>

     <ErrorBoundary>
       <div className="App">
        <Navbar />
        <div className="page">
        <Router>
           <Switch>
            <Route exact path="/" component={CreateDish} />
            <Route path="/edit" component={EnterPairing} />
            <Route path="/test" component={TestPage} />
           </Switch>
         </Router>
      </div>
    </div>
      </ErrorBoundary>

    </Fragment>
  );
}

export default App;
