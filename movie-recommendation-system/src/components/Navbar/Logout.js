import React from "react";
import { Link } from 'react-router-dom';
import { Button } from "../Button/Button";

const Logout = ({ handleLogout }) => {
    return (
        <section classname="logout">
            <Link to="/logout">
                <a className="nav-links" href="#" >
                    <Button onClick={handleLogout}>
                        Logout
                    </Button>
                </a>
            </Link>
        </section>
    );
}

export default Logout;