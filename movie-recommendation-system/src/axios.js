import axios from "axios";

// base url to make requests to the movie database
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

//only one default export in file allowed
export default instance;