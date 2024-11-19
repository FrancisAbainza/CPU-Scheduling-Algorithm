import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Given from "../components/fcfs/Given.jsx";
import Gantt from "../components/fcfs/Gantt.jsx"
import Table from "../components/fcfs/Table.jsx";
import IconButton from "../components/ui/IconButton.jsx";
import backImg from "../assets/arrow_back.svg";
import classes from "./Fcfs.module.css";
import FcfsContextProvider from "../contexts/FcfsContext.jsx";
import { observeElement } from "../util/observeElement.js"

export default function Fcfs() {
  const fcfsRef = useRef();
  const navigate = useNavigate();

  function handleBack() {
    navigate("..");
  }

  useEffect(() => {
    observeElement(fcfsRef.current, classes["visible"])
  }, [fcfsRef.current]);

  return (
    <FcfsContextProvider>
      <section ref={fcfsRef} className={classes.fcfs}>
        <div className={classes.header}>
          <IconButton src={backImg} alt="back button" title="Back" onClick={handleBack} />
          <p className={classes.definition}><span>First-Come, First Serve (FCFS)</span> is a nonpreemptive scheduling algorithm that handles jobs according to their arrival time; the earlier they arrive, the sooner they’re served.  </p>
        </div>
        <Given />
        <Gantt />
        <Table />
      </section>
    </FcfsContextProvider>
  );
}