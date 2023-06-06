import axios from "axios";

// Base url to make requeststo the movie database (work as  a postman)
const instance = axios.create({
    baseURL:'https://api.themoviedb.org/3'
})

// instance.get('/foo-bar');
// https://api.themoviedb.org/3/foo-bar


export default instance