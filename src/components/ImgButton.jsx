import { Link } from "react-router-dom";
import classes from "./ImgButton.module.css";

export default function ImgButton({ to, ...props }) {
  return (
    <Link className={classes.imgBtn} to={to}>
      <img {...props} />
    </Link>
  );
} 