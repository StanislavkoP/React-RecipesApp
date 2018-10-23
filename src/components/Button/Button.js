import React from 'react';
import classes from './Button.css';

const Button = (props) => {
	let classesButton =  [classes.btn];

	switch ( props.classes) {
		case 'AddRecipe' :
			classesButton.push(classes.AddRecipe);
		break;

		case 'AddIngredient' :
			classesButton.push(classes.AddIngredient);
		break;

		case 'DeleteRecipe' :
			classesButton.push(classes.DeleteRecipe);
		break;

		case 'BackToDashboard' :
			classesButton.push(classes.BackToDashboard);
		break;

		case 'Auth' :
			classesButton.push(classes.Auth);
		break;

		default: break;

	}


	return (
		<button
			type="button"
			className={classesButton.join(' ')}
			onClick={props.clicked}
			disabled={ props.disabled }
		>
			{props.children}
		</button>
	)
}

export default Button;