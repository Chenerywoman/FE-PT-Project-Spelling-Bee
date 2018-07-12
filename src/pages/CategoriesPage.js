import React, {Component} from 'react';
import Link from 'react-router-dom';
import PropTypes from 'prop-types';
import {BeeLogo100px, BeeLogo250px, BeeLogo500px, BeeLogoLarge, BeeLogoLargeBordered} from '../logos';
import {ContentBox, List} from '../components';
import '../styling/pages/CategoriesPage.css';
import {getCategory} from '../dataFunctions/api'

class CategoriesPage extends Component {

    state = {

        category: '',
        description: '',
        letters: [], 
        loading: true
    }

    fetchCategory = (category) => {
        return getCategory(category)
        .then(category => {
            this.setState({
                category: category.category,
                description: category.description,
                letters: category.letters, 
                loading: false
            })
        })
        .catch(() => {
            this.props.history.push('/404');
        });
    }

    componentDidMount() {
        console.log('in component did mount')
        const category = this.props.category
        this.fetchCategory(category)
    }

    componentDidUpdate(prevProps) {
        console.log('in component did update')
        const currCategory = this.props.category
        const prevCategory = prevProps.category

        if (currCategory !== prevCategory) {
            this.setState({loading: true})
            this.fetchCategory(currCategory)
        }
    }

    render () {
    return (
      <React.Fragment>
          {this.state.loading ? <p>loading...</p>  
          :
          <React.Fragment>
    <h1>{this.props.category}</h1>
        <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
        <ContentBox className="content" description={this.state.description}/>
        <List className="list" letters={this.state.letters} category={this.state.category}/>
        </React.Fragment>
    }
   </React.Fragment>
    );
}

}

export default CategoriesPage;

CategoriesPage.propTypes = {

    category: PropTypes.string.isRequired

}