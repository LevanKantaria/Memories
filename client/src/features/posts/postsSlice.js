import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  posts: [],
  error: "",
};

const API_POSTS = "http://localhost:5000/posts"

//  Fetch All posts ---
export const fetchPosts = createAsyncThunk("posts/fetchPosts",async () => {

  let tempData = [];
  const promise = axios.get(API_POSTS).then((res) => {
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

// ---




// --- Upload Post ---
export const uploadPost = createAsyncThunk("posts/uploadPost", async(postToUpload)=>{
  const promise = axios.post(API_POSTS, postToUpload).then(res=>{
    postToUpload.id=res.data._id
    return postToUpload;
  })
  const postPayload = await promise
  return postPayload
})

// ---




//  Delete Post ---

export const deletePost = createAsyncThunk('posts/deletePost', async(id)=>{
  const promise = axios.delete(API_POSTS + '/'+ id).then(res=>{
    let resId = res.data._id
    console.log(resId)
    return resId
  })
  const resId = await promise
  return resId
})


// ---



const postsSlice = createSlice({
  name: "posts",
  initialState,
 reducers:{
  addError:(state,action)=>{
    state.error = action.payload
  }
 },
  // fetching 
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error=false
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error=false
      

      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];

      state.error = action.error.message;
    });

    // Uploading 
      builder.addCase(uploadPost.pending, (state)=>{
        state.loading = true;
        state.error=false

        });
        builder.addCase(uploadPost.fulfilled, (state,action)=>{
          state.posts.unshift(action.payload)
          state.loading = false
          state.error='uploaded'
      })
      builder.addCase(uploadPost.rejected , (state,action) =>{
        state.loading= false;
        state.error = ' Fill  all forms '
      })
      // Deleting
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