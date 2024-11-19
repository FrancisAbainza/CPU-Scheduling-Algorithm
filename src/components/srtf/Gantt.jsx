import classes from "./Gantt.module.css";
import { useSrtf } from "../../contexts/SrtfContext.jsx";

export default function Gantt() {
  let { ganttChart } = useSrtf()
  const dividedGanttChart = [];
  
  function checkCompletionTime(completionTime, startingTime) {
    if (completionTime !== startingTime) {
      return `${completionTime} | ${startingTime}`;
    } else {
      return completionTime;
    }
  }

  for (let i = 0; i < ganttChart.length; i += 5) {
    dividedGanttChart.push(ganttChart.slice(i, i + 5));
  }

  if (ganttChart.length < 1) {
    return;
  }

  return (
    <div className={classes.gantt}>
      <h3>Gantt Chart</h3>

      {dividedGanttChart.map(
        (processGroup, groupIndex) => (
          <main key={`group-${groupIndex}`}>
            <div className={classes.processes}>
              <div className={classes.filler}></div>

              {processGroup.map(
                (process, processIndex) => (
                  <div key={`process-${processIndex}`} className={classes.process}>
                    {process.pid}
                  </div>
                )
              )}

              <div className={classes.filler}></div>
            </div>
            <div className={classes.timeline}>
              <span className={classes.time}>{processGroup[0].st}</span>

              {processGroup.map(
                (process, processIndex) => (
                  <div key={`timeline-${processIndex}`} className={classes.time}>
                    {
                      // Check if there is a next process. If yes, check if the next process' "st" is the same as current process' "ct". If no, display them separately
                      processGroup[processIndex + 1]
                        ? checkCompletionTime(process.ct, processGroup[processIndex + 1].st)
                        : process.ct
                    }
                  </div>
                )
              )}

            </div>
          </main>
        )
      )}

    </div>
  );
}

/* 
Received data structure
  [
    {
      pid: "P1",
      st: 0,
      ct: 2,
    },
    {
      pid: "P2",
      st: 2,
      ct: 5,
    }
  ]

Rendered HTML structure:
  <main>
    <div className={classes.processes}>
      <div className={classes.filler}></div>
      <div className={classes.process}>2</div>
      <div className={classes.process}>2</div>
      <div className={classes.process}>2</div>
      <div className={classes.process}>2</div>
      <div className={classes.process}>2</div>
      <div className={classes.filler}></div>
    </div>
    <div className={classes.timeline}>
      <span className={classes.time}>2</span>
      <span className={classes.time}>2</span>
      <span className={classes.time}>2</span>
      <span className={classes.time}>2</span>
      <span className={classes.time}>2</span>
      <span className={classes.time}>2</span>
    </div>
  </main>
*/