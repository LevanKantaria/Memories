import React from "react";
import { useState } from "react";
import classes from "./Post.module.css";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchPosts } from "../../../features/posts/postsSlice";
import { deletePost } from "../../../features/posts/postsSlice";
const Post = (props) => {
  const [state, setState] = useState("");

  const dispatch = useDispatch();
  const deleteHandler = (e) => {
    dispatch(deletePost(props.id));
  };
  return (
    <div className={classes.card}>
      <div className={classes.topHalf}>
        <h3 className={classes.creatorText}>{props.creator}</h3>
        <div className={classes.br}>
          <p className={classes.date}>
            <Moment fromNow>{props.createdAt}</Moment>
          </p>
        </div>
        <img src={props.image} alt="deco" />
      </div>
      <div>
        <p className={classes.tags}>#{props.tags}</p>
        <div className={classes.title}>
          <h1>{props.title} </h1>
        </div>
        <div className={classes.message}>{props.message} </div>
      </div>
      <div className={classes.likeDelete}>
        <button>Like {props.likeCount}</button>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};

export default Post;
