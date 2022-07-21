import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './Main.css';

function Main() {
  /*
    TODO: Implement the functionality in the following components:
    - NameEntry textarea.
    - Set Name button.
    - TimeInSeconds update.
    - Start button.
    - Pause button.
    - Reset button.
  */

  document.title = "Stopwatch"

  return (
    <div className="MainPage">
      <WelcomeSection />
      <TimerSection />
    </div>
  );
}

function WelcomeSection() {
  const [nameInput, setNameInput] = useState("");
  const [name, setName] = useState("");

  const minNameSize = 1;
  const maxNameSize = 32;

  function handleNameChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNameInput(event.target.value);
  }

  function handleClickSetName() {
    if (nameInput.length >= minNameSize && nameInput.length <= maxNameSize) {
      setName(nameInput);
      setNameInput("");
    }
  }

  return (
    <div className="WelcomeSection">
      <h1>Stopwatch Application.</h1>
      <div className="NameSetting">
        <textarea
          data-testid="NameEntry"
          className="NameEntry"
          placeholder="Insert a name you want to use!"
          maxLength={maxNameSize}
          value={nameInput}
          onChange={handleNameChange}
        />
        <button
          data-testid="SetNameButton"
          className="SetNameButton"
          onClick={handleClickSetName}
        >
          Set Name
        </button>
      </div>
      <h2 data-testid="WelcomeBanner" className="WelcomeBanner">Welcome {name.length > 0 ? name : "User"}!</h2>
    </div>
  );
}

function TimerSection() {
  const [state, setState] = useState<"Run" | "Pause" | "Stop">("Stop");
  const [timeDiff, setTimeDiff] = useState(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (state === "Run") {
      const interval = setInterval(() => {
        setTimeDiff(getTime() - startTimeRef.current);
      }, 10);

      return () => {
        clearInterval(interval);
      };
    }
  }, [state]);

  function handleClickStart() {
    if (state === "Run") {
      setState("Pause");
    } else if (state === "Pause") {
      startTimeRef.current = getTime() - timeDiff;
      setState("Run");
    } else if (state === "Stop") {
      startTimeRef.current = getTime();
      setState("Run");
    }
  }

  function handleClickReset() {
    setState("Stop");
    setTimeDiff(0);
  }

  return (
    <>
      <div className="TimerMainFrame">
        <h3>Time in seconds:</h3>
        <h1 data-testid="TimeInSeconds" className="TimeInSeconds">{(timeDiff / 1000).toFixed(2)}</h1>
      </div>
      <div className="TimerButtons">
        <button
          data-testid="StartButton"
          className="StartButton"
          onClick={handleClickStart}
        >
          {state === "Run" ? "Pause" : "Start"}
        </button>
        <button
          data-testid="ResetButton"
          className="ResetButton"
          disabled={state === "Run"}
          onClick={handleClickReset}
        >
          Reset
        </button>
      </div>
    </>
  );
}

function getTime() {
  return Date.now();
}

export default Main;