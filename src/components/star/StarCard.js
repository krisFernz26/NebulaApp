import React from "react";
import { Card } from "react-bootstrap";

const StarCard = ({ star }) => {
	return (
		<Card style={{ width: "18rem" }} className="star-card">
			<Card.Img variant="top" src={star.img} />
			<Card.Body>
				<Card.Title style={{ color: "var(--main-bg-color)" }}>
					{star.name}
				</Card.Title>
				{star.age != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Age:</strong> {star.age}
					</Card.Text>
				) : (
					""
				)}
				{star.alternate_names != [] ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Alternate Names:</strong> {star.alternate_names.join(", ")}
					</Card.Text>
				) : (
					""
				)}
				{star.average_density != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Average Density:</strong> {star.average_density}
					</Card.Text>
				) : (
					""
				)}
				{star.equatorial_radius != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Equatorial Radius:</strong> {star.equatorial_radius}
					</Card.Text>
				) : (
					""
				)}
				{star.equatorial_surface_gravity != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Equatorial Surface Gravity:</strong>{" "}
						{star.equatorial_surface_gravity}
					</Card.Text>
				) : (
					""
				)}
				{star.mass != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Mass:</strong> {star.mass}
					</Card.Text>
				) : (
					""
				)}
				{star.rotation_velocity != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Rotation Velocity:</strong> {star.rotation_velocity}
					</Card.Text>
				) : (
					""
				)}
				{star.surface_area != "" ? (
					<Card.Text style={{ color: "var(--main-bg-color)" }}>
						<strong>Surface Area:</strong> {star.surface_area}
					</Card.Text>
				) : (
					""
				)}
			</Card.Body>
		</Card>
	);
};

export default StarCard;
