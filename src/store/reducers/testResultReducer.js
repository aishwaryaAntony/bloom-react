import { FETCH_ALL_TEST_RESULTS, FETCH_ALL_TEST_RESULT_PAYMENTS } from "../actions/actionTypes";

const initialState = {
    testResults: [],
    testResultPayments: []
};

const testResultReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_TEST_RESULTS:
            return {
                ...state,
                testResults: action.data
            };
        case FETCH_ALL_TEST_RESULT_PAYMENTS:
            return {
                ...state,
                testResultPayments: action.data
            }
        default:
            return state;
    }
};

export default testResultReducer;