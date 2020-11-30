import React, { useState, Component } from "react";
import axios from "axios";
// import SearchPage from './SearchPage';
import Result from './Result';

// function Search() {
class Search extends React.Component {
    state = {
        // title: "",
        // poster: "",
        // overview: "",
        results: "",
        similarMovies: []
    }

    clickHandler = (event) => {
        if (event.key === "Enter") {
            const query = event.target.value;
            const API_KEY = "1be335fcb8ba9c525f9b9bd2124294d6";
            const apiurl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`;
            axios.get(apiurl)
                .then(res => {
                    // const title = res.data['results'][0]['title'];
                    // this.setState({ title });

                    // const poster = res.data['results'][0]['poster_path'];
                    // this.setState({ poster });

                    // const overview = res.data['results'][0]['overview'];
                    // this.setState({ overview });

                    this.setState({ results: res.data.results });
                    const similarMovies = res.data.results.slice(0);
                    this.setState({ similarMovies })
                })
        }
    }

    render() {
        const baseImgUrl = "https://image.tmdb.org/t/p"
        const imgSize = "w500"
        return (
            <div className="search">
                <section className="searchbox-wrap">
                    <input
                        type="text"
                        placeholder="Search up a movie"
                        className="searchbox"
                        onKeyDown={event => this.clickHandler(event)}
                    />
                </section>


                <div className="results">
                    <img title={this.state.title} key={this.state.id} src={`${baseImgUrl}/${imgSize}${this.state.poster}`} />
                    <h3>{this.state.title}</h3>
                    <p>{this.state.overview}</p>
                    <div className="similar-movies">
                        {
                            this.state.similarMovies.map(movie => (
                                <Result key={movie.id} movie={movie} />
                            ))
                        }
                    </div>

                </div>

            </div >

        )
    }
}

export default Search;


