// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
import { MenuItems } from "./MenuItems"
import { Link } from 'react-router-dom';
import fire from "../../firebaseConfig";
import Logout from './Logout';


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
          src="https://drive.google.com/uc?id=1KRq6mhHHi5xH5hE8njYyK2njhiQrIslq"
          alt="BlockBuster Logo"
        />

        <div className="menu-icon" onClick={this.handleClick}>
          <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>


        {/* Clean Mapping of Links within Navbar */}
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index} onClick={this.handleClick}>
                <Link to={item.path}>
                  <a className={item.cName} href={item.url} >
                    <i class={item.fontAwesome}> {item.title}</i>
                  </a>
                </Link>

              </li>
            )
          })}
        </ul>

        <Logout handleLogout={() => { fire.auth().signOut(); }} />
      </nav>
    );
  }
}

export default Navbar;
