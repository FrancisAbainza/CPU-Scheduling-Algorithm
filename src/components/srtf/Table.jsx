import classes from "./Table.module.css";
import { useSrtf } from "../../contexts/SrtfContext.jsx";

export default function Table() {
  let { table, averages } = useSrtf()

  if (table.length < 1) {
    return;
  }

  return (
    <div className={classes.table}>
      <h3>Table</h3>
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.header}>PID</div>
          <div className={classes.header}>AT</div>
          <div className={classes.header}>BT</div>
          <div className={classes.header}>ST</div>
          <div className={classes.header}>CT</div>
          <div className={classes.header}>TAT</div>
          <div className={classes.header}>WT</div>
          <div className={classes.header}>RT</div>
        </div>
        {table.map(
          (process) => (
            <div key={process.id} className={classes.row}>
              <div className={classes.process}>{process.pid}</div>
              <div className={classes.process}>{process.at}</div>
              <div className={classes.process}>{process.bt}</div>
              <div className={classes.process}>{process.st}</div>
              <div className={classes.process}>{process.ct}</div>
              <div className={classes.process}>{process.tat}</div>
              <div className={classes.process}>{process.wt}</div>
              <div className={classes.process}>{process.rt}</div>
            </div>
          )
        )}
        <div className={classes.row}>
          <span className={classes.average}>AVERAGE:</span>
          <div className={classes.result}>{averages.tat}</div>
          <div className={classes.result}>{averages.wt}</div>
          <div className={classes.result}>{averages.rt}</div>
        </div>
      </div>
    </div>
  );
}

/* 
Received Data Structure
  table
    {
      id: crypto.randomUUID,
      pid: "P1",
      at: 0,
      bt: 2,
      pl: 2,
      ct: 2,
      tat: 2,
      wt: 2
    }
    
  averages
    {
      tat: 4,
      wt: 1.5,
    }

  Rendered HTML Structure
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.header}>PID</div>
        <div className={classes.header}>AT</div>
        <div className={classes.header}>BT</div>
        <div className={classes.header}>CT</div>
        <div className={classes.header}>TAT</div>
        <div className={classes.header}>WT</div>
      </div>
      <div className={classes.row}>
        <div className={classes.process}>P1</div>
        <div className={classes.process}>3</div>
        <div className={classes.process}>5</div>
        <div className={classes.process}>2</div>
        <div className={classes.process}>2</div>
        <div className={classes.process}>2</div>
      </div>
      <div className={classes.row}>
        <span className={classes.average}>AVERAGE:</span>
        <div className={classes.result}>2</div>
        <div className={classes.result}>2</div>
        <div className={classes.result}>2</div>
      </div>

    </div>
*/