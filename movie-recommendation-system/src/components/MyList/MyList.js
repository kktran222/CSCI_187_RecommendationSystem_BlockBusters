import React, { useState, useEffect } from "react";
import './MyList.css';
import firebase from 'firebase/app';
import firebaseD from '../../firebaseConfig.js';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../axios";
import '../Rows/Row.css';



async function getUserMovies(userID, listID) {
  var list = [];
  await firebase.database().ref('/saved/' + userID + '/' + listID + '/').once('value').then((snapshot) => {
    snapshot.forEach((i) => {
      list.push(i.val().ID)
    });

  });
  console.log(list)
  return list;
};

const base_url = "https://images.tmdb.org/t/p/w92/";

async function getResponse(reqs) {
  var ret = [];
  console.log(reqs)
  await reqs.map(req => axios.get(req)
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


  console.log(ret);
  return ret;
}

function MyList() {
  const [userID, setUserID] = useState(firebaseD.auth().currentUser.uid);
  const [list, setList] = useState([]);

  useEffect(() => {
    //Notes:
    //if blank [], run once when the row loads, and don't run again
    //dependencies: if [] contains a variable (e.g. movies), run once when row loads, and then run everytime when movies changes.

    async function fetchData() {
      setUserID(firebaseD.auth().currentUser.uid);
      var temp = await getUserMovies(userID, 1);
      var myRequests = [];
      temp.map((id) => {
        myRequests.push('https://api.themoviedb.org/3/movie/' + (id) + '?api_key=1be335fcb8ba9c525f9b9bd2124294d6&language=en-US')
      });
      const x = await getResponse(myRequests);
      console.log(x)
      await setList(x);

      await console.log(list);

      return list;
    }



    fetchData();
  }, [setList]);
  const final = list;
  console.log(final);

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

  async function removeFromList(movie, userID, listID) {
    var dbref = firebase.database().ref('/saved/' + userID + '/' + listID + '/')
    var marked = []
    await dbref.once('value').then((snapshot) => {
      snapshot.forEach((i) => {
        console.log(movie)
        console.log(i.val().ID)
        console.log(i.ref)
        if (i.val().ID == movie) {
          i.ref.set(null)


        }
      });
    });
    marked.map((j) => dbref + j)

  };

  return (
    <div className="myList">

      <h1 className="myList-title">{'MyList'}</h1>

      {/* container -> posters */}
      <div className="my_row__posters">
        {/* several row__posters(s) */}

        {final.map((movie) => (

          <>
            <img
              title={movie.title}
              key={movie.id}
              onClick={() => showModal(movie)}
              //onClick={() => handleClick(movie)}
              className={`my_row__poster`}
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name}
            />
            <Modal show={modalMovieID === movie.id && isOpen}
              onHide={hideModal}
              className="row__modal">
              <Modal.Header>{movie.title}</Modal.Header>
              <Modal.Body>{movie.overview}</Modal.Body>
              <Modal.Footer>
                <button onClick={hideModal}>Exit</button>
                <button onClick={() => removeFromList(movie.id, userID, 1)}>Remove from MyList</button>
              </Modal.Footer>
            </Modal>
          </>




        ))}
      </div>

    </div>
  );
}


export default MyList;