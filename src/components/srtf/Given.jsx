import { useState } from "react";
import Button from "../ui/Button.jsx";
import IconButton from "../ui/IconButton.jsx"
import classes from "./Given.module.css";
import deleteImg from "../../assets/delete.svg"
import { useSrtf } from "../../contexts/SrtfContext.jsx";

export default function Given() {
  let { reset, calculate } = useSrtf()
  const [processes, setProcesses] = useState([{ id: crypto.randomUUID() }]);

  function handleCalculate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = [];

    processes.forEach(
      ({ id }) => {
        const processData = {
          id,
          pid: formData.get(`pid_${id}`),
          at: parseInt(formData.get(`at_${id}`)),
          bt: parseInt(formData.get(`bt_${id}`)),
        };
      
        data.push(processData);
      }
    )

    calculate(data);
  }

  function handleAddProcess(event) {
    event.preventDefault();
    setProcesses(
      (prevProcesses) => [...prevProcesses, { id: crypto.randomUUID() }]
    );
  }

  function handleDeleteProcess(id) {
    if (processes.length === 1) {
      alert("Cannot have less than 1 process");
      return;
    }

    setProcesses((prevProcesses) =>
      prevProcesses.filter((process) =>
        process.id !== id
      )
    )
  }

  function handleReset() {
    event.preventDefault();
    document.querySelectorAll("input").forEach(input => {
      input.value = ""
    })
    setProcesses([{ id: crypto.randomUUID() }]);
    reset();
  }

  return (
    <form className={classes.given} onSubmit={handleCalculate}>
      <div className={classes.headers}>
        <label>Process ID</label>
        <label>Arrival Time</label>
        <label>CPU BT</label>
      </div>
      {processes.map(({ id }) => (
        <fieldset key={id} id={id} className={classes.process}>
          <input type="text" name={`pid_${id}`} min="0" required />
          <input type="number" name={`at_${id}`} min="0" required />
          <input type="number" name={`bt_${id}`} min="1" required />
          <IconButton type="button" src={deleteImg} alt="delete process" title="Remove" onClick={() => handleDeleteProcess(id)} />
        </fieldset>
      ))}
      <div className={classes.buttons}>
        <Button>Calculate</Button>
        <Button onClick={handleAddProcess}>Add Process</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </form>
  );
}