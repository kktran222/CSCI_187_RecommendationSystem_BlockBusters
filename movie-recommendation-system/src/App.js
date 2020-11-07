import React from "react";
// import { observer } from 'mobx-react';
// import UserStore from './stores/UserStore';
// import LoginForm from './LoginForm';
// import SubmitButton from './SubmitButton';
import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import Nav from "./Nav";
import Footer from "./Footer";

function App(){
// class App extends React.Component {
  // async componentDidMount(){
  //   try{
  //     let res = await fetch('/isLoggedIn', {
  //       method: 'post',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     let result = await res.json();

  //     if(result && result.success){
  //       UserStore.loading = false;
  //       UserStore.isLoggedIn = true;
  //       UserStore.username = result.username;
  //     }
  //     else{
  //       UserStore.loading = false;
  //       UserStore.isLoggedIn = false;
  //     }
  //   }
  //   catch(e){
  //       UserStore.loading = false;
  //       UserStore.isLoggedIn = false;
  //   }
  // }

  // // Logout Function
  // async doLogout(){
  //   try{
  //     let res = await fetch('/logout', {
  //       method: 'post',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     let result = await res.json();

  //     if(result && result.success){
  //       UserStore.isLoggedIn = false;
  //       UserStore.username = '';
  //     }
  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // }

  // render(){
  //   if(UserStore.loading){
  //     return(
  //       <div className="app">
  //         <div className="container">
  //           Loading, please wait...
  //         </div>
  //       </div>
  //     );
  //   }

  //   else{
  //     if(UserStore.isLoggedIn){
  //       <div className="app">
  //         <div className="container">
  //           Welcome{UserStore.username}
  //           <SubmitButton
  //             text={'Log out'}
  //             disabled={false}
  //             onClick={ () => this.doLogout() }
  //           />
  //         </div>
  //       </div>
  //     }
  //     return(
  //       <div className="app">
  //           <div className='container'>
  //             {/* <SubmitButton
  //               text={'Log out'}
  //               disabled={false}
  //               onClick={ () => this.doLogout() }
  //             /> */}
  //             <LoginForm/>
  //           </div>
  //       </div>
  //     );
  //   }

    return (
        <div className="app">
          {/* Nav */}
          <Nav />

          {<Banner />}

          <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
          <Row title="Action" fetchUrl={requests.fetchActionMovies} />
          <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Horror" fetchUrl={requests.fetchHorrorMovies} />
          <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
          <Row title="Western" fetchUrl={requests.fetchWesternMovies} />
          <Row title="Family" fetchUrl={requests.fetchFamily} />

          <Footer />
        </div>
    );
  // }
}

export default App;
// export default observer(App);
