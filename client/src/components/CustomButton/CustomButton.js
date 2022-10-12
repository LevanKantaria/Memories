import classes from "./CustomButton.module.css";

const CustomButton = (props) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={classes.button}
        style={{ height: `${props.height}`, width:`${props.width}` }}
      >
        {props.buttonText} {props.extraButtonText}
      </button>
    </>
  );
};

export default CustomButton;
