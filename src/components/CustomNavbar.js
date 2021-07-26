import { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import React from "react";
import StyledButton from "./StyledButton";

const CustomNavbar = () => {
	const history = useHistory();
	let listener = null;
	const [scrollState, setScrollState] = useState("top");
	const { currentUser } = useAuth();

	useEffect(() => {
		listener = document.addEventListener("scroll", (e) => {
			var scrolled = document.scrollingElement.scrollTop;
			if (scrolled >= 120) {
				if (scrollState !== "changeColor") {
					setScrollState("changeColor");
				}
			} else {
				if (scrollState !== "top") {
					setScrollState("top");
				}
			}
		});
		return () => {
			document.removeEventListener("scroll", listener);
		};
	}, [scrollState]);

	return (
		<Navbar
			sticky="top"
			expand="md"
			className="text-center"
			style={
				scrollState !== "top"
					? { backgroundColor: "#1f2029d7" }
					: { backgroundColor: "transparent" }
			}
		>
			<Navbar.Brand href="#" style={{ color: "var(--secondary-color)" }}>
				<Container>NebulaApp</Container>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
				<Nav>
					<Container>
						<StyledButton
							variant="outline-primary"
							onClick={() => history.push("/systems/create")}
						>
							Create System
						</StyledButton>
					</Container>
					<Container>
						<Link to="/profile">
							<div className="profile-link">
								<img src={currentUser.photoURL} alt="" srcSet="" />
							</div>
						</Link>
					</Container>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default CustomNavbar;
