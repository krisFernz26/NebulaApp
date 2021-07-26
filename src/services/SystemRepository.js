import app, { auth } from "../firebase";
import firestore from "firebase/firestore";
import firebase from "firebase";

const db = firebase.firestore();

export function createSystem({ name, age, stars, planets, satellites }) {
	db.collection("systems")
		.add({
			name: name,
			age: age,
			stars: stars,
			planets: planets,
			satellites: satellites,
		})
		.then((docRef) => {})
		.catch((error) => {
			console.error("Error adding document: ", error);
		});
}
