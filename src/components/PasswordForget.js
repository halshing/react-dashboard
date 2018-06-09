import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const PasswordForgetPage = ({ history }) => (
    <div className='row w-50 mx-auto'>
        <div className='col align-self-center'>
            <h1 className='text-center pb-3'>Password Reset</h1>
            <PasswordForgetForm history={history} />
            <div className='text-center'>
                <SignUpLink />
            </div>
        </div>
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null
};

const byPropKey = (propName, value) => () => ({ [propName]: value });

class PasswordForgetForm extends React.Component {
    state = { ...INITIAL_STATE };

    onSubmit = e => {
        const { email } = this.state;
        const { history } = this.props;

        auth.ResetPassword(email)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.LANDING);
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
        const { email, error } = this.state;
        const isValid = email === '';

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
                <div className='text-center pb-3'><button disabled={isValid} type='submit' className='btn btn-primary'>Reset</button></div>
                { error && <p className='text-center error-message'>{error.message}</p> }
            </form>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to='/pw-forget'>Forget Password?</Link>
    </p>
);

export default withRouter(PasswordForgetPage);
export {
    PasswordForgetForm,
    PasswordForgetLink
}