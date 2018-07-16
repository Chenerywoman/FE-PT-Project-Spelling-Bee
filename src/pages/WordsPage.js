import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { BeeLogoLarge } from '../logos';
import { ContentBox, List } from '../components';
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
        console.log('in component did mount words page')
        const category = this.props.category;
        this.getCategory(category)
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('in component did update words page')
    //     const currCategory = this.props.category
    //     const prevCategory = prevProps.category
    //     // add for change in year in params 
    //     if (currCategory !== prevCategory) {
    //         this.setState({ loading: true })
    //         this.fetchCategory(currCategory)
    //     }
    // }

    render() {
        console.log('this.state.type.years', this.state.type.years, 'this.props.match.params.year', this.props.match.params.year)
        return (
            <React.Fragment>
                {!/^[1-6]$/.test(this.props.match.params.year) ? < Redirect to='404' />
                    : this.state.loading ? <p>loading...</p>
                        :
                        <React.Fragment>
                            <header><h1>Year {this.state.year} {this.props.category}</h1></header>
                            <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
                            {notYear(this.state.type.years, this.props.match.params.year) ? 
                            <p>No {this.props.category.toLowerCase()} for year {this.props.match.params.year}. </p>
                            :
                            <React.Fragment>
                            <ContentBox className="content" description={this.state.type.description} />
                            <List className="list" items={this.state.list} page='words' year={this.props.match.params.year} category={this.props.category} />
                            </React.Fragment> 
                            }
                        </React.Fragment>
                }
            </React.Fragment>
        )

    }
}

export default WordsPage