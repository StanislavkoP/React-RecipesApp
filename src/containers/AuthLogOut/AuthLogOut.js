import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actionsType from '../../state/actions/index';

class AuthLogOut extends Component {

	componentDidMount () {
		this.props.onAuthLogOut()
	}

	render () {
		return (
			<Redirect to="/auth"/>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuthLogOut: () => dispatch (actionsType.onAuthLogOut())
	}
}

export default connect(null, mapDispatchToProps)(AuthLogOut)


