import { useEffect, useRef } from "react";
import ImgButton from "../components/ImgButton";
import priorityImg from "../assets/priority.png"
import classes from "./Home.module.css";
import { observeElement } from "../util/observeElement.js"

export default function Root() {
  const homeRef = useRef();

  useEffect(() => {
    observeElement(homeRef.current, classes["visible"]);
  }, [homeRef.current]);

  return (
    <section ref={homeRef} className={classes.home}>
      <ImgButton src={priorityImg} alt="priority scheduling algorithm" to={"/priority"} />
    </section>
  );
} 