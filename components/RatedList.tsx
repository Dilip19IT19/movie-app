"use client"
import React, { useEffect, useState } from 'react'
import Card from './Card';
import { API_KEY, BASE_URL, movie } from './MovieList';

function RatedList() {
  let[movies,setMovies]=useState<movie[]>([]);
  let[loading,setLoading]=useState(true);
  
  useEffect(()=>{
  
    async function getPopularMovies()
    {
      try
      {
        const res=await fetch(`${BASE_URL}/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`);
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

    getPopularMovies()

  },[])
  return (

    <>
          {loading ? <div className=' flex w-full h-screen justify-center items-center'><span className="loading loading-dots md:loading-lg loading-sm"></span></div> :  <div className='  list-none mt-4  justify-around flex  flex-wrap gap-8 items-center'>

      {movies.map((movie)=>{
        return(
          <li key={movie.id}><Card data={movie}/></li>
        )
      })}

      </div> }
    </>

   

  )
}

export default RatedList