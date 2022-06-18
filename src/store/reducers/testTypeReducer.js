import {FETCH_TESTTYPE,ADD_TESTTYPE} from "../actions/actionTypes";

const initialState = {
    testType: null,
};

const testTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TESTTYPE:
            return {
                ...state,
                testType: action.data
            };
        case ADD_TESTTYPE:
            return {
                ...state,
                testType: [...state.testType, action.data]
            };
        default:
            return state;
    }
};

export default testTypeReducer;