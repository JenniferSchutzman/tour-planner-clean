import {
	SELECTED_INTEREST,
	CHECK_DAY,
	SELECTED_HISTORY,
	SELECTED_HAUNTED,
	SELECTED_CULINARY,
	SELECTED_ADVENTURE,
	MAKE_RESULTS_ARRAY,
	START_OVER
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
		case SELECTED_INTEREST:
			const newState = map(
				i => (i.name === action.payload ? merge(i, { selected: true }) : i),
				state.interests
			);
			return merge(state, { interests: newState });

		case SELECTED_HAUNTED:
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

			const finalInterestsWithNewExpHaun = map(
				i =>
					i.name === 'History' || 'Culinary' || 'Adventure' || 'Haunted'
						? merge(i, { experienceTypes: newExpHaun })
						: i,
				state.interests
			);
			return merge(state, { interests: finalInterestsWithNewExpHaun });

		case SELECTED_ADVENTURE:
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

			const finalInterestsWithNewExpAdv = map(
				i =>
					i.name === 'History' || 'Culinary' || 'Adventure' || 'Haunted'
						? merge(i, { experienceTypes: newExpAdv })
						: i,
				state.interests
			);
			return merge(state, { interests: finalInterestsWithNewExpAdv });
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
			const finalInterestsWithNewExpCul = map(
				i =>
					i.name === 'History' || 'Culinary' || 'Adventure' || 'Haunted'
						? merge(i, { experienceTypes: newExpCul })
						: i,
				state.interests
			);
			return merge(state, { interests: finalInterestsWithNewExpCul });
		case SELECTED_HISTORY:
			const newExp = compose(
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
			const finalInterestsWithNewExp = map(
				i =>
					i.name === 'History' || 'Culinary' || 'Adventure' || 'Haunted'
						? merge(i, { experienceTypes: newExp })
						: i,
				state.interests
			);
			return merge(state, { interests: finalInterestsWithNewExp });
		case CHECK_DAY:
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
			const chosenExp = find(e => e.selected, chosenInterest.experienceTypes);
			const resultOptions2 = concat([chosenExp.name], resultOptions1);
			const chosenDays = find(d => d.selected, action.payload.dow);
			const resultOptionsFINAL = concat([chosenDays.name], resultOptions2);
			return (state = resultOptionsFINAL);
		case START_OVER:
			return initialState;
	}
	return state;
};

export default stateTracker;
