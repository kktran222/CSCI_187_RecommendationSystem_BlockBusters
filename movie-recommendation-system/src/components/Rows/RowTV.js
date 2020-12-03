import React, { useState, useEffect } from "react";
import axios from "../../axios"; //axios is an alias here when importing. could actually be named anything you want so doesn't need to be named instance.
import database from 'firebase/database';
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

  const opts = {
    height: "390",
    width: "100%",
    playervars: {
      autoplay: 1,
    },
  };


  const [isOpen, setIsOpen] = React.useState(false);
  const [modalMovieID, setModalID] = React.useState(null);

  const showModal = (movie) => {
    setIsOpen(true);
    setModalID(movie.id);
    console.log(movie.name + 'has been inspected')
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  async function addToList(movie) {
    try {
      console.log(movie.id);
      var movieListID = 1;//temp value
      var splitEmail = firebaseD.auth().currentUser.email.split('@');
      movie.title=movie.name
      await firebaseD.database().ref('/saved/' + userID + '/' + movieListID + '/').push({
        ID: -1,
        title: movie.title,
        mid: movie.id
      })
      console.log(movie.title + 'has been added ' + splitEmail[0] + ' to /saved/' + userID + movieListID)
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

        {movies.map((movie) => (
          <>
            <img
              title={movie.name}
              key={movie.id}
              onClick={() => showModal(movie)}
              //onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
              alt={movie.name}
            />
            <Modal show={modalMovieID === movie.id && isOpen}
              onHide={hideModal}
              className="row__modal">
              <Modal.Header>
                {movie.title}{movie.name}
                <img className="modal-img" src={`${base_url}${movie.poster_path}`} width="50%"></img>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Released: {movie.release_date}{movie.first_air_date}
                  <br></br><br></br>
                  Description: 
                  <br></br>
                  {movie.overview}
                  <br></br><br></br>
                  Rating: {movie.vote_average}/10
                  <br></br><br></br>
                  <a href={'//www.themoviedb.org/tv/'+ movie.id} target="_blank">More info</a>
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => addToList(movie)}>Add to My List</Button>
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
