import React, {Component} from 'react';
import '../styling/components/SpellingBox.css';

// spellings, correctSpellings, year, category, style

class SpellingBox extends Component {


checkWord = (word) => {
    return word.every(char => char.correct)
}

makeWord = (word) => {

  return word.map(({letter, correct}) => {
      return <span className={correct ? 'green' : 'red'} >{letter}</span> 
    })

}

render () {

  return this.props.spellings.map((word, ind) => {
    return (   <React.Fragment>
       <p> <span>{this.makeWord(word)}</span> <span>{this.checkWord(word) ? '' : this.props.correctSpellings[ind].word}</span> </p>
        </React.Fragment>
     )  
})

    
}

}

export default SpellingBox