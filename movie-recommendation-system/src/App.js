import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./components/LandingPages/Home/Home";
import LoginPage from './components/LandingPages/Login/LoginPage';
import Content from './components/UserPages/Content/Content';
import ContentTV from './components/UserPages/Content/ContentTV';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MyList from "./components/UserPages/MyList/MyList";

function App() {

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" exact component={LoginPage} />
          {/* <Route path="/logout" exact component={Home} />
          <Route path="/content" component={Content}></Route>
          <Route path="/contenttv" component={ContentTV}></Route>
          <Route path="/myList" component={MyList}></Route> */}
        </Switch>

        <Footer />
      </div>
    </Router>


  );
}

export default App;

