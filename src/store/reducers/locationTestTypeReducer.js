import { FETCH_LOCATION_TEST_TYPE, ADD_LOCATION_TEST_TYPE } from "../actions/actionTypes";

const initialState = {
    locationsTestType: [],
};
export default function locationTestTypeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LOCATION_TEST_TYPE:
            return {
                ...state,
                locationsTestType: action.data
            };
        case ADD_LOCATION_TEST_TYPE:
            return {
                ...state,
                locationsTestType: [...state.locationsTestType, action.data]
            };
        default:
            return state;
    }
};