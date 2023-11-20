"use client"
import { BASE_IMAGE_URL } from '@/components/MovieList';
import { useAppDispatch, useAppSelector } from '@/hooks'
import { removeFromFav } from '@/redux/MovieSlice';
import React from 'react'
import { TMovieDetails } from '../movies/[id]/page';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function page() {
  const favMovies:TMovieDetails[]=useAppSelector((state)=>state.favMovies.movieArr);
  console.log(favMovies)
  const dispatch=useAppDispatch();

  function showNotification()
  {
    toast.success("Successfully removed from your faviourate list !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <div className=' md:m-4 m-2 items-center justify-around flex flex-col md:flex-wrap '>

{favMovies.length===0 ? <div className=' flex w-full h-screen justify-center items-center'><p className=' btn-error btn-outline p-1 md:p-3 rounded-sm md:rounded-md'>Your favorite movies list is currently empty.</p></div> : favMovies.map((movie)=>{
        return (
          <div>
            <div key={movie.id} className="card card-compact my-2 w-72 md:w-96 bg-[#2f3651] shadow-xl">
              <figure><img src={`${BASE_IMAGE_URL}${movie.backdrop_path}`} alt="" /></figure>
              <div className="card-body">
                <h2 className="card-title md:text-xl text-lg text-[#8ebbff]">{movie.original_title}</h2>
                <p className=' md:text-lg text-sm'>{movie.overview}</p>
                <div className="card-actions justify-center">
                  <button className=" btn btn-sm btn-error md:btn-md my-2" onClick={()=>movie && dispatch(removeFromFav(movie)) && showNotification()}>Remove from faviourate</button>
                  <ToastContainer position="top-right"
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
          </div>
        )
      }) }

      {/* {favMovies.map((movie)=>{
        return (
          <div>
            <div key={movie.id} className="card card-compact w-96 bg-base-100 shadow-xl">
              <figure><img src={`${BASE_IMAGE_URL}${movie.backdrop_path}`} alt="" /></figure>
              <div className="card-body">
                <h2 className="card-title">{movie.original_title}</h2>
                <p>{movie.overview}</p>
                <div className="card-actions justify-center">
                  <button className="btn btn-error" onClick={()=>movie && dispatch(removeFromFav(movie)) && showNotification()}>Remove from faviourate</button>
                  <ToastContainer position="top-right"
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
          </div>
        )
      })} */}

    </div>
  )
}

export default page