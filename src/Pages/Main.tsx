import React, { ChangeEvent, useState } from 'react';
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

  // ===============================================

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
    <div className="MainPage">
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
      <div className="TimerMainFrame">
        <h3>Time in seconds:</h3>
        <h1 data-testid="TimeInSeconds" className="TimeInSeconds">0.00</h1>
      </div>
      <div className="TimerButtons">
        <button data-testid="StartButton" className="StartButton">Start</button>
        <button data-testid="ResetButton" className="ResetButton">Reset</button>
      </div>
    </div>
  );
}

export default Main;