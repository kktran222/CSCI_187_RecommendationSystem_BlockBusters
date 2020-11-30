import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "../LandingPages/Home/Home";
import LoginPage from '../LandingPages/Login/LoginPage';
import Content from './Content/Content';
import ContentTV from './Content/ContentTV';
import MyList from "./MyList/MyList";
import UserList from "./MyList/UserList/UserListContent";
import Search from "./Search/Search";
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
                    <Route path="/userList" component={UserList}></Route>
                    <Route path="/search" component={Search}></Route>

                </Switch>
                {/* <Footer /> */}
            </div>
        </Router>
    );
}

export default User;