import React from 'react';
import './MyList.css';
import firebase from 'firebase/app';
import database from 'firebase/database';
import firebaseD from '../../../firebaseConfig.js';


class AddList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      database: null,
      isConnected: false,
      userID: '',
      movieListID: '',
      movies: '',
      movieList: []
    }
  }


  componentDidMount = async () => {


    this.setState({
      database: firebaseD.database()
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.database !== nextState.database) {
      return false
    }

    return true
  }

  connect = async () => {
    try {
      const { database, userID } = this.state

      //await database.ref('/saved/' + userID).remove()

      await database.ref('/saved/' + userID).on('value', snapshot => {
        if (snapshot.exists()) {
          const saved = snapshot.val()
          this.setState({
            movieList: [...this.state.movieList, saved]
          })
        }
      })

      this.setState({
        isConnected: true
      })
    } catch (e) {
      console.error(e)
    }
  }

  addMovie = async () => {
    try {
      const { database, userID, movies, movieListID } = this.state
      await database.ref('/saved/' + userID).set({
        ListID: movieListID,
        movies

      })
      this.setState({
        movies: ''
      })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return <div>
      {this.state.isConnected ? <div>
        <h3>add a comma separated list of movies to the list:</h3>
        <input placeholder='movieListID' value={this.state.movieListID} onChange={(e) => this.setState({ movieListID: e.target.value })} />
        <input placeholder='movies to be added' value={this.state.movies} onChange={(e) => this.setState({ movies: e.target.value })} />
        <button onClick={this.addMovie}>Send</button>


      </div>
        : <div>
          <h3>What is your userID?:</h3>
          <input value={this.state.userID} onChange={(e) => this.setState({ userID: e.target.value })} />
          <button onClick={this.connect}>Connect</button>

        </div>}
    </div>
  }

}
export default AddList