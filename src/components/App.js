import Landing from "./Landing";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Profile from "./profile/Profile";
import CreateSystem from "./system/CreateSystem";

function App() {
	return (
		<>
			<AuthProvider>
				<Router>
					<Switch>
						<PrivateRoute exact path="/" component={Home} />
						<Route exact path="/landing" component={Landing} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<PrivateRoute exact path="/profile" component={Profile} />
						<PrivateRoute
							exact
							path="/systems/create"
							component={CreateSystem}
						/>
					</Switch>
				</Router>
			</AuthProvider>
		</>
	);
}

export default App;
