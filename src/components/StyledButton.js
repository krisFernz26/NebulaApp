import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

export const StyledButton = styled(Button)`
	margin-top: 20px;
	margin-bottom: 10px;
	border-radius: 5px;
	border: 2px solid var(--secondary-color);
	padding: 0.5rem;
	width: 200px;
	font-weight: bold;
	font-family: "Poppins", sans-serif;
	text-align: center;
	transition: all 100ms;
	background-color: var(--main-bg-color);
	color: var(--secondary-color);

	:hover {
		background: var(--secondary-color);
		border-color: var(--main-bg-color);
		color: var(--main-bg-color);
		box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.473);
	}
`;

export default StyledButton;
