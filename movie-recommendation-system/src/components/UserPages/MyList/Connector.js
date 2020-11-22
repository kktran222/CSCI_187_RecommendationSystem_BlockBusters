import React from 'react'
import './App.css'
import firebase from 'firebase/app'
import 'firebase/database'
import Config from './firebaseConfig'


class Connector extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        database: null,
        isConnected: false,
        userId: '',
        movie: '',
        movieList: []
        }
    }
    
    
    componentDidMount = async () => {
        firebase.initializeApp(Config)

        this.setState({
            database: firebase.database()
        })
    }
    
    shouldComponentUpdate (nextProps, nextState) {
      if (this.state.database !== nextState.database) {
        return false
      }

      return true
    }
    
    connect = async () => {
        try {
            const { database, userId } = this.state

            await database.ref('/saved/' + userId).remove()

            await database.ref('/saved/' + userId).on('value', snapshot => {
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

    render () {
      return <div>
        {this.state.isConnected ? <div>
          <h3>add a movie to the list:</h3>
          <input placeholder='userID' value={this.state.userId} onChange={(e) => this.setState({ userId: e.target.value })} />
          <input placeholder='movie to be added' value={this.state.movie} onChange={(e) => this.setState({ movie: e.target.value })} />
          <button onClick={this.addMovie}>Send</button>

          <div>
                MovieList: {this.state.movieList.map(this.renderMovieList)}
          </div>
        </div>
          : <div>
            <h3>What is your ID?:</h3>
            <input value={this.state.userId} onChange={(e) => this.setState({ userId: e.target.value })} />
            <button onClick={this.connect}>Connect</button>

          </div>}
      </div>
    }

}
export default Connector