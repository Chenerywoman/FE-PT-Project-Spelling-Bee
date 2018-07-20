import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BeeLogo250px } from '../logos';
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

    componentDidUpdate(prevProps, prevState) {
        const currPartial = this.props.category
        const prevPartial = prevProps.category
        if (currPartial !== prevPartial) {
            this.setState({ loading: true })
            this.getCategory(currPartial)
        }
    }

    render() {
        return (
            <React.Fragment>
                {!/^[1-6]$/.test(this.props.match.params.year) ? < Redirect to='404' />
                    : this.state.loading ? <p>loading...</p>
                        :
                        <div id='partialspage_container'>
                             <header> <NavBar page='year' year={this.props.match.params.year} category={this.props.category} username={this.props.username} />
                          <h1>Year {this.props.match.params.year} {this.props.category}</h1></header>
                          <Link className='link' to='/'><img src={BeeLogo250px} id="BeeLogo250px" className="bee-logo" alt="BeeLogoLarge" /></Link>
                            {notYear(this.state.partial.years, this.props.match.params.year) ? 
                            <p>No {this.props.category.toLowerCase()} for year {this.props.match.params.year}.</p>
                            :
                                <React.Fragment>
                                    <ContentBox description={this.state.partial.description} page='partialspage'/>
                                    <List className="list" items={this.state.list} page='partials' year={this.props.match.params.year} category={this.props.category} />
                                </React.Fragment>   
                            }
                        </div>
                }
            </React.Fragment>
        )
    }
}

export default PartialsPage;

PartialsPage.propTypes = {

    category: PropTypes.string.isRequired

}