"use client"
import PopularList from '@/components/PopularList'
import React, { useEffect, useState } from 'react'
import { TRes } from '../page';
import Info from '@/components/Info';

function Popular() 
{

  let[country,setCountry]=useState("");
  let[city,setCity]=useState("");
  let[countrycode,setCountrycode]=useState("");



  useEffect(()=>{

  

    async function  fetchInfo() 
    {
      const res=await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=2e30b3d4f3654d3884c9ca02cb728b39`);
      const data:TRes=await res.json();
      setCountry(data.country.name);
      setCountrycode(data.country.iso_code);
      setCity(data.city.name);
      console.log(country);
      console.log(countrycode);
      console.log(city);
    }

    
    fetchInfo();

  },[])


  return (
    <div>
      {countrycode=="IN" ? <Info/> : <PopularList/>}
     
    </div>
  )
}

export default Popular