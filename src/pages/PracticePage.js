import React, { Component } from 'react';
import Link, { Redirect } from 'react-router-dom';
import { BeeLogoLarge } from '../logos';
import '../styling/pages/PracticePage.css';
import { List } from '../components';
import { findWords } from '../dataFunctions/api';
import { notYear } from '../dataFunctions/helpers';

class PracticePage extends Component {

    state = {

        label: this.props.category.endsWith('es') ? this.props.category.match(/\w+(?=es)/)[0].toLowerCase() : this.props.category.match(/\w+(?=s)/)[0].toLowerCase(),
        words: [],
        wordsIndex: 0,
        loading: true,
        voices: false

    }

    getWords = (category, letters) => {
        return findWords(category, letters)
            .then(words => {
                this.setState({ words, loading: false })
            })
            .catch(err => this.props.history.push('/404'))
    }


    handleSpellClick = () => {
        const voices = window.speechSynthesis.getVoices()
        let utterance = new SpeechSynthesisUtterance(this.state.words[this.state.wordsIndex].word);
        utterance.voice = voices.find(voice => voice.name === 'Fiona');
        utterance.rate = 0.5;
        window.speechSynthesis.speak(utterance);
        this.setState({ wordsIndex: this.state.wordsIndex + 1 })
    }

    voicesLoaded = () => {
        this.setState({ voices: true })
    }


    componentDidMount() {
        this.getWords(this.props.category, this.props.match.params.letters)
    }

    render() {
        window.speechSynthesis.onvoiceschanged = this.voicesLoaded
        return this.state.voices && (
            <React.Fragment>
                {!/^[1-6]$/.test(this.props.match.params.year) ? < Redirect to='/404' />
                    : this.state.loading ? <p>loading...</p>
                        :
                        <React.Fragment>
                            <header><h1>Time to Practice!</h1></header>
                            <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
                            {notYear(this.state.words[0].years, this.props.match.params.year) ?
                                <p>No {this.state.label} {this.props.match.params.letters} for year {this.props.match.params.year}.</p>
                                :
                                <React.Fragment>
                                    {/* <ContentBox className="content" description={this.state.partial.description} /> */}
                                    <List className="list" items={this.state.words} page='practice' year={this.props.match.params.year} category={this.props.category} />
                                    <button onClick={this.handleSpellClick}>Let's Spell!</button>

                                </React.Fragment>
                            }
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default PracticePage;