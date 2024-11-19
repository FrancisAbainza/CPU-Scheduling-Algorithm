import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Given from "../components/priority/Given.jsx";
import Gantt from "../components/priority/Gantt.jsx"
import Table from "../components/priority/Table.jsx";
import IconButton from "../components/ui/IconButton.jsx";
import backImg from "../assets/arrow_back.svg";
import classes from "./Priority.module.css";
import PriorityContextProvider from "../contexts/PriorityContext.jsx";
import { observeElement } from "../util/observeElement.js"

export default function Priority() {
  const priorityRef = useRef();
  const navigate = useNavigate();

  function handleBack() {
    navigate("..");
  }

  useEffect(() => {
    observeElement(priorityRef.current, classes["visible"])
  }, [priorityRef.current]);

  return (
    <PriorityContextProvider>
      <section ref={priorityRef} className={classes.priority}>
        <div className={classes.header}>
          <IconButton src={backImg} alt="back button" title="Back" onClick={handleBack} />
          <p className={classes.definition}><span>Priority scheduling</span> is a non-preemptive or preemptive algorithm and one of the most common scheduling algorithms that gives preferential treatment to important jobs.  </p>
        </div>
        <Given />
        <Gantt />
        <Table />
      </section>
    </PriorityContextProvider>
  );
}