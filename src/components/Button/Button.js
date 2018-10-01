import React from 'react';
import classes from './Button.css';

const Button = (props) => {
	let classesButton =  [classes.btn];

	if(props.classes === 'AddRecipe') {
		classesButton.push(classes.AddRecipe)
	}

	return (
		<button 
			className={classesButton.join(' ')}
			onClick={props.clicked}
		>
			{props.children}
		</button>
	)
}

export default Button;