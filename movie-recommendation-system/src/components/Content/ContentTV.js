import React from "react";
import "../../App.css";
import Row from "../Rows/Row";
import requests from "../../requests";
import Banner from "../Banner/Banner";


function TVContent() {
    return (
        <div className="content">
            {<Banner />}

            <Row title="Trending Now" fetchUrl={requests.fetchTrendingTV} isLargeRow />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRatedTV} />
            <Row title="Action" fetchUrl={requests.fetchActionTV} />
            <Row title="Comedy" fetchUrl={requests.fetchComedyTV} />
            <Row title="Horror" fetchUrl={requests.fetchDramaTV} />
            <Row title="Romance" fetchUrl={requests.fetchRealityTV} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentariesTV} />
            <Row title="Western" fetchUrl={requests.fetchWesternTV} />
            <Row title="Family" fetchUrl={requests.fetchFamilyTV} />
        </div>

    );
}


export default TVContent;