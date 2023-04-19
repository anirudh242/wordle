import { useEffect, useState } from 'react';

import './App.css';
import { wordList } from './wordList';

function App() {
  const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const thirdRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

  const [correctWord, setCorrectWord] = useState(
    wordList[Math.floor(Math.random() * wordList.length)]
  );

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
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (
        /[a-z]/.test(key) &&
        key != 'backspace' &&
        key != 'enter' &&
        key != 'space' &&
        key != 'alt' &&
        key != 'os'
      ) {
        if (currCell !== 5) {
          setCurrWord(currWord + key);
          let copyBoard = [...board];
          copyBoard[currRow][currCell].letter = key;
          copyBoard[currRow][currCell].status = 'filled';
          setBoard(copyBoard);
          setCurrCell(currCell + 1);
        }
      }
      if (key == 'enter') enterClick();
      if (key == 'backspace') backspaceClick();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currCell, currRow, currWord, board]);

  const keyboardClick = (e) => {
    const key = e.target.dataset.key;

    if (currCell !== 5) {
      setCurrWord(currWord + key);
      let copyBoard = [...board];
      copyBoard[currRow][currCell].letter = key;
      copyBoard[currRow][currCell].status = 'filled';
      setBoard(copyBoard);
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
          setCorrectWord(wordList[Math.floor(Math.random() * wordList.length)]);
          setCurrWord('');
          win();

          window.location.reload(false);
        }

        if (currWord !== correctWord && currRow == 4) {
          lose();
        }
      }
      setCurrRow(currRow + 1);
      setCurrCell(0);
      setCurrWord('');
    }
  };

  function win() {
    window.alert('You win!!');
    window.location.reload();
  }

  function lose() {
    window.alert(`You lose. Correct word: ${correctWord}`);
    window.location.reload();
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
