import React from "react";
import { Col, Row } from "react-bootstrap";
import SystemCard from "./SystemCard";

const SystemsGrid = ({ systems }) => {
	console.log(systems);
	return (
		<div className="systems-grid">
			<Row xs={1} md={2} lg="auto" className="g-4 mx-auto">
				{systems.map((system) => (
					<Col key={system.id}>
						<SystemCard system={system} />
					</Col>
				))}
			</Row>
		</div>
	);
};

export default SystemsGrid;
