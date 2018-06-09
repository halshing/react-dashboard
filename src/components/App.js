import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import DashboardPage from './Dashboard';
import AccountPage from './Account';
import PageNotFound from './PageNotFound';
import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';

const App = () => (
  <Router>
    <div className='app-container'>
      <div className='row pb-5'>
        <div className='col'>
          <Navigation />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='container app-body'>
            <Switch>
              <Route exact path={routes.LANDING} component={() => <LandingPage />} />
              <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
              <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
              <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
              <Route exact path={routes.DASHBOARD} component={() => <DashboardPage />} />
              <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
              <Route component={() => <PageNotFound />} />
            </Switch>        
          </div>  
        </div>
      </div>              
    </div>
  </Router>
);

export default withAuthentication(App);
