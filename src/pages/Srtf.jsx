import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Given from "../components/srtf/Given.jsx";
import Gantt from "../components/srtf/Gantt.jsx"
import Table from "../components/srtf/Table.jsx";
import IconButton from "../components/ui/IconButton.jsx";
import backImg from "../assets/arrow_back.svg";
import classes from "./Fcfs.module.css";
import SrtfContextProvider from "../contexts/SrtfContext.jsx";
import { observeElement } from "../util/observeElement.js"

export default function Fcfs() {
  const SrtfRef = useRef();
  const navigate = useNavigate();

  function handleBack() {
    navigate("..");
  }

  useEffect(() => {
    observeElement(SrtfRef.current, classes["visible"])
  }, [SrtfRef.current]);

  return (
    <SrtfContextProvider>
      <section ref={SrtfRef} className={classes.fcfs}>
        <div className={classes.header}>
          <IconButton src={backImg} alt="back button" title="Back" onClick={handleBack} />
          <p className={classes.definition}><span>Shortest Job First (SJF)</span> is a non-preemptive or preemptive scheduling algorithm, also known as Shortest Job Next (SJN) or shortest remaining time (SRT), that handles jobs based on the length of their CPU cycle time.</p>
        </div>
        <Given />
        <Gantt />
        <Table />
      </section>
    </SrtfContextProvider>
  );
}