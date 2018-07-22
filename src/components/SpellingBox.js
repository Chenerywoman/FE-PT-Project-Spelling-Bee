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

    return word.map(({ letter, correct }, ind) => {
      return <span key={ind} className={correct ? 'green' : 'red'} >{letter}</span>
    })

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
      <table id='spelling-table'>
      <tbody>
      <tr>
    <th className='table-heading' >Correct Spelling</th>
    <th className='table-heading'>Your Spelling</th> 
    </tr> 
      {this.props.spellings.map((word, ind) => 
        <tr key={ind}>
        <td>{this.makeWord(word)}</td> 
        <td className='green'>{this.checkWord(word) ? <div>&#x2714;</div> : this.props.correctSpellings[ind].word}</td>
      </tr>
      )
      }
      </tbody>
      </table>
    { this.props.spellings.length === this.props.correctSpellings.length ? <p id='score'> {`Score: ${this.state.total} / ${this.props.correctSpellings.length}`}</p> : <div></div> }
      </React.Fragment>
  }

}

export default SpellingBox