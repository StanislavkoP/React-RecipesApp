import React from 'react';
import  './Textarea.css';

const Textarea = (props) => (
	<textarea
		onChange={props.changed}
		value={props.value}
	></textarea>
)
export default Textarea;