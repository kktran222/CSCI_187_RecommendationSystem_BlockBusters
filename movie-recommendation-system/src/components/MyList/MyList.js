import React, { useState, useEffect } from "react";
import './MyList.css';
import firebase from 'firebase/app';
import database from 'firebase/database';
import firebaseD from '../../firebaseConfig.js';
import MyRow from './MyRow.js';
import Row from '../Rows/Row.js';
import requests from '../../requests.js';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../axios";
import '../Rows/Row.css';


async function getUserMovies(userID, listID) {
    var list = [];
    await firebase.database().ref('/saved/' + userID + '/'+listID+'/').once('value').then((snapshot) => {
        snapshot.forEach((i) => {
        list.push(i.val().ID)
        });
        
    });
    console.log(list)
    return list;
};

const base_url = "https://images.tmdb.org/t/p/original/";

async function getResponse(reqs){
    var ret = [];
    console.log(reqs)
    await reqs.map(req=>axios.get(req)
        .then(function (results) {
            console.log(results.data);
            
            ret.push(results.data)

        })
        .catch(function (error) {
         // handle error
            console.log(error);
        })
        .then(function () {
            console.log(req)
        }));
    var temp = await ret.resolve
    
    
    console.log(Array(ret));
    return Array(ret);
}

function MyList () {
    const [userID, setUserID] = useState(firebaseD.auth().currentUser.uid);
    const [list, setList] = useState([]);
    const [refresh, setRefresh] = useState(0)
    
    useEffect(() => {
    //Notes:
    //if blank [], run once when the row loads, and don't run again
    //dependencies: if [] contains a variable (e.g. movies), run once when row loads, and then run everytime when movies changes.

    async function fetchData() {
        setUserID(firebaseD.auth().currentUser.uid);
        console.log('userID'+ userID);
        var temp = await getUserMovies(userID,1);
        console.log(temp);
        var myRequests = [];
        temp.map((id) => {
            myRequests.push('https://api.themoviedb.org/3/movie/'+(id)+'?api_key=1be335fcb8ba9c525f9b9bd2124294d6&language=en-US'  )
        });
        console.log(myRequests);
        var x = await getResponse(myRequests);
        console.log(x)
        await setList(x[0]);

        console.log(list);
        
        return list;
    }
        
    
  
    fetchData();
    }, [list]);

    
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalMovieID, setModalID] = React.useState(null);

  const showModal = (movie) => {
    setIsOpen(true);
    setModalID(movie.id);
    console.log(movie.title + 'has been inspected')
  };

  const hideModal = () => {
    setIsOpen(false);
  };
    
  async function removeFromList (movie){
        try{
            console.log(movie.title + '(' + movie.id + ')' + ' is about to be removed');
            var movieListID = 1;//temp value
            var splitEmail = firebaseD.auth().currentUser.email.split('@');
            
            await firebaseD.database().ref('/saved/' + userID + '/'+movieListID+'/').push({
                ID: movie.id,
                title: movie.title
            })
            console.log(movie.title+'has been added '+splitEmail[0]+' to /saved/'+userID+movieListID)
            console.log(firebaseD.auth())
       
        } catch (e) {
        console.error(e)
        }
   };

    return (
        <div className="MyList">
            
        <h2>{'MyList'}</h2>
        
          {/* container -> posters */}
          <div className="my_row__posters">
            {/* several row__posters(s) */}

            {list.map((movie) => (
            
              <>
                <img
                  title={movie.title}
                  key={movie.id}
                  onClick={() => showModal(movie)}
                  //onClick={() => handleClick(movie)}
                  className={`my_row__poster`}
                  src={require(`${base_url}${movie.poster_path }`)}
                  alt={movie.name}
                />
                <Modal show={modalMovieID === movie.id && isOpen}
                  onHide={hideModal}
                  className="row__modal">
                  <Modal.Header>{movie.title}</Modal.Header>
                  <Modal.Body>{movie.overview}</Modal.Body>
                  <Modal.Footer>
                    <button onClick={hideModal}>Exit</button>
                    <button onClick={()=>removeFromList(movie)}>Remove from MyList</button>
                  </Modal.Footer>
                </Modal>
              </>
              
              
              

            ))}
          </div>
            
         </div>
    );
   }


export default MyList;