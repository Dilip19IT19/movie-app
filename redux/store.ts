import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./MovieSlice";


const store=configureStore({
  reducer:{
    favMovies:MovieReducer
  }
})

export default store;

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch