import classes from "./Form.module.css";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { uploadPost } from "../../features/posts/postsSlice";
import { postActions } from "../../features/posts/postsSlice";
import InputField from "../InputField/Input";

let creatorIsValid =false
let messageIsValid =false
let imageIsValid = false
let titleIsValid = false
let tagsIsValid = false
const Form = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [creator, setCreator] = useState("");
  const [tags, setTags] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  //     these change handlers are called from child input component
  // and 'e' holds e.target.value from the child , id hold id of input
  const creatorChangeHandler = (e, valid) => {
    setCreator(e);
    creatorIsValid = valid;
  };
  const messageChangeHandler = (e, valid) => {
    setMessage(e);
    messageIsValid = valid;
  };
  const titleChangeHandler = (e, valid) => {
    setTitle(e);
    titleIsValid = valid;
  };
  const tagsChangeHandler = (e, valid) => {
    setTags(e);
    tagsIsValid = valid;
  };
  const imageChangeHandler = (e, valid) => {
    setSelectedFile(e);
    imageIsValid = valid;
  };

  //  validation function that is provided to input fields
  const validate = (value) => {
    if (value.length > 2) return true;
    return false;
  };
  const urlValidation = (value) => {
    if (value.startsWith("https://") || value.startsWith("data:image"))
      return true;
    return false;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let formIsValid =(
      messageIsValid &&
      titleIsValid &&
      tagsIsValid &&
      imageIsValid &&
      creatorIsValid
      )
      console.log(formIsValid)
    e.preventDefault();
    if (formIsValid) {
      console.log(formIsValid);

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
      setCreator("");
      setTags("");
      setTitle("");
      setSelectedFile("");
      setMessage("");
      messageIsValid = false;
      titleIsValid = false;
      tagsIsValid = false;
      imageIsValid = false;
      creatorIsValid = false;
      dispatch(postActions.addError(false))
    }else{
      dispatch(postActions.addError(true))
    }
  };

  let buttonLabel;
  if (loading) {
    buttonLabel = "Sending Data...";
  } else {
    buttonLabel = "submit";
  }
  return (
    <div className={classes.card}>
      <h1>New Memory</h1>
      <form>
        <InputField
          id="creator"
          label="Creator"
          isValid={validate}
          error="Enter Valid Name, min 3 letters"
          onChange={creatorChangeHandler}
          value={creator}
        />

        <InputField
          id="title"
          label="Title"
          isValid={validate}
          error="Enter Valid Title, min 3 letters"
          onChange={titleChangeHandler}
          value={title}
        />

        <InputField
          id="message"
          label="Message"
          isValid={validate}
          error="Enter Valid Message, min 3 letters"
          onChange={messageChangeHandler}
          value={message}
        />

        <InputField
          id="tags"
          label="Tags"
          isValid={validate}
          error="Enter Valid Title, min 3 letters"
          onChange={tagsChangeHandler}
          value={tags}
        />

        <InputField
          id="image"
          label="Image URL"
          isValid={urlValidation}
          error="Enter Valid Url or data file"
          onChange={imageChangeHandler}
          value={selectedFile}
        />
        <button onClick={submitHandler}>{buttonLabel}</button>
        {/* {error && (
          <div className={classes.error}>
            <h4> {error}</h4>
          </div>
        )} */}
      </form>
    </div>
  );
};

export default Form;
