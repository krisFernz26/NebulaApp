import React, { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import firestore from "firebase/firestore";
import firebase from "firebase";
import { useAuth } from "../../context/AuthContext";
import { Container, Row, Col } from "react-bootstrap";
import StyledButton from "../StyledButton";
import { logoutUser } from "../../services/UserRepository";
import SystemsGrid from "../system/SystemsGrid";

const Profile = () => {
	const history = useHistory();
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [systems, setSystems] = useState([]);
	const db = firebase.firestore();
	const { currentUser } = useAuth();

	useEffect(async () => {
		setSystems(await fetchSystems());
		// return fetchSystems();
	}, []);

	const fetchSystems = async () => {
		var firestoreSystems = [];
		const response = db.collection("systems");
		await response
			.where("uid", "==", currentUser.uid)
			.get()
			.then((querySnapshot) => {
				querySnapshot.docs.forEach((doc) => {
					// setSystems([...systems, { id: doc.id, ...doc.data() }]);
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
			<header>
				<FaWindowClose
					onClick={() => history.push("/")}
					size={32}
					className="close-button"
				/>
			</header>
			{!loading && (
				<Col>
					<Row style={{ marginTop: "10vh" }}>
						<Col>
							<Row className="d-flex justify-content-center align-items-center">
								<h1 className="text-center">{currentUser.displayName}</h1>
							</Row>
							<Row className="d-flex justify-content-center align-items-center">
								<StyledButton
									variant="primary"
									onClick={() => {
										logoutUser();
										history.push("/landing");
									}}
								>
									Logout
								</StyledButton>
							</Row>
						</Col>
					</Row>
					<Row className="my-5">
						<Row>
							<h2 className="text-center">Your Systems</h2>
						</Row>
						<Row className="my-5">
							{!isLoading ? (
								systems !== [] ? (
									<SystemsGrid systems={systems} />
								) : (
									<h2 className="text-center">No systems</h2>
								)
							) : (
								<h4 className="text-center mt-5">Loading...</h4>
							)}
						</Row>
					</Row>
				</Col>
			)}
		</>
	);
};

export default Profile;
