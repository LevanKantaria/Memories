import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const InputField = (props) => {
  const error = useSelector((state) => state.posts.error);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // When your code works and don't know why
    if (error === "uploaded") {
      setIsTouched(false);
      setIsValid(false);
    }
    if (error !== "uploaded" && error) {
      setIsTouched(true);
    }

  }, [error]);
  const changeHandler = (e) => {
    setIsTouched(true);
    setIsValid(props.isValid(e.target.value));

    props.onChange(e.target.value, props.isValid(e.target.value));
  };

  if (!isValid && isTouched) {
    return (
      <TextField
        defaultValue=""
        id={props.id}
        label={props.label}
        variant="outlined"
        onChange={changeHandler}
        margin="dense"
        error
        helperText={props.error}
        value={props.value}
      />
    );
  }

  return (
    <TextField
      id={props.id}
      label={props.label}
      variant="outlined"
      onChange={changeHandler}
      value={props.value}
      margin="dense"
    />
  );
};

export default InputField;
