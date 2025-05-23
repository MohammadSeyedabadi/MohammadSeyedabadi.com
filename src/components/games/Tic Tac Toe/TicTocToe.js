"use client";
import { useEffect } from "react";

export default function TicTacToe({ translation }) {
  const { youWin, youLose, tieGame, replay, ticTacToe } = translation;
  useEffect(() => {
    var origBoard;
    const huPlayer = "O";
    const aiPlayer = "X";
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];
    const replayBtn = document.querySelector(".Replay");
    const cells = document.querySelectorAll(".cell");
    startGame();
    replayBtn.addEventListener("click", startGame);
    function startGame() {
      document.querySelector(".endgame").style.display = "none";
      replayBtn.style.display = "none";

      origBoard = Array.from(Array(9).keys());
      for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        // cells[i].style.removeProperty("background-color");
        cells[i].classList.remove(
          "bg-indigo-500",
          "bg-rose-500",
          "bg-green-500"
        );
        cells[i].addEventListener("click", turnClick, false);
      }
    }

    function turnClick(square) {
      if (typeof origBoard[square.target.id] == "number") {
        turn(square.target.id, huPlayer);
        if (!checkWin(origBoard, huPlayer) && !checkTie())
          turn(bestSpot(), aiPlayer);
      }
    }

    function turn(squareId, player) {
      origBoard[squareId] = player;
      document.getElementById(squareId).innerText = player;
      let gameWon = checkWin(origBoard, player);
      if (gameWon) gameOver(gameWon);
    }

    function checkWin(board, player) {
      let plays = board.reduce(
        (a, e, i) => (e === player ? a.concat(i) : a),
        []
      );
      let gameWon = null;
      for (let [index, win] of winCombos.entries()) {
        if (win.every((elem) => plays.indexOf(elem) > -1)) {
          gameWon = { index: index, player: player };
          break;
        }
      }
      return gameWon;
    }

    function gameOver(gameWon) {
      for (let index of winCombos[gameWon.index]) {
        // document.getElementById(index).style.backgroundColor =
        //   gameWon.player == huPlayer ? "blue" : "red";
        document
          .getElementById(index)
          .classList.add(
            `${gameWon.player == huPlayer ? "bg-indigo-500" : "bg-rose-500"}`
          );
      }
      for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", turnClick, false);
      }
      declareWinner(gameWon.player == huPlayer ? youWin : youLose);
    }

    function declareWinner(who) {
      document.querySelector(".endgame").style.display = "block";
      replayBtn.style.display = "block";
      document.querySelector(".endgame .text").innerText = who;
    }

    function emptySquares() {
      return origBoard.filter((s) => typeof s == "number");
    }

    function bestSpot() {
      return minimax(origBoard, aiPlayer).index;
    }

    function checkTie() {
      if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
          cells[i].classList.add("bg-green-500");
          cells[i].removeEventListener("click", turnClick, false);
        }
        declareWinner(tieGame);
        return true;
      }
      return false;
    }

    function minimax(newBoard, player) {
      var availSpots = emptySquares();

      if (checkWin(newBoard, huPlayer)) {
        return { score: -10 };
      } else if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 };
      } else if (availSpots.length === 0) {
        return { score: 0 };
      }
      var moves = [];
      for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == aiPlayer) {
          var result = minimax(newBoard, huPlayer);
          move.score = result.score;
        } else {
          var result = minimax(newBoard, aiPlayer);
          move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
      }

      var bestMove;
      if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }

      return moves[bestMove];
    }
  });
  return (
    <aside className="sm:col-span-4">
      <div className="p-6 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 dark:bg-neutral-800 dark:border-neutral-500">
        <h2 className="uppercase font-bold text-sm mb-2">{ticTacToe}</h2>
        <table>
          <tbody>
            <tr>
              <td
                className="cell border-2 border-neutral-300 dark:border-neutral-500 h-20 w-20 text-center align-middle font-[fantcy] text-4xl cursor-pointer"
                id="0"
              ></td>
              <td
                className="cell border-2 border-neutral-300 dark:border-neutral-500 h-20 w-20 text-center align-middle font-[fantcy] text-4xl cursor-pointer"
                id="1"
              ></td>
              <td
                className="cell border-2 border-neutral-300 dark:border-neutral-500 h-20 w-20 text-center align-middle font-[fantcy] text-4xl cursor-pointer"
                id="2"
              ></td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td
                className="cell border-2 border-neutral-300 dark:border-neutral-500 h-20 w-20 text-center align-middle font-[fantcy] text-4xl cursor-pointer"
                id="3"
              ></td>
              <td
                className="cell border-2 border-neutral-300 dark:border-neutral-500 h-20 w-20 text-center align-middle font-[fantcy] text-4xl cursor-pointer"
                id="4"
              ></td>
              <td
                className="cell border-2 border-neutral-300 dark:border-neutral-500 h-20 w-20 text-center align-middle font-[fantcy] text-4xl cursor-pointer"
                id="5"
              ></td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td
                className="cell border-2 border-neutral-300 dark:border-neutral-500 h-20 w-20 text-center align-middle font-[fantcy] text-4xl cursor-pointer"
                id="6"
              ></td>
              <td
                className="cell border-2 border-neutral-300 dark:border-neutral-500 h-20 w-20 text-center align-middle font-[fantcy] text-4xl cursor-pointer"
                id="7"
              ></td>
              <td
                className="cell border-2 border-neutral-300 dark:border-neutral-500 h-20 w-20 text-center align-middle font-[fantcy] text-4xl cursor-pointer"
                id="8"
              ></td>
            </tr>
          </tbody>
        </table>
        <div className="endgame">
          <div className="text uppercase font-bold text-lg"></div>
          <button className="Replay text-base font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-neutral-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-neutral-300 active:scale-95">
            {replay}
          </button>
        </div>
      </div>
    </aside>
  );
}
