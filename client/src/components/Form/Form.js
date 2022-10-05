import classes from "./Form.module.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postActions } from "../../features/posts/postsSlice";
import { uploadPost } from "../../features/posts/postsSlice";
import { TextField } from "@mui/material";

const Form = () => {
  // const isLoading = useSelector(state=>state.posts.loading)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [creator, setCreator] = useState("");
  const [tags, setTags] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const creatorChangeHandler = (e) => {
    setCreator(e.target.value);
  };
  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };
  const imageChangeHandler = (e) => {
    setSelectedFile(e.target.value);
  };
  const tagsChangeHandler = (e) => {
    setTags(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let date = new Date().toString();
    let post = {
      creator,
      title,
      message,
      tags,
      selectedFile,
      createdAt: date,
      id: "",
    };
    dispatch(uploadPost(post));
  };

  let buttonLabel;
  if (loading) {
    buttonLabel = "Sending Data...";
  } else {
    buttonLabel = "submit";
  }
  return (
    <div className={classes.card}>
      <h1>Form</h1>
      <form>
        <TextField
          id="outlined-basic"
          label="Creator"
          variant="outlined"
          onChange={creatorChangeHandler}
          margin="dense"
        />

        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          onChange={titleChangeHandler}
          margin="dense"
        />

        <TextField
          id="outlined-basic"
          label="Message"
          variant="outlined"
          onChange={messageChangeHandler}
          margin="dense"
        />

        <TextField
          id="outlined-basic"
          label="Tags"
          variant="outlined"
          onChange={tagsChangeHandler}
          margin="dense"
        />

<TextField
          id="outlined-basic"
          label="Image URL"
          variant="outlined"
          onChange={imageChangeHandler}
          margin="dense"
        />
        <button onClick={submitHandler}>{buttonLabel}</button>
      </form>
    </div>
  );
};

export default Form;
