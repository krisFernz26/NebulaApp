import { useState, useRef } from "react";
import { FaWindowClose } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import firestore from "firebase/firestore";
import app from "../firebase";
import { StyledButton } from "./StyledButton";
import { useAuth } from "../context/AuthContext";
import { Card, Container, Form, Alert } from "react-bootstrap";

const Login = () => {
	const history = useHistory();
	const { signInUser } = useAuth();
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	const signIn = async () => {
		if (emailRef.current.value == "") {
			return setError("Enter an email");
		}
		if (passwordRef.current.value == "") {
			return setError("Enter a password");
		}
		if (passwordRef.current.value.length < 8) {
			return setError("Password length less than 8");
		}

		try {
			setError("");
			setLoading(true);
			await signInUser({
				email: emailRef.current.value,
				password: passwordRef.current.value,
			});
			history.push("/");
		} catch {
			setError("Failed to login an account");
		}
		setLoading(false);
	};

	return (
		<>
			<header>
				<FaWindowClose
					onClick={() => history.push("/landing")}
					size={32}
					className="close-button"
				/>
			</header>
			<Container>
				<Card
					className="text-center"
					style={{
						width: "50vw",
						maxHeight: "90vh",
						backgroundColor: "#1f2029",
						boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.3)",
						borderRadius: "10px",
					}}
				>
					<Container>
						<Card.Body>
							<Card.Title>NebulaApp</Card.Title>
							<Card.Text>Login an Account</Card.Text>
							{error != undefined && error != "" ? (
								<Alert variant="danger">
									<p>{error}</p>
								</Alert>
							) : (
								""
							)}
							<Form>
								<Form.Group
									className="mb-3"
									controlId="formBasicEmail"
									style={{ marginTop: "1rem" }}
								>
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter email"
										ref={emailRef}
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										ref={passwordRef}
									/>
								</Form.Group>
								<StyledButton
									variant="outline-primary"
									onClick={() => {
										setError("");
										signIn();
									}}
								>
									Login
								</StyledButton>
							</Form>
						</Card.Body>
					</Container>
				</Card>
			</Container>
		</>
	);
};

export default Login;
