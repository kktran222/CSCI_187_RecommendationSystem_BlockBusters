import React, { useState, useEffect } from "react";
import axios from "../../axios";
import requests from "../../requests";
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import firebaseD from "../../firebaseConfig.js"
const base_url = "https://images.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrendingMovie);
      setMovie(
        request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const [isOpen, setIsOpen] = React.useState(false);
  const [modalMovieID, setModalID] = React.useState(null);
  const [text, setText] = React.useState('Add to MyList');

  const showModal = (movie) => {
    setText('Add to MyList')
    setIsOpen(true);
    setModalID(movie.id);
    console.log(movie.title + 'has been inspected')
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  async function addToList(movie) {
    try {
      setText('Added!')
      console.log(movie.id);
      var movieListID = 1; //would represent which list if multiple lists were implemented
      var splitEmail = firebaseD.auth().currentUser.email.split('@');
      var userID = firebaseD.auth().currentUser.uid
      await firebaseD.database().ref('/saved/' + userID + '/' + movieListID + '/').push({
        ID: movie.id,
        title: movie.title,
        tid: -1
      })
      console.log(movie.title + 'has been added ' + splitEmail[0] + ' to /saved/' + userID + movieListID)
      console.log(firebaseD.auth())

    } catch (e) {
      console.error(e)
    }
  };
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}" 
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* title */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* div > 2 buttons */}
        <div className="banner__buttons">
          <button className="banner__button" onClick={() => showModal(movie)}>More Info</button>
          <Modal show={modalMovieID === movie?.id && isOpen}
            onHide={hideModal}
            className="row__modal">
            <Modal.Header>
              <p>
                {movie.title}{movie.name}
                <br></br>
                <img src={`${base_url}${movie.poster_path}`} width="50%"></img>
              </p>
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
                <a href={'//www.themoviedb.org/movie/' + movie.id} target="_blank">More info</a>
              </p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => addToList(movie)}>{text}</Button>
            <Button variant="secondary" onClick={hideModal}>Exit</Button>
            </Modal.Footer>
          </Modal>
        </div>

        {/* description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
