import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {

	state = {
		controls: {
			email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'Mail Address'
                },
                value : '',
                validation : {
                    required : true,
                    isEmail: true
                },
                valid : false,
                touched : false
            },
            password : {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : 'Enter password'
                },
                value : '',
                validation : {
                    required : true,
                    minLength: 6
                },
                valid : false,
                touched : false
            }
		},
		isSignup: true
	}

	submitHandler = (event) => {
		event.preventDefault();
		this.props.toAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
	}

	switchAuthModeHandler = () => {
		this.setState(prevstate => {
			return {isSignup: !prevstate.isSignup};
		})
	}

	checkValidity(value, rules){
        let isValid = true;
        
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        
        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
    	const updatedControls = {
    		...this.state.controls,
    		[controlName]: {
    			...this.state.controls[controlName],
    			value: event.target.value,
    			valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
    			touched: true
    		}
    	}
    	this.setState({controls: updatedControls});
    }
	render() {

		const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id : key,
                config : this.state.controls[key]
            });
        }

        let form = formElementArray.map(formElement => {
        	return (
        		<Input 
                    key={formElement.id} 
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value} 
                    changed={(event) => this.inputChangeHandler(event, formElement.id)} 
                    invalid={!formElement.config.valid} 
                    shouldValidate={formElement.config.validation} 
                    touched={formElement.config.touched} />
        		);
        })

        if(this.props.loading) {
        	form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
        	errorMessage = <p>{this.props.error.message}</p>
        }

        let authRedirect = null;

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirect} />
        }

		return(
			<div className={classes.Auth}>
                {authRedirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button clicked={this.switchAuthModeHandler} btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        authRedirect: state.auth.authRedirect
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);