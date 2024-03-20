"use client";
import { useEffect } from "react";
import S from "./tictactoe.module.css";

export default function TicTacToe({ translation }) {
  const { youWin, youLose, tieGame, replay } = translation;
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
        cells[i].classList.remove("huPlayer", "aiPlayer", "tieGame");
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
            `${gameWon.player == huPlayer ? "huPlayer" : "aiPlayer"}`
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
          cells[i].classList.add("tieGame");
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
  }, []);
  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card">
        <h2>Tic Tac Toe</h2>
        <table className={S.table}>
          <tbody>
            <tr className={S.tr}>
              <td className={`cell ${S.td}`} id="0"></td>
              <td className={`cell ${S.td}`} id="1"></td>
              <td className={`cell ${S.td}`} id="2"></td>
            </tr>
          </tbody>
          <tbody>
            <tr className={S.tr}>
              <td className={`cell ${S.td}`} id="3"></td>
              <td className={`cell ${S.td}`} id="4"></td>
              <td className={`cell ${S.td}`} id="5"></td>
            </tr>
          </tbody>
          <tbody>
            <tr className={S.tr}>
              <td className={`cell ${S.td}`} id="6"></td>
              <td className={`cell ${S.td}`} id="7"></td>
              <td className={`cell ${S.td}`} id="8"></td>
            </tr>
          </tbody>
        </table>
        <div className={`endgame ${S.endgame}`}>
          <div className={`text ${S.text}`}></div>
          <button className="Replay">{replay}</button>
        </div>
      </div>
    </aside>
  );
}
