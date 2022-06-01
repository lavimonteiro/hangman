import React from "react";
import "./hangman.css";

class WordBoxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letterMatch: false,
    };
  }
  render() {
    var something = this.props.guess;
    var input = something[0];

    if (input) {
      let letterArr = [];
      for (let i = 0; i < input.length; i++) {
        letterArr.push(
          <Square value={input[i]} correct={this.state.letterMatch} />
        );
      }
      return letterArr;
    }
  }
}

function Square(props) {
  if (props.correct) {
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
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

  render() {
    return (
      <div className="game">
        <div className="game-info">
          <UserInput onclick={(event) => this.GetInputValue(event)} />
        </div>
        <br />
        <div className="game-board">
          <WordBoxes guess={this.state.userInput} />
        </div>
      </div>
    );
  }
}

export default Game;
