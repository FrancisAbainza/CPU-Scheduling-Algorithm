import { useState, createContext, useContext } from "react";

const SrtfCtx = createContext({
  ganttChart: [],
  table: [],
  averages: [],
  reset: () => { },
  calculate: () => { },
});

export function useSrtf() {
  return useContext(SrtfCtx);
}

export default function SrtfContextProvider({ children }) {
  const [ganttChart, setGanttChart] = useState([]);
  const [table, setTable] = useState([]);
  const [averages, setAverages] = useState({});

  function averageTAT(table) {
    const sum = table.reduce((total, process) => total + process.tat, 0);
    return sum / table.length;
  }

  function averageWT(table) {
    const sum = table.reduce((total, process) => total + process.wt, 0);
    return sum / table.length;
  }

  function averageRT(table) {
    const sum = table.reduce((total, process) => total + process.rt, 0);
    return sum / table.length;
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
    let runningProcess = null;
    let time = 0;
    let initialTable = [];
  
    while (processes.length > 0 || readyQueue.length > 0) {
      readyQueue.push(
        ...processes.filter(process => process.at <= time).map(process => ({ ...process }))
      );
      
      processes = processes.filter(process => process.at > time);
  
      if (readyQueue.length > 0) {
        readyQueue.sort((a, b) => a.bt - b.bt || a.at - b.at);
  
        if (!runningProcess) {
          runningProcess = {
            id: readyQueue[0].id,
            pid: readyQueue[0].pid,
            st: time,
            ct: time + 1,
          };
          readyQueue[0].bt -= 1;
        } else if (readyQueue[0].id !== runningProcess.id) {
          initialGanttChart.push({ ...runningProcess });
          runningProcess = {
            id: readyQueue[0].id,
            pid: readyQueue[0].pid,
            st: time,
            ct: time + 1,
          };
          readyQueue[0].bt -= 1;
        } else {
          runningProcess.ct += 1;
          readyQueue[0].bt -= 1;
        }
  
        if (readyQueue[0].bt === 0) {
          initialGanttChart.push({ ...runningProcess });
          runningProcess = null;
          readyQueue.shift();
        }
      }
      time++;
    }

    /* 
    ganttChart = [
      {
        id: readyQueue[0].id,
        pid: readyQueue[0].pid,
        st: time,
        ct: time + 1,
      },
      {
        id: readyQueue[0].id,
        pid: readyQueue[0].pid,
        st: time,
        ct: time + 1,
      }
    ]
    */

    data.forEach(
      (process) => {
        initialTable.push({
          id: process.id,
          pid: process.pid,
          at: process.at,
          bt: process.bt,
          st: initialGanttChart.find((item) => item.id === process.id).st,
          ct: initialGanttChart.findLast((item) => item.id === process.id).ct,
          get tat() {
            return this.ct - this.at;
          },
          get wt() {
            return (this.ct - this.at) - this.bt; 
          },
          get rt() {
            return this.st - this.at;
          }
        });
      }
    )

    /* 
    table = [
      {
        id: process.id,
        pid: process.pid,
        at: process.at,
        bt: process.bt,
        st: initialGanttChart.find((item) => item.id === process.id).st,
        ct: initialGanttChart.findLast((item) => item.id === process.id).ct,
        get tat() {
          return this.ct - this.at; // Dynamically calculate TAT
        },
        get wt() {
          return this.tat - this.bt; // Depends on TAT
        },
        get rt() {
          return this.st - this.at; // Depends on ST and AT
        }
      }
    ]
    */
  
    setGanttChart(initialGanttChart);
    setTable(initialTable)
    setAverages({
      tat: parseFloat(averageTAT(initialTable).toFixed(2)),
      wt: parseFloat(averageWT(initialTable).toFixed(2)),
      rt: parseFloat(averageRT(initialTable).toFixed(2))
    })
  }

  const ctxValue = {
    ganttChart,
    table,
    averages,
    reset,
    calculate,
  }

  return (
    <SrtfCtx.Provider value={ctxValue}>
      {children}
    </SrtfCtx.Provider>
  );
}
