import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../state/actions/index';
import { CSSTransition} from 'react-transition-group';

import classes from './Auth.css';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Spinner from '../../components/Spinner/Spinner';


class Auth extends Component {

	state = {
		switchSign: true,
		inputs: {
			email: {
				value: '',
				validation: {
					isEmail: true,
					pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
				},
				valid: {
					isValid: false,
					errorMessage: null
				},
                touched: false
			},
			password: {
				value: '',
				validation: {
					required: true,
					minLength: 6,
					maxLength: 12
                },
                valid: {
					isValid: false,
					errorMessage: null
				},
                touched: false
			} 
		},
		isFormValidded: false,
		formError: null
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.error !== this.state.formError) {
			console.log(this.state.formError);
			this.setState({
				...this.state,
				formError: nextProps.error
			})
		}
	}


	hundlerValidationForm () {
		const isEmailValidded = this.state.inputs.email.valid.isValid;
		const isPasswordValidded = this.state.inputs.password.valid.isValid;

		if ( isEmailValidded && isPasswordValidded) {
			this.setState({
				...this.state,
				isFormValidded: true
			})
		} else {
			this.setState({
				...this.state,
				isFormValidded: false
			})
		}
	}

	checkValidation(inputValue, rules) {
		let isValid = true;
		let errorMessage = '';
		if (rules.pattern) {
			isValid = rules.pattern.test(inputValue);

			if (isValid === false && rules.isEmail) {
				errorMessage = 'Введите корректно эл.адрес'
			}
		}

		if (rules.minLength) {
			if ( inputValue.length < rules.minLength ) {
				isValid = false;
				errorMessage = 'Пароль должен быть не меньше 6 символов'

			}

		}

		if (rules.maxLength) {
			if ( inputValue.length >= rules.maxLength ) {
				isValid = false;
				errorMessage = 'Пароль должен быть не больше 12 символов'
			}
		}



		return {
			isValid,
			errorMessage
		};
	}

	switchSign () {
		this.setState({switchSign: !this.state.switchSign})
	}

	getErrorMessage = (error) => {
		let errorMessage;

		switch (error) {
			case 'INVALID_PASSWORD' :
				errorMessage = 'Неправильно введен пароль';
				break;
			case 'EMAIL_NOT_FOUND' :
				errorMessage = 'Этот эл. адрес не зарегестрирован';
				break;
			default : errorMessage = error;
		}

		return errorMessage;
	}

	onChangePassword (event) {
		const inputValue = event.target.value;
		const validationRules = this.state.inputs.password.validation;
		const validationResults = this.checkValidation(inputValue, validationRules);
		
		this.setState((prevState) => {
			return {
				...prevState,
				inputs: {
					...prevState.inputs,
					password: {
						...prevState.inputs.password,
						value: inputValue,
						valid: validationResults,
						touched: true,
					}
				},
			}
		}, () => {
			this.hundlerValidationForm();
		}) 
	}

	onChangeName  (event)  {
		const inputValue = event.target.value;
		const validationRules = this.state.inputs.email.validation;
		const validationResults = this.checkValidation(inputValue, validationRules);

		this.setState((prevState) => {
			return {
				...prevState,
				inputs: {
					...prevState.inputs,
					email: {
						...prevState.inputs.email,
						value: inputValue,
						valid: validationResults,
						touched: true,
					}
				},
			}
		}, () => {
			this.hundlerValidationForm();
		})
	}

	onSubmitForm () {
		const switchSign = this.state.switchSign;
		const name = this.state.inputs.email.value;
		const password = this.state.inputs.password.value;
		
		this.props.onAuth(name, password, switchSign)
	}

	render () {
		let errorMessage;
		if (this.props.error) {
			errorMessage = this.getErrorMessage(this.state.formError);
			errorMessage = ( <p className={classes.authError}>{errorMessage}</p> )
		}

		let form = (
			<form>
				<div className={classes.authContainer}>
					<p className={classes.authContainerTitle}>{ this.state.switchSign ? "Вход:"  : "Регистрация:" }</p>
					<label className={classes.authContainerItem}>
						<div>Эл. адрес:</div>
						<Input typeInput="text" value={this.state.inputs.email.value} changed={ (event) => this.onChangeName(event)}/>
						<div>{ !this.state.inputs.email.valid.isValid ? this.state.inputs.email.valid.errorMessage : null}</div>
					</label>

					<label className={classes.authContainerItem}>
						<div>Пароль:</div>
						<Input typeInput="password" value={this.state.inputs.password.value} changed={ (event) => this.onChangePassword(event)}/>
						<div>{ !this.state.inputs.password.valid.isValid ? this.state.inputs.password.valid.errorMessage : null}</div>

					</label>

					{errorMessage}

					<Button classes={"Auth"} disabled={!this.state.isFormValidded} clicked={() => this.onSubmitForm()}>Отправить</Button>
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
				<CSSTransition
					in={true}
					appear={true}
					timeout={900}
					classNames={{
						appear: classes.fadeEnter,
						appearActive: classes.fadeEnterActive,
						enter: classes.fadeEnter,
						enterActive: classes.fadeEnterActive,
					}}
				>
					{ form }
				</CSSTransition>
				{ authRedirectPath }
			</div>
			
		)
	}	
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		isAuthed: state.auth.isAuthed,
		error: state.auth.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, typeSign) => dispatch( actions.onAuth(email, password, typeSign) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);