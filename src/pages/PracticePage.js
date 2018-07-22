import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../styling/pages/PracticePage.css';
import { ContentBox, SpellingBox, NavBar, NavBarCategories, FlashWord } from '../components';
import { findWords } from '../dataFunctions/api';
import { notYear, chunkArray, checkSpelling } from '../dataFunctions/helpers';
import PropTypes from 'prop-types';

class PracticePage extends Component {

    state = {

        label: this.props.category.endsWith('es') ? this.props.category.match(/\w+(?=es)/)[0].toLowerCase() : this.props.category.match(/\w+(?=s)/)[0].toLowerCase(),
        words: [],
        years: [],
        wordsIndex: 0,
        arrayIndex: 0,
        loading: true,
        voices: false,
        spelling: '',
        correct: true,
        spellings: [],
        show: false,

    }

    getWords = (category, letters) => {
        return findWords(category, letters)
            .then(words => {
                const wordsToChunk = [...words]
                const chunkedWords = chunkArray(wordsToChunk, 5)
                this.setState({ words: chunkedWords, years: words[0].years, loading: false })
            })
            .catch(err => this.props.history.push('/404'))
    }

    voicesLoaded = () => {
        this.setState({ voices: true })
    }

    handleSpellClick = () => {
        this.setState({ show: true });
        if (this.state.voices === true) {
        const voices = window.speechSynthesis.getVoices()
        let utterance = new SpeechSynthesisUtterance(this.state.words[this.state.arrayIndex][this.state.wordsIndex].word);
        utterance.voice = voices.find(voice => voice.name === 'Daniel');
        utterance.rate = 0.7;
        window.speechSynthesis.speak(utterance);
        }
        setTimeout(() => this.setState({ show: false }), 2000);
    }

    handleChange = (event) => {
        this.setState({ spelling: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const result = checkSpelling(this.state.spelling, this.state.words[this.state.arrayIndex][this.state.wordsIndex].word)
        this.setState({ spellings: [...this.state.spellings, result], wordsIndex: this.state.wordsIndex >= this.state.words[this.state.arrayIndex].length - 1 ? this.state.wordsIndex : this.state.wordsIndex + 1, spelling: '' })
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

    componentDidMount() {
        this.getWords(this.props.category, this.props.match.params.letters)
            .then(() => {
            if ('speechSynthesis' in window) {
                return window.speechSynthesis.onvoiceschanged = this.voicesLoaded
            } 
        })

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.getWords(this.props.category, this.props.match.params.letters)
        }
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
                                    <NavBarCategories year={this.props.match.params.year} page='practice' category={this.props.category} username={this.props.username} />
                                    <Link to={`/year${this.props.match.params.year}/${this.props.category.toLowerCase()}/${this.props.match.params.letters}`}> <button id='goBack'><span id='practiseHighlight1'>{this.state.label}</span>:<span id='practiseHighlight2'>{`"${this.props.match.params.letters}"`}</span></button></Link>
                                    <FlashWord show={this.state.show} word={this.state.words[this.state.arrayIndex][this.state.wordsIndex].word} />
                                </header>
                                {
                                    notYear(this.state.years, this.props.match.params.year) ?
                                        <p>No {this.state.label} {this.props.match.params.letters} for year {this.props.match.params.year}.</p>
                                        :
                                        <React.Fragment>
                                            <ContentBox page='practicepage' description={`${this.props.username}, click the buttons to practise your spellings 5 words at a time.`} />
                                            <form style={{ display: 'inline' }} onSubmit={this.handleSubmit}  >
                                                <input id='inputSpelling' type="text" placeholder="type your spelling here" value={this.state.spelling} onChange={this.handleChange} />
                                                <input id='checkSpelling' type="submit" value="Check spelling" disabled={!this.state.spelling || this.state.wordsIndex === this.state.words[this.state.arrayIndex].length ? true : false} />
                                            </form>
                                            <button id='playbutton' onClick={this.handleSpellClick} disabled={this.state.wordsIndex === this.state.words[this.state.arrayIndex].length ? true : false}>{this.state.voices ? 'Play word' : 'No audio'}</button>

                                            {this.state.spellings.length ?
                                                <SpellingBox spellings={this.state.spellings} correctSpellings={this.state.words[this.state.arrayIndex]} year={this.props.match.params.year} category={this.props.category} />
                                                : <div></div>
                                            }

                                            <button id='nextWords' onClick={this.handleNextWords} style={{ display: this.state.spellings.length === this.state.words[this.state.arrayIndex].length && this.state.arrayIndex < this.state.words.length - 1 ? 'inline' : 'none' }}
                                                disabled={this.state.words.length - 1 === this.state.arrayIndex}> Next words</button>

                                            <button id='previousWords' onClick={this.handlePreviousWords} style={{ display: this.state.spellings.length === this.state.words[this.state.arrayIndex].length && this.state.arrayIndex > 0 ? 'inline' : 'none' }}
                                                disabled={this.state.arrayIndex === 0}> Previous words</button>

                                            <button id='practiceAgain' onClick={this.handlePracticeAgain} style={{ display: this.state.spellings.length === this.state.words[this.state.arrayIndex].length ? 'inline' : 'none' }}> Practise again?</button>
                                        </React.Fragment>
                                }
                            </div>
                }
            </React.Fragment>
        );

    }

}

PracticePage.propTypes = {

    category: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            letters: PropTypes.string.isRequired,
            year: PropTypes.string.isRequired,
        })
    }),
    username: PropTypes.string.isRequired,

}

export default PracticePage;