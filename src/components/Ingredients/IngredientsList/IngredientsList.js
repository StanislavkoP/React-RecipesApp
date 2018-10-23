import React from 'react';

import classes from './IngredintsList.css'

import Aux from '../../../hoc/Auxx/auxx';
import IngredientsItem from '../IngredientsItem/IngredientsItem';



const IngredientsList = props => {
	let ingredient;

	if(props.ingredients) {
		ingredient = props.ingredients.map((item, index) => (
				<IngredientsItem 
					deleteIngredient={() => props.deleteIngredient(index)}
					key={item.name} name={item.name}
					existence={item.existence}
					changeExistenceIngredient = { () => props.changeExistenceIngredient(item, index) }
				/>
			)
		)
	} else {
		ingredient = <div>Добавьте ингридиенты</div>
	}

	return (
		<Aux>
			<div className={classes.headExplanation}>
				<span>В наличии:</span>
				<span>Название:</span>
				<span>Удалить</span>
			</div>
			<ul className={classes.listIngredients}>
				{
					ingredient
				}
			</ul>
		</Aux>

	)

};

export default IngredientsList;