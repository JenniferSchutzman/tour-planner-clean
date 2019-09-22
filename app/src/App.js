import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import './App.css';
import Interests from './pages/interests/index';
import IndividualTour from './pages/recommendations/tour';
import Recommendations from './pages/recommendations/list';
import AllTours from './pages/recommendations/alltours';
import Schedule from './pages/schedule/index';
import Experiences from './pages/experience-type/Experiences.js';

if (typeof window !== 'undefined') {
	window.React = React;
}

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/tours" component={AllTours} />
						<Route path="/interests/Haunted" component={Experiences} />
						<Route path="/interests/Culinary" component={Experiences} />
						<Route path="/interests/History" component={Experiences} />
						<Route path="/interests/Adventure" component={Experiences} />
						<Route path="/interests" component={Interests} />
						<Route path="/schedule" component={Schedule} />
						<Route path="/recommendations/:id" component={IndividualTour} />
						<Route path="/recommendations" component={Recommendations} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
