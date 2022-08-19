import React from "react";
import "./hangman.css";

const UserInput = (props) => {
  return (
    <label>
      Input:
      <input type="text" onKeyDown={props.f} />
    </label>
  );
};

const GetInputValue = (event) => {
  const value = event.target.value;
  if (event.key === "Enter") {
    event.target.value = "";
    return <WordBox input={value} />;
  }
};

class WordBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letterMatch: false,
      word: props.input,
    };
  }
  render() {
    console.log(this.props.test);
    let letterArr = [];
    for (let i = 0; i < this.state.word.length; i++) {
      letterArr.push(
        <Square value={this.state.word[i]} correct={this.state.letterMatch} />
      );
    }
    return letterArr;
  }
}

function Square(props) {
  if (props.correct === true) {
    return (
      <div className="square" letter={props.value}>
        {props.value}
      </div>
    );
  } else {
    return <div className="square" letter={props.value}></div>;
  }
}

class Hangman extends React.Component {
  render() {
    return (
      <div className="game-board">
        <div className="input">
          <UserInput f={GetInputValue} />
        </div>
        <br />
        <div className="word-box">
          <WordBox />
        </div>
      </div>
    );
  }
}

export default Hangman;
