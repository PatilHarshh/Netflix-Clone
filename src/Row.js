// rcep class based components
// rfce function based components
import movieTrailer from 'movie-trailer';
import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube';
import axios from './axios';
import './Row.css'

const base_url = 'http://image.tmdb.org/t/p/w500'

function Row({title, fetchUrl, isLargeRow}) {
    const[movies, setMovies] = useState([])
    const[trailerUrl, setTrailerUrl] =useState("")

    useEffect(()=>{
        // if [], run once when the row loads, and dont run again
        async function fetchData(){
            const request = await axios.get(fetchUrl)
            // https://api.themoviedb.org/3/discoves/tv?api_keys=${API_KEY}&with_networks=213
            setMovies(request.data.results)
            return request;
        }
        fetchData()
    },[fetchUrl])
    console.log(movies)

    const opts ={
      height: '390',
      width:'100%',
      playerVars:{

        autoplay:1,
      }
    }

    const handleClick =(movie)=>{
        if(trailerUrl){
          setTrailerUrl('');
        }
        else{
          movieTrailer(movie?.name || "")
          .then((url)=>{
            // https://www.youtube.com/watch?v=HcOc7P5BMi4
            const urlParams = new URLSearchParams( new URL(url).search)
            setTrailerUrl(urlParams.get('v'))


          }).catch(error => console.log(error))
        }
    }
  return (
    <div className='row'>
        <h2>{title}</h2> 
        <div className="row__posters" >
          {/* several row posters */}
          {movies.map(movie =>(
            <img  key={movie.id}
            onClick={()=>{
              handleClick(movie)
            }}
            className={`row__poster ${isLargeRow && "row__posterLarge"}` }
            src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path} `}alt={movie.name} />
          ))}
          </div> 
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  )
}

export default Row