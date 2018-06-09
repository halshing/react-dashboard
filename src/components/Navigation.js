import React from 'react';
import { Link } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = () => (
    <nav className='navbar navbar-expand-lg navbar-toggleable-sm navbar-dark bg-dark app-nav'>
        <span className="navbar-brand"><Link to={routes.LANDING}>App</Link></span>
        <button className='navbar-toggler navbar-toggler-right' type='button' data-toggle='collapse' data-target='#appnav' aria-controls='appnav' aria-expanded='false' aria-label='Toggle Navigation'>
            <span className='navbar-toggler-icon'></span>
        </button>
        <div className='navbar-collapse collapse' id='appnav'>
            <AuthUserContext.Consumer>
                {authUser => authUser
                    ? <NavigationAuth user={authUser} />
                    : <NavigationNonAuth />
                }
            </AuthUserContext.Consumer>
        </div>
    </nav>
);

const NavigationAuth = props => (
    <ul className='navbar-nav ml-auto'>
        <li className='nav-item p-2'><Link to={routes.DASHBOARD} className='nav-link'>Dashboard</Link></li>
        <li className='nav-item p-2'><Link to={routes.ACCOUNT} className='nav-link'>Account</Link></li>
        <li className='nav-item p-2'><SignOutButton className='nav-link' /></li>
        <li className='nav-item p-2 nav-usergreeting'><span className='navbar-text'>{`Hi, ${props.user.displayName || props.user.email}!`}</span></li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul className='navbar-nav ml-auto'>
        <li className='nav-item p-2'><Link to={routes.LANDING} className='nav-link'>Home</Link></li>
        <li className='nav-item p-2'><Link to={routes.SIGN_IN} className='nav-link'>Sign In</Link></li>
    </ul>
);

export default Navigation;