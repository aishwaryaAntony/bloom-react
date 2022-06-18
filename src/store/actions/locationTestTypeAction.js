import { FETCH_LOCATION_TEST_TYPE, ADD_LOCATION_TEST_TYPE, ALERT_DETAIL } from "../actions/actionTypes";
import { TESTAPI } from '../../api'

export function fetchAllLocationTestType() {
    return (dispatch) => {
        TESTAPI.get('location-test-type').then((response) => {
            if (response.status === "success") {
                dispatch({
                    type: FETCH_LOCATION_TEST_TYPE,
                    data: response.payload
                });
            }
        });
    }
}

export function createLocationTestType(self, locationObj) {
    return async (dispatch) => {
        TESTAPI.post('location-test-type', locationObj).then((response) => {
            if (response.status === "success") {
                dispatch(fetchAllLocationTestType())
                dispatch({
                    type: ADD_LOCATION_TEST_TYPE,
                    data: response.payload
                });
                dispatch({
                    type: ALERT_DETAIL,
                    data: true, message: "Location-Test-Type added successfully", severity: "success"
                });
                self.setState({
                    id: null,
                    dialogOpen: false,
                    mode: "",
                    location_id: "",
                    price: "",
                    price_error: false,
                    location_id_error: false,
                    test_type_id: "",
                    test_type_id_error: false,
                    description: '',
                    qr_code: "",
                    qr_code_error: false,
                    status: "ACTIVE",
                    location_test_type_ref: '',
                    location_test_type_ref_error: false,
                    display_name: '',
                    display_name_error: false,
                    rank_order: 0,
                    rank_order_error: false
                })
            }
            else {
                dispatch({ type: ALERT_DETAIL, data: true, message: response.message, severity: "error" })
            }
        });
    }
}

export function updateLocationTestType(self, locationObj, id) {
    return dispatch => {
        TESTAPI.put('location-test-type/' + id, locationObj).then((response) => {
            if (response.status === "success") {
                dispatch(fetchAllLocationTestType());
                dispatch({ type: ALERT_DETAIL, data: true, message: "LocationTestType updated successfully", severity: "success" })
                self.setState({
                    id: null,
                    dialogOpen: false,
                    mode: "",
                    location_id: "",
                    price: "",
                    price_error: false,
                    location_id_error: false,
                    test_type_id: "",
                    test_type_id_error: false,
                    description: '',
                    qr_code: "",
                    qr_code_error: false,
                    status: "ACTIVE",
                    location_test_type_ref: '',
                    location_test_type_ref_error: false
                })
            }
            else {
                dispatch({ type: ALERT_DETAIL, data: true, message: response.message, severity: "error" })
            }

        })
    }
}
