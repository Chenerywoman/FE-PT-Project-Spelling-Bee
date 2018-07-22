import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { BeeLogo250px } from '../logos';
import { ContentBox, NavBar, List } from '../components';
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

    componentDidUpdate(prevProps, prevState) {
        console.log('in component did update')
        if (prevProps !== this.props) {
            return findCategoriesByYear(this.props.match.params.year)
            .then(({ categories }) => this.setState({ categories, loading: false }))
            .catch(error => {
                this.props.history.push('/404');
            });
        }


    }

    render() {
        return (
            <React.Fragment>
                {!/^[1-6]$/.test(this.props.match.params.year) ? < Redirect to='404' />
                    : this.state.loading ? <p>loading...</p>
                        :
                        <div id='yearpage_container' >
                           <header> <NavBar page='year' year={this.props.match.params.year} category='' username={this.props.username} />
                            <h1>Year {this.props.match.params.year} categories</h1></header>
                         
                            <Link className='bee-link' to='/'>
                            <img src={BeeLogo250px} id="BeeLogo250px" className="bee-logo" alt="BeeLogoLarge" />
                            </Link>

                            {!this.state.categories.length ? <p className='holdingmessage'>Year {`${this.props.match.params.year}`} data coming soon...</p>
                                :
                                <React.Fragment>
                                    <ContentBox description={`${this.props.username}, click on a link below for a description of each category and examples to practise.`} page='yearpage'/>
                                    <List items={this.state.categories} page='year' year={this.props.match.params.year} />
                                </React.Fragment>
                            }
                        
                        </div>
                }
             </React.Fragment>
        )
    }
}

export default YearPage;


