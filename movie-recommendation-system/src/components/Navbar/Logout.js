import React from "react";
import { Button } from "../Button/Button";

const Logout = ({ handleLogout }) => {
    return (
        <section classname="logout">
            <Button onClick={handleLogout}>
                LOGOUT
            </Button>
        </section>
    );
}

export default Logout;