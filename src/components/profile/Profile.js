import React, { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import firestore from "firebase/firestore";
import firebase from "firebase";
import { useAuth } from "../../context/AuthContext";
import { Container, Row, Col } from "react-bootstrap";
import StyledButton from "../StyledButton";
import { logoutUser } from "../../services/UserRepository";

const Profile = () => {
	const history = useHistory();
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const db = firebase.firestore();
	const { currentUser } = useAuth();

	return (
		<>
			<header>
				<FaWindowClose
					onClick={() => history.push("/")}
					size={32}
					className="close-button"
				/>
			</header>
			{!loading && (
				<Col>
					<Row className="d-flex justify-content-center align-items-center">
						<h1 className="text-center">{currentUser.displayName}</h1>
					</Row>
					<Row className="d-flex justify-content-center align-items-center">
						<StyledButton
							variant="primary"
							onClick={() => {
								logoutUser();
								history.push("/landing");
							}}
						>
							Logout
						</StyledButton>
					</Row>
				</Col>
			)}
		</>
	);
};

export default Profile;
