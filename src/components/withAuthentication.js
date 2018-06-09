import React from 'react';
import AuthUserContext from './AuthUserContext';
import {
    firebase,
    db
} from '../firebase';

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {

        state = {
            authUser: null,
            profile: null,
            error: null
        }

        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                if (authUser) {
                    db.GetUserById(authUser.uid)
                        .then(result => {
                            this.setState(() => ({
                                authUser,
                                profile: result.val()
                            }))
                        })
                        .catch(error => {                            
                            this.setState(() => ({
                                error,
                                authUser: null,
                                profile: null
                            }));
                        });
                } else {
                    this.setState(() => ({
                        authUser: null,
                        profile: null
                    }));
                }
            });
        }

        render() {
            //const { authUser } = this.state;
            return ( 
                <AuthUserContext.Provider value={this.state}>
                    <Component />
                </AuthUserContext.Provider>                
            );
        }
    }
    return WithAuthentication;
}

export default withAuthentication;