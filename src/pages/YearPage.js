import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BeeLogoLarge } from '../logos';
import { ContentBox, List } from '../components';
import '../styling/pages/YearPage.css';
import { findCategoriesByYear } from '../dataFunctions/api';

class YearPage extends Component {

    state = {
        categories: [],
        loading: true
    }

    componentDidMount() {
        return findCategoriesByYear(this.props.match.params.year)
            .then(({ categories }) => this.setState({ categories, loading: false }))
            .catch(error => {
                this.props.history.push('/404');
            });
    }

    componentDidUpdate() {


    }

    render() {
        return (
            <React.Fragment>
                {!/^[1-6]$/.test(this.props.match.params.year) ? < Redirect to='404' />
                    : this.state.loading ? <p>loading...</p>
                        :
                        <React.Fragment>
                            <header><h1>Year {this.props.match.params.year} page</h1></header>
                            <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
                            {!this.state.categories.length ? <p>Year {`${this.props.match.params.year}`} data coming soon!</p>
                                :
                                <React.Fragment>
                                    <ContentBox />
                                    <List items={this.state.categories} page='year' year={this.props.match.params.year} />
                                </React.Fragment>
                            }
                        </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default YearPage;


