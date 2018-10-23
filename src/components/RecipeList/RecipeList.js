import React from 'react';
import classes from './RecipeList.css';

import RecipeItem from '../RecipeItem/RecipeItem';

const RecipeList = (props) => (
	<ul className={classes.RecipeList}>
		{
			props.recipes.map(recipe => (
				<RecipeItem 
					key={ recipe.id }
					id={ recipe.id }
					title={ recipe.title }
					guide = { recipe.guide }
					listIngredients= { recipe.ingredients }
				/>
			)
			)
		}

	</ul>
)

export default RecipeList;