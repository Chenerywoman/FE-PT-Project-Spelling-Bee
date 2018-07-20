import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BeeLogoLarge } from '../logos';
import { ContentBox, NavBar, List } from '../components';
import '../styling/pages/PartialsPage.css';
import { findList } from '../dataFunctions/api'
import { notYear } from '../dataFunctions/helpers'

class PartialsPage extends Component {

    state = {
        partial: {},
        list: [],
        loading: true
    }

    getCategory = (partial) => {
        return findList(partial)
            .then(res => {
                this.setState({ partial: res[partial.toLowerCase()], list: res.partials, loading: false })
            })
            .catch(err => this.props.history.push('/404'))
    }

    componentDidMount() {
        this.getCategory(this.props.category)
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
        return (
            <div>
                {!/^[1-6]$/.test(this.props.match.params.year) ? < Redirect to='404' />
                    : this.state.loading ? <p>loading...</p>
                        :
                        <React.Fragment>
                             <header> <NavBar page='year' year={this.props.match.params.year} category={this.props.category} username={this.props.username} />
                          <h1>Year {this.props.match.params.year} {this.props.category}</h1></header>
                            <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
                            {notYear(this.state.partial.years, this.props.match.params.year) ? 
                            <p>No {this.props.category.toLowerCase()} for year {this.props.match.params.year}.</p>
                            :
                                <React.Fragment>
                                    <ContentBox className="content" description={this.state.partial.description} />
                                    <List className="list" items={this.state.list} page='partials' year={this.props.match.params.year} category={this.props.category} />
                                </React.Fragment>   
                            }
                        </React.Fragment>
                }
            </div>
        )
    }
}

export default PartialsPage;

PartialsPage.propTypes = {

    category: PropTypes.string.isRequired

}