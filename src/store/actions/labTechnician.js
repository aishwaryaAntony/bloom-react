import Router, { withRouter } from 'next/router'
import { USER_INFO_AND_USER_TEST,ALERT_DETAIL } from './actionTypes'
import { ACCOUNTAPI } from '../../api'

export function fetchUserRegisterTest(qrcode) {
    return (dispatch) => {      
        ACCOUNTAPI.get(`user-profile/qr/${qrcode}`).then((response) => {
                 if (response.status === "success") {               
                dispatch({ type: USER_INFO_AND_USER_TEST, data: response.payload });
                Router.push({ pathname: '/lab-technician/user-details', query: "qr_code=" + qrcode})
            }else{
                dispatch({ type: ALERT_DETAIL, data: true, message: "Invalid QRCode", severity: "error" }); 
            }
        });
    }
}

export function assignUserTestTupe(qrcode, data, self) {
    return (dispatch) => {
        ACCOUNTAPI.put(`user-profile/qr/${qrcode}`,data).then((response) => {
            if (response.status === "success") {
                 Router.push({ pathname: '/lab-technician/user-details' }) 
                 dispatch({ type: USER_INFO_AND_USER_TEST, data: response.payload });
                 dispatch({ type: ALERT_DETAIL, data: true, message: "Tube Number Assigned Successfully", severity: "success" });
                 self.setState({isLoading:false})
                }else{
                Router.push({ pathname: '/lab-technician/lab-tech-home'}) 
                dispatch({ type: ALERT_DETAIL, data: true, message: "Tube Number Assigned Successfully", severity: "success" });
                self.setState({isLoading:false})
            }
        });
    }
}
