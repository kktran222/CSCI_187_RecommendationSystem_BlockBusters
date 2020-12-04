import React, { useState, useEffect } from "react";
import axios from "../../axios"; //axios is an alias here when importing. could actually be named anything you want so doesn't need to be named instance.
import firebaseD from '../../firebaseConfig.js';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const base_url = "https://images.tmdb.org/t/p/original/";

function RowTV({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [userID, setUserID] = useState(0);

  //  A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    //Notes:
    //if blank [], run once when the row loads, and don't run again
    //dependencies: if [] contains a variable (e.g. movies), run once when row loads, and then run everytime when movies changes.

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      if(firebaseD.auth().currentUser) setUserID(firebaseD.auth().currentUser.uid);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const [isOpen, setIsOpen] = React.useState(false);
  const [modalMovieID, setModalID] = React.useState(null);
  const [text, setText] = React.useState('Add to MyList');

  const showModal = (tv) => {
    setText('Add to MyList')
    setIsOpen(true);
    setModalID(tv.id);
    console.log(tv.name + ' has been inspected')
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  async function addToList(tv) {
    try {
      setText('Added!')
      console.log(tv.id);
      var tvShowListID = 1;//mylist
      var splitEmail = firebaseD.auth().currentUser.email.split('@');
      
      await firebaseD.database().ref('/saved/' + userID + '/' + tvShowListID + '/').push({
        ID: -1, //indicates not a movie
        title: tv.name,
        tid: tv.id
      })
      console.log(tv.name + 'has been added ' + splitEmail[0] + ' to /saved/' + userID + tvShowListID)
      console.log(firebaseD.auth())

    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      {/* container -> posters */}
      <div className="row__posters">
        {/* several row__posters(s) */}

        {movies.map((tv) => (
          <>
            <img
              title={tv.name}
              key={tv.id}
              onClick={() => showModal(tv)}
              //onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${isLargeRow ? tv.poster_path : tv.backdrop_path
                }`}
              alt={tv.name}
            />
            <Modal show={modalMovieID === tv.id && isOpen}
              onHide={hideModal}
              className="row__modal">
              <Modal.Header>
                {tv.title}{tv.name}
                <img className="modal-img" src={`${base_url}${tv.poster_path}`} width="50%"></img>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Released: {tv.release_date}{tv.first_air_date}
                  <br></br><br></br>
                  Description: 
                  <br></br>
                  {tv.overview}
                  <br></br><br></br>
                  Rating: {tv.vote_average}/10
                  <br></br><br></br>
                  <a href={'//www.themoviedb.org/tv/'+ tv.id} target="_blank">More info</a>
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => addToList(tv)}>{text}</Button>
                <Button variant="secondary" onClick={hideModal}>Exit</Button>
              </Modal.Footer>
            </Modal>
          </>
        ))}
      </div>

    </div>
  );
}

export default RowTV;
