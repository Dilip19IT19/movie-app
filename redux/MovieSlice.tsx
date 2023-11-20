import { TMovieDetails } from "@/app/movies/[id]/page"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"


type TMovie={
  movieArr:TMovieDetails[]
}

const initialState:TMovie={
  movieArr:[]
}

const MovieSlice=createSlice({
  name:"favmovies",
  initialState:initialState,
  reducers:{
    addToFav:(state,action:PayloadAction<TMovieDetails>)=>{
      state.movieArr.push(action.payload);
    },
    removeFromFav:(state,action:PayloadAction<TMovieDetails>)=>{
      state.movieArr=state.movieArr.filter((movie)=>movie.id!==action.payload.id)
    }
  }
})

const MovieReducer= MovieSlice.reducer;
export default MovieReducer;
export const {addToFav,removeFromFav}=MovieSlice.actions;
