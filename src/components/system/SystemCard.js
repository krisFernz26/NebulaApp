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
			<Card.Img variant="top" src={system.img} />
			<Card.Body>
				<Card.Title style={{ color: "var(--main-bg-color)" }}>
					{system.name}
				</Card.Title>
				<Card.Text style={{ color: "var(--main-bg-color)" }}>
					Age: {system.age}
				</Card.Text>
				<Card.Text style={{ color: "var(--main-bg-color)" }}>
					No. of Stars: {system.stars.length}
				</Card.Text>
				<Card.Text style={{ color: "var(--main-bg-color)" }}>
					No. of Planets: {system.planets.length}
				</Card.Text>
				<Card.Text style={{ color: "var(--main-bg-color)" }}>
					No. of Satellites: {system.satellites.length}
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
