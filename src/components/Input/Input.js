import React from 'react';
import classes from './Input.css'

const Input = (props) => (
	<input
		 type={ props.typeInput ? props.typeInput : "text"}
		 value={props.value}
		 onChange={props.changed}
		 onBlur={props.isChanging}
		className={classes.NameRecipe}
		placeholder={props.placeholder}
		style={{...props.style}}
		
	/>
)
export default Input;