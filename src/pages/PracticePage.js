import React, { Component } from 'react';
import Link, { Redirect } from 'react-router-dom';
import { BeeLogoLarge } from '../logos';
import '../styling/pages/PracticePage.css';
import { List } from '../components';
import { findWords } from '../dataFunctions/api';
import { notYear } from '../dataFunctions/helpers';

class PracticePage extends Component {

    state = {

        words: [],
        label: this.props.category.endsWith('es') ? this.props.category.match(/\w+(?=es)/)[0].toLowerCase() : this.props.category.match(/\w+(?=s)/)[0].toLowerCase(),
        loading: true

    }

    getWords = (category, letters) => {
        return findWords(category, letters)
            .then(words => {
                console.log('words', words)
                this.setState({ words, loading: false })
            })
            .catch(err => this.props.history.push('/404'))
    }

    componentDidMount() {
        this.getWords(this.props.category, this.props.match.params.letters)
    }

    render() {
        console.log('this.state.words', this.state.words)
        return (
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
                                </React.Fragment>
                            }
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default PracticePage;