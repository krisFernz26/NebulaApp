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

export function createUser({ email, password, name }) {
	return auth.createUserWithEmailAndPassword(email, password).then((user) => {
		db.collection("users")
			.doc(user.user.uid)
			.set({ email: email, name: name })
			.then((docRef) => {
				console.log("Document written with ID: ", docRef.id);
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	});
}

export function getUsers() {
	var users = [];
	db.collection("users")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => users.push({ id: doc.id, ...doc.data() }));
		});
	console.log(users);
}

export function getUser(uid) {
	var user;
	db.collection("users")
		.where("id", "=", uid)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => (user = { id: doc.id, ...doc.data() }));
		});
	console.log(user);
}

export function updateUser({ uid, email, name }) {
	var user;
	db.collection("users")
		.where("id", "=", uid)
		.update({
			email: email,
			name: name,
		})
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => (user = { id: doc.id, ...doc.data() }));
		});
	console.log(user);
}

export function deleteUser(uid) {
	var user;
	db.collection("users").where("id", "=", uid).delete();
}
