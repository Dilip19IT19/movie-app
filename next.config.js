/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    // domains:["www.themoviedb.org","image.tmdb.org"]
    remotePatterns:[
      {
        protocol:"https",
        hostname:"**"
      }
    ]
  }
}

module.exports = nextConfig
