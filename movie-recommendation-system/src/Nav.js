import React, { useState, useEffect } from "react";
import LoginPage from './LoginPage';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <Router>
      <div className="nav__wrapper">
        <div className={`nav ${show && "nav__black"}`}>
          <img
            className="nav__logo"
            src="https://bendblockbuster.com/wp-content/themes/blockbuster/assets/images/blockbuster-logo.svg"
            alt="BlockBuster Logo"
          />

          {/* activeStyle={{background: "yellow"}} */}
          <Route path="/LoginPage" exact strict component={LoginPage}/>

          <img
            className="nav__login"
            src="https://www.campwoodlibrary.org/site-assets/images/login-button-png-13.png/@@images/image.png"
            alt="Login Button"
          />

          <img
            className="nav__avatar"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
            alt="BlockBuster Avatar"
          />
        </div>
      </div >
    </Router>

  );
}

export default Nav;
