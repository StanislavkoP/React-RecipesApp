import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../state/actions/index';

import classes from './Edit.css';
import Input from '../../components/Input/Input';

class Edit extends Component {
	componentDidMount() {
		this.props.loadRecipe( this.props.match.params.id )
	}

	render () {
		/* console.log(this.props); */
		return (
			<div className={classes.container}>
				<Input/>
			</div>

/* 			<p>{this.props.match.params.id}</p>
 */		)
	}
}

const mapStateToProps = (state) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadRecipe: (idRecipe) => dispatch ( actions.loadRecipe(idRecipe) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)