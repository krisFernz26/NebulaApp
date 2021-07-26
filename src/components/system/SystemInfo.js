import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import firestore from "firebase/firestore";
import firebase from "firebase";
import app from "../../firebase";
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

	const deleteSystem = () => {
		var storage = app.storage();
		var storageRef = storage.ref();
		storageRef.child(`images/${id}`).delete();

		db.collection("systems")
			.doc(id)
			.delete()
			.then((_) => history.push("/"))
			.catch((error) => console.error(error));
	};

	const fetchSystem = async () => {
		db.collection("systems")
			.doc(id)
			.get()
			.then((snapshot) => setSystem({ ...system, ...snapshot.data() }))
			.catch((e) => {
				console.error(e);
			});
	};

	useEffect(() => {
		return fetchSystem();
	}, []);

	return (
		<>
			<div className="d-flex justify-content-between">
				<div>
					<FaWindowClose
						onClick={() => history.push("/")}
						size={32}
						className="close-button"
					/>
				</div>
				{system.uid == currentUser.uid ? (
					<div className="mx-2">
						<StyledButton variant="danger" onClick={() => deleteSystem()}>
							Delete System
						</StyledButton>
					</div>
				) : (
					""
				)}
			</div>

			<Row className="g-1">
				<h1 className="text-center system-title">{system.name}</h1>
			</Row>

			{
				// Stars
			}
			<Row className="g-1 mx-auto stars">
				<Row className="g-1">
					<h3 className="text-center">
						Star/s {system.uid == currentUser.uid ? <>(3 max)</> : ""}
					</h3>
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
									<StarCard
										star={star}
										systemId={system.id}
										isCreator={system.uid === currentUser.uid ? true : false}
									/>
								</Col>
							))}
						{currentUser.uid === system.uid && system.stars.length < 4 ? (
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
			<Row className="g-1 mx-auto planets" style={{ marginBottom: "50px" }}>
				<Row className="g-1">
					<h3 className="text-center">Planet/s</h3>
				</Row>
				<Row
					xs={1}
					md={system.planets == [] ? 1 : 3}
					lg={system.planets == [] ? 1 : 5}
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
									systemId={system.id}
									isCreator={system.uid === currentUser.uid ? true : false}
								/>
							</Col>
						))}
					{currentUser.uid === system.uid && system.stars.length > 0 ? (
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
		</>
	);
};

export default SystemInfo;
