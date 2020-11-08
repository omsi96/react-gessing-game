import "./App.css";
import { Background, Input, Title } from "./styles/Theme";
import { useState } from "react";

function App() {
  const [number, setNumber] = useState(undefined);
  const [lastNumber, setLastNumber] = useState(undefined);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState("");
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100 + 1)
  );
  const restartGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100 + 1));
    setAttempts(0);
    setLastNumber(undefined);
    setNumber(undefined);
    setStatus(undefined);
  };

  const distanceFromNumberStatus = (number1, number2) => {
    let difference = Math.abs(number1 - number2);
    switch (true) {
      case difference === 0:
        return 0;
      case difference <= 5:
        return "very close!";
      case difference <= 10:
        return "close!";
      case difference <= 20:
        return "a bit close!";
      case difference <= 50:
        return "There is a difference to be honest!";
      default:
        return "There is a dramatic difference though!!";
    }
  };

  const checkWin = (input) => {
    console.log(`Trying to compare ${input} with ${randomNumber}`);
    if (input === randomNumber) return true;
    else if (attempts >= 5) return false;
    else if (attempts < 5) {
      // you have other chances
      setAttempts(attempts + 1);
      return distanceFromNumberStatus(input, randomNumber);
    }
  };

  const guess = () => {
    console.log("comparing this number with previous one", number, lastNumber);
    if (number === lastNumber) {
      setStatus(`I just told you it's not the right number!`);
      return;
    }
    setLastNumber(number);

    let winningStatus = checkWin(number);
    console.log("The winningStatus", winningStatus);
    if (winningStatus == true) {
      setStatus("You won the game!");
    } else if (winningStatus == false) {
      setStatus("You lost the game!");
      setTimeout(() => {
        setStatus("Game restarted, guess a number!");
      }, 2000);
      restartGame();
    } else {
      setStatus(winningStatus);
    }
  };

  return (
    <>
      <Background>
        {/* <p>{number}</p> */}
        {/* <p>Random number: {randomNumber}</p> */}
        <Title>Guess a number!</Title>

        <Input
          placeholder="Guess a number between 1-100"
          onChange={(event) => setNumber(event.target.value)}
          type="number"
          onSubmit={guess}
          max="100"
          min="0"
        ></Input>
        <button onClick={guess}>Shoot a guess</button>
        <br />
        <p>Attempts: {attempts}</p>
        <p>{status}</p>
      </Background>
    </>
  );
}

export default App;
