import { ACCOUNTAPI } from '../../api'
import Router, { withRouter } from 'next/router'
import { LOGIN_SUCCESS, LOGOUT, ALERT_DETAIL, USER_QRCODE, VERIFICATION_CODE } from './actionTypes';
import moment from "moment";

export function postLogin(self, data) {
    return dispatch => {
        ACCOUNTAPI.post('user/login', data).then(async (response) => {
            if (response.status === "success") {
                await self.setState({
                    islogin: true,
                })
                dispatch({ type: ALERT_DETAIL, data: true, message: "OTP send to you mobile", severity: "success" });
                self.setState({ isLoading: false });
            }
            else {
                dispatch({ type: ALERT_DETAIL, data: true, message: "Invalid Phone Number", severity: "error" });
                self.setState({ isLoading: false });
            }
        })
    }
}


export function ResendPassword(self, data) {
    return dispatch => {
        ACCOUNTAPI.post('user/resend-verification-code', data).then(async (response) => {
            if (response.status === "success") {
                await self.setState({
                    islogin: true,
                })
                dispatch({ type: ALERT_DETAIL, data: true, message: "OTP send to you mobile", severity: "success" });
                self.setState({ isLoading: false });
            }
            else {
                dispatch({ type: ALERT_DETAIL, data: true, message: "Invalid Phone Number", severity: "error" });
                self.setState({ isLoading: false });
            }
        })
    }
}

export function postInternalUserLogin(self, item) {

    return dispatch => {
        ACCOUNTAPI.post('user/internal-user-login', item).then(async (resp) => {
            if (resp.status === "success") {
                typeof localStorage !== "undefined" && localStorage.setItem('user_token', JSON.stringify(resp.token));
                typeof localStorage !== "undefined" && localStorage.setItem('preferred_login_type', JSON.stringify(resp.login_type));
                ACCOUNTAPI.post('user/validate-token').then((response) => {
                    // console.log(`Account API  --> ${JSON.stringify(response)}`)
                    if (response.status === "success") {
                        typeof localStorage !== "undefined" && localStorage.setItem('user', JSON.stringify(response.payload));
                        dispatch({
                            type: LOGIN_SUCCESS,
                            data: response.payload
                        });

                        let result = {};
                        result.first_name = response.payload.first_name;
                        result.last_name = response.payload.last_name;
                        result.birth_date = response.payload.birth_date;
                        result.qr_code = response.payload.qr_code;
                        result.email = response.payload.email;

                        dispatch({
                            type: USER_QRCODE,
                            data: result
                        });

                        switch (response.payload.userRoles[0].role.code) {
                            case "CSR":
                                Router.push({ pathname: '/customer/user-home' });
                                break;
                            case "ADM":
                                Router.push({ pathname: '/admin/location' });
                                break;
                            case "LBT":
                                Router.push({ pathname: '/lab-technician/lab-tech-home' });
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        dispatch({ type: ALERT_DETAIL, data: true, message: "unauthorized user", severity: "error" });
                    }
                })
            }
            else {
                dispatch({ type: ALERT_DETAIL, data: true, message: "Invalid credentials", severity: "error" });
            }
        })
    }
}

export function otpVerification(self) {
    let item = {}
    // item.country_code = self.state.selectedCountryCode;
    // item.phone = self.state.phone_number.replace(/[()" "-]/g, '');
    item.verification_code = self.state.otp
    if (self.state.login_type === 'EM') {
        item.email = self.state.email;
        // item.date_of_birth = self.state.date_of_birth;
        item.date_of_birth = moment(self.state.date_of_birth, 'MM/DD/YYYY').format('YYYY-MM-DD');
        item.login_type = 'EM';
    } else {
        item.country_code = self.state.selectedCountryCode;
        // item.date_of_birth = self.state.date_of_birth;
        item.date_of_birth = moment(self.state.date_of_birth, 'MM/DD/YYYY').format('YYYY-MM-DD');
        item.phone = self.state.phone_number.replace(/[()" "-]/g, '');
        item.login_type = 'PN';
    }
    return async (dispatch) => {
        ACCOUNTAPI.post('user/verify-authentication-code', item).then((resp) => {
            if (resp.status === "success") {
                typeof localStorage !== "undefined" && localStorage.setItem('user_token', JSON.stringify(resp.token));
                typeof localStorage !== "undefined" && localStorage.setItem('preferred_login_type', JSON.stringify(resp.login_type));
                ACCOUNTAPI.post('user/validate-token').then((response) => {
                    // console.log(`Account API OTP  --> ${JSON.stringify(response)}`)
                    if (response.status === "success") {
                        typeof localStorage !== "undefined" && localStorage.setItem('user', JSON.stringify(response.payload));
                        dispatch({
                            type: LOGIN_SUCCESS,
                            data: response.payload
                        });

                        let result = {};
                        result.first_name = response.payload.first_name;
                        result.last_name = response.payload.last_name;
                        result.birth_date = response.payload.birth_date;
                        result.qr_code = response.payload.qr_code;
                        result.email = response.payload.email;
                        dispatch({
                            type: USER_QRCODE,
                            data: result
                        });

                        switch (response.payload.userRoles[0].role.code) {
                            case "CSR":
                                Router.push({ pathname: '/customer/user-home' });
                                break;
                            case "ADM":
                                Router.push({ pathname: '/admin/location' });
                                break;
                            case "LBT":
                                Router.push({ pathname: '/lab-technician/lab-tech-home' });
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        dispatch({ type: ALERT_DETAIL, data: true, message: "unauthorized user", severity: "error" });
                    }
                })
            }
            else {
                dispatch({ type: ALERT_DETAIL, data: true, message: "Invalid OTP", severity: "error" });

            }
        })

    }

}

export function logout() {
    return async (dispatch) => {
        localStorage.clear();
        // localStorage.removeItem('user_token');
        // localStorage.removeItem('user_role');
        window.location = '/';
        dispatch({
            type: LOGOUT
        });
    }
}

export function authenticate() {
    return async (dispatch) => {
        ACCOUNTAPI.get('user/authenticate').then((resp) => {
            if (resp.status === "success") {
                typeof localStorage !== "undefined" && localStorage.setItem('user_token', JSON.stringify(resp.token));
                typeof localStorage !== "undefined" && localStorage.setItem('preferred_login_type', JSON.stringify(resp.login_type));
                ACCOUNTAPI.post('user/validate-token').then((response) => {
                    if (response.status === "success") {
                        typeof localStorage !== "undefined" && localStorage.setItem('user', JSON.stringify(response.payload));
                        dispatch({
                            type: LOGIN_SUCCESS,
                            data: response.payload
                        });

                        let result = {};
                        result.first_name = response.payload.first_name;
                        result.last_name = response.payload.last_name;
                        result.birth_date = response.payload.birth_date;
                        result.qr_code = response.payload.qr_code;
                        result.email = response.payload.email;
                        dispatch({
                            type: USER_QRCODE,
                            data: result
                        });

                        // switch (response.payload.userRoles[0].role.code) {
                        //     case "CSR":
                        //         Router.push({ pathname: '/customer/user-home' });
                        //         break;
                        //     case "ADM":
                        //         Router.push({ pathname: '/admin/location' });
                        //         break;
                        //     case "LBT":
                        //         Router.push({ pathname: '/lab-technician/lab-tech-home' });
                        //         break;
                        //     default:
                        //         break;
                        // }
                    } else {
                        dispatch({ type: ALERT_DETAIL, data: true, message: "unauthorized user", severity: "error" });
                    }
                });

            } else {
                localStorage.clear();
                window.location = '/';
            }
        }).catch((e) => {
            localStorage.clear();
            window.location = '/';
        });
    };
}

export function unauthenticate() {
    return (dispatch) => {
        localStorage.clear();
        window.location = '/';
    }
}


export function sendOtp(self, data) {
    return (dispatch) => {
        ACCOUNTAPI.post("verify-phone", data).then((response) => {
            if (response.status === "success") {
                self.setState({ verify_otp: "OTP",invalid_verification_code_error:false })
                dispatch({
                    type: VERIFICATION_CODE,
                    data: response.payload
                })
            }
        })
    }
}

export function sendEmailOtp(self, data) {
    return (dispatch) => {
        ACCOUNTAPI.post("verify-email", data).then((response) => {
            if (response.status === "success") {
                self.setState({ verify_email_otp: "OTP",invalid_verification_code_error:false })
                dispatch({
                    type: VERIFICATION_CODE,
                    data: response.payload
                })
            }
        })
    }
}

export function resetPassword(data) {
    return (dispatch) => {
        ACCOUNTAPI.post("user/reset-password", data).then((response) => {
            if (response.status === "success") {
                dispatch({ type: ALERT_DETAIL, data: true, message: "Password changed successfully", severity: "success" });
                Router.push({ pathname: '/internal_user_login' });
            }
        })
    }
}


export function forgotPassword(data) {
    return (dispatch) => {
        ACCOUNTAPI.post("user/forgot-password", data).then((response) => {
            if (response.status === "success") {
                dispatch({ type: ALERT_DETAIL, data: true, message: "Password reset link send to your mail", severity: "success" });
            }
        })
    }
}


export function fetchUserAppointment(self, id) {
    return (dispatch) => {
        ACCOUNTAPI.get("user-appointment/" + id).then((response) => {
            if (response.status === "success") {
                let filterLocationTestTypeById = self.props.locationsTestType !== undefined && self.props.locationsTestType !== null && self.props.locationsTestType.length > 0 && self.props.locationsTestType.filter((item) => item.id === response.payload.location_test_type_id && item.status === 'ACTIVE')
                    .map((item) => ({ name: item.testType.display_name !== null ? item.testType.display_name : item.testType.name, price: item.price, is_insurance_test: item.is_insurance_test, location_test_type_ref: item.location_test_type_ref, rank_order: item.rank_order !== null ? item.rank_order : 0, id: item.id, is_paid_type: item.is_paid_type, test_type: item.testType, location_id: item.location_id, location_name: item.location.name }))

                let isPaid = filterLocationTestTypeById !== false && filterLocationTestTypeById.length > 0 ? filterLocationTestTypeById[0].is_paid_type === true : false;

                self.setState({
                    first_name: response.payload.first_name,
                    last_name: response.payload.last_name,
                    phone_number: response.payload.phone_number,
                    selectedCountryCode: response.payload.country_code,
                    email: response.payload.email,
                    location_id: response.payload.location_id,
                    selectedTags: filterLocationTestTypeById === false ? [] : filterLocationTestTypeById,
                    description: filterLocationTestTypeById !== false  && filterLocationTestTypeById.length > 0 ? filterLocationTestTypeById[0].test_type.description : "",
                    disabled: true,
                    isPaid: isPaid,
                    accuityId: id
                })
            }
            else {
                dispatch({ type: ALERT_DETAIL, data: true, message: response.message, severity: "error" });
                Router.push({ pathname: '/' });
            }
        })
    }
}