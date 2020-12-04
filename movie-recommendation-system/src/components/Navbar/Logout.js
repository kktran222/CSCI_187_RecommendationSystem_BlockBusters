import React from "react";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import LoginPage from '../Login/LoginPage';

const Logout = ({ handleLogout }) => {
    return (
        <section classname="logout">
            {/* the /logout path does not exist, and we need to send
          the user to the home page for further login requests */}
            <Link to="/">
                <a href="#">
                    <Button id="logout-btn" variant="outline-light" onClick={handleLogout}>
                        Logout
                    </Button>
                </a>
            </Link>
        </section>
    );
}

export default Logout;