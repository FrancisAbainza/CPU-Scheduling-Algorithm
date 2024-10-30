import classes from "./IconButton.module.css";

export default function IconButton({ onClick, type, ...props }) {
  return (
      <button className={classes.iconBtn} onClick={onClick} type={type}>
        <img {...props} />
      </button>
  );
} 