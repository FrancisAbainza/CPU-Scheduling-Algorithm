import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import logoImg from "../assets/bsit-logo.png"
import classes from "./Root.module.css";
import { observeElement } from "../util/observeElement.js"

export default function Root() {
  const heroRef = useRef();

  useEffect(() => {
    observeElement(heroRef.current, classes["visible"]);
  }, [heroRef.current]);

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <div ref={heroRef} className={classes.hero}>
          <img src={logoImg} alt="BSIT 2-2 logo" />
          <h1>COMP-007 CPU Scheduling Calculator</h1>
        </div>
        <Outlet />
      </div>
      <p>©2024 Abainza. All rights reserved</p>
    </main>
  );
}