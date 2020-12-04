import React, { useState, Component } from "react";
import axios from "axios";
import Result_Movie from './Result_Movie';
import Result_TVShow from './Result_TVShow';

class Search extends React.Component {
    state = {
        movieResults: "",
        tvShowResults: "",
        similarMovies: [],
        similarTVShows: []
    }

    clickHandler = (event) => {
        if (event.key === "Enter") {
            const query = event.target.value;
            const API_KEY = "1be335fcb8ba9c525f9b9bd2124294d6";
            const movie_apiurl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`;
            const tv_apiurl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${query}`;

            axios.all([
                axios.get(movie_apiurl),
                axios.get(tv_apiurl)
            ]).then(axios.spread((movieResults, tvShowResults) => {
                this.setState({ movResults: movieResults.data.results });
                const similarMovies = movieResults.data.results.slice(0);
                this.setState({ similarMovies })

                this.setState({ tvResults: tvShowResults.data.results });
                const similarTVShows = tvShowResults.data.results.slice(0);
                this.setState({ similarTVShows })
                console.log(similarTVShows);
            }));
        }
    }

    render() {
        return (
            <div className="search">
                <h1 className="search-section-title">Movie Search</h1>
                <section className="searchbox-wrap">
                    <input
                        type="text"
                        placeholder="Search up a show or movie..."
                        className="searchbox"
                        onKeyDown={event => this.clickHandler(event)}
                    />
                </section>
                <hr className="hr"></hr>

                <div className="results">
                    {/* Movie Results */}
                    {
                        this.state.similarMovies.map(movie => (
                            <Result_Movie key={movie.id} movie={movie} />
                        ))
                    }

                    {/* TV Results */}
                    {
                        this.state.similarTVShows.map(tvShow => (
                            <Result_TVShow key={tvShow.id} tvShow={tvShow} />
                        ))
                    }
                </div>
            </div>

        )
    }
}

export default Search;


