import React from 'react';

import IngredientsList from './IngredientsList/IngredientsList'

const Ingredients = props => (
	<React.Fragment>
		<h3 style={ {textAlign:'center' } }>Список ингридиентов:</h3>
		<IngredientsList
			deleteIngredient={props.deleteIngredient}
			ingredients={props.ingredients}
			changeExistenceIngredient = { props.changeExistenceIngredient }
		/>
	</React.Fragment>

);

export default Ingredients;

