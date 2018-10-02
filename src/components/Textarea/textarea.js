import React from 'react';
/* import classes from './Input.css' */

const Textarea = (props) => (
	<textarea
		onChange={props.changed}
		value={props.value}
	></textarea>
)
export default Textarea;