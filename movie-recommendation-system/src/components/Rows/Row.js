import React, { useState, useEffect } from "react";
import axios from "../../axios"; //axios is an alias here when importing. could actually be named anything you want so doesn't need to be named instance.
import "./Row.css";
import YouTube from "react-youtube";
import database from 'firebase/database';
import firebaseD from '../../firebaseConfig.js';
import movieTrailer from "movie-trailer";
import Button from 'react-bootstrap/Button';
import MovieContent from "../Content/Content";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const base_url = "https://images.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [userID, setUserID] = useState(0);

  //  A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    //Notes:
    //if blank [], run once when the row loads, and don't run again
    //dependencies: if [] contains a variable (e.g. movies), run once when row loads, and then run everytime when movies changes.

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      setUserID(101);
      
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


  // NEED TO TEST THIS SOMETHING IS WRONG
  const handleClick = (movie) => {
    /*
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
    */

    //console.log(movie.title);
  };

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
  async function addToList (movie){
   
        try{
        console.log(movie.id)
        var movieListID = 1;
        var splitEmail = firebaseD.auth().currentUser.email.split('@'); //this is vulnerable to attacks probably
        await firebaseD.database().ref('/saved/' + splitEmail[0]).set({
          ListID: movieListID,
          ID: movie.id,
          title: movie.title
        })
        console.log(movie.title + 'has been added to /saved/'+splitEmail[0])
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
              title={movie.title}
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
              <Modal.Header>{movie.title}</Modal.Header>
              <Modal.Body>{movie.overview}</Modal.Body>
              <Modal.Footer>
                <button onClick={hideModal}>Exit</button>
                <button onClick={()=>addToList(movie)}>Add to MyList</button>
              </Modal.Footer>
            </Modal>
          </>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

    </div>
  );
}

export default Row;