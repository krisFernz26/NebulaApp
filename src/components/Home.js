import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { getSystems } from "../services/SystemRepository";
import CustomNavbar from "./CustomNavbar";
import SystemsGrid from "./system/SystemsGrid";
import firestore from "firebase/firestore";
import firebase from "firebase";

const Home = () => {
	const { logoutUser } = useAuth();
	const [systems, setSystems] = useState([]);
	const db = firebase.firestore();

	useEffect(() => {
		return fetchSystems();
	}, []);

	const fetchSystems = async () => {
		const response = db.collection("systems");
		const data = await response.get();
		data.docs.forEach((doc) =>
			setSystems([...systems, { id: doc.id, ...doc.data() }])
		);
	};

	return (
		<>
			<CustomNavbar />
			<div id="home-text" className="text-center mt-5">
				<h1>Systems</h1>
				<p>Browse these systems created by other users</p>
			</div>
			{/* <SystemsGrid systems={systems} /> */}

			{systems !== [] ? (
				<SystemsGrid systems={systems} />
			) : (
				<h2 className="text-center">No systems</h2>
			)}
		</>
	);
};

export default Home;
