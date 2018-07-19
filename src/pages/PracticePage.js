import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BeeLogoLarge } from '../logos';
import '../styling/pages/PracticePage.css';
import { ContentBox, List, SpellingBox } from '../components';
import { findWords } from '../dataFunctions/api';
import { notYear, chunkArray, checkSpelling } from '../dataFunctions/helpers';

class PracticePage extends Component {

    state = {

        label: this.props.category.endsWith('es') ? this.props.category.match(/\w+(?=es)/)[0].toLowerCase() : this.props.category.match(/\w+(?=s)/)[0].toLowerCase(),
        words: [],
        years: [],
        wordsIndex: 0,
        arrayIndex: 0,
        loading: true,
        voices: false,
        showForm: false,
        spelling: '',
        correct: true,
        spellings: []

    }

    getWords = (category, letters) => {
        return findWords(category, letters)
            .then(words => {
                this.setState({ words, loading: false, years: words[0].years })
            })
            .catch(err => this.props.history.push('/404'))
    }

    voicesLoaded = () => {
        this.setState({ voices: true })
    }

    componentDidMount() {
        this.getWords(this.props.category, this.props.match.params.letters)
        .then(() => window.speechSynthesis.onvoiceschanged = this.voicesLoaded)

    }

    handlePracticeClick = () => {
        const wordsToChunk = [...this.state.words]
        const chunkedWords = chunkArray(wordsToChunk, 5)
        this.setState({ words: chunkedWords, showForm: true })

    }

    handleSpellClick = () => {
        const voices = window.speechSynthesis.getVoices()
        let utterance = new SpeechSynthesisUtterance(this.state.words[this.state.arrayIndex][this.state.wordsIndex].word);
        utterance.voice = voices.find(voice => voice.name === 'Fiona');
        utterance.rate = 0.5;
        window.speechSynthesis.speak(utterance);
    }

    handleChange = (event) => {
        this.setState({ spelling: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const result = checkSpelling(this.state.spelling, this.state.words[this.state.arrayIndex][this.state.wordsIndex].word)
        this.setState({ spellings: [...this.state.spellings, result], wordsIndex: this.state.wordsIndex + 1, spelling: '' }) 
    }

    handlePracticeAgain = () => {
        this.setState({wordsIndex: 0, spellings: [] })
    }

    handleNextWords = () => {
        const newArrayIndex = this.state.arrayIndex + 1
        this.setState({wordsIndex: 0, arrayIndex: newArrayIndex, spellings: [] })
    }

    handlePreviousWords = () => {
        const newArrayIndex = this.state.arrayIndex - 1
        this.setState({wordsIndex: 0, arrayIndex: newArrayIndex, spellings: [] })

    }

    render() {
        console.log('this.state.spellings', this.state.spellings)
        return (
            <React.Fragment>
                {!/^[1-6]$/.test(this.props.match.params.year) ? < Redirect to='/404' />
                    : this.state.loading ? <p>loading...</p>
                        :
                        <React.Fragment>
                            <header><h1>Time to Practise!</h1></header>
                            <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
                            {notYear(this.state.years, this.props.match.params.year) ?
                                <p>No {this.state.label} {this.props.match.params.letters} for year {this.props.match.params.year}.</p>
                                :
                                <React.Fragment>
                                    <ContentBox className="content" description={`${this.state.label}: ${this.props.match.params.letters}`} />
                                    <button onClick={this.handleSpellClick} style={{ display: this.state.showForm ? 'inline' : 'none' }} disabled={this.state.wordsIndex === this.state.words[this.state.arrayIndex].length ? true : false}>Play word</button>
                                    <List className="list" items={this.state.words} page='practice' year={this.props.match.params.year} category={this.props.category}
                                        style={{ display: this.state.showForm ? 'none' : 'inline' }} />
                                    <button onClick={this.handlePracticeClick} style={{ display: this.state.showForm ? 'none' : 'inline' }}> Let's Practise</button>
                                    <form onSubmit={this.handleSubmit} style={{ display: this.state.showForm ? 'inline' : 'none' }} >
                                        <label>
                                            Your spelling: <input type="text" value={this.state.spelling} onChange={this.handleChange} />
                                        </label>
                                        <input type="submit" value="Check your spelling" disabled={this.state.wordsIndex === this.state.words[this.state.arrayIndex].length ? true : false} />
                                    </form>
                            { this.state.spellings.length ? <SpellingBox spellings={this.state.spellings} correctSpellings={this.state.words[this.state.arrayIndex]} year={this.props.match.params.year} category={this.props.category} style={{ display: this.state.showForm ? 'block' : 'none' }} /> : <div></div> }
                                    <button onClick={this.handleNextWords} style={{ display: this.state.showForm && this.state.wordsIndex === this.state.words[this.state.arrayIndex].length && this.state.arrayIndex < this.state.words.length -1 ? 'inline' : 'none' }}
                                    disabled={this.state.words.length -1 === this.state.arrayIndex}> Next words</button>
                                    <button onClick={this.handlePreviousWords} style={{ display: this.state.showForm && this.state.wordsIndex === this.state.words[this.state.arrayIndex].length && this.state.arrayIndex > 0 ? 'inline' : 'none' }}
                                    disabled={this.state.arrayIndex === 0}> Previous words</button>
                                    <button onClick={this.handlePracticeAgain} style={{ display: this.state.showForm && this.state.wordsIndex === this.state.words[this.state.arrayIndex].length ? 'inline' : 'none' }}> Practise again</button>
                                </React.Fragment>
                            }
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default PracticePage;