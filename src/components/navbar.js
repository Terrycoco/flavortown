/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Fragment} from 'react';
import logo from '../images/flavorworldNoText.png';

const Navbar = () => {
return (
  <Fragment>
<div className="navbar mw-100 h-5">
   <div className="container-fluid h-100 logo-header d-flex justify-content-start" 
        type="button" 
        data-bs-toggle="offcanvas" 
        data-bs-target="#offcanvasExample" 
        aria-controls="offcanvasExample">
            <img alt="" 
                src={logo} 
                className="logo align-self-center" 
                type="button" 
                data-bs-toggle="offcanvas" 
                data-bs-target="#offcanvasExample" 
                aria-controls="offcanvasExample" />
             <span 
                className="logo-text align-self-center" 
                id="offcanvasExampleLabel" 
                type="button" 
                data-bs-toggle="offcanvas" 
                data-bs-target="#offcanvasExample" 
                aria-controls="offcanvasExample">FlavorWorld</span>
    </div>
 </div>
<div className="offcanvas offcanvas-start" 
     tabIndex="-1" 
     id="offcanvasExample" 
     aria-labelledby="offcanvasExampleLabel">
  
    <div className="navbar h-7 mw-100">
      <div className="d-flex mw-100 logo-header justify-content-between" 
           type="button" 
           data-bs-toggle="offcanvas" 
           data-bs-target="#offcanvasExample" 
           aria-controls="offcanvasExample">
          <div className="d-flex justify-content-start align-items-center">
               <img alt="" 
                    src={logo} 
                    className="logo" 
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#offcanvasExample" 
                    aria-controls="offcanvasExample" />
               <h5 className="logo-text align-self-center" 
                   id="offcanvasExampleLabel" 
                   type="button" 
                   data-bs-toggle="offcanvas" 
                   data-bs-target="#offcanvasExample" 
                   aria-controls="offcanvasExample">
                   FlavorWorld
               </h5>
          </div>
         
   </div>
   <button 
               type="button" 
               className="logo-close btn-close text-reset justify-self-end align-self-start" 
               data-bs-dismiss="offcanvas" 
               aria-label="Close">
          </button>
</div>


  <div className="offcanvas-body">
    <div className="list-group">
      <a className="list-group-item" href="/edit">Editor</a>
      <a className="list-group-item" href="/">Flavor Finder</a>
       <a className="list-group-item"  href="/test">Test</a>
    </div>
  </div>


</div>
</Fragment>
  )
};

export default Navbar;