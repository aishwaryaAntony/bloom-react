import { ACCOUNTAPI } from '../../api'
import Router, { withRouter } from 'next/router'
import { CREATE_APPOINTMENT, ALERT_DETAIL } from './actionTypes';

export function createUserAppointment(userObj, self) {
    return (dispatch) => {
        ACCOUNTAPI.post('acuity-scheduling/make-appointment', userObj).then((response) => {
            if (response.status === "success") {
                // dispatch({
                //     type: CREATE_APPOINTMENT,
                //     data: response.payload
                // });
                // Router.push({ pathname: '/customer/qr-code' });
                dispatch({ type: ALERT_DETAIL, data: true, message: 'Appointment created successfully', severity: "success" })              
                self.setState({ isLoading: false, appointmentId: response.payload.id, disabled: false });
                self.handleChange('panel4');
            }else{
                self.setState({ isLoading: false });
                alert(`${response.message}`);
            }
        });
    }
}

export function deleteUserAppointment(appointmentId, self) {
    return (dispatch) => {
        ACCOUNTAPI.delete(`acuity-scheduling/cancel-appointment/${appointmentId}`).then((response) => {
            if (response.status === "success") {  
                dispatch({ type: ALERT_DETAIL, data: true, message: 'Appointment cancelled successfully', severity: "error" })              
                self.setState({ isLoading: false });
            }else{
                self.setState({ isLoading: false });
            }
        });
    }
}