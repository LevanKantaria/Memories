import classes from "./Form.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadPost } from "../../features/posts/postsSlice";
import { postActions } from "../../features/posts/postsSlice";
import CustomButton from "../CustomButton/CustomButton";
import InputField from "../InputField/Input";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import ReactTagsInput from "../TagsInput/TagsInput";
let creatorIsValid = false;
let messageIsValid = false;
let imageIsValid = false;
let titleIsValid = false;
let tagsIsValid = false;

const Form = (props) => {
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
    console.log(e.map(tag=>`£${tag}`));
    tagsIsValid = valid;
  };
  // const imageChangeHandler = (e, valid) => {
  //   setSelectedFile(e);
  //   imageIsValid = valid;
  // };

  const imageUploadHandler = (e, valid) => {
    imageIsValid = valid;
    console.log(imageIsValid);

    setSelectedFile(e);
    // console.log(e)
  };

  //  validation function that is provided to input fields
  const validate = (value) => {
    if (value.length > 2) return true;
    return false;
  };
  const titleValidate = (value) => {
    if (value.length > 2 && value.length < 15) return true;
    return false;
  };
  const messageValidate = (value) => {
    if (value.length > 2 && value.length < 120) return true;
    return false;
  };
  // const urlValidation = (value) => {
  //   if (value.startsWith("https://") || value.startsWith("data:image"))
  //     return true;
  //   return false;
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    let formIsValid =
      messageIsValid &&
      titleIsValid &&
      tagsIsValid &&
      imageIsValid &&
      creatorIsValid;
    console.log(formIsValid);
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
        likeCount: 0,
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
      dispatch(postActions.addError(false));
      props.onClose();
    } else {
      dispatch(postActions.addError(true));
    }
  };

  let buttonLabel;

  buttonLabel = "Submit";
  const selectedTags = (tags) => {
    console.log(tags);
  };

  return (
    <div className={classes.modalBackground}>
      <div className={classes.card}>
        {/* <section className={classes.closeButtonSection}>
          <button
            className={classes.closeButton}
            onClick={props.onClose}
          >
            <CloseRoundedIcon fontSize="large" />
          </button>
        </section> */}

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
            isValid={titleValidate}
            error="Enter Valid Title, 3-15 characters"
            onChange={titleChangeHandler}
            value={title}
          />

          <InputField
            id="message"
            label="Message"
            isValid={messageValidate}
            error="Enter Valid Message, 3-120 characters"
            onChange={messageChangeHandler}
            value={message}
          />

          {/* <InputField
            id="tags"
            label="Tags"
            isValid={validate}
            error="Enter Valid Title, min 3 letters"
            onChange={tagsChangeHandler}
            value={tags}
          /> */}

          
          <ReactTagsInput onChange={tagsChangeHandler} />
            {" "}
          

          {/* <InputField
            id="image"
            label="Image URL"
            isValid={urlValidation}
            error="Enter Valid Url or data file"
            onChange={imageChangeHandler}
            value={selectedFile}
          /> */}

          <DragAndDrop onChange={imageUploadHandler} />
          <div className={classes.closeAndSubmit}>
            <CustomButton
              width="60%"
              height="50"
              onClick={props.onClose}
              buttonText="cancel"
              background="grey"
            />
            <CustomButton
              width="30%"
              height="50"
              onClick={submitHandler}
              buttonText={buttonLabel}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
