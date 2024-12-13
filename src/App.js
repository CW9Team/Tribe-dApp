import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingV2 from './pages/LandingV2/LandingV2';
import './UpdatedSidebar.css';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateSales from './components/PrivateSales/PrivateSales';

function App() {
	return (
		<HashRouter>
			<Switch>
				<Route exact path="/">
					<LandingV2 />
				</Route>
				<Route exact strict path="/dashboard" render={() => <Dashboard />} />
				<Route
					exact
					strict
					path="/dashboard/staking"
					render={() => <Dashboard />}
				/>
				<Route
					exact
					strict
					path="/dashboard/projects"
					render={() => <PrivateSales />}
				/>
				<Route
					exact
					strict
					path="/dashboard/celebrity-nfts"
					render={() => <Dashboard />}
				/>
			</Switch>
		</HashRouter>
	);
}

export default App;
