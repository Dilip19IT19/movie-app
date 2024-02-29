"use client"
import { useAppSelector } from '@/hooks';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const navLinks=[
  {name:"Home",href:"/"},
  {name:"Top Rated",href:"/top-rated"},
  {name:"Popular",href:"/popular"},
  {name:"Faviourates",href:"/faviourates"},
]

function Navbar() {
  let[searchText,setSearchText]=useState("");
  let [windowWidth, setWindowWidth] = useState<number>(0);
  const router=useRouter();
  const pathname=usePathname();
  const movieArr=useAppSelector((state)=>state.favMovies.movieArr);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial window width

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleSubmit()
  {
    if(searchText)
    {
      router.push(`/movies/search/${searchText}`)
    }
    else
    {
      alert("input is empty");
    }
  }

  function handleCheck(e:React.KeyboardEvent<HTMLInputElement>)
  {
      if(e.key==='Enter')
      {
        if(searchText)
        {
          router.push(`/movies/search/${searchText}`)
          setSearchText("")
        }
        else
        {
          alert("input is empty");
        }
      }
  }


  return (
    <div>

      {windowWidth <= 600 ? <div className="navbar bg-[#2f3651]">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#2f3651] rounded-box w-52">
        <li><Link className='hover:text-[#8ebbff]  text-sm  text-slate-500 ' href="/">Home</Link></li>
        <li><Link className='hover:text-[#8ebbff]  text-sm text-slate-500  ' href="/top-rated">Top Rated</Link></li>
        <li><Link className='hover:text-[#8ebbff]  text-sm text-slate-500  ' href="/popular">Popular</Link></li>
        <li><Link className='hover:text-[#8ebbff]  text-sm text-slate-500 ' href="/faviourates">Faviourates</Link></li>

       
      </ul>
    </div>
  </div>
 
  <div className="navbar-end">
    
  <input type="text" placeholder='search any movie' value={searchText} onKeyDown={(e)=>handleCheck(e)} onChange={(e)=>setSearchText(e.target.value)} className=' w-44    p-[2px] opacity-90 rounded-md border-none text-center' />
          <button className=' text-sm mx-2  p-[2px] rounded-md text-[#8ebbff] border-[1px] border-[#8ebbff] hover:border-none hover:bg-[#8ebbff] hover:text-black active:scale-90 transition-scale duration-300' onClick={handleSubmit}>Search</button>

  </div>
</div> : <nav className=' bg-[#2f3651]  shadow-lg flex justify-between items-center p-5'>     

<div className=' flex gap-12  '>



  {navLinks.map((movie)=>{
    let isActive= pathname===movie.href;
    if(movie.href==="/faviourates")
    {
      return (
        <Link href={movie.href} key={movie.name} className={ isActive ? "font-bold text-xl  text-[#8ebbff]" : "hover:text-[#8ebbff]  text-lg text-slate-500 mx-2"}>{movie.name}<sup className=' text-sm  text-[#8ebbff]'> {movieArr.length}</sup></Link>
      )
    }
    return (      
      <Link href={movie.href} key={movie.name} className={ isActive ? "font-bold text-xl  text-[#8ebbff]" : "hover:text-[#8ebbff]  text-lg text-slate-500 mx-2"}>{movie.name}</Link>
    )

  })}
  


</div>

<div className='flex gap-10'>
 
  <input type="text" placeholder='search any movie' value={searchText} onKeyDown={(e)=>handleCheck(e)} onChange={(e)=>setSearchText(e.target.value)} className=' w-48 md:w-72 p-1 opacity-90 rounded-md border-none text-center' />
  <button className=' mr-6 ml-2  md:mr-4 md:ml-2 p-1 rounded-md text-[#8ebbff] border-[1px] border-[#8ebbff] hover:border-none hover:bg-[#8ebbff] hover:text-black active:scale-90 transition-scale duration-300' onClick={handleSubmit}>Search</button>
</div>
</nav>}

      

    </div>
  )
}

export default Navbar