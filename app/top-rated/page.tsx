"use client"
import RatedList from '@/components/RatedList'
import React, { useEffect, useState } from 'react'
import { TRes } from '../page';
import Info from '@/components/Info';

function Rated() 
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
      setCountry(data.country);
      setCountrycode(data.countryCode);
      setCity(data.city);
    }

    fetchIPaddress();
    fetchInfo(ipaddress);

  },[])
  return (
    <div>
      {countrycode === "IN" ? <Info/> : <RatedList/>}
      
    </div>
  )
}

export default Rated