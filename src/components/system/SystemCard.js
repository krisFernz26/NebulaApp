import React from "react";
import { Card } from "react-bootstrap";
import StyledButton from "../StyledButton";
import { useHistory } from "react-router-dom";
import firestore from "firebase/firestore";
import firebase from "firebase";
import app from "../../firebase";
import { useAuth } from "../../context/AuthContext";

const SystemCard = ({ system }) => {
	const history = useHistory();
	const db = firebase.firestore();
	let { currentUser } = useAuth();

	const deleteSystem = () => {
		var storage = app.storage();
		var storageRef = storage.ref();
		storageRef.child(`images/${system.id}`).delete();

		db.collection("systems")
			.doc(system.id)
			.delete()
			.then((_) => history.push("/"))
			.catch((error) => console.error(error));
	};

	return (
		<Card
			style={{ width: "18rem" }}
			onClick={() => history.push(`/systems/${system.id}`)}
			className="system-card"
		>
			<Card.Img variant="top" src={system.img} alt="" />
			<Card.Body>
				<Card.Title style={{ color: "var(--main-bg-color)" }}>
					{system.name}
				</Card.Title>
				{system.age != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Age:</strong> {system.age}
					</Card.Text>
				) : (
					""
				)}
				<Card.Text style={{ color: "var(--main-bg-color)" }}>
					<strong>No. of Stars:</strong> {system.stars.length}
				</Card.Text>
				<Card.Text style={{ color: "var(--main-bg-color)" }}>
					<strong>No. of Planets:</strong> {system.planets.length}
				</Card.Text>
				<StyledButton
					variant="primary"
					onClick={() => history.push(`/systems/${system.id}`)}
				>
					More Info
				</StyledButton>
				{system.uid == currentUser.uid ? (
					<StyledButton variant="danger" onClick={() => deleteSystem()}>
						Delete System
					</StyledButton>
				) : (
					""
				)}
			</Card.Body>
		</Card>
	);
};

export default SystemCard;
