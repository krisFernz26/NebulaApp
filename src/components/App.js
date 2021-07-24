import Landing from "./Landing";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Profile from "./profile/Profile";
import CreateSystem from "./system/CreateSystem";
import EditSystem from "./system/EditSystem";
import CreateStar from "./star/CreateStar";
import EditStar from "./star/EditStar";
import CreatePlanet from "./planet/CreatePlanet";
import EditPlanet from "./planet/EditPlanet";
import SystemInfo from "./system/SystemInfo";

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
						<PrivateRoute
							exact
							path="/systems/:id/edit"
							component={EditSystem}
						/>
						<PrivateRoute exact path="/systems/:id" component={SystemInfo} />
						<PrivateRoute
							exact
							path="/systems/:id/create/star"
							component={CreateStar}
						/>
						<PrivateRoute
							exact
							path="/systems/:id/edit/star/:star_id"
							component={EditStar}
						/>
						<PrivateRoute
							exact
							path="/systems/:id/create/planet"
							component={CreatePlanet}
						/>
						<PrivateRoute
							exact
							path="/systems/:id/edit/planet/:planet_id"
							component={EditPlanet}
						/>
					</Switch>
				</Router>
			</AuthProvider>
		</>
	);
}

export default App;
