import React from "react";
import "../../App.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "../LandingPages/Home/Home";
import LoginPage from '../LandingPages/Login/LoginPage';
import Content from './Content/Content';
import ContentTV from './Content/ContentTV';
import MyList from "./MyList/MyList";
import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import Logout from "../Navbar/Logout";
// import { Button } from "../Button/Button";

function User({ handleLogout }) {

    return (
        <Router>
            <div className="app">
                <Navbar handleLogout={handleLogout} />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/home" exact component={Home} />
                    {/* <Route path="/login" exact component={LoginPage} /> */}
                    <Route path="/logout" exact component={Home} />
                    <Route path="/content" component={Content}></Route>
                    <Route path="/contenttv" component={ContentTV}></Route>
                    <Route path="/myList" component={MyList}></Route>

                </Switch>
                {/* <Footer /> */}
            </div>
        </Router>
    );
}

export default User;