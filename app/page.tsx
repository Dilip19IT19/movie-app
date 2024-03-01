"use client"
import MovieList, { API_KEY, BASE_URL, movie } from '@/components/MovieList'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from "../styles/MovieList.module.css"
import Info from '@/components/Info';



export type TRes={
    query:string,
    country:string,
    countryCode:string,
    city:string,
    regionName:string,
    isp:string
  }


export default function Home() {

  let[popularMovies,setPopularMovies]=useState<movie[]>([]);
  let[ipaddress,setIPaddress]=useState("");
  let[country,setCountry]=useState("");
  let[city,setCity]=useState("");
  let[countrycode,setCountrycode]=useState("");


  useEffect(()=>{

    async function fetchIPaddress() 
    {
        const res=await fetch("https://api.ipify.org");
        const data=await res.text();
        setIPaddress(data);
    }

    async function  fetchInfo(Ipaddress:string) 
    {
      const res=await fetch(`https://ip-api.com/json/${Ipaddress}`);
      const data:TRes=await res.json();
      setCountry(data.country);
      setCountrycode(data.countryCode);
      setCity(data.city);
    }

    fetchIPaddress();
    fetchInfo(ipaddress);

  },[])
 
  

  useEffect(()=>{
  
    async  function getPopularMovies()
    {
      const res=await fetch(`${BASE_URL}/movie/popular?language=en-US&page=1&api_key=${API_KEY}`);
      const data=await res.json();
      setPopularMovies(data.results);
      
    }
    
   
    if(countrycode==="IN")
    {
        // do nothing
    }
    else
    {
        getPopularMovies();
    }
   
   

  },[])

  return (
    <>
    {countrycode==="IN" ? <Info/> :
     <div className={style.poster}>
                <Carousel
                   showThumbs={false}
                    autoPlay={true}
                    transitionTime={2}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link key={movie.id} style={{textDecoration:"none",color:"white"}} href={`movies/${movie.id}`} >
                                <div className="posterImage">
                                    <img alt={movie.original_title} src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                </div>
                                <div className={style.posterImage__overlay}>
                                    <div className={style.posterImage__title}>{movie ? movie.original_title: ""}</div>
                                    <div className={style.posterImage__description}>{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieList />
            </div> }
            
        </>
  )
}
