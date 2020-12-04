import React, { useState, useEffect } from "react";
import axios from "../../axios"; //axios is an alias here when importing. could actually be named anything you want so doesn't need to be named instance.
import "./MyList.css";


const base_url = "https://images.tmdb.org/t/p/original/";

async function getResponse(reqs){
    var ret = [];
    
    var requests = reqs.map(req=>axios.get(req)
        .then(function (results) {
            console.log(results);
            ret.push(results.data)
        })
        .catch(function (error) {
         // handle error
            console.log(error);
        })
        .then(function () {
            console.log(req)
        }));
    console.log(requests);
    await ret.resolve;
    console.log(ret);
    return Array(ret);
}

function MyRow({ title, idArray, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  //  A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    //Notes:
    //if blank [], run once when the row loads, and don't run again
    //dependencies: if [] contains a variable (e.g. movies), run once when row loads, and then run everytime when movies changes.
    async function fetchData() {
    var ids = idArray[0];
    console.log(ids);

    
    var requests = []
    ids.map((id) => requests.push('https://api.themoviedb.org/3/movie/'+(id)+'?api_key=1be335fcb8ba9c525f9b9bd2124294d6&language=en-US'  ));    
    console.log(requests)
  
    try {
   
      var responseMap = await getResponse(requests);
      
      
      console.log(responseMap[0]);
      setMovies(responseMap[0]);
      
      
      }
      catch {responseMap = []; console.log("dropped map")}
      return responseMap;
    }
    fetchData();
  }, [idArray]);



  const handleClick = (movie) => {
    
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      {/* container -> posters */}
      <div className="row__posters">
        {/* several row__posters(s) */}

        {movies.map((movie) => (
          <img
            key={movie.name}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
            alt={movie.name}
          />
        ))}
      </div>
      
    </div>
  );
}
export default MyRow;