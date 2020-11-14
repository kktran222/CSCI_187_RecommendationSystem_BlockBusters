import React from "react";
import { Link } from 'react-router-dom';
import { Button } from "../Button/Button";

const Logout = ({ handleLogout }) => {
    return (
        <section classname="logout">
            <Button onClick={handleLogout}>
                Logout Please
            </Button>
        </section>
    );
}

export default Logout;