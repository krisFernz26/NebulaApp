import { useAuth } from "../context/AuthContext";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
const Home = () => {
	const { logoutUser } = useAuth();
	return (
		<>
			<Navbar fixed="top" expand="md">
				<Navbar.Brand href="/home" style={{ color: "var(--secondary-color)" }}>
					NebulaApp
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#home" style={{ color: "var(--secondary-color)" }}>
							Create System
						</Nav.Link>
						<Nav.Link href="#link" style={{ color: "var(--secondary-color)" }}>
							Profile
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default Home;
