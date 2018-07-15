import React, {Component} from 'react';
// import Link from 'react-router-dom';
import PropTypes from 'prop-types';
import { BeeLogoLarge} from '../logos';
import {ContentBox, List} from '../components';
import '../styling/pages/CategoriesPage.css';
import {getCategory, getList} from '../dataFunctions/api'

class CategoriesPage extends Component {

    state = {
        category: {},
        list: [],
        year: this.props.match.params.year,
        loading: true
    }

    fetchCategory = (category) => {
        return getCategory(category)
        .then(category => {
            this.setState({category})
            return getList(this.state.category.name)
        })
        .then(res => this.setState({list: res[this.state.category.name], loading: false}))
        .catch(err => this.props.history.push('/404'))
    }

    componentDidMount() {
        console.log('in component did mount')
        const category = this.props.category;
        this.fetchCategory(category)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('in component did update')
        const currCategory = this.props.category
        const prevCategory = prevProps.category
// add for change in year in params 
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
    <h1>Year {this.state.year} {this.props.category}</h1>
        <img src={BeeLogoLarge} id="BeeLogoLarge" className="bee-logo" alt="BeeLogoLarge" />
        <ContentBox className="content" description={this.state.category.description}/>
        <List className="list" items={this.state.list} year={this.state.year} page='categories'/>
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