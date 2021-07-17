import Landing from "./Landing";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";

function App() {
	return (
		<>
			<AuthProvider>
				<Router>
					<Switch>
						<Route exact path="/" component={Landing} />
						<PrivateRoute exact path="/home" component={Home} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
					</Switch>
				</Router>
			</AuthProvider>
		</>
	);
}

export default App;
