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
        firebase.initializeApp(config)

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
}