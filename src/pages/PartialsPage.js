import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BeeLogoLarge } from '../logos';
import { ContentBox, List } from '../components';
import '../styling/pages/CategoriesPage.css';
import { findList } from '../dataFunctions/api'
import { checkYear, notYear } from '../dataFunctions/helpers'

class PartialsPage extends Component {

    state = {
        partial: {},
        list: [],
        year: this.props.match.params.year,
        loading: true
    }

    getCategory = (partial) => {
        return findList(partial)
            .then(res => {
                console.log('res in getCategory', res, 'this.props.category', this.props.category)
                this.setState({ partial: res[partial.toLowerCase()], list: res.partials, loading: false })
            })
            .catch(err => this.props.history.push('/404'))
    }

    componentDidMount() {
        console.log('in component did mount partials page')
        const category = this.props.category;
        this.getCategory(category)
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('in component did update partials page')
    //     const currPartial = this.props.partial
    //     const prevPartial = prevProps.partial
    //     if (currPartial !== prevPartial) {
    //         this.setState({ loading: true })
    //         this.getCategory(currPartial)
    //     }
    // }

    render() {
        console.log('this.state.partial.years', this.state.partial.years, 'this.props.match.params.year', this.props.match.params.year)
        return (
            <React.Fragment>
                {!/^[1-6]$/.test(this.props.match.params.year) ? < Redirect to='404' />
                    : this.state.loading ? <p>loading...</p>
                        :
                        <React.Fragment>
                            <header><h1>Year {this.props.match.params.year} {this.props.category}</h1></header>
                            <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
                            {notYear(this.state.partial.years, this.props.match.params.year) ? 
                            <p>Year {`${this.props.match.params.year}`} {this.props.category.toLowerCase()} coming soon!</p>
                            :
                                <React.Fragment>
                                    <ContentBox className="content" description={this.state.partial.description} />
                                    <List className="list" items={this.state.list} page='partials' year={this.state.year} category={this.props.category} />
                                </React.Fragment>   
                            }
                        </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default PartialsPage;

PartialsPage.propTypes = {

    category: PropTypes.string.isRequired

}