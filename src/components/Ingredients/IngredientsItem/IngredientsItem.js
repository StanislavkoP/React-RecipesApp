import React from 'react';
import classes from './IngredientsItem.css'

const IngredientsItem = props => (
	<li className={classes.ingredientElement }>
		<label>
			<input type="checkbox"  defaultChecked={props.existence}  onChange = {props.changeExistenceIngredient }/>
			<span></span>
			<div className={classes.ingridientText}>
				{props.name}
			</div>
		</label>
		<button 
		onClick={props.deleteIngredient}
		className={classes.removeIngredient}>--</button>
	</li>
);

export default IngredientsItem;
