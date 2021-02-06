import {UPDATE_LOCATION} from './actions';

const initialState = {
  location: {
    latitude: 0.0,
    longitude: 0.0,
    timestamp: new Date('1900-01-01'),
  },
};

const rootReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case UPDATE_LOCATION:
      if (state.location === payload) return state;
      return {...state, location: {...state.location, ...payload}};
    default:
      return initialState;
  }
};

export default rootReducer;
