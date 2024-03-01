import React from 'react'
import { movie } from './MovieList'
import Link from 'next/link'
import Image from 'next/image'

type TCard={
  data:movie
}

const BASE_IMAGE_URL="https://image.tmdb.org/t/p/original/"

function Card({data}:TCard) {
  return (

    <Link  href={"/movies/"+data.id} className="card md:card-normal card-compact w-76 md:w-96 my-1 md:my-2 cursor-pointer scale-90 hover:scale-105 transition-all duration-200 bg-[#2f3551] shadow-4xl">
       <figure><Image width={500} height={300} className=' h-auto w-auto' src={`${BASE_IMAGE_URL}${data.backdrop_path}`} alt={data.original_title} /></figure>
        <div className="card-body">
        <h2 className="card-title text-[#8ebbff] text-lg text-center md:text-xl">{data.original_title}</h2>
      </div>
    </Link>

  )
}

export default Card