import { FETCH_TESTTYPE, ADD_TESTTYPE,ALERT_DETAIL } from "../actions/actionTypes";
import TESTAPI from "../../api/testApi";

export function fetchAllTestType() {
    return (dispatch) => {
        TESTAPI.get('test-type').then((response) => {
            if (response.status === "success") {
                dispatch({
                    type: FETCH_TESTTYPE,
                    data: response.payload
                });
            }
        });
    }
}

export function createTestType(self, testTypeObj) {
    return async (dispatch) => {
        TESTAPI.post('test-type', testTypeObj).then((response) => {
            if (response.status === "success") {
                dispatch(fetchAllTestType())
                dispatch({
                    type: ALERT_DETAIL,
                    data: true, message: "TestType added successfully", severity: "success"
                });
                dispatch({
                    type: ADD_TESTTYPE,
                    data: response.payload
                });
                self.setState({
                    id: null,
                    dialogOpen: false,
                    mode: "",
                    code: "",
                    code_error: false,
                    name: "",
                    name_error: false,
                    description: "",
                    status: "ACTIVE",
                    display_name: '',
                    display_name_error: false
                })
            }
            else {
                dispatch({ type: ALERT_DETAIL, data: true, message: response.message, severity: "error" })
            }
        });
    }
}
export function updateTestType(self, locationObj, id) {
    return dispatch => {
        TESTAPI.put('test-type/' + id, locationObj).then((response) => {
            if (response.status === "success") {
                dispatch(fetchAllTestType());
                dispatch({ type: ALERT_DETAIL, data: true, message: "TestType updated successfully", severity: "success" })
                self.setState({
                    id: null,
                    dialogOpen: false,
                    mode: "",
                    code: "",
                    code_error: false,
                    name: "",
                    name_error: false,
                    status: "ACTIVE",
                    display_name: '',
                    display_name_error: false
                })
            }
            else {
                dispatch({ type: ALERT_DETAIL, data: true, message: response.message, severity: "error" })
            }

        })
    }
}