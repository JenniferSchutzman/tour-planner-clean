import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import yellow from 'material-ui/colors/yellow';
import red from 'material-ui/colors/red';
import { getTour } from './action-creators/individual-tour';
import { schedule } from './action-creators/schedule';
import { recommendations, allTours } from './action-creators/tours';

const customTheme = createMuiTheme({
	palette: {
		primary: green,
		secondary: yellow,
		error: red,
		contrastThreshold: 3,
		tonalOffset: 0.2
	}
});
ReactDOM.render(
	<MuiThemeProvider theme={customTheme}>
		<Provider store={store}>
			<App />
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root')
);
registerServiceWorker();

store.dispatch(getTour);
store.dispatch(allTours);
store.dispatch(recommendations);
store.dispatch(schedule);
