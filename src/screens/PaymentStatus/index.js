import React, { Component } from "react";
import { Grid, Typography, Button, Dialog, DialogTitle, DialogActions, DialogContent, InputLabel, FormControlLabel, Checkbox, Autocomplete, TextField, MenuItem, FormControl, Select, Input } from '@mui/material';
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { compose } from "redux";
import { createUserByFormInPaymentStatus, updatePaymentStatus } from "../../store/actions/formAction";
import Image from 'next/image';
import Router, { withRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { ACCOUNTAPI } from "../../api";

const styles = theme => ({
    body: {
        textAlign: "center",
        padding: "40px 0",
        background: "#EBF0F5"
    },
    h1: {
        color: " #88B04B",
        // font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
        fontWeight: 900,
        fontSize: "40px",
        marginBottom: "10px"
    },
    h1red: {
        color: " #c4422b",
        // font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
        fontWeight: 900,
        fontSize: "40px",
        marginBottom: "10px"
    },
    p: {
        color: "#404F5E",
        // font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
        fontSize: "20px",
        margin: 0,
    },
    i: {
        color: "#9ABC66",
        fontSize: "100px",
        lineHeight: "200px",
        marginLeft: "-15px",
    },
    card: {
        background: "white",
        padding: "60px",
        borderRadius: "4px",
        boxShadow: "0 2px 3px #C8D0D8",
        display: "inline-block",
        margin: "0 auto",
    },
    checkmark: {
        color: "#9ABC66",
        fontSize: "100px",
        lineHeight: "200px",
        marginLeft: "-15px",
    }
});

class PaymentStatus extends Component {
    constructor() {
        super();
        this.state = {
            paymentStatus: null,
            userObjValues: null

        }
    }

    async componentDidMount() {
        // let savedTestRegistrations = typeof localStorage !== "undefined" && JSON.parse(localStorage.getItem('savedTestRegistrations'));
        const query = new URLSearchParams(window.location.search);
        let session_id = query.get('session_id');
        this.props.dispatch(updatePaymentStatus(session_id, 'PAYMENT SUCCESSFUL'));
        // console.log(`Saved Test --> ${JSON.stringify(savedTestRegistrations)}`)
        // console.log(`query.get('success') --> ${query.get('success')} --> ${session_id}`)
        // console.log(`${savedTestRegistrations !== null && savedTestRegistrations[session_id] !== undefined}`)
        if (query.get('success')) {
            if (session_id !== undefined && session_id !== null && session_id !== "undefined") {
                /*
                if (savedTestRegistrations !== null && savedTestRegistrations[session_id] !== undefined) {
                    let fetchObj = savedTestRegistrations[session_id];
                    fetchObj.isPaid = true;
                    fetchObj.session_id = session_id;
                    this.props.dispatch(createUserByFormInPaymentStatus(fetchObj));
                    localStorage.removeItem('savedTestRegistrations');
                    this.setState({ paymentStatus: 'SUCCESS' });
                }
                */

                ACCOUNTAPI.get(`test-result/saved-form/${session_id}`).then((response) => {
                    // console.log(`Goint to submit test form`)
                    if(response.status === 'success'){
                        let fetchObj = response.payload.data;
                        fetchObj.isPaid = true;
                        fetchObj.session_id = session_id;
                        this.props.dispatch(createUserByFormInPaymentStatus(fetchObj));                        
                        this.setState({ paymentStatus: 'SUCCESS' });
                        localStorage.removeItem('savedTestRegistrations');
                    }
                });
            }
            let User = typeof localStorage !== "undefined" && localStorage.getItem('user')
            const userObjValue = await JSON.parse(User);
            // console.log(`\nUser -> ${userObjValue}`)
            this.setState({ userObjValues: userObjValue })
        }
        if (query.get('canceled')) {
            // removing the key assuming one user will do at a time
            if (typeof localStorage !== "undefined") {
                if (session_id !== undefined && session_id !== "undefined" && session_id !== null) {
                    this.props.dispatch(updatePaymentStatus(session_id, 'PAYMENT FAILED'));
                    localStorage.removeItem('savedTestRegistrations');
                }
            }
            this.setState({ paymentStatus: 'CANCELLED' });
        }
    }

    handleClick = async () => {
        let isLogin = typeof localStorage !== "undefined" && localStorage.getItem('user');
        Router.push({ pathname: isLogin === null || isLogin === undefined ? '/qr-code' : '/customer/qr-code' });
    }

    clickDoneButton = () => {
        Router.push({ pathname: '/' });
    }


    render() {
        const { classes } = this.props;
        const { paymentStatus } = this.state;
        return (
            <div className={classes.body}>
                {
                    paymentStatus !== null && paymentStatus === 'CANCELLED'
                        ? <div className={classes.card}>
                            <div style={{ borderRadius: "200px", height: "200px", width: "200px", background: "#F8FAF5", margin: "0 auto" }}>
                                <i className={classes.checkmark}>❌</i>
                            </div>
                            <h1 className={classes.h1red}>Failed</h1>
                            <p className={classes.p}>You have cancelled your payment!!</p>
                        </div>
                        : <div className={classes.card}>
                            <div style={{ borderRadius: "200px", height: "200px", width: "200px", background: "#F8FAF5", margin: "0 auto" }}>
                                <i className={classes.checkmark}>✓</i>
                            </div>
                            <h1 className={classes.h1}>Success</h1>
                            <p className={classes.p}>You have made the payment successfully!!</p>
                            {/* {this.state.userObjValues === null ?
                                <Button style={{ margin: 40 }} variant="contained" className={classes.captureButton} onClick={() => this.clickDoneButton()}>
                                    <Typography fontWeight="bold" style={{ textTransform: "capitalize" }} fontSize={16} fontFamily="Futura-Heavy" color="#fff">Done</Typography>
                                </Button>
                                : */}
                                <Button style={{ margin: 40 }} variant="contained" className={classes.captureButton} onClick={() => this.handleClick()}>
                                    <Typography fontWeight="bold" style={{ textTransform: "capitalize" }} fontSize={16} fontFamily="Futura-Heavy" color="#fff">View QR Code</Typography>
                                </Button>
                            {/* } */}
                        </div>
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        savedTests: state.formReducer.savedTests,
        user: state.sessionReducer.user
    }
}


let isLogin = typeof localStorage !== "undefined" && localStorage.getItem('user');
PaymentStatus.layout = isLogin === null || isLogin === undefined ? 'login' : "default";

export default compose(withStyles(styles), connect(mapStateToProps))(PaymentStatus);