import React from "react";
import { Card } from "react-bootstrap";
import StyledButton from "../StyledButton";
import firestore from "firebase/firestore";
import firebase from "firebase";

const PlanetCard = ({ planet, systemId, isCreator }) => {
	const db = firebase.firestore();

	const deletePlanet = () => {
		db.collection("systems")
			.doc(systemId)
			.update({
				planets: firebase.firestore.FieldValue.arrayRemove(planet),
			})
			.then(() => window.location.reload());
	};
	return (
		<Card style={{ width: "18rem" }} className="planet-card">
			<Card.Img variant="top" src={planet.img} alt="" />
			<Card.Body>
				<Card.Title style={{ color: "var(--main-bg-color)" }}>
					{planet.name}
				</Card.Title>
				{planet.star != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Star:</strong> {planet.star}
					</Card.Text>
				) : (
					""
				)}
				{planet.alternate_names[0] != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Alternate Names:</strong>{" "}
						{planet.alternate_names.join(", ")}
					</Card.Text>
				) : (
					""
				)}
				{planet.equatorial_radius != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Equatorial Radius:</strong> {planet.equatorial_radius}
					</Card.Text>
				) : (
					""
				)}
				{planet.surface_gravity != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Surface Gravity:</strong> {planet.surface_gravity}
					</Card.Text>
				) : (
					""
				)}
				{planet.mass != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Mass:</strong> {planet.mass}
					</Card.Text>
				) : (
					""
				)}
				{planet.average_orbital_speed != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Average Orbital Speed:</strong>{" "}
						{planet.average_orbital_speed}
					</Card.Text>
				) : (
					""
				)}
				{planet.equatorial_rotation_velocity != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Equatorial Rotation Velocity:</strong>{" "}
						{planet.equatorial_rotation_velocity}
					</Card.Text>
				) : (
					""
				)}
				{planet.average_density != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Average Density:</strong> {planet.average_density}
					</Card.Text>
				) : (
					""
				)}
				{planet.surface_pressure != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Surface Pressure:</strong> {planet.surface_pressure}
					</Card.Text>
				) : (
					""
				)}
				{isCreator ? (
					<StyledButton variant="danger" onClick={() => deletePlanet()}>
						Delete
					</StyledButton>
				) : (
					""
				)}
			</Card.Body>
		</Card>
	);
};

export default PlanetCard;
