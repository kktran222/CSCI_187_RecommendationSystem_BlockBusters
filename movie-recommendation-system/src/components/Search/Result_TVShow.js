import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import firebaseD from "../../firebaseConfig.js"

const base_url = "https://images.tmdb.org/t/p/original/";

function Result_TVShow({ tvShow }) {
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const imgSize = "w92"

    const [isOpen, setIsOpen] = React.useState(false);
    const [modalTVShowID, setModalID] = React.useState(null);

    const showModal = (tvShow) => {
        setIsOpen(true);
        setModalID(tvShow.id);
        console.log(tvShow.title + 'has been inspected')
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    async function addToList(tvShow) {//copied from Row.js
        try {
            console.log(tvShow.id);
            var userID = firebaseD.auth().currentUser.uid
            var tvShowListID = 1;//temp value
            var splitEmail = firebaseD.auth().currentUser.email.split('@');

            await firebaseD.database().ref('/saved/' + userID + '/' + tvShowListID + '/').push({
                ID: tvShow.id,
                title: tvShow.title
            })
            console.log(tvShow.title + 'has been added ' + splitEmail[0] + ' to /saved/' + userID + tvShowListID)
            console.log(firebaseD.auth())

        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div className="result">
            {/* TV Shows */}
            <h3 style={{ color: "white" }}>{tvShow.title}</h3>
            <br></br>
            <img className="search-movies" title={tvShow.title} key={tvShow.id} src={`${base_url}${tvShow.poster_path}`} />
            <p className="search-overview-text" style={{ color: "white" }}>{tvShow.overview}</p>
            <Button variant="outline-primary" onClick={() => showModal(tvShow)}>About</Button>
            <Modal show={modalTVShowID === tvShow.id && isOpen}
                onHide={hideModal}
                className="row__modal">
                <Modal.Header>
                    <p>
                        {tvShow.title}{tvShow.name}
                        <br></br>
                        <img className="modal-img" src={`${base_url}${tvShow.poster_path}`} width="50%"></img>
                    </p>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Released: {tvShow.release_date}{tvShow.first_air_date}
                        <br></br><br></br>
                  Description:
                  <br></br>
                        {tvShow.overview}
                        <br></br><br></br>
                  Rating: {tvShow.vote_average}/10
                  <br></br><br></br>
                        <a href={'//www.themoviedb.org/tv/' + tvShow.id} target="_blank">More info</a>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>Exit</Button>
                    <Button variant="secondary" onClick={() => addToList(tvShow)}>Add to My List</Button>
                </Modal.Footer>
            </Modal>
            <br></br><br></br>
            <hr className="hr"></hr>
        </div>
    )
}

export default Result_TVShow;
