import React from 'react';

import NavBar from './NavBar/NavBar';

const Header = (props) => (
	
	<header>
		{props.isAuthed ? <NavBar isAuthed={props.isAuthed} currentPath={props.currentPath}/> : null}
	</header>
);

export default Header;
