import React from "react";
import RowTV from "../Rows/RowTV";
import requests from "../../requests";
import Banner from "../Banner/Banner";


function TVContent() {
    return (
        <div className="content">
            {<Banner />}

            <RowTV title="Trending Now" fetchUrl={requests.fetchTrendingTV} isLargeRow />
            <RowTV title="Top Rated" fetchUrl={requests.fetchTopRatedTV} />
            <RowTV title="Action" fetchUrl={requests.fetchActionTV} />
            <RowTV title="Comedy" fetchUrl={requests.fetchComedyTV} />
            <RowTV title="Horror" fetchUrl={requests.fetchDramaTV} />
            <RowTV title="Romance" fetchUrl={requests.fetchRealityTV} />
            <RowTV title="Documentaries" fetchUrl={requests.fetchDocumentariesTV} />
            <RowTV title="Western" fetchUrl={requests.fetchWesternTV} />
            <RowTV title="Family" fetchUrl={requests.fetchFamilyTV} />
        </div>

    );
}


export default TVContent;