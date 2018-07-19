import React, { Component } from 'react';
import Link, { Redirect } from 'react-router-dom';
import { BeeLogoLarge } from '../logos';
import '../styling/pages/PracticePage.css';
import { ContentBox, List } from '../components';
import { findWords } from '../dataFunctions/api';
import { notYear } from '../dataFunctions/helpers';

class PracticePage extends Component {

    state = {

        label: this.props.category.endsWith('es') ? this.props.category.match(/\w+(?=es)/)[0].toLowerCase() : this.props.category.match(/\w+(?=s)/)[0].toLowerCase(),
        words: [],
        wordsIndex: 0,
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
                this.setState({ words, loading: false })
            })
            .catch(err => this.props.history.push('/404'))
    }

    handlePracticeClick = () => {
        this.setState({ showForm: true })
        // window.speechSynthesis.onvoiceschanged = this.voicesLoaded
    }

    handleSpellClick = () => {
        const voices = window.speechSynthesis.getVoices()
        let utterance = new SpeechSynthesisUtterance(this.state.words[this.state.wordsIndex].word);
        utterance.voice = voices.find(voice => voice.name === 'Fiona');
        utterance.rate = 0.5;
        window.speechSynthesis.speak(utterance);
    }

    handleChange = (event) => {
        this.setState({ spelling: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.spelling === this.state.words[this.state.wordsIndex].word) {this.setState({spellings: [...this.state.spellings, {spelling: this.state.spelling, correctSpelling: ''}]})}
        else {this.setState({spellings: [...this.state.spellings, {spelling: this.state.spelling, correctSpelling: this.state.words[this.state.wordsIndex].word}]})}
        this.setState({ wordsIndex: this.state.wordsIndex + 1, spelling: '' })
    }

    voicesLoaded = () => {
        this.setState({ voices: true })
    }

    componentDidMount() {
        this.getWords(this.props.category, this.props.match.params.letters)
        .then(() => window.speechSynthesis.onvoiceschanged = this.voicesLoaded)

    }

    render() {
            return (
            <React.Fragment>
                {!/^[1-6]$/.test(this.props.match.params.year) ? < Redirect to='/404' />
                    : this.state.loading ? <p>loading...</p>
                        :
                        <React.Fragment>
                            <header><h1>Time to Practise!</h1></header>
                            <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
                            {notYear(this.state.words[0].years, this.props.match.params.year) ?
                                <p>No {this.state.label} {this.props.match.params.letters} for year {this.props.match.params.year}.</p>
                                :
                                <React.Fragment>
                                    <ContentBox className="content" description={`${this.state.label}: ${this.props.match.params.letters} remaining words: ${this.state.words.length - this.state.wordsIndex}`} />
                                    <button onClick={this.handleSpellClick} style={{ display: this.state.showForm ? 'inline' : 'none' }} disabled={this.state.wordsIndex === this.state.words.length  ? true : false}>Play word</button>
                                    <List className="list" items={this.state.words} page='practice' year={this.props.match.params.year} category={this.props.category}
                                        style={{ display: this.state.showForm ? 'none' : 'inline' }} />
                                    <button onClick={this.handlePracticeClick} style={{ display: this.state.showForm ? 'none' : 'inline' }}> Let's Practise</button>
                                    <form onSubmit={this.handleSubmit} style={{ display: this.state.showForm ? 'inline' : 'none' }} >
                                        <label>
                                            Your spelling: <input type="text" value={this.state.spelling} onChange={this.handleChange} />
                                        </label>
                                        <input type="submit" value="Check your spelling" disabled={this.state.wordsIndex === this.state.words.length  ? true : false}/>
                                    </form>
                                    <List className="list" items={this.state.spellings} page='answers' year={this.props.match.params.year} category={this.props.category}
                                        style={{ display: this.state.showForm ? 'block' : 'none' }} />
                                </React.Fragment>
                            }
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default PracticePage;