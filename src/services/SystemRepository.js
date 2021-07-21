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
		.then((docRef) => {
			console.log("Document written with ID: ", docRef.id);
		})
		.catch((error) => {
			console.error("Error adding document: ", error);
		});
}

// export async function getSystems() {
// 	const response = db.collection("systems");
// 	const data = await response.get();
// 	var systems = [];
// 	data.docs.forEach((doc) => systems.push({ id: doc.id, ...doc.data() }));
// 	// db.collection("systems").onSnapshot((querySnapshot) => {
// 	// 	querySnapshot.forEach((doc) => {
// 	// 		systems.push({ id: doc.id, ...doc.data() });
// 	// 	});
// 	// 	// return systems;
// 	// });

// 	// db.collection("systems")
// 	// 	.get()
// 	// 	.then((querySnapshot) => {
// 	// 		querySnapshot.forEach((doc) => {
// 	// 			systems.push({ id: doc.id, ...doc.data() });
// 	// 		});
// 	// 	});
// 	return systems;
// }

// export function getSystem(id) {
// 	var system;
// 	db.collection("systems")
// 		.where("id", "==", id)
// 		.get()
// 		.then((querySnapshot) => {
// 			querySnapshot.forEach((doc) => (system = { id: doc.id, ...doc.data() }));
// 		});
// 	console.log(system);
// }

export function updateSystem({ id, map }) {
	var system;
	db.collection("systems")
		.where("id", "==", id)
		.update(map)
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => (system = { id: doc.id, ...doc.data() }));
		});
	console.log(system);
}

export function deleteSystem(id) {
	db.collection("systems").where("id", "=", id).delete();
}
