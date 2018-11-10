import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import classes from './IngredintsList.css';
import fadeClasses from '../../../App.css';
import Aux from '../../../hoc/Auxx/auxx';
import IngredientsItem from '../IngredientsItem/IngredientsItem';



const IngredientsList = props => {
	let ingredient;

	if(props.ingredients) {
		
		ingredient = props.ingredients.map((item, index) => (
			<CSSTransition
				key={index}
				timeout={300}
				classNames={{    
					enter: fadeClasses.fadeEnter,
					enterActive: fadeClasses.fadeEnterActive,
					exit: fadeClasses.fadeExit,
					exitActive: fadeClasses.fadeExitActive,}}
		  	>
				<IngredientsItem 
					deleteIngredient={() => props.deleteIngredient(index)}
					
					name={item.name}
					existence={item.existence}
					changeExistenceIngredient = { () => props.changeExistenceIngredient(item, index) }
				/>
			</CSSTransition>
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
			<TransitionGroup>
				{
					ingredient
				}
			</TransitionGroup>
			</ul>
		</Aux>

	)

};

export default IngredientsList;