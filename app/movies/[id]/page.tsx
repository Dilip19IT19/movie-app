"use client"
import { API_KEY, BASE_URL, movie } from '@/components/MovieList'
import React, { useEffect, useState } from 'react'
import style from "../../../styles/MovieDetail.module.css"
import star from "../../../public/star.svg"
import Image from 'next/image'
import Card from '@/components/Card'
import { useAppDispatch } from '@/hooks'
import { addToFav } from '@/redux/MovieSlice'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";



type TParams={
  params:{
    id:number
  }
}

type TGenre={
  name:string;
  id:number;
}

export type TMovieDetails={
  isAdult:boolean;
  backdrop_path:string;
  overview:string;
  original_title:string;
  homepage?:string;
  id:number;
  original_language:string;
  genres:TGenre[];
  poster_path?:string;
  tagline:string;
  vote_average:number;

}



export default function MovieDetailPage({params}:TParams) {

  let[movieDetails,setMovieDetails]=useState<TMovieDetails | null>(null);
  let[similarMovies,setSimilarMovies]=useState<movie[]>([]);
  const dispatch=useAppDispatch();
  let[loading,setLoading]=useState(true);


  function showNotification()
  {
    toast.success("Successfully added to your faviourate list !", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }


  useEffect(()=>{

    async function getMovieDetails()
    {
      try
      {
        const res=await fetch(`${BASE_URL}/movie/${params.id}?api_key=${API_KEY}`)
        const data: TMovieDetails=await res.json();
        setMovieDetails(data);
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

    async function getSimilarMovies()
    {
      try
      {
        setLoading(true);
        const res=await fetch(`https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=${API_KEY}`)
        const data=await res.json();
        setSimilarMovies(data.results);
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

    getMovieDetails();
    getSimilarMovies();

  },[])

  return (

   <>

{loading ? <div className=' flex w-full h-screen justify-center items-center'><span className="loading loading-ring loading-sm md:loading-lg"></span></div> :     <div className={style.movie}>

     

<div className={style.movie__intro}>
    <img className={style.movie__backdrop} src={`https://image.tmdb.org/t/p/original${movieDetails ? movieDetails.backdrop_path : ""}`} />
</div>
<div className={style.movie__detail}>
    <div className={style.movie__detailLeft}>
        <div className={style.movie__posterBox}>
            <img className={style.movie__poster} src={`https://image.tmdb.org/t/p/original${movieDetails ? movieDetails.poster_path : ""}`} />
        </div>
    </div>
    <div className={style.movie__detailRight}>
        <div className={style.movie__detailRightTop}>
            <div className={style.movie__name}>{movieDetails ? movieDetails.original_title : ""}</div>
            <div className={style.movie__tagline}>{movieDetails ? movieDetails.tagline : ""}</div>
            <div className={style.movie__rating}>
                {movieDetails ? movieDetails.vote_average.toFixed(2): ""} <Image src={star} alt='star' width={13} height={13} style={{display:"inline-block"}}/>
                
            </div>  
            
            <div className={style.movie__genres}>
                {
                    movieDetails && movieDetails.genres
                    ? 
                    movieDetails.genres.map(genre => (
                        <><span className={style.movie__genre} key={genre.id}>{genre.name}</span></>
                    )) 
                    : 
                    ""
                }
            </div>
        </div>
        <div className={style.movie__detailRightBottom}>
            <div className={style.synopsisText}>Synopsis</div>
            <div>{movieDetails ? movieDetails.overview : ""}</div>
            <button className=' btn btn-success btn-outline m-4 btn-sm md:btn-md' onClick={()=>movieDetails && dispatch(addToFav(movieDetails)) && showNotification()} >Add to faviourates</button>
            <ToastContainer position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"/>
        </div>
       
    </div>
</div>



<div className=' list-none flex flex-wrap md:mt-10 mt-36 justify-around items-center relative bottom-44'>
  {similarMovies.map((movie)=>{
    return (
      <li key={movie.id}><Card data={movie}/></li>
    )
  })}
</div>

</div> }

   </>



  )
}





