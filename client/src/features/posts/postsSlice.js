import { create } from "@mui/material/styles/createTransitions";
import { positions } from "@mui/system";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  posts: [],
  error: "",
};



//  Fetch All posts --- START---
export const fetchPosts = createAsyncThunk("posts/fetchPosts",async () => {

  let tempData = [];
  const promise = axios.get("http://localhost:5000/posts").then((res) => {
    let data = res.data;
    for (let key in data) {
      tempData.unshift({
        title: data[key].title,
        message: data[key].message,
        likeCount: data[key].likeCount,
        creator: data[key].creator,
        createdAt: data[key].createdAt,
        tags:data[key].tags,
        selectedFile:data[key].selectedFile,
        id:data[key]._id
      });
    }
    return tempData;
  });

  const posts = await promise
  return posts;
});

//  Fetch All posts --- END---




// --- Upload Post --- START  ---
export const uploadPost = createAsyncThunk("posts/uploadPost", async(postToUpload)=>{
  const promise = axios.post("http://localhost:5000/posts", postToUpload).then(res=>{
    postToUpload.id=res.data._id
    return postToUpload;
  })
  const postPayload = await promise
  return postPayload
})
// --- Upload Post --- END ---





//  Delete Post --- START---

export const deletePost = createAsyncThunk('posts/deletePost', async(id)=>{
  const promise = axios.delete('http://localhost:5000/posts/'+id).then(res=>{
    let resId = res.data._id
    console.log(resId)
    return resId
  })
  const resId = await promise
  return resId
})

//  Delete Post --- END ---




const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers:{
      uploadPost:(state,action)=>{
        state.posts.unshift(action.payload)
      }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;

      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];

      state.error = action.error.message;
    });
      builder.addCase(uploadPost.pending, (state)=>{
        state.loading = true;
        });
        builder.addCase(uploadPost.fulfilled, (state,action)=>{
          state.posts.unshift(action.payload)
          state.loading = false
      })
      builder.addCase(uploadPost.rejected , (state,action) =>{
        state.loading= false;
        state.error = 'Error '
      })
      builder.addCase(deletePost.pending, (state) =>{
        state.loading = true
      })
      builder.addCase(deletePost.fulfilled, (state,action)=>{
        state.loading = false;

        //Action gives us ID of deleted item. Find The index and remove from Posts state.
        const index  = state.posts.findIndex((post)=>post.id===action.payload)
        state.posts.splice(index,1)

        
      })
  },
});

export default postsSlice.reducer;
export const postActions = postsSlice.actions;