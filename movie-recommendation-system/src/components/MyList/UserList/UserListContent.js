import React from "react";
import "../../../../App.css";
import FavoriteListRow from "./FavoriteListRow";
import WatchedListRow from "./WatchedListRow";
import DislikedListRow from "./DislikedListRow";
import requests from "../../../../requests";


function MovieContent() {
    return (
        <div className="content">

            <FavoriteListRow title="Favorite" fetchUrl={requests.fetchTrendingMovie} isLargeRow />
            <WatchedListRow title="Watched" fetchUrl={requests.fetchTrendingMovie} isLargeRow />
            <DislikedListRow title="Disliked" fetchUrl={requests.fetchTrendingMovie} isLargeRow />
        </div>

    );
}


export default MovieContent;