import React, { Component } from 'react';
import '../styling/components/SpellingBox.css';

class SpellingBox extends Component {

  state = {

    total: 0

  }

  checkWord = (word) => {
    return word.every(char => char.correct)
  }

  makeWord = (word) => {

    return word.map(({ letter, correct }) => {
      return <span className={correct ? 'green' : 'red'} >{letter}</span>
    })

  }

  checkWord = (word) => {
    return word.every(char => char.correct)
  }

  updateScore = (word) => {
    const newTotal = this.state.total + 1
    return  word.every(char => char.correct) ? this.setState({total: newTotal}) : this.setState({total: this.state.total})
    }

  componentDidMount () {
    
    this.props.spellings.map(word => this.updateScore(word))

  }

  componentDidUpdate (prevProps) {
    
    if (prevProps.spellings !== this.props.spellings) {
    this.props.spellings.map(word => this.updateScore(word))
    }

  }

  render() {
    return <React.Fragment> 
      {this.props.spellings.map((word, ind) => {
        return <p> <span>{this.makeWord(word)}</span> <span>{this.checkWord(word) ? '' : this.props.correctSpellings[ind].word}</span> </p>
      })
      }
      <p> {`Score: ${this.state.total} / ${this.props.correctSpellings.length}`}</p>
      </React.Fragment>
  }

}

export default SpellingBox