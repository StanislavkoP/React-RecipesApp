import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../state/actions/index';

import classes from './Auth.css';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Spinner from '../../components/Spinner/Spinner';

class Auth extends Component {

	state = {
		switchSign: true,
		nameUser: '',
		passwordUser: '',
	}

	switchSign = () => {
		this.setState({switchSign: !this.state.switchSign})
	}

	onChangePassword = (event) => {
		this.setState({passwordUser: event.target.value})
	}

	onChangeName = (event) => {
		this.setState({nameUser: event.target.value})
	}

	onSubmitForm = () => {
		const {nameUser, passwordUser, switchSign} = this.state;
		this.props.onAuth(nameUser, passwordUser, switchSign)
	}

	render () {

		let form = (
			<form>
				<div className={classes.authContainer}>
					<p className={classes.authContainerTitle}>{ this.state.switchSign ? "Вход:"  : "Регистрация:" }</p>
					<label className={classes.authContainerItem}>
						<div>Логин:</div>
						<Input typeInput="text" value={this.state.nameUser} changed={ (event) => this.onChangeName(event)}/>
					</label>
					<label className={classes.authContainerItem}>
						<div>Пароль:</div>
						<Input typeInput="password" value={this.state.passwordUser} changed={ (event) => this.onChangePassword(event)}/>
					</label>

					<Button classes={"Auth"} clicked={() => this.onSubmitForm()}>Отправить</Button>
					<Button 
						classes={"Auth"}
						clicked={() => this.switchSign()}
					>
						{ this.state.switchSign ? "Зарегестрироваться" : "Войти" }
					</Button>
				</div>
			</form>
		);

		if (this.props.loading) {
			form = <Spinner/>
		}

		let authRedirectPath = null;
		if(this.props.isAuthed) {
			authRedirectPath = <Redirect to="/" />
		}

		return (
			<div>
				{ form }
				{ authRedirectPath }
			</div>
			
		)
	}	
}

const stateToProps = state => {
	return {
		loading: state.auth.loading,
		isAuthed: state.auth.isAuthed
	}
}

const dispatchToProps = dispatch => {
	return {
		onAuth: (email, password, typeSign) => dispatch( actions.onAuth(email, password, typeSign) )
	}
}

export default connect(stateToProps, dispatchToProps)(Auth);