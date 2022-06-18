import { ACCOUNT_END_POINT } from "../../helpers/constants";
import { ACCOUNTAPI } from '../../api';
import { ALERT_DETAIL } from "./actionTypes";

export function sendApplePassToWallet(param) {
    return async (dispatch) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "qr_code": param })
        };
        fetch(`${ACCOUNT_END_POINT}${"apple-pass"}`, requestOptions).then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'apple-pass';
                a.click();
            });
        });
    }
}

export function downloadQRCode(param) {
    return async (dispatch) => {
        ACCOUNTAPI.get(`user/qr-code/${param}`).then(response => {
            // response.blob().then(blob => {
            //     let url = window.URL.createObjectURL(blob);
            //     let a = document.createElement('a');
            //     a.href = url;
            //     a.download = 'apple-pass';
            //     a.click();
            // });
        });
    }
}

export function sendQRCodeEmail(data){
    return (dispatch) => {
        ACCOUNTAPI.post(`user/send-qr-code`, data).then(response => {
            if(response.status === "success"){
                dispatch({ type: ALERT_DETAIL, data: true, message: "QR Code sent to your registered email successfully.", severity: "success" })
            }
        });
    }
}

export function sendCustomerQRCodeEmail(self, data){
    return (dispatch) => {
        ACCOUNTAPI.post(`user/send-qr-code`, data).then(response => {
            if(response.status === "success"){
                self.setState({ openAlert: true });
            }
        });
    }
}