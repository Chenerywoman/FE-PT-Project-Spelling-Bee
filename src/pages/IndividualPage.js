import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { BeeLogo100px } from '../logos';
import '../styling/pages/IndividualPage.css';
import { ContentBox, List, NavBar, NavBarCategories } from '../components';
import { findWords } from '../dataFunctions/api';
import { notYear } from '../dataFunctions/helpers';

class IndividualPage extends Component {

    state = {

        label: this.props.category.endsWith('es') ? this.props.category.match(/\w+(?=es)/)[0].toLowerCase() : this.props.category.match(/\w+(?=s)/)[0].toLowerCase(),
        words: [],
        years: [],
        loading: true,
    }

    getWords = (category, letters) => {
        return findWords(category, letters)
            .then(words => {
                this.setState({ words, loading: false, years: words[0].years })
            })
            .catch(err => this.props.history.push('/404'))
    }

    componentDidMount() {
        this.getWords(this.props.category, this.props.match.params.letters)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.getWords(this.props.category, this.props.match.params.letters)
        }
    }

    render() {
        return (
            <React.Fragment>
                {!/^[1-6]$/.test(this.props.match.params.year) ? < Redirect to='/404' />

                    : this.state.loading ? <p>loading...</p>

                        :

                        <div id='individualpage_container'>
                            <header><NavBar page='practice' year={this.props.match.params.year} category={this.props.category} username={this.props.username} />
                                <NavBarCategories year={this.props.match.params.year} page='individual' category={this.props.category} username={this.props.username} />
                                <h1><span id='practiseHighlight1'>{this.state.label}</span>:<span id='practiseHighlight2'>{`"${this.props.match.params.letters}"`}</span> </h1>
                            </header>
                            {
                                notYear(this.state.years, this.props.match.params.year) ?
                                    <p>No {this.state.label} {this.props.match.params.letters} for year {this.props.match.params.year}.</p>
                                    :
                                    <React.Fragment>
                                        <ContentBox page='individualpage' description={`${this.props.username}, the words below all have the ${this.state.label} '${this.props.match.params.letters}'.`}/>
                                        <Link className='bee-link' to='/'>
                                            <img src={BeeLogo100px} id="BeeLogo100px" className="bee-logo" alt="BeeLogo100px" />
                                        </Link>
                                        <ContentBox page='individualpage' description='Click on the link below to practise.'/>
                                        <List className="list" items={this.state.words} page='individual' year={this.props.match.params.year} category={this.props.category} />
                                        <Link id='practiseLink' to={`/year${this.props.match.params.year}/${this.props.category.toLowerCase()}/${this.props.match.params.letters}/practice`}><button style={{display: 'block'}} id='practisebutton'> Let's Practise!</button></Link>  
                                    </React.Fragment>


                            }
                        </div>
                }
            </React.Fragment>
        )

    }

}

export default IndividualPage;

