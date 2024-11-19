import { useEffect, useRef } from "react";
import ImgButton from "../components/ImgButton";
import fcfsImg from "../assets/fcfs.png"
import priorityImg from "../assets/priority.png"
import srtfImg from "../assets/srtf.png"
import classes from "./Home.module.css";
import { observeElement } from "../util/observeElement.js"

export default function Root() {
  const homeRef = useRef();

  useEffect(() => {
    observeElement(homeRef.current, classes["visible"]);
  }, [homeRef.current]);

  return (
    <section ref={homeRef} className={classes.home}>
      <ImgButton src={fcfsImg} alt="priority scheduling algorithm" to="/fcfs" />
      <ImgButton src={priorityImg} alt="priority scheduling algorithm" to="/priority" />
      <ImgButton src={srtfImg} alt="priority scheduling algorithm" to="/srtf" />
    </section>
  );
} 