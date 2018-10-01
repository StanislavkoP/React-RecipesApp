import React from 'react'
import classes from './Layout.css'


const Layout = (props) =>(
	<div className={classes.Container}>
		{props.children}
	</div>
)

export default Layout;