import React from "react";
import "./hangman.css";

import img0 from "./hangman-images/zero.png";
import img1 from "./hangman-images/one.png";
import img2 from "./hangman-images/two.png";
import img3 from "./hangman-images/three.png";
import img4 from "./hangman-images/four.png";
import img5 from "./hangman-images/five.png";
import img6 from "./hangman-images/six.png";
import img7 from "./hangman-images/seven.png";
import img8 from "./hangman-images/eight.png";
import img9 from "./hangman-images/nine.png";
import img10 from "./hangman-images/ten.png";
import img11 from "./hangman-images/eleven.png";
import winner from "./hangman-images/winner.png";
import loser from "./hangman-images/loser.png";

class WordBoxes extends React.Component {
  render() {
    var wordInput = this.props.input;
    var input = wordInput[0];
    // var input = "elephant";
    var guesses = this.props.guess;
    var inputArray = [];
    var wrongGuess = [];
    let letterArr = [];

    for (let i = 0; i < guesses.length; i++) {
      if (input.includes(guesses[i]) === false) {
        if (wrongGuess.includes(guesses[i]) === false) {
          wrongGuess.push(guesses[i]);
        }
      }

      if (guesses[i].length === input.length) {
        if (guesses[i] === input) {
          for (let i = 0; i < input.length; i++) {
            letterArr.push(<Square value={input[i]} correct={true} />);
          }
        }

        return (
          <div>
            <WrongGuess
              wrong={true}
              inputArr={inputArray}
              allGuessArr={guesses}
            />
            <p>{letterArr}</p>
          </div>
        );
      }
    }

    if (input) {
      for (let i = 0; i < input.length; i++) {
        inputArray.push(input[i]);
      }

      for (let i = 0; i < input.length; i++) {
        if (guesses.includes(input[i])) {
          letterArr.push(<Square value={input[i]} correct={true} />);
        } else {
          letterArr.push(<Square value={input[i]} correct={false} />);
        }
      }
      return (
        <div>
          <WrongGuess
            wrong={wrongGuess}
            inputArr={inputArray}
            allGuessArr={guesses}
          />
          <p>{letterArr}</p>
        </div>
      );
    }
  }
}

class WrongGuess extends React.Component {
  render() {
    var images = [
      img0,
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
      winner,
      loser,
    ];
    var errors = this.props.wrong;
    var inputArr = this.props.inputArr;
    var guesses = this.props.allGuessArr;

    for (let i = 0; i < inputArr.length; i++) {
      if (inputArr[i] === " ") {
        inputArr.splice(i, 1);
      }
    }

    if (errors === true) {
      return (
        <div className="images">
          <img alt={images[12]} src={images[12]}></img>
          <p>WOW! Smart Cookie</p>
          <button type="button" onClick={() => window.location.reload()}>
            Play Again
          </button>
        </div>
      );
    } else if (inputArr.every((letter) => guesses.includes(letter))) {
      return (
        <div className="images">
          <img alt={images[12]} src={images[12]}></img>
          <p>WOW! Smart Cookie</p>
          <button type="button" onClick={() => window.location.reload()}>
            Play Again
          </button>
        </div>
      );
    } else if (errors.length > 11) {
      return (
        <div className="images">
          <img alt={images[13]} src={images[13]}></img>
          <p>I'm so disappointed</p>
          <button type="button" onClick={() => window.location.reload()}>
            Play Again
          </button>
        </div>
      );
    } else {
      return (
        <div className="images">
          <img alt={images[errors.length]} src={images[errors.length]}></img>
          <p>{errors}</p>
        </div>
      );
    }
  }
}

function Square(props) {
  if (props.value === " ") {
    return <div className="empty-square">{props.value}</div>;
  } else if (props.correct === true) {
    return <div className="square">{props.value}</div>;
  } else {
    return <div className="square"></div>;
  }
}

class UserInput extends React.Component {
  render() {
    return (
      <label>
        Input:
        <input type="text" onKeyDown={this.props.onclick} />
      </label>
    );
  }
}

class GuessInput extends React.Component {
  render() {
    return (
      <label>
        Guess:
        <input type="text" onKeyDown={this.props.onclick} />
      </label>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      userGuesses: [],
    };
  }

  GetInputValue(event) {
    let value = event.target.value;
    var wordInput = [];
    if (event.key === "Enter") {
      event.target.value = "";
      wordInput.push(value);
    }
    this.setState({
      userInput: wordInput,
    });
  }

  GetGuessValue(event) {
    let value = event.target.value;

    if (event.key === "Enter") {
      event.target.value = "";
      this.setState({
        userGuesses: [...this.state.userGuesses, value],
      });
    }
  }

  render() {
    return (
      <div className="game">
        <div className="word-input">
          <UserInput onclick={(event) => this.GetInputValue(event)} />
        </div>
        <div className="game-board">
          <WordBoxes
            guess={this.state.userGuesses}
            input={this.state.userInput}
          ></WordBoxes>
        </div>
        <div className="guess-input">
          <GuessInput onclick={(event) => this.GetGuessValue(event)} />
        </div>
      </div>
    );
  }
}

export default Game;
