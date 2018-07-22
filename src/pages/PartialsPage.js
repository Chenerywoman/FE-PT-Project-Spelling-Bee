import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BeeLogo100px } from '../logos';
import { ContentBox, NavBar, List, NavBarCategories } from '../components';
import '../styling/pages/PartialsPage.css';
import { findList } from '../dataFunctions/api'
import { notYear } from '../dataFunctions/helpers'

class PartialsPage extends Component {

    state = {
        label: this.props.category.endsWith('es') ? this.props.category.match(/\w+(?=es)/)[0].toLowerCase() : this.props.category.match(/\w+(?=s)/)[0].toLowerCase(),
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
            this.setState({ 
                loading: true, 
                label: this.props.category.endsWith('es') ? this.props.category.match(/\w+(?=es)/)[0].toLowerCase() : this.props.category.match(/\w+(?=s)/)[0].toLowerCase() 
            })
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
                             <header> 
                                 <NavBar page='partials' year={this.props.match.params.year} category={this.props.category} username={this.props.username} />
                          <NavBarCategories year={this.props.match.params.year} page='partials' category={this.props.category} username={this.props.username}/>
                          </header>
                            {notYear(this.state.partial.years, this.props.match.params.year) ? 
                            <p>No {this.props.category.toLowerCase()} for year {this.props.match.params.year}.</p>
                            :
                                <React.Fragment>
                                    <h1 id='partial-heading'>{this.props.category}</h1>
                                    <ContentBox description={this.state.partial.description} page='partialspage'/>
                                    <Link className='bee-link' to='/'>
                          <img src={BeeLogo100px} id="BeeLogo100px" className="bee-logo" alt="BeeLogo100px" />
                          </Link>
                                    <h2 id='partial-instruction'>Click on a {this.state.label} below to see words containing the {this.state.label}. </h2>
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