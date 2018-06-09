import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = ({ history }) => (
    <div className='row w-50 mx-auto'>
        <div className='col align-self-center'>
            <h1 className='text-center'>Sign Up</h1>
            <SignUpForm history={history} />
        </div>        
    </div>
);

const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
};

const byPropKey = (propName, value) => () => ({ [propName]: value });

class SignUpForm extends React.Component {
    state = { ...INITIAL_STATE };

    onSubmit = e => {
        const { email, passwordOne } = this.state;
        const { history } = this.props;

        auth.CreateUser(email, passwordOne)
            .then(authUser => {
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

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state;

        const isValid = 
            passwordOne !== passwordTwo || 
            passwordOne === '' ||
            email === '' ||
            username === '';
        
        return (
            <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                    <label htmlFor='user-fullname'>Full Name</label>
                    <input 
                        value={username}
                        onChange={this.onChange.bind(null, 'username')}
                        type='text'
                        id='user-fullname'
                        placeholder='Full Name'
                        className='form-control'
                    />
                </div>
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
                        value={passwordOne}
                        onChange={this.onChange.bind(null, 'passwordOne')}
                        type='password'
                        id='user-password'
                        placeholder='Password'
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='user-passwordconfirm'>Confirm Password</label>
                    <input 
                        value={passwordTwo}
                        onChange={this.onChange.bind(null, 'passwordTwo')}
                        type='password'
                        id='user-passwordconfirm'
                        placeholder='Confirm Password'
                        className='form-control'
                    />
                </div>
                <div className='text-center pb-3'><button disabled={isValid} type='submit' className='btn btn-primary'>Sign Up</button></div>
                { error && <p className='text-center error-message'>{error.message}</p> }
            </form>
        );
    }
}

const SignUpLink = () => (
    <p className='pt-3'>
        Don't have an account?
        {' '}
        <Link to={routes.SIGN_UP}>Sign Up!</Link>
    </p>
);

export default withRouter(SignUpPage);
export {
    SignUpForm,
    SignUpLink
}