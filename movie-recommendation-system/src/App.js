import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import Content from './components/Content/Content';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MyList from "./components/MyList/MyList";

function App() {

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/content" component={Content} />
          <Route path="/myList" component={MyList}></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

const Home = () => (
  <Router>
    <div>
      <Route path="/" component={LoginPage}></Route>
    </div>
  </Router>

);

export default App;

