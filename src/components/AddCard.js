import React from "react";
import { Card } from "react-bootstrap";
import StyledButton from "./StyledButton";

const AddCard = ({ onClick, item }) => {
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Body className="d-flex justify-content-center align-items-center">
				{" "}
				<StyledButton variant="primary" onClick={() => onClick}>
					Add {item}
				</StyledButton>
			</Card.Body>
		</Card>
	);
};

export default AddCard;
