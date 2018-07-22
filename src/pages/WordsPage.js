import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BeeLogo250px } from '../logos';
import { ContentBox, List, NavBar, NavBarCategories } from '../components';
import '../styling/pages/WordsPage.css';
import { findCategory, findList } from '../dataFunctions/api';
import { notYear } from '../dataFunctions/helpers';

class WordsPage extends Component {

    state = {
        categories: [],
        type: {},
        list: [],
        year: this.props.match.params.year,
        loading: true

    }

    getCategory = (type) => {
        return findCategory(type)
            .then(type => {
                this.setState({ type })
                return findList(this.state.type.name)
            })
            .then(res => this.setState({ list: res[this.state.type.name], loading: false }))
            .catch(err => this.props.history.push('/404'))
    }

    componentDidMount() {
        const category = this.props.category;
        this.getCategory(category)
    }

    componentDidUpdate(prevProps, prevState) {
        const currCategory = this.props.category
        const prevCategory = prevProps.category
        if (currCategory !== prevCategory) {
            this.setState({ loading: true })
            this.getCategory(currCategory)
        }
    }

    render() {
        return (
            <React.Fragment>
                {!/^[1-6]$/.test(this.props.match.params.year) ? < Redirect to='404' />
                    : this.state.loading ? <p>loading...</p>
                        :
                        <div id='wordspage_container'>
                            <header> <NavBar page='words' year={this.props.match.params.year} category={this.props.category} username={this.props.username} />
                                <NavBarCategories year={this.props.match.params.year} category={this.props.category} username={this.props.username} />
                            </header>
                            <Link className='bee-link' to='/'>
                                <img src={BeeLogo250px} id="BeeLogo250px" className="bee-logo" alt="BeeLogo250px" />
                            </Link>
                            {notYear(this.state.type.years, this.props.match.params.year) ?
                                <p>No {this.props.category.toLowerCase()} for year {this.props.match.params.year}. </p>
                                :
                                <React.Fragment>
                                    <ContentBox description={this.state.type.description} page='wordspage' />
                                    <List className="list" items={this.state.list} page='words' year={this.props.match.params.year} category={this.props.category} />
                                </React.Fragment>
                            }
                        </div>
                }
            </React.Fragment>
        )

    }
}

export default WordsPage

WordsPage.propTypes = {
    category: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            year: PropTypes.string.isRequired,
        })
    }),
    username: PropTypes.string.isRequired,

}
