import React from "react";
import "../../../App.css";
import Row from "../Rows/Row";
import requests from "../../../requests";
import Banner from "../Banner/Banner";


function MovieContent() {
    return (
        <div className="content">

            <Banner />

            <Row title="Trending Now" fetchUrl={requests.fetchTrendingMovie} isLargeRow />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRatedMovie} />
            <Row title="Action" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Horror" fetchUrl={requests.fetchHorrorMovies} />
            <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
            <Row title="Western" fetchUrl={requests.fetchWesternMovies} />
            <Row title="Family" fetchUrl={requests.fetchFamilyMovies} />
        </div>

    );
}


export default MovieContent;