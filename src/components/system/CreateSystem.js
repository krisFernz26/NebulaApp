import { useState, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Card, Container, Form, Alert } from "react-bootstrap";
import { BiImageAdd } from "react-icons/bi";
import { FaWindowClose } from "react-icons/fa";
import { StyledButton } from "../StyledButton";
import firestore from "firebase/firestore";
import firebase from "firebase";
import app from "../../firebase";
import { useAuth } from "../../context/AuthContext";

const CreateSystem = () => {
	const history = useHistory();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const db = firebase.firestore();
	let { currentUser } = useAuth();

	const [image, setImage] = useState();
	const [previewImage, setPreviewImage] = useState();
	const [imageUrl, setImageUrl] = useState("");

	const nameRef = useRef();
	const ageRef = useRef();

	const createSystem = () => {
		if (nameRef.current.value == "") {
			return setError("Enter a name for your star");
		}

		try {
			setError("");
			setLoading(true);
			if (image) {
				handleUpload();
			} else {
				db.collection("systems")
					.add({
						img: imageUrl,
						name: nameRef.current.value,
						age: ageRef.current.value,
						stars: [],
						planets: [],
						uid: currentUser.uid,
					})
					.then((docRef) => {
						history.push("/systems/" + docRef.id);
					});
			}
		} catch {
			setError("Failed to create a system");
			window.scrollTo(0, 0);
		}
		setLoading(false);
	};

	const handleOnChange = (e) => {
		setImage(e.target.files[0]);
		setPreviewImage(URL.createObjectURL(e.target.files[0]));
	};

	const handleUpload = () => {
		let file = image;
		var storage = app.storage();
		var storageRef = storage.ref();
		var uploadTask = storageRef
			.child("images/" + nameRef.current.value + "/" + image.name)
			.put(file);

		uploadTask.on(
			firebase.storage.TaskEvent.STATE_CHANGED,
			(snapshot) => {
				var progress =
					Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => {
				throw error;
			},
			() => {
				uploadTask.snapshot.ref.getDownloadURL().then((url) => {
					setImageUrl(url);
					try {
						setError("");
						db.collection("systems")
							.add({
								img: url,
								name: nameRef.current.value,
								age: ageRef.current.value,
								stars: [],
								planets: [],
								uid: currentUser.uid,
							})
							.then((docRef) => {
								history.push("/systems/" + docRef.id);
							});
					} catch {
						setError("Failed to create a star");
						window.scrollTo(0, 0);
					}
				});
			}
		);
	};

	return (
		<>
			<header>
				<FaWindowClose
					onClick={() => history.push("/")}
					size={32}
					className="close-button"
				/>
			</header>
			<Container
				style={{
					marginTop: "20vh",
					marginBottom: "20px",
				}}
			>
				<Card
					className="text-center"
					style={{
						width: "50vw",
						backgroundColor: "#1f2029",
						boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.3)",
						borderRadius: "10px",
						paddingTop: "50px",
						paddingBottom: "15px",
					}}
				>
					<Container>
						<Card.Body>
							<Card.Title>NebulaApp</Card.Title>
							<Card.Text>Create a System</Card.Text>
							{error != undefined && error != "" ? (
								<Alert variant="danger">
									<p>{error}</p>
								</Alert>
							) : (
								""
							)}
							<Form>
								<Form.Group className="mb-3" controlId="formPic">
									<label htmlFor="profile-picker">
										<div className="image-preview-div">
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
											onChange={handleOnChange}
										/>
									</label>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formName">
									<Form.Label>Name*</Form.Label>
									<Form.Control
										type="text"
										placeholder="Solar System"
										ref={nameRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formAge">
									<Form.Label>Age</Form.Label>
									<Form.Control
										type="text"
										placeholder="4.6 Billion Years Old"
										ref={ageRef}
									/>
								</Form.Group>

								<StyledButton
									variant="outline-primary"
									onClick={() => {
										createSystem();
									}}
								>
									Create System
								</StyledButton>
							</Form>
						</Card.Body>
					</Container>
				</Card>
			</Container>
		</>
	);
};

export default CreateSystem;
