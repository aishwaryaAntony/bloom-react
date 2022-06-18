import { FETCH_ALL_USERS, ALERT_DETAIL, CREATE_USER, FETCH_ALL_ROLES, USER_CONTACTS } from "./actionTypes";
import { ACCOUNTAPI } from "../../api";

export function fetchAllInternalUsers() {
    return (dispatch) => {
        ACCOUNTAPI.get("user-profile/internal-users").then((response) => {
            if (response.status === "success") {
                dispatch({
                    type: FETCH_ALL_USERS,
                    data: response.payload
                })
            }
        })
    }
}

export function fetchAllRoles() {
    return (dispatch) => {
        ACCOUNTAPI.get("role").then((response) => {
            if (response.status === "success") {
                dispatch({
                    type: FETCH_ALL_ROLES,
                    data: response.payload
                })
            }
        })
    }
}

export function fetchUserEmail(self, email) {
    return (dispatch) => {
        ACCOUNTAPI.get("user/find-user/" + email).then((response) => {
            // console.log(`Response ==> ${JSON.stringify(response)}`)
            if (response.status === "success") {
                self.setState({
                    first_name: response.payload.first_name,
                    last_name: response.payload.last_name,
                    first_name_error: false,
                    last_name_error: false,
                })
            } else {
                dispatch({ type: ALERT_DETAIL, data: true, message: "User Doesn't Exist", severity: "error" })
            }
        })
    }
}


export function createInternalUser(self, data) {
    return (dispatch) => {
        ACCOUNTAPI.post("user/create-internal-user", data).then((response) => {
            if (response.status === "success") {
                dispatch({
                    type: CREATE_USER,
                    data: response.payload
                })
                self.handleClose()
            }
        })
    }
}

export function fetchAllContactsByUser() {
    return (dispatch) => {
        ACCOUNTAPI.get('user/contacts').then((response) => {
            if (response.status === "success") {
                dispatch({
                    type: USER_CONTACTS,
                    data: response.payload
                });
            }
        });
    }
}

export function deleteInternalUser(self, id) {
    return (dispatch) => {
        ACCOUNTAPI.delete(`user/${id}`).then((response) => {
            if (response.status === "success") {
                dispatch(fetchAllInternalUsers());
            }
        })
    }
}