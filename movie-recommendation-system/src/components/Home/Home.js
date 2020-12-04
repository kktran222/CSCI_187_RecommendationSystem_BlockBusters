import React from 'react'
import firebase from 'firebase';

function Home() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;
    }

    return (
        <div className="home-blurb">
            <h1 className="home-title">HOME</h1>
            <h2 className="home-email">Welcome {email}</h2>
            <p>This is BockBuster. A Movie Recommendation App for CSCI 187. Feel free to find the movies you want to watch!</p>
        </div>
    )
}

export default Home;
