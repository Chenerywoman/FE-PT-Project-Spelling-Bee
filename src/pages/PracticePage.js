import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { BeeLogo250px } from '../logos';
import '../styling/pages/PracticePage.css';
import { ContentBox, List, SpellingBox, NavBar, NavBarCategories } from '../components';
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
        this.setState({ wordsIndex: 0, spellings: [] })
    }

    handleNextWords = () => {
        const newArrayIndex = this.state.arrayIndex + 1
        this.setState({ wordsIndex: 0, arrayIndex: newArrayIndex, spellings: [] })
    }

    handlePreviousWords = () => {
        const newArrayIndex = this.state.arrayIndex - 1
        this.setState({ wordsIndex: 0, arrayIndex: newArrayIndex, spellings: [] })

    }

    render() {
        return (
            <React.Fragment>
                {

                    !/^[1-6]$/.test(this.props.match.params.year) ? < Redirect to='/404' />

                        : this.state.loading ? <p>loading...</p>

                            :

                            <div id='practicepage_container'>
                                <header><NavBar page='practice' year={this.props.match.params.year} category={this.props.category} username={this.props.username} />
                                    <NavBarCategories year={this.props.match.params.year} category={this.props.category} username={this.props.username} />
                                    <h1><span id='practiseHighlight1'>{this.state.label}</span>:<span id='practiseHighlight2'>{`"${this.props.match.params.letters}"`}</span></h1>
                                </header>
                                {
                                    notYear(this.state.years, this.props.match.params.year) ?
                                        <p>No {this.state.label} {this.props.match.params.letters} for year {this.props.match.params.year}.</p>
                                        :
                                        <React.Fragment>

                                            {
                                                !this.state.showForm ?

                                                    <React.Fragment>
                                                        <Link className='bee-link' to='/'>
                                                        <img src={BeeLogo250px} id="BeeLogo250px" className="bee-logo" alt="BeeLogo250px" />
                                                        <p>fly home...</p>
                                                        </Link>
                                                        <ContentBox page='practicepage' description={`${this.props.username}, practise these words with the ${this.state.label} '${this.props.match.params.letters}' 5 words at a time.`} />
                                                        <button className='practisebutton' onClick={this.handlePracticeClick} > Let's Go!</button>
                                                        <List className="list" items={this.state.words} page='practice' year={this.props.match.params.year} category={this.props.category} />

                                                    </React.Fragment>

                                                    :

                                                    <React.Fragment>
                                                        <ContentBox page='practicepage' description={`${this.props.username}, click the buttons to practise your spellings 5 words at a time.`} />
                                                        <p> <button className='practisebutton' onClick={this.handleSpellClick} disabled={this.state.wordsIndex === this.state.words[this.state.arrayIndex].length ? true : false}>Play word</button></p>

                                                        <form onSubmit={this.handleSubmit}  >
                                                            <input id='inputSpelling' type="text" placeholder="spell here" value={this.state.spelling} onChange={this.handleChange} />
                                                            <input id='checkSpelling' type="submit" value="Check spelling" disabled={!this.state.spelling || this.state.wordsIndex === this.state.words[this.state.arrayIndex].length ? true : false} />
                                                        </form>

                                                        {this.state.spellings.length ?
                                                            <SpellingBox spellings={this.state.spellings} correctSpellings={this.state.words[this.state.arrayIndex]} year={this.props.match.params.year} category={this.props.category} />
                                                            : <div></div>
                                                        }

                                                        <button id='nextWords' onClick={this.handleNextWords} style={{ display: this.state.wordsIndex === this.state.words[this.state.arrayIndex].length && this.state.arrayIndex < this.state.words.length - 1 ? 'inline' : 'none' }}
                                                            disabled={this.state.words.length - 1 === this.state.arrayIndex}> Next words</button>

                                                        <button id='previousWords' onClick={this.handlePreviousWords} style={{ display: this.state.wordsIndex === this.state.words[this.state.arrayIndex].length && this.state.arrayIndex > 0 ? 'inline' : 'none' }}
                                                            disabled={this.state.arrayIndex === 0}> Previous words</button>

                                                        <button id='practiceAgain' onClick={this.handlePracticeAgain} style={{ display: this.state.wordsIndex === this.state.words[this.state.arrayIndex].length ? 'inline' : 'none' }}> Practise again</button>
                                                    </React.Fragment>



                                            }

                                        </React.Fragment>
                                }
                            </div>
                }
            </React.Fragment>
        );

    }

}

export default PracticePage;