import React from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) => (
    <div className='row w-50 mx-auto'>
        <div className='col align-self-center'>
            <h1 className='text-center'>Sign In</h1>
            <SignInForm history={history} />
            <div className='text-center'>
                <PasswordForgetLink />
                <SignUpLink />
            </div>
        </div>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

const byPropKey = (propName, value) => () => ({ [propName]: value });

class SignInForm extends React.Component {    
    state = { ...INITIAL_STATE };

    onSubmit = e => {
        const { email, password } = this.state;
        const { history } = this.props;
        auth.SignInUser(email, password)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.DASHBOARD);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });
        e.preventDefault();
    }
    
    onChange = (prop, e) => {
        this.setState(byPropKey(prop, e.target.value));
        e.preventDefault();        
    }

    render () {
        const { email, password, error } = this.state;

        const isValid = password === '' || email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                    <label htmlFor='user-email'>Email</label>
                    <input 
                        value={email}
                        onChange={this.onChange.bind(null, 'email')} 
                        type='email'
                        id='user-email'
                        placeholder='Email'
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='user-password'>Password</label>
                    <input 
                        value={password}
                        onChange={this.onChange.bind(null, 'password')} 
                        type='password'
                        id='user-password'
                        placeholder='Password'
                        className='form-control'
                    />
                </div>
                <div className='text-center pb-3'><button disabled={isValid} type='submit' className='btn btn-primary'>Sign In</button></div>
                { error && <p className='text-center error-message'>{error.message}</p> }
            </form>
        );
    }
}

export default withRouter(SignInPage);
export {
    SignInForm
}