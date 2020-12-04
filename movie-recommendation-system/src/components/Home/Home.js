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
            {/* <h1 className="home-title">HOME</h1> */}
            <h1 className="home-welcome">Welcome</h1>
            <h1 className="home-email">{email}</h1>
            <p>This is BlockBusters. A Movie Recommendation App for CSCI 187. Feel free to find the movies you want to watch!</p>
            <img className="home-img" src="https://www.clker.com/cliparts/0/N/o/T/h/1/yellow-film-strip-hi.png"></img>
        </div>
    )
}

export default Home;
