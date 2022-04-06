import "./App.css";
import { useState, useEffect } from "react";


function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  useEffect(() => {
    checkWin();
    checkIfTie();

    if (player == "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  useEffect(() => {
    if (result.state != "none") {
      alert(`Game Over! Winning Player: ${result.winner}`);
      restartGame();
    }
  }, [result]);

  const chooseSquare = (square) => {
    setBoard(
      board.map((val, index) => {
        if (index == square && val == "") { //only allow to change square that are empty
          return player;
        }

        return val;
      })
    );
  };


  const Square = ({ val, chooseSquare }) => {
    return (
      <div className="square" onClick={chooseSquare}>
        {val}
      </div>
    );
  }



  const checkWin = () => {

    const Patterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") 
      return;
      let WinningPattern = true; 
      
      currPattern.forEach((index) => {
        if (board[index] != firstPlayer) {
          WinningPattern = false;
        }
      });

      if (WinningPattern) {
        setResult({ winner: player, state: "Won" });
      }
    });
  };

  

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  };


  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
  };

return (
    <div className="App">
      <div className="board">
        <div className="row">
          <Square val={board[0]} rendSquare={() => { rendSquare(0); }} />
          <Square val={board[1]} rendSquare={() => { rendSquare(1); }} />
          <Square val={board[2]} rendSquare={() => { rendSquare(2); }} />
        </div>

        <div className="row">
          <Square val={board[3]} rendSquare={() => { rendSquare(3); }} />
          <Square val={board[4]} rendSquare={() => { rendSquare(4); }} />
          <Square val={board[5]} rendSquare={() => { rendSquare(5); }} />
        </div>

        <div className="row">
          <Square val={board[6]} rendSquare={() => { rendSquare(6); }} />
          <Square val={board[7]} rendSquare={() => { rendSquare(7); }} />
          <Square val={board[8]} rendSquare={() => { rendSquare(8); }} />
        </div>
      </div>
    </div>
  );
}

export default App;

