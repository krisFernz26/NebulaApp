import { useState, useRef } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FaWindowClose } from "react-icons/fa";
import { Link, useHistory, useParams } from "react-router-dom";
import firestore from "firebase/firestore";
import firebase from "firebase";
import app from "../../firebase";
import { StyledButton } from "../StyledButton";
import { Card, Container, Form, Alert } from "react-bootstrap";
import { uuid } from "uuidv4";

const CreateStar = () => {
	const history = useHistory();
	const { id } = useParams();
	const [image, setImage] = useState();
	const [previewImage, setPreviewImage] = useState();
	const generatedId = uuid();
	const ageRef = useRef();
	const alternateNamesRef = useRef();
	const averageDensityRef = useRef();
	const equatorialRadiusRef = useRef();
	const equatorialsurfaceGravityRef = useRef();
	const [imageUrl, setImageUrl] = useState("");
	const massRef = useRef();
	const nameRef = useRef();
	const rotationVelocityRef = useRef();
	const surfaceAreaRef = useRef();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const db = firebase.firestore();

	const createStar = () => {
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
					.doc(id)
					.update({
						stars: firebase.firestore.FieldValue.arrayUnion({
							id: generatedId,
							age: ageRef.current.value,
							name: nameRef.current.value,
							img: imageUrl,
							alternate_names: alternateNamesRef.current.value.split(","),
							equatorial_radius: equatorialRadiusRef.current.value,
							mass: massRef.current.value,
							average_density: averageDensityRef.current.value,
							equatorial_surface_gravity:
								equatorialsurfaceGravityRef.current.value,
							rotation_velocity: rotationVelocityRef.current.value,
							surface_area: surfaceAreaRef.current.value,
						}),
					})
					.then((_) => {
						history.push("/systems/" + id);
					});
			}
		} catch {
			setError("Failed to create a star");
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
			.child(
				"images/" + id + "/stars/" + nameRef.current.value + "/" + image.name
			)
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
							.doc(id)
							.update({
								stars: firebase.firestore.FieldValue.arrayUnion({
									id: generatedId,
									age: ageRef.current.value,
									name: nameRef.current.value,
									img: url,
									alternate_names: alternateNamesRef.current.value.split(","),
									equatorial_radius: equatorialRadiusRef.current.value,
									mass: massRef.current.value,
									average_density: averageDensityRef.current.value,
									equatorial_surface_gravity:
										equatorialsurfaceGravityRef.current.value,
									rotation_velocity: rotationVelocityRef.current.value,
									surface_area: surfaceAreaRef.current.value,
								}),
							})
							.then((_) => {
								history.push("/systems/" + id);
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
					onClick={() => history.push("/systems/" + id)}
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
							<Card.Text>Create a Star</Card.Text>
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
									<Form.Control type="text" placeholder="Sun" ref={nameRef} />
								</Form.Group>
								<Form.Group className="mb-3" controlId="formAge">
									<Form.Label>Age</Form.Label>
									<Form.Control
										type="text"
										placeholder="4.6 Billion Years Old"
										ref={ageRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formAlternateNames">
									<Form.Label>
										Alternate Names (separated by a comma)
									</Form.Label>
									<Form.Control
										type="text"
										placeholder="Sol, Helios"
										ref={alternateNamesRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formAverageDensity">
									<Form.Label>Average Density</Form.Label>
									<Form.Control
										type="text"
										placeholder="1.408 g/cu.cm"
										ref={averageDensityRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formEquatorialRadius">
									<Form.Label>Equatorial Radius</Form.Label>
									<Form.Control
										type="text"
										placeholder="109 x Earth"
										ref={equatorialRadiusRef}
									/>
								</Form.Group>
								<Form.Group
									className="mb-3"
									controlId="formEquatorialSurfaceGravity"
								>
									<Form.Label>Equatorial Surface Gravity</Form.Label>
									<Form.Control
										type="text"
										placeholder="28 x Earth"
										ref={equatorialsurfaceGravityRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formMass">
									<Form.Label>Mass</Form.Label>
									<Form.Control
										type="text"
										placeholder="333,000 Earths"
										ref={massRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formSurfaceArea">
									<Form.Label>Surface Area</Form.Label>
									<Form.Control
										type="text"
										placeholder="12,000 x Earth"
										ref={surfaceAreaRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formRotationVelocity">
									<Form.Label>Rotation Velocity</Form.Label>
									<Form.Control
										type="text"
										placeholder="7,189 km/hr"
										ref={rotationVelocityRef}
									/>
								</Form.Group>
								<StyledButton
									variant="outline-primary"
									onClick={() => {
										createStar();
									}}
								>
									Create Star
								</StyledButton>
							</Form>
						</Card.Body>
					</Container>
				</Card>
			</Container>
		</>
	);
};

export default CreateStar;
