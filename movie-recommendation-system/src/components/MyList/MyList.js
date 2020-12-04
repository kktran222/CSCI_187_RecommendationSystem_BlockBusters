import React from "react";
import './MyList.css';
import firebase from 'firebase/app';
import firebaseD from '../../firebaseConfig.js';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../axios";
import '../Rows/Row.css';
import Button from 'react-bootstrap/Button';


async function getUserMovies(userID, listID) {
  var movies = [];
  var tv = [];
  await firebase.database().ref('/saved/' + userID + '/' + listID + '/').once('value').then((snapshot) => {
    snapshot.forEach((i) => {
      movies.push(i.val().ID);
      tv.push(i.val().mid)
    });

  });

  return [movies,tv];
};

const base_url = "https://images.tmdb.org/t/p/w500/";

async function getResponse(reqs) {
  var ret = [];
  console.log(reqs)
  await reqs.map(req => axios.get(req)
    .then(function (results) {
      //console.log(results.data);

      ret.push(results.data)

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      //console.log(req)
    }));

  console.log(ret);
  return ret;
}

async function removeFromList(movie, userID, listID) {
    var dbref = firebase.database().ref('/saved/' + userID + '/' + listID + '/')
    await dbref.once('value').then((snapshot) => {
        snapshot.forEach((i) => {
        console.log(movie)
        console.log(i.val().ID)
        console.log(i.ref)
        if (i.val().ID === movie || i.val().mid === movie) {
            i.ref.set(null)
        }
        });
});

};

class MyList extends React.Component {
   constructor(props){
        super(props);
        var id = 0;
        if(firebaseD.auth().currentUser) id = firebaseD.auth().currentUser.uid
        this.state={userID: id, list: [], refresh: 0, show: false, mid: null};
        //console.log(this.state)
   }
  
  async componentDidMount(prevProps){
        var ret = await getUserMovies(this.state.userID, 1);
        var mov = ret[0]
        var tv = ret[1]
        //console.log(ret)

        var myRequests = [];
        mov.map((id) => {

            if(id>0) myRequests.push('https://api.themoviedb.org/3/movie/' + (id) + '?api_key=1be335fcb8ba9c525f9b9bd2124294d6&language=en-US')
        });
        tv.map((id) => {
            myRequests.push('https://api.themoviedb.org/3/tv/' + (id) + '?api_key=1be335fcb8ba9c525f9b9bd2124294d6&language=en-US')
        });
        
        const x = await getResponse(myRequests);
        //console.log(x);
        await this.setState({list: x})
        //console.log(this.state.list)
        this.forceUpdate()
  } 

  showModal = (movie) => {
    this.setState({open: true, mid: movie.id, text: 'Add to myList'});
    console.log(movie.title + 'has been inspected')
  };
  removeMovie = (movie) => {
        var temp = this.state.list;
        temp = temp.filter((x) => movie.id !== x.id ) 
        removeFromList(movie.id, this.state.userID, 1);
        this.setState({list: temp})
        this.forceUpdate()
  }
  hideModal = () => {
    this.setState({open: false});
  };
  render() {
  console.log(this.state.refresh)
  console.log(this.state.list)
      return (
        <div ref={React.createRef()} className="myList">

          <h1 className="myList-title">{'My List'}</h1>
          <hr className="hr"></hr>
          {/* container -> posters */}
          <div className="my_row__posters">
            {/* several row__posters(s) */}

            {this.state.list.map((movie) => (
        
              <>
                <h3 className="my_row__header">{movie.title}{movie.name}</h3>
                <img
                  title={movie.title}
                  key={movie.id}
                  onClick={() => this.showModal(movie)}
                  //onClick={() => handleClick(movie)}
                  className={`my_row__poster`}
                  src={`${base_url}${movie.poster_path}`}
                  alt={movie.name}
                />
                <hr className="hr"></hr>
                <Modal show={this.state.mid === movie.id && this.state.open}
                  onHide={this.hideModal}
                  className="row__modal">
                  <Modal.Header>
                    {movie.title}{movie.name}
                    <img className="modal-img" src={`${base_url}${movie.poster_path}`} width="50%"></img>
                  </Modal.Header>
                  <Modal.Body>
                    Released: {movie.release_date}{movie.first_air_date}
                    <br></br><br></br>
                    Description:
                    <br></br>
                    {movie.overview}
                    <br></br><br></br>
                    Rating: {movie.vote_average}/10
                    </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => 
                        this.removeMovie(movie)
                    }>Remove from MyList</Button>
                    <Button variant="secondary" onClick={this.hideModal}>Exit</Button>
                  </Modal.Footer>
                </Modal>
              </>
            ))}
          </div>
          <Button className="refresh-btn" variant="light" onClick={()=>this.setState({refresh: this.state.refresh+1})}>{'Refresh'}</Button>
          <br />
          <br />
          <br />
        </div>
      );
  }
}

export default MyList;