/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Fragment} from 'react';
import logo from '../images/flavorworldNoText.png';

const Navbar = () => {
  return (
<Fragment>
   <div className="container-fluid logo-header d-flex" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
    <img alt="" src={logo} className="logo align-self-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" />
     <span className="logo-text align-self-center" id="offcanvasExampleLabel" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">FlavorWorld</span>
    </div>
 
<div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  

  <div className="d-flex logo-header justify-content-between" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
    <div className="d-flex justify-content-start align-items-center">
      <img alt="" src={logo} className="logo" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" />
      <h5 className="logo-text align-self-center" id="offcanvasExampleLabel" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">FlavorWorld</h5>
    </div>
    <button type="button" className="logo-close btn-close text-reset justify-self-end align-self-start" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>



  <div className="offcanvas-body">
    <div className="list-group">
      <a className="list-group-item" href="/edit">Editor</a>
      <a className="list-group-item" href="/">Flavor Finder</a>
    </div>
  </div>


</div>

     </Fragment>
  )
};

export default Navbar;