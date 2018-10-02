import React from 'react';
import classes from './Input.css'

const Input = (props) => (
	<input
		 type="text"
		 value={props.value}
		 onChange={props.changed}
		 onBlur={props.isChanging}
		className={classes.NameRecipe}
	/>
)
export default Input;