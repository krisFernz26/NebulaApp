import React from "react";
import { Card } from "react-bootstrap";
import StyledButton from "../StyledButton";
import { useHistory } from "react-router-dom";

const SystemCard = ({ system }) => {
	const history = useHistory();
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
				<Card.Text style={{ color: "var(--main-bg-color)" }}>
					<strong>Age:</strong> {system.age}
				</Card.Text>
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
			</Card.Body>
		</Card>
	);
};

export default SystemCard;
