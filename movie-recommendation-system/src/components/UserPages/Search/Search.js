import React, { Component } from "react";
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        console.log("this is my initializer");

        const movies = [
            { id: 0, poster_src: "https://images-na.ssl-images-amazon.com/images/I/71niXI3lxlL._AC_SY741_.jpg", title: "Avengers", overview: "Marvel" },
            { id: 1, poster_src: "https://images-na.ssl-images-amazon.com/images/I/71niXI3lxlL._AC_SY741_.jpg", title: "Star Wars", overview: "Lucasfilm" },
        ]

        var movieRows = []
        movies.forEach((movie) => {
            console.log(movie.title);
            const movieRow = <table key={movie.id}>
                <tbody>
                    <tr>
                        <td>
                            <img className="poster-image" alt="poster" src={movie.poster_src} />
                        </td>
                        <td>
                            {movie.title}
                        </td>
                    </tr>
                </tbody>
            </table>
            movieRows.push(movieRow);
        });

        this.state = { rows: movieRows }


    }

    render() {
        return (
            <div className="Search">
                <input className="search-bar" placeholder="Enter search term" />

                {this.state.rows}



            </div>
        );
    }
}

export default Search;


