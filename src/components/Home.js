import { useState, useEffect } from "react";
import CustomNavbar from "./CustomNavbar";
import SystemsGrid from "./system/SystemsGrid";
import firestore from "firebase/firestore";
import firebase from "firebase";

const Home = () => {
	const [systems, setSystems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const db = firebase.firestore();

	useEffect(async () => {
		setSystems(await fetchSystems());
	}, []);

	const fetchSystems = async () => {
		var firestoreSystems = [];
		const response = db.collection("systems");
		await response
			.get()
			.then((querySnapshot) => {
				querySnapshot.docs.forEach((doc) => {
					firestoreSystems.push({ id: doc.id, ...doc.data() });
				});
			})
			.catch((error) => {
				console.error(error);
			});

		setIsLoading(false);
		return firestoreSystems;
	};

	return (
		<>
			<CustomNavbar />
			<div id="home-text" className="text-center mt-5">
				<h1>Systems</h1>
				<p>Browse these systems created by other users</p>
			</div>

			{!isLoading ? (
				systems !== [] ? (
					<SystemsGrid systems={systems} />
				) : (
					<h2 className="text-center">No systems</h2>
				)
			) : (
				<h4 className="text-center mt-5">Loading...</h4>
			)}
		</>
	);
};

export default Home;
