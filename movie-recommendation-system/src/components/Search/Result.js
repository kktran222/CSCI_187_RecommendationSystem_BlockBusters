import React from 'react';

function Result({ movie }) {
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const imgSize = "w500"
    return (
        <div className="result">
            <img title={movie.title} key={movie.id} src={`${baseImgUrl}/${imgSize}${movie.poster}`} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
        </div>
    )
}

export default Result;
