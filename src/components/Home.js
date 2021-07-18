import { Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import CustomNavbar from "./CustomNavbar";
import SystemsGrid from "./system/SystemsGrid";
const Home = () => {
	const { logoutUser } = useAuth();
	return (
		<>
			<CustomNavbar />
			<div id="home-text" className="text-center mt-5">
				<h1>Systems</h1>
				<p>Browse these systems created by other users</p>
			</div>
			<SystemsGrid />
		</>
	);
};

export default Home;
