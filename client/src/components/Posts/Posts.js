import React from "react";
import classes from './Posts.module.css'
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
     tags={item.tags.map(tag=>`#${tag}`)}
     key={Math.random()}
     id={item.id}
     />
    )
  })

  



  return (
    <div className={classes.grid}>

      {postsJsx}
    
    </div>
  );
};

export default Posts;
