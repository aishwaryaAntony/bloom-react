import { FETCH_LOCATION, ADD_LOCATION } from "../actions/actionTypes";

const initialState = {
    locations: null,
};
export default function locationReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LOCATION:
            return {
                ...state,
                locations: action.data
            };
        case ADD_LOCATION:
            return {
                ...state,
                locations: [...state.locations, action.data]
            };
        default:
            return state;
    }
};

