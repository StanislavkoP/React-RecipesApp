import React from 'react';
import {Link} from 'react-router-dom';
import classes from './RecipeItem.css';

const checkCountExistenceIngredients = (listIngredients) => {

	let existenceIngredientsString;
	let filteredListInredients;
	if ( listIngredients !== undefined ) {
		filteredListInredients = listIngredients.filter(ingredient => ingredient.existence === true);
		
	} else {
		filteredListInredients = [];
		listIngredients = [];
	}


	if ( (listIngredients.length === filteredListInredients.length) && (filteredListInredients > 0 && listIngredients.length > 0) ) {
		existenceIngredientsString = 'У вас имеються все ингредиенты'
	
	} else if ( filteredListInredients.length > 0 && filteredListInredients.length < listIngredients.length ) {
		existenceIngredientsString = 'У вас не все ингредиенты'
	
	} else if ( listIngredients.length === 0 && filteredListInredients.length === 0) {
		existenceIngredientsString = 'Добавьте ингредиенты'

	} else {
		existenceIngredientsString = 'У вас нет никаких ингредиентов'
	}

	return existenceIngredientsString;
}

const showShortGuide = (text) => {
	const MAX_LENGTH = 150;
	let shortGuideString;
	let cutedText = text.trim().slice(0, MAX_LENGTH); //например макс 100 символов
	let cutedTextArray = cutedText.split(' ');

	if ( cutedTextArray.length > 1 ) {
		cutedTextArray.splice(cutedTextArray.length-1, 1);
		cutedText = cutedTextArray.join(' ');
		shortGuideString = cutedText + '...'
	} else {
		shortGuideString = text
	}

	if(text.length)
	console.log();
	return shortGuideString
}

const RecipeItem = (props) => (
	<li className = { classes.RecipeList__RecipeItem } >
		<Link to = { `/recipe/${props.id}` } >
			<h3 className={ classes.RecipeList__RecipeTitle } >
				{ props.title }
			</h3>
			<p className = { classes.shortGuide }>{ showShortGuide(props.guide) }</p>
			<p>{ checkCountExistenceIngredients(props.listIngredients) }</p>
		</Link>
	</li>
)

export default RecipeItem;
