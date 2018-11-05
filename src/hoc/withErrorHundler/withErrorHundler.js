import React, {Component} from 'react';

const withErrorHundler = (WrappedComponent, axios) => { 
	return class extends Component {
		state = {
			error: null
		}

		componentWillMount () {
			this.intereceptorsReq = axios.interceptors.request.use(req => req);

			this.intereceptorsRes = axios.interceptors.response.use(res => res, err => {
				const errorResponse = err.response;
				const errorMessage = errorResponse.data.error.message;
				console.log(errorResponse)
				this.setState({error: this.translateErrorMessage(errorMessage)})
			})
		}

		componentWillUnmount () {
			axios.interceptors.response.eject(this.intereceptorsRes);
			axios.interceptors.request.eject(this.intereceptorsReq)
		}

		translateErrorMessage = message => {
			switch (message) {
				case 'EMAIL_NOT_FOUND' : 
					return 'Этот почтовый адрес не зарегистрирован';
				case 'INVALID_PASSWORD' : 
					return 'Не верный пароль';
				default : return message
			}
		}

		render () {
			return (
				<React.Fragment>
					<p style={{textAlign: 'center'}}>
						{
							this.state.error ? this.state.error : null
						}
					</p>
					<WrappedComponent {...this.props}/>
				</React.Fragment>
			)
		}
	}	
}

export default withErrorHundler;
