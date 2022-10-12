import classes from "./NewMemoryButton.module.css";

const NewMemoryButton = (props) => {
  return (
    <button
      className={`${classes.iconBtn} ${classes.addBtn}`}
      onClick={props.onClick}
    >
      <div className={classes.addIcon}></div>
      <div className={classes.btnTxt}>Create</div>
    </button>
  );
};

export default NewMemoryButton;
