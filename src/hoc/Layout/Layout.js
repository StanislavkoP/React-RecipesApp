import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import classes from './Layout.css';
import Header from '../../components/Header/Header';


class Layout extends Component {

	render () {
	
		return (
			<div className={classes.Container}>
				<Header isAuthed={this.props.isAuthed} currentPath={this.props.location.pathname} />
				{this.props.children}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuthed: state.auth.isAuthed
	}
}

export default withRouter(connect(mapStateToProps)(Layout));