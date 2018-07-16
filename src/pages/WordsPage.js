import React, {Component} from 'react';
// import Link from 'react-router-dom';
import PropTypes from 'prop-types';
import {BeeLogoLarge} from '../logos';
import {ContentBox, List} from '../components';
import '../styling/pages/WordsPage.css';
import {findCategoriesByYear,findCategory, findList} from '../dataFunctions/api';

class WordsPage extends Component {

    state = {
        categories: [],
        type: {},
        list: [],
        year: this.props.match.params.year,
        loading: true
        
    }

    getCategory = (type) => {
        // return findCategoriesByYear(this.props.match.params.year)
        // .then(({ categories }) => this.setState({ categories }))
        return findCategory(type)
        .then(type => {
            console.log('type in wordspage', type)
            this.setState({type})
            return findList(this.state.type.name)
        })
        .then(res => this.setState({list: res[this.state.type.name], loading: false}))
        .catch(err => this.props.history.push('/404'))
    }

    componentDidMount() {
        console.log('in component did mount words page')
        const category = this.props.category;
        this.getCategory(category)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('in component did update words page')
        const currCategory = this.props.category
        const prevCategory = prevProps.category
// add for change in year in params 
        if (currCategory !== prevCategory) {
            this.setState({loading: true})
            this.fetchCategory(currCategory)
        }
    }



    render () {
console.log ('this.props.category in wordspage', this.props.category)
        return (
        <React.Fragment>
        {this.state.loading ? <p>loading...</p>  
        :
        <React.Fragment>
  <h1>Year {this.state.year} {this.props.category}</h1>
      <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
      <ContentBox className="content" description={this.state.type.description}/>
      <List className="list" items={this.state.list} page='words' year={this.state.year} category={this.props.category}/>
      </React.Fragment>
  }
 </React.Fragment>
        )

    }
}

export default WordsPage