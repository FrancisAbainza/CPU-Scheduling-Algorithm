import { useState, createContext, useContext } from "react";

const FcfsCtx = createContext({
  ganttChart: [],
  table: [],
  averages: [],
  reset: () => { },
  calculate: () => { },
});

export function useFcfs() {
  return useContext(FcfsCtx);
}

export default function FcfsContextProvider({ children }) {
  const [ganttChart, setGanttChart] = useState([]);
  const [table, setTable] = useState([]);
  const [averages, setAverages] = useState({});

  function averageTAT(array) {
    const sum = array.reduce((total, element) => total + element.tat, 0);
    return sum / array.length;
  }

  function averageWT(array) {
    const sum = array.reduce((total, element) => total + element.wt, 0);
    return sum / array.length;
  }

  function reset() {
    setGanttChart([]);
    setTable([]);
    setAverages({});
  }

  function calculate(data) {
    /* 
    Received data structure
      [
        {
          id: crypto.randomUUID(),
          pid: "P1",
          at: 0,
          bt: 3,
        },
        {
          id: crypto.randomUUID(),
          pid: "P2",
          at: 0,
          bt: 3,
        }
      ]
    */

    let initialGanttChart = [];
    let processes = [...data];
    let readyQueue = [];
    let earliestProcess = {};
    let time = 0;
    let initialTable = [];

    while (processes.length > 0 || readyQueue.length > 0) {
      readyQueue.push(
        ...processes.filter(process => process.at <= time).map(process => ({ ...process }))
      );

      processes = processes.filter(process => process.at > time);

      if (readyQueue.length > 0) {
        readyQueue.sort((a, b) => a.at - b.at);
        earliestProcess = { ...readyQueue[0] };

        readyQueue.shift();

        initialGanttChart.push({
          id: earliestProcess.id,
          pid: earliestProcess.pid,
          st: time,
          ct: time + earliestProcess.bt,
        });

        time += earliestProcess.bt;
      } else {
        time++;
      }
    }

    console.log(initialGanttChart)
    console.log(data)
    data.forEach(
      (process) => {
        initialTable.push({
          id: process.id,
          pid: process.pid,
          at: process.at,
          bt: process.bt,
          ct: initialGanttChart.findLast((item) => item.id === process.id).ct,
          get tat() {
            return this.ct - this.at;
          },
          get wt() {
            return (this.ct - this.at) - this.bt;
          }
        });
      }
    )

    setGanttChart(initialGanttChart);
    setTable(initialTable);
    setAverages({
      tat: parseFloat(averageTAT(initialTable).toFixed(2)),
      wt: parseFloat(averageWT(initialTable).toFixed(2)),
    });
  }

  const ctxValue = {
    ganttChart,
    table,
    averages,
    reset,
    calculate,
  }

  return (
    <FcfsCtx.Provider value={ctxValue}>
      {children}
    </FcfsCtx.Provider>
  );
}
