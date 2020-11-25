import React from "react";
import { Link } from 'react-router-dom';
// import Button from "../Button/Button";
import "./Home.css";



const Home = () => {

    return (
        <div>
            <h1>HOME</h1>

            <Link to="/login"><a>Login</a></Link>
        </div>
    );
};

export default Home;