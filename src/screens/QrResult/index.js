import React, { Component } from "react";
import { Grid, Typography, Button, Dialog, IconButton, DialogTitle, DialogActions, DialogContent, TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { compose } from "redux";
import AssignmentIcon from '@mui/icons-material/Assignment';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import dynamic from "next/dynamic";
import CancelIcon from '@mui/icons-material/Cancel';
import Router from 'next/router'
const QrScan = dynamic(() => import('react-qr-reader'), { ssr: false })
import {fetchUserRegisterTest } from "../../store/actions/labTechnician"

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        height: "100vh",
        paddingLeft: "20%",
        paddingRight: "20%",
        flexDirection: "column"
    },
    scanButton: {
        backgroundColor: "#2FA9D7",
        '&:hover': {
            backgroundColor: "#3690CC",
        },
        width: "100%",
        padding: "20px"
    },
    assignButton: {
        backgroundColor: "#F96C6C",
        '&:hover': {
            backgroundColor: "#F7A2A1",
        },
        width: "100%",
        padding: "20px"
    },
    tubeButton: {
        backgroundColor: '#F97C00',
        '&:hover': {
            backgroundColor: "#F76400",
        },
        height: 40
    },
    paper: {
        width: "100%",
        height: "100vh"
    },
    photoContainer: {
        height: "100vh",
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute'
    },
    textContainer: {
        display: 'inline-block',
        position: 'relative',
        textAlign: 'center',
        paddingTop: 5,
        zIndex: 100
    },
    infoText: {
        fontSize: 18,
        paddingTop: 10,
        color: "#fff",
        textAlign: "center",
    },
    dialogTitle: {
        display: "flex",
        backgroundColor: "#39416F",
        flexDirection: "row",
        justifyContent: "center"
    },
    errorText: {
        color: "red",
        fontSize: 14,
        fontFamily: "Futura-Heavy"
    },
})

const CssField = withStyles({
    root: {
        "& .MuiOutlinedInput-input": {
            fontSize: 16,
            color: "#144787",
            fontFamily: "Futura-Heavy"
        },
        "& .MuiInputLabel-root": {
            fontSize: 16,
            fontFamily: "Futura-Heavy"
        },
        "& .MuiInputLabel-outlined": {
            fontSize: 16,
            fontFamily: "Futura-Heavy"
        },
        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
            fontSize: 16,
            fontFamily: "Futura-Heavy"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d4dade"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "#144787"
        },
        "&:hover .MuiInputLabel-root": {
            color: "#4C5C73"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4C5C73"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#144787",

        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#144787",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#144787"
        }
    }
})(TextField);

class QrResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            delay: 300,
            isOpenCamera: false,
            scanResultDialogOpen: false,
            tube_number: "",
            tube_number_error: false
        }
        this.handleScan = this.handleScan.bind(this)
        this.handleAction = this.handleAction.bind(this)
    }

    handleScan = async (data) => {
        if (data !== null) {     
             this.props.dispatch(fetchUserRegisterTest(data))     
        }

    }

    handleError(err) {
        alert(err)
    }
    
    
    handleAction = ()=>{
      this.props.dispatch(fetchUserRegisterTest("MDK8849"))   
    }


  
    

    render() {
        const { classes } = this.props;
        const previewStyle = {
            height: "100vh",
            width: '100%',
            top: '50%',
            left: 0,
            display: "flex",
            overflow: 'hidden',
            objectFit: 'cover',
        }
       let { first_name, last_name, birth_date, email } =  this.props.userInfoAndUserTest !==null && this.props.userInfoAndUserTest.profile

        return (
            <div>
                {!this.state.isOpenCamera ?
                    <div className={classes.root}>
                        <Typography fontWeight="bold" fontSize={25} textAlign="center" fontFamily="Futura-Heavy" color="#144787">Scan QR code to view users information</Typography>
                        <Grid container justifyContent="center" style={{ marginTop: 20 }} spacing={3}>
                            <Grid item>
                                <Button endIcon={<QrCodeScannerIcon style={{ color: "#fff", width: 30, height: 30 }} />} className={classes.scanButton}>
                                    <Typography fontWeight="bold" style={{ textTransform: "capitalize" }} fontSize={18} fontFamily="Futura-Heavy" color="#fff">View Customer</Typography>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button endIcon={<AssignmentIcon style={{ color: "#fff", width: 30, height: 30 }} />} className={classes.assignButton}>
                                    <Typography fontWeight="bold" style={{ textTransform: "capitalize" }} fontSize={18} fontFamily="Futura-Heavy" color="#fff">Assign Test Tube</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                        <Typography>{this.state.tube_number}</Typography>
                    </div> :
                    <div className={classes.paper}>
                        <Grid container justify="center" >
                            <Grid item xs={12} md={6}>
                                <div className={classes.photoContainer}>
                                    <div className={classes.textContainer} onClick={() => this.setState({ isOpenCamera: false })}>
                                        <CancelIcon style={{ color: "#fff", width: 40, height: 40 }} />
                                    </div>
                                    <div style={{ height: "100vh" }}></div>
                                </div>
                                <div>
                                    <QrScan
                                        delay={this.state.delay}
                                        facingMode={'environment'}
                                        style={previewStyle}
                                        onError={this.handleError}
                                        onScan={this.handleScan}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                }                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfoAndUserTest: state.labTechnicianReducer.userInfoAndUserTest
    }
}

QrResult.layout = "login";

export default compose(withStyles(styles), connect(mapStateToProps))(QrResult);
