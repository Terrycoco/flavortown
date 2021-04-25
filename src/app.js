import React, { Fragment } from 'react';

import './styles/App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//components
import ErrorBoundary from "./components/errorBoundary";
import Navbar from './components/navbar';

//pages
import TestPage from './pages/testPage';
import Editor from "./pages/editor";
import FlavorFinder from './pages/FlavorFinder';

const App = () => {
 // const [open, setOpen] = useToggle(true);

  return (
    <Fragment>

     <ErrorBoundary>
       <div className="App min-vw-100 min-vh-100 vh-100 vw-100">
        <Navbar />
        <div className="page">
        <Router>
           <Switch>
            <Route exact path="/" component={FlavorFinder} />
            <Route path="/edit" component={Editor} />
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
