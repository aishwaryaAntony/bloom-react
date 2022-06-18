import { FETCH_ALL_TEST_RESULTS, FETCH_ALL_TEST_RESULT_PAYMENTS } from "../actions/actionTypes";
import ACCOUNTAPI from "../../api/accountApi";

export function fetchAllTestResultByUser(self) {
    return (dispatch) => {
        ACCOUNTAPI.get('test/results').then((response) => {
            if (response.status === "success") {
                dispatch({
                    type: FETCH_ALL_TEST_RESULTS,
                    data: response.payload
                });
            }
            self.setState({ isLoading: false });
        });
    }
}

export function fetchAllTestResultPayments(self) {
    return (dispatch) => {
        ACCOUNTAPI.get('test-result').then((response) => {
            // console.log(`Resp ==> ${JSON.stringify(response)}`)
            if (response.status === "success") {
                dispatch({
                    type: FETCH_ALL_TEST_RESULT_PAYMENTS,
                    data: response.payload
                });
            }
            self.setState({ isLoading: false });
        });
    }
}