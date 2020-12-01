import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import firebaseD from "../../firebaseConfig.js"

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

  async function addToList(movie) {//copied from Row.js
    try {
      console.log(movie.id);
      var userID = firebaseD.auth().currentUser.uid
      var movieListID = 1;//temp value
      var splitEmail = firebaseD.auth().currentUser.email.split('@');

      await firebaseD.database().ref('/saved/' + userID + '/' + movieListID + '/').push({
        ID: movie.id,
        title: movie.title
      })
      console.log(movie.title + 'has been added ' + splitEmail[0] + ' to /saved/' + userID + movieListID)
      console.log(firebaseD.auth())

    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div className="result">
      <h3 style={{ color: "white" }}>{movie.title}</h3>
      <br></br>
      <img className="search-movies" title={movie.title} key={movie.id} src={`${base_url}${movie.poster_path}`} />
      <p className="search-overview-text" style={{ color: "white" }}>{movie.overview}</p>
      <Button variant="outline-primary" onClick={() => showModal(movie)}>About</Button>
      <Modal show={modalMovieID === movie.id && isOpen}
        onHide={hideModal}
        className="row__modal">
        <Modal.Header>
          <p>
            {movie.title}{movie.name}
            <br></br>
            <img className="modal-img" src={`${base_url}${movie.poster_path}`} width="50%"></img>
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
          <Button variant="secondary" onClick={hideModal}>Exit</Button>
          <Button variant="secondary" onClick={() => addToList(movie)}>Add to My List</Button>
        </Modal.Footer>
      </Modal>
      <br></br><br></br>
      <hr className="hr"></hr>
    </div>
  )
}

export default Result;
