import React from 'react';
import classes from './RecipeList.css';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import RecipeItem from './RecipeItem/RecipeItem';

const RecipeList = (props) => (

		<ul className={classes.RecipeList}>
			<TransitionGroup>
			{
				props.recipes.map(recipe => (
					<CSSTransition
						key={recipe.id}
						timeout={300}
						classNames={{
							enter: classes.fadeEnter,
							enterActive: classes.fadeEnterActive,
						}}
					>
						<RecipeItem 
							key={ recipe.id }
							id={ recipe.id }
							title={ recipe.title }
							guide = { recipe.guide }
							listIngredients= { recipe.ingredients }
						/>
					</CSSTransition>
				)
				)
			}
		</TransitionGroup>
		</ul>
	
)

export default RecipeList;