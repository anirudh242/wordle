import { useEffect, useState } from 'react';

import './App.css';
import { wordList } from './wordList';

function App() {
  const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const thirdRow = ['z', 'x', 'c', 'v', 'v', 'b', 'n', 'm'];

  const [correctWord, setCorrectWord] = useState('');

  const emptyBoard = [
    [
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
    ],
    [
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
    ],
    [
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
    ],
    [
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
    ],
    [
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
      { letter: '', status: 'empty' },
    ],
  ];

  const [board, setBoard] = useState(emptyBoard);

  const [currRow, setCurrRow] = useState(0);
  const [currCell, setCurrCell] = useState(0);

  const [currWord, setCurrWord] = useState('');

  useEffect(() => {
    setCorrectWord(wordList[Math.floor(Math.random() * wordList.length)]);
  }, []);

  console.log(correctWord);

  const keyboardClick = (e) => {
    const key = e.target.dataset.key;
    console.log(board);

    if (currCell !== 5) {
      setCurrWord(currWord + key);
      let copyBoard = [...board];
      copyBoard[currRow][currCell].letter = key;
      copyBoard[currRow][currCell].status = 'filled';
      setBoard(copyBoard);
      console.log(board);
      setCurrCell(currCell + 1);
    }
  };

  const backspaceClick = (e) => {
    let copyBoard = [...board];

    if (currCell === 0) {
      setCurrWord(currWord.slice(0, -1));
      copyBoard[currRow][currCell] = { letter: '', status: 'empty' };
      setBoard(copyBoard);
    } else {
      setCurrCell(currCell - 1);
      setCurrWord(currWord.slice(0, -1));
      copyBoard[currRow][currCell - 1] = { letter: '', status: 'empty' };
      setBoard(copyBoard);
    }
  };

  const enterClick = (e) => {
    if (currWord.length === 5) {
      const currWordArr = currWord.split('');
      const correctWordArr = correctWord.split('');

      console.log(currWordArr);
      console.log(correctWordArr);

      for (let i = 0; i < currWordArr.length; i++) {
        const key = document.querySelector(`[data-key="${currWordArr[i]}"]`);

        if (currWordArr[i] === correctWordArr[i]) {
          let copyBoard = [...board];
          copyBoard[currRow][i].status = 'correct';
          setBoard(copyBoard);
          key.classList.add('correct-kb');
        } else if (
          currWordArr[i] !== correctWordArr[i] &&
          correctWordArr.includes(currWordArr[i])
        ) {
          let copyBoard = [...board];

          copyBoard[currRow][i].status = 'present';

          setBoard(copyBoard);
          if (!key.classList.contains('correct-kb')) {
            key.classList.add('present-kb');
          }
        } else {
          let copyBoard = [...board];
          copyBoard[currRow][i].status = 'incorrect';
          setBoard(copyBoard);
          key.classList.add('incorrect-kb');
        }

        if (currWord === correctWord) {
          win();
        }
      }
      console.log(board);
      setCurrRow(currRow + 1);
      setCurrCell(0);
      setCurrWord('');
    }
  };

  function win() {
    setCurrWord('');
    setBoard(emptyBoard);
    setCorrectWord(wordList[Math.floor(Math.random() * wordList.length)]);
  }

  return (
    <div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`block ${cell.status}`}>
                {cell.letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="keyboard">
        <br />
        {firstRow.map((letter, index) => (
          <button
            onClick={(e) => {
              keyboardClick(e);
            }}
            data-key={letter}
          >
            {letter}
          </button>
        ))}
        <div className="row"></div>
        <div className="row">
          {secondRow.map((letter) => (
            <button
              onClick={(e) => {
                keyboardClick(e);
              }}
              data-key={letter}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="row">
          {thirdRow.map((letter) => (
            <button
              onClick={(e) => {
                keyboardClick(e);
              }}
              data-key={letter}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="row">
          <button
            onClick={(e) => {
              enterClick(e);
            }}
            data-key="enter"
          >
            Enter
          </button>
          <button
            data-key="backspace"
            onClick={(e) => {
              backspaceClick(e);
            }}
          >
            Backspace
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
