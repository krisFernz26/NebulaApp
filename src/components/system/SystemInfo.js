import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import firestore from "firebase/firestore";
import firebase from "firebase";
import { FaWindowClose } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import StarCard from "../star/StarCard";
import AddCard from "../AddCard";
import SystemsGrid from "./SystemsGrid";
import { useAuth } from "../../context/AuthContext";
import PlanetCard from "../planet/PlanetCard";
import StyledButton from "../StyledButton";

const SystemInfo = () => {
	let { currentUser } = useAuth();
	let { id } = useParams();
	const [system, setSystem] = useState({ id: id });
	const db = firebase.firestore();
	const history = useHistory();

	const fetchSystem = async () => {
		// const response = db.collection("systems").doc(id);
		db.collection("systems")
			.doc(id)
			.get()
			.then((snapshot) => setSystem({ ...system, ...snapshot.data() }))
			.catch((e) => {
				console.error(e);
			});
		// setSystem({ id: id, ...data.data() });
		console.log(system);
	};

	const deleteStar = (selectedStar) => {
		const stars = system.stars;

		const newStars = stars.filter((star) => star !== selectedStar);

		db.collection("systems")
			.doc(system.id)
			.update({
				stars: newStars,
			})
			.then(() => fetchSystem());
	};

	const deletePlanet = (selectedPlanet) => {
		db.collection("systems")
			.doc(system.id)
			.update({
				planets: firebase.firestore.FieldValue.arrayRemove(selectedPlanet),
			})
			.then(() => fetchSystem())
			.catch((e) => console.error(e));
	};

	const deleteSatellite = (selectedSatellite) => {
		const satellites = system.satellites;

		const newSatellites = satellites.filter(
			(satellite) => satellite !== selectedSatellite
		);

		db.collection("systems")
			.doc(system.id)
			.update({
				satellites: newSatellites,
			})
			.then(() => fetchSystem());
	};

	useEffect(() => {
		return fetchSystem();
	}, []);

	return (
		<>
			<header>
				<FaWindowClose
					onClick={() => history.push("/")}
					size={32}
					className="close-button"
				/>
			</header>

			<Row className="g-1">
				<h1 className="text-center system-title">{system.name}</h1>
			</Row>

			{
				// Stars
			}
			<Row className="g-1 mx-auto stars">
				<Row className="g-1">
					<h3 className="text-center">Stars</h3>
				</Row>
				{system.stars != [] ? (
					<Row
						xs={1}
						md={system.stars == [] ? 1 : 3}
						lg={system.stars == [] ? 1 : "auto"}
						className="g-4 mx-auto"
					>
						{system.stars &&
							system.stars.map((star) => (
								<Col
									key={star.id}
									className="mx-auto d-flex justify-content-center align-items-center"
								>
									<StarCard star={star} />
								</Col>
							))}
						{currentUser.uid === system.uid ? (
							<Col className="mx-auto d-flex justify-content-center align-items-center">
								<AddCard
									item="Star"
									onClick={() => {
										history.push(`/systems/${system.id}/create/star`);
									}}
								/>
							</Col>
						) : (
							""
						)}
					</Row>
				) : (
					<Row className="g-1">
						<Col>
							<h3 className="text-center">No Stars</h3>
						</Col>
					</Row>
				)}
			</Row>

			{
				// Planets
			}
			<Row className="g-1 mx-auto planets">
				<Row className="g-1">
					<h3 className="text-center">Planets</h3>
				</Row>
				<Row
					xs={1}
					md={system.planets == [] ? 1 : 3}
					lg={system.planets == [] ? 1 : "auto"}
					className="g-4 mx-auto"
				>
					{system.planets &&
						system.planets.map((planet, idx) => (
							<Col
								key={`${planet.name}-${idx}`}
								className="mx-auto d-flex justify-content-center align-items-center"
							>
								<PlanetCard
									planet={planet}
									onClick={() => deletePlanet(planet)}
								/>
							</Col>
						))}
					{currentUser.uid === system.uid ? (
						<Col className="mx-auto d-flex justify-content-center align-items-center">
							<AddCard
								item="Planet"
								onClick={() => {
									history.push(`/systems/${system.id}/create/planet`);
								}}
							/>
						</Col>
					) : (
						""
					)}
				</Row>
			</Row>

			{
				// Satellites
			}
			<Row className="g-1 mx-auto satellites">
				<Row className="g-1">
					<h3 className="text-center">Satellites</h3>
				</Row>
				{system.satellites != [] ? (
					<Row
						xs={1}
						md={system.satellites == [] ? 1 : 3}
						lg={system.satellites == [] ? 1 : "auto"}
						className="g-4 mx-auto"
					>
						{system.satellites &&
							system.satellites.map((satellite) => (
								<Col
									key={satellite.id}
									className="mx-auto d-flex justify-content-center align-items-center"
								>
									<StarCard star={satellite} />
								</Col>
							))}
						{currentUser.uid === system.uid ? (
							<Col className="mx-auto d-flex justify-content-center align-items-center">
								<AddCard
									item="Satellite"
									onClick={() => {
										history.push(`/systems/${system.id}/create/satellite`);
									}}
								/>
							</Col>
						) : (
							""
						)}
					</Row>
				) : (
					<Row className="g-1">
						<h3 className="text-center">No Stars</h3>
					</Row>
				)}
			</Row>
		</>
	);
};

export default SystemInfo;
