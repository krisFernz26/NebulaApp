import React from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { StyledButton } from "./StyledButton";

const Landing = () => {
	const history = useHistory();
	return (
		<>
			<Container>
				<Card
					className="text-center"
					style={{
						width: "50%",
						maxHeight: "80vh",
						backgroundColor: "#1f2029",
						boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.3)",
						padding: "1rem",
						height: "40%",
						borderRadius: "10px",
					}}
				>
					<Container>
						<Card.Body>
							<Card.Title>NebulaApp</Card.Title>
							<Card.Text>Create and Browse Solar Systems.</Card.Text>
							<StyledButton
								variant="outline-primary"
								onClick={() => history.push("/register")}
							>
								Create an Account
							</StyledButton>
							<br />
							<StyledButton
								variant="outline-primary"
								onClick={() => history.push("/login")}
							>
								Login
							</StyledButton>
						</Card.Body>
					</Container>
				</Card>
			</Container>
		</>
	);
};

export default Landing;
