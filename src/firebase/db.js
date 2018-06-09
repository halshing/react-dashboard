import {
    db
} from './firebase';

export const CreateUser = (id, fullname, username, email) =>
    db.ref(`users/${id}`).set({
        fullname,
        username,
        email
    });

export const GetUserById = uid => db.ref(`users/${uid}`).once('value')

export const GetAllUsers = () => db.ref('users').once('value');