import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

const Posts = () => {
  const posts = useSelector(state=>state.posts.posts)

  let postsJsx = posts.map(item=>{
    return(
    <Post
     title={item.title} 
     message={item.message}
     creator={item.creator}
     likeCount={item.likeCount}
     createdAt={item.createdAt}
     image={item.selectedFile}
     tags={item.tags}
     key={Math.random()}
     id={item.id}
     />
    )
  })

  



  return (
    <>
      {postsJsx}
    
    </>
  );
};

export default Posts;
