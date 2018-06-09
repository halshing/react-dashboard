import {
    db
} from './firebase';

export const CreateUser = (id, fullname, username, email) =>
    db.ref(`users/${id}`).set({
        fullname,
        username,
        email
    });

export const GetUsers = () => db.ref('users').once('value');