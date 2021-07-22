import React from "react";
import { Card } from "react-bootstrap";
import StyledButton from "./StyledButton";

const AddCard = ({ onClick, item }) => {
	return (
		<StyledButton variant="primary" onClick={() => onClick()}>
			Add {item}
		</StyledButton>
	);
};

export default AddCard;
