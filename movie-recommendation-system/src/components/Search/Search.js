import React, { useState, Component } from "react";
import axios from "axios";
import Result from './Result';

class Search extends React.Component {
    state = {
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
                <h1 className="search-section-title">Movie Search</h1>
                <section className="searchbox-wrap">
                    <input
                        type="text"
                        placeholder="Search up a movie..."
                        className="searchbox"
                        onKeyDown={event => this.clickHandler(event)}
                    />
                </section>
                <hr className="hr"></hr>

                <div className="results">
                    {
                        this.state.similarMovies.map(movie => (
                            <Result key={movie.id} movie={movie} />
                        ))
                    }
                </div>
            </div>

        )
    }
}

export default Search;


