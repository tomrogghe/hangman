import React, { PureComponent } from 'react';
import Hangman from './Hangman';
import { done, randomWord, renderWord } from './words';


class App extends PureComponent {
  constructor() {
    super()
    this.state = {
      progress: 0,
      word: randomWord(),
      guesses: []
    }
  }



  render() {
    const {
      progress,
      word,
      guesses
    } = this.state

    // if we are dead, show the solution:

    if (this.state.progress === 5) {
      this.setState({ progress: progress + 1 })
      document.getElementById('inputField').value = word
    }

    if (done(word, guesses)) {
      return (
        <div>YOU WON!!
          Congratulations :)
          <button onClick={() => this.setState({
            progress: 0,
            word: randomWord(),
            guesses: []
          })}>
            Again
          </button>
        </div >
      )
    }

    // still playing, show the game:
    else if (this.state.progress < 5) {
      return (
        <div>
          <div>
            {/* This is how we render the hanging man */}
            <Hangman progress={progress} />
          </div>
          <input id="inputField" type="text" value={renderWord(word, guesses)} />
          <br /><br />
          {'abcdefghijklmnopqrstuvwxyz-'.split('').map(letter => this.renderInputButton(letter))}
          <br /><br />
        </div >
      )
    }
    // <p>{guesses}</p>
    //<p>{word}</p>

    return (
      <div>
        <Hangman progress={progress} />
        <input id="inputField" type="text" value={word} />
        <button onClick={() => this.setState({
          progress: 0,
          word: randomWord(),
          guesses: []
        })}>
          Again
      </button>
      </div>
    )

  }

  renderInputButton(letter) {
    const {
      progress,
      word,
      guesses
    } = this.state

    return (
      <button onClick={() => this.setState({
        guesses: [letter, ...guesses],
        progress: word.indexOf(letter) > -1 ? progress : progress + 1,
      })}>
        {letter}
      </button>
    )
  }

}

export default App;
