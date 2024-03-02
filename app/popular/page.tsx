"use client"
import PopularList from '@/components/PopularList'
import React, { useEffect, useState } from 'react'
import { TRes } from '../page';
import Info from '@/components/Info';

function Popular() 
{
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
      const res=await fetch(`http://ip-api.com/json/${Ipaddress}`);
      const data:TRes=await res.json();
      setCountry(data.country.name);
      setCountrycode(data.country.iso_code);
      setCity(data.city.name);
    }

    fetchIPaddress();
    fetchInfo(ipaddress);

  },[])
  return (
    <div>
      {countrycode=="IN" ? <Info/> : <PopularList/>}
     
    </div>
  )
}

export default Popular