import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import postReducer from '../features/posts/postsSlice'


const store = configureStore({
  reducer: { posts: postReducer },
  
});

export default store;
