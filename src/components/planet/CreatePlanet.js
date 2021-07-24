import { useState, useRef, useEffect } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FaWindowClose } from "react-icons/fa";
import { Link, useHistory, useParams } from "react-router-dom";
import firestore from "firebase/firestore";
import firebase from "firebase";
import app from "../../firebase";
import { StyledButton } from "../StyledButton";
import { Card, Container, Form, Alert, Dropdown } from "react-bootstrap";
import { uuid } from "uuidv4";

const CreatePlanet = () => {
	const history = useHistory();
	const { id } = useParams();
	const [image, setImage] = useState();
	const [previewImage, setPreviewImage] = useState();
	const [imageUrl, setImageUrl] = useState("");
	const alternateNamesRef = useRef();
	const [star, setStar] = useState({});
	const averageOrbitalSpeedRef = useRef();
	const nameRef = useRef();
	const orbitalPeriodRef = useRef();
	const equatorialRadiusRef = useRef();
	const equatorialRotationVelocityRef = useRef();
	const massRef = useRef();
	const averageDensityRef = useRef();
	const surfaceGravityRef = useRef();
	const surfacePressureRef = useRef();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const db = firebase.firestore();
	const generatedId = uuid();
	const [stars, setStars] = useState([]);

	const fetchSystem = async () => {
		await db
			.collection("systems")
			.doc(id)
			.get()
			.then((snapshot) => {
				console.log(snapshot.data().stars);
				setStars(snapshot.data().stars);
			})
			.catch((e) => {
				console.error(e);
			});
	};

	useEffect(() => {
		return fetchSystem();
	}, []);

	const createPlanet = async () => {
		if (!star) {
			return setError("Select a star for your planet");
		}
		if (nameRef.current.value == "") {
			return setError("Enter a name for your planet");
		}

		try {
			setError("");
			setLoading(true);
			if (image) {
				handleUpload();
			} else
				db.collection("systems")
					.doc(id)
					.update({
						planets: firebase.firestore.FieldValue.arrayUnion({
							id: generatedId,
							name: nameRef.current.value,
							img: imageUrl,
							star: star.name,
							alternate_names: alternateNamesRef.current.value.split(","),
							average_orbital_speed: averageOrbitalSpeedRef.current.value,
							orbital_period: orbitalPeriodRef.current.value,
							equatorial_radius: equatorialRadiusRef.current.value,
							mass: massRef.current.value,
							average_density: averageDensityRef.current.value,
							surface_gravity: surfaceGravityRef.current.value,
							equatorial_rotation_velocity:
								equatorialRotationVelocityRef.current.value,
							surface_pressure: surfacePressureRef.current.value,
						}),
					})
					.then((_) => {
						history.push("/systems/" + id);
					})
					.catch((error) => {
						console.error(error);
					});
		} catch {
			setError("Failed to create a planet");
		}
		setLoading(false);
	};

	const handleOnChange = (e) => {
		setImage(e.target.files[0]);
		setPreviewImage(URL.createObjectURL(e.target.files[0]));
		console.log(image);
	};
	const handleUpload = () => {
		let file = image;
		var storage = app.storage();
		var storageRef = storage.ref();
		var uploadTask = storageRef
			.child("images/" + id + "/planets/" + image.name)
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
						setLoading(true);
						db.collection("systems")
							.doc(id)
							.update({
								planets: firebase.firestore.FieldValue.arrayUnion({
									id: generatedId,
									name: nameRef.current.value,
									img: url,
									star: star.name,
									alternate_names: alternateNamesRef.current.value.split(","),
									average_orbital_speed: averageOrbitalSpeedRef.current.value,
									orbital_period: orbitalPeriodRef.current.value,
									equatorial_radius: equatorialRadiusRef.current.value,
									mass: massRef.current.value,
									average_density: averageDensityRef.current.value,
									surface_gravity: surfaceGravityRef.current.value,
									equatorial_rotation_velocity:
										equatorialRotationVelocityRef.current.value,
									surface_pressure: surfacePressureRef.current.value,
								}),
							})
							.then((_) => {
								history.push("/systems/" + id);
							})
							.catch((error) => {
								console.error(error);
							});
					} catch {
						setError("Failed to create a planet");
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
							<Card.Text>Create a Planet</Card.Text>
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
								<Form.Group className="mb-3" controlId="formSun">
									<Form.Label>Star*</Form.Label>
									<Dropdown>
										<Dropdown.Toggle variant="secondary" id="dropdown-basic">
											{star.name}
										</Dropdown.Toggle>

										<Dropdown.Menu>
											{stars.map((star) => {
												return (
													<Dropdown.Item
														onSelect={() => setStar(star)}
														key={star.id}
													>
														{star.name}
													</Dropdown.Item>
												);
											})}
										</Dropdown.Menu>
									</Dropdown>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formName">
									<Form.Label>Name*</Form.Label>
									<Form.Control type="text" placeholder="Earth" ref={nameRef} />
								</Form.Group>
								<Form.Group className="mb-3" controlId="formName">
									<Form.Label>
										Alternate Names (separated by a comma)
									</Form.Label>
									<Form.Control
										type="text"
										placeholder="Gaia, Terra, Tellus, the world, the globe"
										ref={alternateNamesRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formName">
									<Form.Label>Average Orbital Speed</Form.Label>
									<Form.Control
										type="text"
										placeholder="29.78 km/s"
										ref={averageOrbitalSpeedRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formName">
									<Form.Label>Orbital Period</Form.Label>
									<Form.Control
										type="text"
										placeholder="365 days"
										ref={orbitalPeriodRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formName">
									<Form.Label>Equatorial Radius</Form.Label>
									<Form.Control
										type="text"
										placeholder="6,378.137 km"
										ref={equatorialRadiusRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formName">
									<Form.Label>Mass</Form.Label>
									<Form.Control
										type="text"
										placeholder="5.97237 x 10^24 kg"
										ref={massRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formName">
									<Form.Label>Average Density</Form.Label>
									<Form.Control
										type="text"
										placeholder="5.514 g/cu.cm"
										ref={averageDensityRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formName">
									<Form.Label>Surface Gravity</Form.Label>
									<Form.Control
										type="text"
										placeholder="9.80665 m/s^2"
										ref={surfaceGravityRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formName">
									<Form.Label>Equatorial Rotation Velocity</Form.Label>
									<Form.Control
										type="text"
										placeholder="0.4651 km/s"
										ref={equatorialRotationVelocityRef}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formName">
									<Form.Label>Surface Pressure</Form.Label>
									<Form.Control
										type="text"
										placeholder="101.325 kPa"
										ref={surfacePressureRef}
									/>
								</Form.Group>
								<StyledButton
									variant="outline-primary"
									onClick={() => {
										createPlanet();
									}}
								>
									Create Planet
								</StyledButton>
							</Form>
						</Card.Body>
					</Container>
				</Card>
			</Container>
		</>
	);
};

export default CreatePlanet;
