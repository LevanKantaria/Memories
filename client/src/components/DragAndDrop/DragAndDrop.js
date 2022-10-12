import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./DragAndDrop.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { filterActions } from "../../../store";

function DragAndDrop(props) {
  const dispatch = useDispatch();
  const [dragIsValid, setDragIsValid] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [imageName, setImageName] = useState("");

  const uploadHandler = (event) => {
    event.preventDefault();
  };

  let files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    if (localStorage.getItem("image-name")) {
      setImageName(localStorage.getItem("image-name"));
    }
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      setImageName(acceptedFiles[0].name);
      // console.log("upload");
      //   setDragIsValid(true);
      // dispatch(filterActions.dragAndDropState(dragIsValid));
      //   props.onChange();
      var reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = function () {
        // dispatch(filterActions.dragAndDropImage(reader.result));
        localStorage.setItem("image", reader.result);
        props.onChange(reader.result, files.length>0)
        // localStorage.setItem("image-name", acceptedFiles[0].name);
        // console.log(acceptedFiles[0].name);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
      return;
    }
  }, [files]);

  return (
    <section>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={classes.dragDrop}
      >
        <input {...getInputProps()} />
        <div className={classes.dragText}>
          Choose an Image or drag it here:{" "}
        </div>
        <div className={classes.buttonAndText}>
          <button className={classes.dragButton} onClick={uploadHandler}>
            Select
          </button>
          {imageName}
        </div>
      </div>
    </section>
  );
}

export default DragAndDrop;
