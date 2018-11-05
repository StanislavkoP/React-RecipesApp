import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

import classes from './Dasborad.css';
import Spinner from '../../components/Spinner/Spinner';
import RecipeList from '../../components/RecipeList/RecipeList';
import Button from '../../components/Button/Button';
import WithErrorHundler from '../../hoc/withErrorHundler/withErrorHundler';
import CircularSpinner from '../../components/CircularSpinner/CircularSpinner';
import * as actions from '../../state/actions/index';


class Dashboard extends Component {

	componentWillMount () {
		this.props.loadRecipes(this.props.userId);
		
	}
	
	render () {
		let listRecipes = <Spinner/>

		if(this.props.isLoaded) {
			listRecipes = (
				<React.Fragment>
					{this.props.recipes.length === 0 ? <p style={{fontSize: '20px'}}>Добавьте себе новых рецептов</p> : <RecipeList recipes={this.props.recipes}/> }
					
					{this.props.loading ? <CircularSpinner/> : null}
					<Button
						classes={'AddRecipe'}
						clicked={() => this.props.addRecipe( this.props.userId )}
					>
						Добавить рецепт
					</Button>
				</React.Fragment>
			)
		}
		
		return (
			<React.Fragment>
				<h1 className={classes.title}>
					Ваши рецепты
				</h1>
				{ listRecipes }
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		recipes: state.dashboard.recipes,
		isLoaded: state.dashboard.isLoaded,
		loading: state.dashboard.loading,
		userId: state.auth.userId
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		addRecipe: (userId) => dispatch( actions.addRecipe(userId) ),
		loadRecipes: (userId) => dispatch( actions.loadRecipes(userId) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHundler(Dashboard,Axios));