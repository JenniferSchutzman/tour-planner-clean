import {
	SELECTED_INTEREST,
	CHECK_DAY,
	SELECTED_HISTORY,
	SELECTED_HAUNTED,
	SELECTED_CULINARY,
	SELECTED_ADVENTURE,
	MAKE_RESULTS_ARRAY,
	START_OVER,
	SELECTED_EXPERIENCE
} from '../constants';
import {
	map,
	merge,
	compose,
	find,
	flatten,
	tap,
	filter,
	toLower,
	prop,
	concat
} from 'ramda';

const initialState = {
	interests: [
		{
			experienceTypes: [
				{ name: 'Museum', img: '/white_Museum.jpg', selected: null },
				{ name: 'Carriage', img: '/hisCharCarriageTour.jpg', selected: null },
				{ name: 'Walking', img: '/street.png', selected: null }
			],
			name: 'History',
			img:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf5pXiGmew-Qup76YUfafCYyLLIh_BB-pyJqh7wcEVP2YeyKZ83A',
			selected: null
		},
		{
			experienceTypes: [
				{ name: 'Kayak', img: '/kayak.png', selected: null },
				{ name: 'Surf', img: '/surfing_1.jpeg', selected: null },
				{ name: 'Boat', img: '/sunset_sail.jpeg', selected: null }
			],
			name: 'Adventure',
			img: '/surfing_color.jpeg',
			selected: null
		},
		{
			experienceTypes: [
				{ name: 'Food', img: '/food.jpeg', selected: null },
				{ name: 'Drinks', img: '/char_wine.jpeg', selected: null }
			],
			name: 'Culinary',
			img: '/food2.jpeg',
			selected: null
		},
		{
			experienceTypes: [
				{ name: 'Carriage', img: '/haunted_carriage.jpeg', selected: null },
				{ name: 'Walking', img: '/GhostCharTour.jpg', selected: null }
			],
			name: 'Haunted',
			img: '/graveyard2.png',
			selected: null
		}
	],
	dow: [
		{ name: 'Monday', selected: null },
		{ name: 'Tuesday', selected: null },
		{ name: 'Wednesday', selected: null },
		{ name: 'Thursday', selected: null },
		{ name: 'Friday', selected: null },
		{ name: 'Saturday', selected: null },
		{ name: 'Sunday', selected: null }
	]
};

export const stateTracker = (state = initialState, action) => {
	switch (action.type) {
		case SELECTED_EXPERIENCE:
			console.log('action');

			// mark the selected EXPERIENCE to {selected:true}
			const newState = map(
				exp =>
					exp.name === action.payload ? merge(exp, { selected: true }) : exp,
				state.interests
			);
			console.log('newState', newState);
			return merge(state, { experienceTypes: newState });

		// mark the selected INTEREST to {selected:true}
		// const newState = map(
		// 	i => (i.name === action.payload ? merge(i, { selected: true }) : i),
		// 	state.interests
		// );
		// console.log('experiences reducer', newState);
		//
		// return merge(state, { interests: newState });

		case SELECTED_HAUNTED:
			// console.log('haunted reducer', action);
			const newExpHaun = compose(
				map(
					exp =>
						toLower(exp.name) === toLower(action.payload)
							? merge(exp, { selected: true })
							: exp
				),
				prop('experienceTypes'),
				find(x => x.name === 'haunted'),
				map(i => merge(i, { name: toLower(i.name) }))
			)(state.interests);

			return merge(state, { interests: newExpHaun });
		// const finalInterestsWithNewExpHaun = map(
		// 	i =>
		// 		i.name === 'History' || 'Culinary' || 'Adventure' || 'Haunted'
		// 			? merge(i, { experienceTypes: newExpHaun })
		// 			: i,
		// 	state.interests
		// );
		// return merge(state, { interests: finalInterestsWithNewExpHaun });

		case SELECTED_ADVENTURE:
			// console.log('selected_adventure reducer', action);
			const newExpAdv = compose(
				map(
					exp =>
						toLower(exp.name) === toLower(action.payload)
							? merge(exp, { selected: true })
							: exp
				),
				prop('experienceTypes'),
				find(x => x.name === 'adventure'),
				map(i => merge(i, { name: toLower(i.name) }))
			)(state.interests);
			return merge(state, { interests: newExpAdv });
		// const finalInterestsWithNewExpAdv = map(
		// 	i =>
		// 		i.name === 'History' || 'Culinary' || 'Adventure' || 'Haunted'
		// 			? merge(i, { experienceTypes: newExpAdv })
		// 			: i,
		// 	state.interests
		// );
		// return merge(state, { interests: finalInterestsWithNewExpAdv });
		case SELECTED_CULINARY:
			const newExpCul = compose(
				map(
					exp =>
						toLower(exp.name) === toLower(action.payload)
							? merge(exp, { selected: true })
							: exp
				),
				prop('experienceTypes'),
				find(x => x.name === 'culinary'),
				map(i => merge(i, { name: toLower(i.name) }))
			)(state.interests);
			return merge(state, { interests: newExpCul });
		// const finalInterestsWithNewExpCul = map(
		// 	i =>
		// 		i.name === 'History' || 'Culinary' || 'Adventure' || 'Haunted'
		// 			? merge(i, { experienceTypes: newExpCul })
		// 			: i,
		// 	state.interests
		// );
		// return merge(state, { interests: finalInterestsWithNewExpCul });
		case SELECTED_HISTORY:
			// console.log('inside selected_history case', action);
			const newExpHist = compose(
				map(
					exp =>
						toLower(exp.name) === toLower(action.payload)
							? merge(exp, { selected: true })
							: exp
				),
				prop('experienceTypes'),
				find(x => x.name === 'history'),
				map(i => merge(i, { name: toLower(i.name) }))
			)(state.interests);
			console.log('newExp', newExpHist);
			return merge(state, { interests: newExpHist });
		// const finalInterestsWithNewExp = map(
		// 	i =>
		// 		i.name === 'History' || 'Culinary' || 'Adventure' || 'Haunted'
		// 			? merge(i, { experienceTypes: newExp })
		// 			: i,
		// 	state.interests
		// );
		// return merge(state, { interests: finalInterestsWithNewExp });
		case CHECK_DAY:
			console.log('checkDay redcuer');
			let newDow = map(
				day =>
					day.name === action.payload.day
						? { name: day.name, selected: action.payload.checked }
						: day,
				state.dow
			);
			return merge(state, { dow: newDow });
		case MAKE_RESULTS_ARRAY:
			var resultOptions = [];
			const chosenInterest = find(i => i.selected, action.payload.interests);
			const resultOptions1 = concat([chosenInterest.name], resultOptions);
			const chosenExp = find(e => e.selected, action.payload.interests);
			const resultOptions2 = concat([chosenExp.name], resultOptions1);
			const resultOptions = concat([chosenExp.name], resultOptions);
			const chosenDays = find(d => d.selected, action.payload.dow);
			const resultOptionsFINAL = concat([chosenDays.name], resultOptions);
			console.log('state', resultOptionsFINAL);
			return (state = resultOptionsFINAL);
		case START_OVER:
			return initialState;
	}
	return state;
};

export default stateTracker;
