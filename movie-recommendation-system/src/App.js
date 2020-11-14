import React from "react";
import "./App.css";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import LoginPage from './components/Login/LoginPage';
import Content from './components/Content/Content';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {

  return (
    // <Router>
    //   <div className="app">
    //     <Navbar />
    //     <Switch>
    //       <Route path="/" exact component={Home} />
    //       <Route path="/home" exact component={Home} />
    //       <Route path="/login" exact component={LoginPage} />
    //       <Route path="/logout" exact component={Home} />
    //       <Route path="/content" component={Content}></Route>

    //     </Switch>
    //     <Footer />
    //   </div>
    // </Router>
    <div className="app">
      <LoginPage />
    </div>
  );
}

export default App;

