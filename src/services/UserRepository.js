import app, { auth } from "../firebase";
import firestore from "firebase/firestore";
import firebase from "firebase";
import "firebase/auth";

const db = firebase.firestore();

export function signInUser({ email, password }) {
	return auth.signInWithEmailAndPassword(email, password);
}

export function logoutUser() {
	return auth.signOut();
}

export function createUser({ email, password, name, imageUrl }) {
	return auth.createUserWithEmailAndPassword(email, password).then((user) => {
		user.user.updateProfile({
			displayName: name,
			photoURL: imageUrl,
		});
	});
}

export function updateUser({ user, email, name, imageUrl }) {
	if (email) {
		user.updateEmail(email);
	}
	if (name) {
		user.updateProfile({
			displayName: name,
		});
	}
	if (imageUrl) {
		user.updateProfile({
			photoURL: imageUrl,
		});
	}
}

export function deleteUser(uid) {
	var user;
	db.collection("users").where("id", "=", uid).delete();
}
