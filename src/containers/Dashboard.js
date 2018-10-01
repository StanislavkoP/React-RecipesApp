import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../hoc/Auxx/Aux';
import RecipeList from '../components/RecipeList/RecipeList';
import Button from '../components/Button/Button';

import * as actions from '../state/actions/index';

class Dashboard extends Component {

	componentWillMount () {
		this.props.loadRecipes();
	}
	
	render () {
		return (
			<Aux>
				<h1>
					Ваши рецепты
				</h1>
				<RecipeList recipes={this.props.recipes}/>
				<Button
					classes={'AddRecipe'}
					clicked={() => this.props.addRecipe()}
				>
					Добавить рецепт
				</Button>
			</Aux>
		)
	}
}

const stateToProps = (state) => {
	return {
		recipes: state.dashboard.recipes
	}
	
}

const dispatchToProps = (dispatch) => {
	return {
		addRecipe: () => dispatch( actions.addRecipe() ),
		loadRecipes: () => dispatch( actions.loadRecipes() )
	}
}

export default connect(stateToProps, dispatchToProps)(Dashboard);