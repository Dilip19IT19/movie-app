"use client"
import React, { useEffect, useState } from 'react'
import Card from './Card';


export type movie={
  original_title:string;
  overview:string;
  backdrop_path:string;
  id:number;
  poster_path:string;
  adult:boolean;
  popularity:number;
  release_date:Date;
  vote_average:number;
}

export const API_KEY=process.env.NEXT_PUBLIC_API_KEY;
export const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL;
export const BASE_IMAGE_URL="https://image.tmdb.org/t/p/original/"



function MovieList() {

  let[movies,setMovies]=useState<movie[]>([]);
  let[loading,setLoading]=useState(true);
  useEffect(()=>{
  
    async function getMovies()
    {
      try
      {
        const res=await fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`);
        const data=await res.json();
        setMovies(data.results);
      }
      catch(err)
      {
        console.log(err);
      }
      finally
      {
        setLoading(false);
      }
     
      
    }

    getMovies()

  },[])

  return (
    <div className='  list-none mt-4  justify-around flex  flex-wrap gap-8 items-center'>

      {loading ? <div className=' w-full h-screen flex justify-center items-center'><span className="loading loading-ring md:loading-lg loading-sm"></span></div> : movies.map((movie)=>{
        return(
          <li key={movie.id}><Card data={movie}/></li>
        )
      }) }

      {/* {movies.map((movie)=>{
        return(
          <li key={movie.id}><Card data={movie}/></li>
        )
      })} */}

    </div>
  )
}

export default MovieList