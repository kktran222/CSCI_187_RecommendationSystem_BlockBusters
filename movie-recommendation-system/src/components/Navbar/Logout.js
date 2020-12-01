import React from "react";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Logout = ({ handleLogout }) => {
    return (
        <section classname="logout">
            <Link to="/logout">
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