import React, { Component, useState } from 'react';
import ReactDOM from "react-dom";
import InlineEdit from "./inlineEdit";

function User() {

    const [storedText, setStoredText] = useState("Enter first name...");
    const [storedText1, setStoredText1] = useState("Enter last name...");
    const [storedText2, setStoredText2] = useState("Enter favorite genres...");

    return (
        <div className="user-box">
            <h1 className="user-header">My Profile</h1>
            <p>
                First Name: &nbsp;&nbsp;&nbsp;
                <InlineEdit text={storedText} onSetText={text => setStoredText(text)} />
            </p>
            <p>
                Last Name: &nbsp;&nbsp;&nbsp;
                <InlineEdit text={storedText1} onSetText={text => setStoredText1(text)} />
            </p>
            <p>
                Favorite Genres: &nbsp;&nbsp;&nbsp;
                <InlineEdit text={storedText2} onSetText={text => setStoredText2(text)} />
            </p>
        </div>
    );
}

/*
class User extends Component {
    render() {
        return (
            <div className="user">
                <h1>My Profile</h1>
                <div>
                    <p>Name:</p>
                </div>
                <div>
                    <p>Favorite Genres:</p>
                </div>
            </div>
        );
    }
}
*/
export default User;