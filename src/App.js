import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingV2 from './pages/LandingV2/LandingV2';
import './UpdatedSidebar.css';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateSales from './components/PrivateSales/PrivateSales';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import CardDetails from './components/CardDetails/CardDetails';
function App() {
	const allProjects = useSelector((state) => state.launch);
	// projIds.forEach((val) => {
	// 	const launchCard = (
	// 		<Col lg={4} md={6}>
	// 			<Link key={val} to={`/dashboard/projects/${val}`}>
	// 				<Cards projDetails={allProjects[val]} />
	// 			</Link>
	// 		</Col>
	// 	);
	// 	if (allProjects[val].isFinished) completedLaunches.push(launchCard);
	// 	else if (allProjects[val].startTime * 1000 < Date.now())
	// 		liveLaunches.push(launchCard);
	// 	else upcomingLaunches.push(launchCard);
	// });

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
					path="/dashboard/projects/:projectId"
					render={({ match }) =><CardDetails match={match} projDetails={allProjects['booty']} />}
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
