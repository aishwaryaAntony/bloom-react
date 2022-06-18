import { CREATE_USER_TEST_REGISTRATION, USER_QRCODE,ALERT_DETAIL } from "./actionTypes";
import { ACCOUNTAPI } from "../../api";
import Router, { withRouter } from 'next/router';

export function createUserByForm(self, userObj) {
    return (dispatch) => {
        ACCOUNTAPI.post('form', userObj).then(async (response) => {
            // console.log(`UserObj ==> ${JSON.stringify(response)}`)
            if (response.status === "success") {
                dispatch({
                    type: USER_QRCODE,
                    data: response.payload
                });
                self.setState({is_loading: false})
                let User = typeof localStorage !== "undefined" && localStorage.getItem('user')
                const userObjValues = await JSON.parse(User);   
               if(userObjValues !== null){
                    Router.push({ pathname: '/customer/qr-code' }); 
                    dispatch({ type: ALERT_DETAIL, data: true, message: "You have successfully registered.", severity: "success" })
                }else{
                    Router.push({ pathname: '/qr-code' });
                    dispatch({ type: ALERT_DETAIL, data: true, message: "You have successfully registered.", severity: "success" })
                }

            }
        });
    }
}

export function createUserByFormInPaymentStatus(userObj) {
    return (dispatch) => {
        ACCOUNTAPI.post('form', userObj).then((response) => {
            if (response.status === "success") {
                dispatch({
                    type: USER_QRCODE,
                    data: response.payload
                });
                // Router.push({ pathname: '/customer/qr-code' });
            }
        });
    }
}

export function updatePaymentStatus(sessionId, status){
    return dispatch => {
        let data = {};
        data.payment_status = status;
        ACCOUNTAPI.put(`test-result/${sessionId}`, data).then((response) => {
            
        });
    }
}