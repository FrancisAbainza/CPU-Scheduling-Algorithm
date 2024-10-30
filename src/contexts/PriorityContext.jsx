import { useState, createContext, useContext } from "react";

const PriorityCtx = createContext({
  ganttChart: [],
  table: [],
  averages: [],
  reset: () => { },
  calculatePriority: () => { },
});

export function usePriority() {
  return useContext(PriorityCtx);
}

export default function PriorityContextProvider({ children }) {
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

  function calculatePriority(data) {

    /* 
    Received data structure
      [
        {
          id: crypto.randomUUID(),
          pid: "P1",
          at: 0,
          bt: 3,
          priority: 1,
        },
        {
          id: crypto.randomUUID(),
          pid: "P2",
          at: 0,
          bt: 3,
          priority: 2,
        }
      ]
    */

    let initialGanttChart = [];
    let initialTable = [...data];
    let processes = [...data];
    let readyQueue = [];
    let highestPriority = {};
    let highestPriorityIndex = 0;
    let time = 0;

    while (processes.length > 0 || readyQueue.length > 0) {
      // Add the arrived processes to the "readyQueue" array
      readyQueue.push(
        ...processes.filter(process => process.at <= time)
      );

      // Remove the arrived processes from the "processes" array
      processes = processes.filter(process => process.at > time);

      // If there is a process inside the "readyQueue" do:
      if (readyQueue.length > 0) {
        // Sort the "readyQueue" in ascending order based on their priority
        readyQueue.sort((a, b) => a.pl - b.pl);
        // Get the highest priority process
        highestPriority = { ...readyQueue[0] };

        // Remove the highest priority process from the "readyQueue"
        readyQueue.shift();

        // Add to the highest priority process to the Gantt Chart
        initialGanttChart.push({
          pid: highestPriority.pid,
          st: time,
          ct: time + highestPriority.bt,
        });

        // Add to the highest priority process to the Table
        highestPriorityIndex = initialTable.findIndex(
          (process) => process.id === highestPriority.id
        );

        initialTable[highestPriorityIndex] = {
          id: highestPriority.id,
          pid: highestPriority.pid,
          at: highestPriority.at,
          bt: highestPriority.bt,
          pl: highestPriority.pl,
          ct: time + highestPriority.bt,
          tat: (time + highestPriority.bt) - highestPriority.at,
          wt: ((time + highestPriority.bt) - highestPriority.at) - highestPriority.bt
        }

        // Increment time by the burst time of the highest priority process
        time += highestPriority.bt;
      } else {
        // If no processes are in the ready queue, increment time
        time++;
      }
    }

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
    calculatePriority,
  }

  return (
    <PriorityCtx.Provider value={ctxValue}>
      {children}
    </PriorityCtx.Provider>
  );
}
