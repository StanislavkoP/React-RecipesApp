import React from 'react';
import {Link} from 'react-router-dom';
import classes from './RecipeItem.css';

const RecipeItem = (props) => (
	<li className={classes.RecipeList__RecipeItem}>
		<Link to={`/recipe/${props.id}`}>
			<h3 className={classes.RecipeList__RecipeTitle}>
				{props.title}
			</h3>
			<p>Наличие ингридиентов</p>
		</Link>
	</li>
)

export default RecipeItem;
