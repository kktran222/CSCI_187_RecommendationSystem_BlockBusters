import React from "react";
import "../../App.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "../Home/Home";
import LoginPage from '../Login/LoginPage';
import Content from '../Content/Content';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Logout from "../Navbar/Logout";
import { Button } from "../Button/Button";

function User({ handleLogout }) {

    return (
        <Router>
            <div className="app">
                <Navbar />
                <Button onClick={handleLogout}>
                    Logout Please
                </Button>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/home" exact component={Home} />
                    {/* <Route path="/login" exact component={LoginPage} /> */}
                    <Route path="/logout" exact component={Home} />
                    <Route path="/content" component={Content}></Route>

                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default User;