import { auth } from './firebase';

// Sign Up
export const CreateUser = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const SignInUser = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

// Sign Out
export const SignOut = () =>
    auth.signOut();

// Password Reset
export const ResetPassword = email =>
    auth.sendPasswordResetEmail(email);

// Password Change
export const ChangePassword = password =>
    auth.currentUser.updatePassword(password);