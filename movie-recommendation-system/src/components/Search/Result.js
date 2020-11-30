import React from 'react';
import "./Result.css";
import Modal from "react-bootstrap/Modal";


const base_url = "https://images.tmdb.org/t/p/original/";

function Result({ movie }) {
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const imgSize = "w92"

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


    return (
        <div className="result">
            <h3>{movie.title}</h3>
            <br></br>
            <img title={movie.title} key={movie.id} src={`${baseImgUrl}/${imgSize}${movie.poster_path}`} />
            <p>{movie.overview}</p>
            <button onClick={() => showModal(movie)}>About</button>
            <Modal show={modalMovieID === movie.id && isOpen}
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
                  <a href={'//www.themoviedb.org/movie/'+ movie.id} target="_blank">More info</a>
                </p>
              </Modal.Body>
              <Modal.Footer>
                <button onClick={hideModal}>Exit</button>
              </Modal.Footer>
            </Modal>
            <hr className="hr"></hr>
        </div>
    )
}

export default Result;
