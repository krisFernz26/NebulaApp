import React from "react";
import { CardGroup, Col, Container, Row } from "react-bootstrap";
import SystemCard from "./SystemCard";

const SystemsGrid = () => {
	return (
		<div className="systems-grid">
			<Row xs={1} md={2} lg="auto" className="g-4 mx-auto">
				{Array.from({ length: 10 }).map((_, idx) => (
					<Col>
						<SystemCard />
					</Col>
				))}
			</Row>
		</div>
	);
};

export default SystemsGrid;
