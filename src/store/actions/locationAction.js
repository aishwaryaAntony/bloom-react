import { FETCH_LOCATION, ADD_LOCATION,ALERT_DETAIL } from "../actions/actionTypes";
import { TESTAPI } from '../../api';

export function fetchAllLocation() {
    return (dispatch) => {
        TESTAPI.get('location').then((response) => {
            if (response.status === "success") {
                dispatch({
                    type: FETCH_LOCATION,
                    data: response.payload
                });
            }
        });
    }
}

export function createLocation(self, locationObj) {
    return async (dispatch) => {
        TESTAPI.post('location', locationObj).then((response) => {
            if (response.status === "success") {
                dispatch({
                    type: ALERT_DETAIL,
                    data: true,message: "location added successfully", severity: "success" 
                });  
                dispatch(fetchAllLocation())
                dispatch({
                    type: ADD_LOCATION,
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
                    street_address_line1: "",
                    street_address_line1_error: false,
                    street_address_line2: "",
                    street_address_line2_error: false,
                    city: "",
                    city_error: false,
                    state: "",
                    state_error: false,
                    country: "",
                    country_error: false,
                    zipcode: "",
                    zipcode_error: false,
                    phone: "",
                    phone_error: false,
                    status: "ACTIVE"
                })
            }
            else {
                dispatch({ type: ALERT_DETAIL, data: true, message: response.message, severity: "error" })
            }
        });
    }
}
export function updateLocation(self, locationObj, id) {
    return dispatch => {
        TESTAPI.put('location/' + id, locationObj).then((response) => {
            if (response.status === "success") {
                dispatch(fetchAllLocation());
                dispatch({ type: ALERT_DETAIL, data: true, message: "Location updated successfully", severity: "success" })
                self.setState({
                    id: null,
                    dialogOpen: false,
                    mode: "",
                    code: "",
                    code_error: false,
                    name: "",
                    name_error: false,
                    street_address_line1: "",
                    street_address_line1_error: false,
                    street_address_line2: "",
                    street_address_line2_error: false,
                    city: "",
                    city_error: false,
                    state: "",
                    state_error: false,
                    country: "",
                    country_error: false,
                    zipcode: "",
                    zipcode_error: false,
                    phone: "",
                    phone_error: false,
                    status: "ACTIVE"
                })
            }
            else {
                dispatch({ type: ALERT_DETAIL, data: true, message: response.message, severity: "error" })
            }

        })
    }
}


