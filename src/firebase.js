import firebase from "firebase/app";
import firestore from "firebase/firestore";
import "firebase/auth";

const app = firebase.initializeApp({
	apiKey: "AIzaSyDWJlruuFYHHmsRfpncPPNBZGX0VTRiki4",
	authDomain: "nebula-app-8c1f1.firebaseapp.com",
	projectId: "nebula-app-8c1f1",
	storageBucket: "nebula-app-8c1f1.appspot.com",
	messagingSenderId: "13965826367",
	appId: "1:13965826367:web:586961d33e9f1b89ce9b8a",
	// apiKey: process.env.NEBULA_APP_FIREBASE_API_KEY,
	// authDomain: process.env.NEBULA_APP_FIREBASE_AUTH_DOMAIN,
	// projectId: process.env.NEBULA_APP_FIREBASE_PROJECT_ID,
	// storageBucket: process.env.NEBULA_APP_FIREBASE_STORAGE_BUCKET,
	// messagingSenderId: process.env.NEBULA_APP_FIREBASE_MESSAGING_SENDER_ID,
	// appId: process.env.NEBULA_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
// export const db = firebase.firestore();
export default app;
