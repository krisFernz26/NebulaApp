import React from "react";
import { Card } from "react-bootstrap";

const PlanetCard = ({ planet }) => {
	return (
		<Card style={{ width: "18rem" }} className="planet-card">
			<Card.Img variant="top" src={planet.img} />
			<Card.Body>
				<Card.Title style={{ color: "var(--main-bg-color)" }}>
					{planet.name}
				</Card.Title>
				{planet.alternate_names != [] ? (
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
			</Card.Body>
		</Card>
	);
};

export default PlanetCard;