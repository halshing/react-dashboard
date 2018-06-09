import React from 'react';
import { auth } from '../firebase';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null
};

const byPropKey = (propName, value) => () => ({ [propName]: value });

class PasswordChangeForm extends React.Component {
    state = { ...INITIAL_STATE };

    onSubmit = e => {
        const { passwordOne } = this.state;

        auth.ChangePassword(passwordOne)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                this.props.setPageMessage('Password was changed successfully!');
            })
            .catch(error => this.setState(byPropKey('error', error)));
        e.preventDefault();
    }

    onChange = (prop, e) => {
        this.setState(byPropKey(prop, e.target.value));
        e.preventDefault();
    }

    render() {
        const { passwordOne, passwordTwo } = this.state;
        const isValid = passwordOne !== passwordTwo || passwordOne === '';

        return (
            <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                    <label htmlFor='user-password'>Password</label>
                    <input 
                        value={passwordOne}
                        onChange={this.onChange.bind(null,'passwordOne')}
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
                        onChange={this.onChange.bind(null,'passwordTwo')}
                        type='password'
                        id='user-passwordconfirm'
                        placeholder='Confirm Password'
                        className='form-control'
                    />
                </div>
                <button disabled={isValid} type='submit' className='btn btn-primary'>Change</button>
            </form>
        );
    }
}


export default PasswordChangeForm;
