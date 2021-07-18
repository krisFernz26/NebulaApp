import { useState, useRef } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FaWindowClose } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import firestore from "firebase/firestore";
import app from "../firebase";
import { StyledButton } from "./StyledButton";
import { useAuth } from "../context/AuthContext";
import { Card, Container, Form, Alert } from "react-bootstrap";

const Register = () => {
	const history = useHistory();
	const { createUser } = useAuth();
	const [image, setImage] = useState();
	const [previewImage, setPreviewImage] = useState();
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();
	const nameRef = useRef();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	const registerUser = async () => {
		if (emailRef.current.value == "") {
			return setError("Enter an email");
		}
		if (passwordRef.current.value == "") {
			return setError("Enter a password");
		}
		if (passwordRef.current.value.length < 8) {
			return setError("Password length less than 8");
		}
		if (confirmPasswordRef.current.value == "") {
			return setError("Enter confirm your password");
		}
		if (nameRef.current.value == "") {
			return setError("Enter a name");
		}
		if (passwordRef.current.value != confirmPasswordRef.current.value) {
			return setError("Passwords do not match!");
		}

		try {
			setError("");
			setLoading(true);
			await createUser({
				email: emailRef.current.value,
				password: passwordRef.current.value,
				name: nameRef.current.value,
			});
			history.push("/");
		} catch {
			setError("Failed to create an account");
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
							<Card.Text>Create an Account</Card.Text>
							{error != undefined && error != "" ? (
								<Alert variant="danger">
									<p>{error}</p>
								</Alert>
							) : (
								""
							)}
							<Form>
								<label htmlFor="profile-picker">
									<div className="profile-div">
										{image == null ? (
											<BiImageAdd size={42} />
										) : (
											<img
												src={previewImage}
												alt=""
												className="profile-image-large"
											/>
										)}
									</div>
									<input
										accept="image/*"
										type="file"
										name="file-upload"
										id="profile-picker"
										onChange={(event) => {
											setImage(event.target.files[0]);
											setPreviewImage(
												URL.createObjectURL(event.target.files[0])
											);
										}}
									/>
								</label>
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
									<Form.Text className="text-muted">
										We'll never share your email with anyone else.
									</Form.Text>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										ref={passwordRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formConfirmPassword">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Confirm Password"
										ref={confirmPasswordRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formName">
									<Form.Label>Full Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Full Name"
										ref={nameRef}
									/>
								</Form.Group>
								<StyledButton
									variant="outline-primary"
									onClick={() => {
										registerUser();
									}}
								>
									Register
								</StyledButton>
							</Form>

							<div className="w-100" text-center>
								Already have an account? <Link to="/login">Login</Link>
							</div>
						</Card.Body>
					</Container>
				</Card>
			</Container>
		</>
	);
};

export default Register;
