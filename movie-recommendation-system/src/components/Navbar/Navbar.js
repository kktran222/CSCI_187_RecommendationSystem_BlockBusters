// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
import { MenuItems } from "./MenuItems"
import { Button } from "../Button/Button"
import { Link } from 'react-router-dom';
import "./Navbar.css";


// May Need to delete this
//********Trying to have nav-bar always present ******** */
// function Nav() {
//   // class Nav extends Component {
//   const [show, handleShow] = useState(false);

//   // Nav Bar scrolling effect to become visible
//   useEffect(() => {
//     window.addEventListener("scroll", () => {
//       if (window.scrollY > 100) {
//         handleShow(true);
//       } else handleShow(false);
//     });
//     return () => {
//       window.removeEventListener("scroll");
//     };
//   }, []);


class Navbar extends Component {
  state = { clicked: false }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    return (


      <nav className="NavbarItems">
        {/* Link to home next time!!! */}
        <img
          className="nav__logo"
          src="https://bendblockbuster.com/wp-content/themes/blockbuster/assets/images/blockbuster-logo.svg"
          alt="BlockBuster Logo"
        />

        <div className="menu-icon" onClick={this.handleClick}>
          <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>


        {/* Clean Mapping of Links within Navbar */}
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.path}>
                  <a className={item.cName} href={item.url} >
                    <i class={item.fontAwesome}> {item.title}</i>
                  </a>
                </Link>

              </li>
            )
          })}
        </ul>


        <Link to="/login">
          <a className="nav-links" href="#" >
            <Button>
              Login
            </Button>
          </a>
        </Link>
      </nav >
    );
  }
}

export default Navbar;
