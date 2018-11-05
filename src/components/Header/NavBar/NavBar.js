import React from 'react';
import classes from './NavBar.css';

import NavItem from './NavItem/NavItem';



const NavBar = (props) => (
	<nav>
		<ul className={classes.navList}>

		 <NavItem link="/" exact={true}>{props.currentPath.indexOf('/recipe/') ? "Главная" : '← К главной'}</NavItem> 
		
		 {props.isAuthed ? <NavItem link="/authLogOut">Выйти</NavItem> : <NavItem link="/auth">Войти</NavItem>}
		</ul>
	</nav>
);

export default NavBar;