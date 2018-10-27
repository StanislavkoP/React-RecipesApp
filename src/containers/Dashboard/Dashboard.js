import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Dasborad.css';
import Spinner from '../../components/Spinner/Spinner';
import RecipeList from '../../components/RecipeList/RecipeList';
import Button from '../../components/Button/Button';

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
					<RecipeList recipes={this.props.recipes}/>
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
		userId: state.auth.userId
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		addRecipe: (userId) => dispatch( actions.addRecipe(userId) ),
		loadRecipes: (userId) => dispatch( actions.loadRecipes(userId) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);