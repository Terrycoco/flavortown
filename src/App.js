import React, { Fragment  } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import './styles/App.css';


import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//components
import ErrorBoundary from "./components/errorBoundary";
import Navbar from './components/navbar';
import GlobalModal from './components/GlobalModal';

//pages
import TestPage from './pages/testPage';
import Editor from "./pages/Editor";
import FlavorFinder from './pages/FlavorFinder';

const bootstrap = require('bootstrap');


const App = () => {

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

           <GlobalModal />

    </ErrorBoundary>
  
    </Fragment>
  );
}

export default App;
