"use client"
import Card from '@/components/Card';
import { API_KEY, BASE_URL, movie } from '@/components/MovieList';
import React, { useEffect, useState } from 'react'


type Tparams={
  params:{
    name:string
  }
}

function Searchpage({params}:Tparams) {

  const searchText=params.name;
  let[movies,setMovies]=useState<movie[]>([]);
  let[loading,setLoading]=useState(true);

  useEffect(()=>{

    async function searchMovie()
    {
      try
      {
        const res=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`)
        const data=await res.json();
        setMovies(data.results);
        console.log(movies)
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
    searchMovie();

  },[])

  function handleOnChange(argument: string) {
    if (argument === 'popularity') {
      const sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);
      setMovies(sortedMovies);
    } else if (argument === "rating") {
      const sortedMovies = [...movies].sort((a, b) => b.vote_average - a.vote_average);
      setMovies(sortedMovies);
    }
  }

  return (
    <div className='  '>

      {loading ? <div className=' w-full h-screen flex justify-center items-center'><span className="loading loading-infinity md:loading-lg loading-sm"></span></div> : <div> <div className=' flex justify-end my-4'>
        <select className="select md:select-md select-sm select-bordered w-32 mx-2 md:w-full max-w-xs" onChange={(e)=>handleOnChange(e.target.value)}>
          <option disabled selected>Sort By</option>
          <option value="popularity">Populariy</option>
          <option value="rating">Rating</option>
          {/* <option value="released_data">Released Data</option> */}
        </select>
      </div>
      <div className='list-none mt-4  justify-around flex  flex-wrap gap-8 items-center'>

        {movies.length===0 ? <div className=' flex w-full h-screen justify-center items-center'><p className=' btn-error btn-outline p-3 rounded-md'>No movie found</p></div> :movies?.map((movie)=>{
          return (
            <li key={movie.id}><Card data={movie}/></li>
          )
        }) }
      
        {/* {movies?.map((movie)=>{
          return (
            <li key={movie.id}><Card data={movie}/></li>
          )
        })} */}

      </div> </div> }

        

    </div>
  )
}

export default Searchpage