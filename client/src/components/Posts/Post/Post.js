import React from "react";
import classes from "./Post.module.css";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from "../../CustomButton/CustomButton";
import { deletePost } from "../../../features/posts/postsSlice";
const Post = (props) => {
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

      <p className={classes.tags}>#{props.tags}</p>
      <article className={classes.title}>
        <h1>{props.title} </h1>
      </article>
      <p className={classes.message}>{props.message} </p>

      <div className={classes.likeDelete}>
        <CustomButton
          buttonText={<FavoriteBorderIcon />}
          extraButtonText={props.likeCount}
          height="30px"
          width="100px"
        />

        <CustomButton
          onClick={deleteHandler}
          buttonText={<DeleteIcon />}
          height="30px"
          width="100px"
        />
      </div>
    </div>
  );
};

export default Post;
