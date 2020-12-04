import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import LoginPage from './components/Login/LoginPage';
import Content from './components/Content/Content';
import ContentTV from './components/Content/ContentTV';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MyList from "./components/MyList/MyList";
import Search from "./components/Search/Search";
import User from "./components/User/User";

function App() {

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/home" component={Home}></Route>
          {/* <Route path="/LoginPage" component={LoginPage}></Route> */}
          <Route path="/myList" component={MyList}></Route>
          <Route path="/content" component={Content}></Route>
          <Route path="/contenttv" component={ContentTV}></Route>
          <Route path="/search" component={Search}></Route>
          <Route path="/user" component={User}></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

