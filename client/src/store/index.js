import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../features/posts/postsSlice'


const store = configureStore({
  reducer: { posts: postReducer },
  
});

export default store;
