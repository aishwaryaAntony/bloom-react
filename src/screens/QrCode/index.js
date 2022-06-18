import React, { Component } from "react";
import { Grid, Typography, Button, Dialog, DialogTitle, DialogActions, DialogContent, InputLabel, FormControlLabel, Checkbox, Autocomplete, TextField, MenuItem, FormControl, Select } from '@mui/material';
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { compose } from "redux";
import QRCode from "react-qr-code";
import Image from 'next/image';
import walletButton from "../../../public/images/wallet.png";
import Logo from "../../../public/images/logo.png";
import ScottsdaleLogo from "../../../public/images/ScottsdaleLogoNew.png"
import { sendApplePassToWallet, downloadQRCode, sendQRCodeEmail } from "../../store/actions/applePass";
import moment from 'moment';
import Router, { withRouter } from 'next/router';
import { ACCOUNT_END_POINT } from "../../helpers/constants";
import CircularProgress from '@mui/material/CircularProgress';
import bloomicon from '../../../public/images/ScottsdaleLogo.jpeg';
const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',        
        flexDirection: "column",
        padding: "20px"
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        marginTop: 30
    },
   
})

class QrCode extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    walletButtonAction = () => {
        this.props.dispatch(sendApplePassToWallet(this.props.userQrCode.qr_code))
    }

    downloadQR = () => {
        if(this.props.userQrCode !== undefined ? this.props.userQrCode.qr_code : ""){
            this.props.dispatch(downloadQRCode(this.props.userQrCode));
        }
    }

    sendEmail = (userObj) => {   
        let data = {};
        data.qrCode = userObj.qr_code;
        data.name = `${userObj.first_name} ${userObj.last_name !== "" ? userObj.last_name : ""}`
        data.email = userObj.email;        
        data.first_name = userObj.first_name;
        data.first_name = userObj.last_name;
        this.props.dispatch(sendQRCodeEmail(data));
    }

    render() {
        const { classes } = this.props;             
        return (
            <div className={classes.root}>
                <Grid container justifyContent="center" >
                  <Grid item xs={12} style={{ marginTop:10}}>
                    <Typography fontWeight="bold" fontSize={15} textAlign="center" fontFamily="Futura-Heavy" color ="#1879BB"  style={{ textTransform: "capitalize" }} >Please present this QR code when you come for your appointment.</Typography> 
                    </Grid>                      
                  <Grid item xs={12} style={{ border: 1, borderRadius: 10, marginTop: "20px" }} >
                        <div style={{ border: 1, display: "flex", flexDirection: "column", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                            <div style={{ display: "flex", backgroundColor: "#345C8C", width: 250, height: 70, }}>
                                <div style={{ width: 150, height: 50, margin: 10 }}>
                                    <Image src={ScottsdaleLogo} />
                                    {/* <Image src={bloomicon} /> */}
                                </div>
                            </div>
                            <div style={{ display: "flex", backgroundColor: "#345C8C", width: 250, height: 380, flexDirection: "column" }}>
                                <div style={{ backgroundColor: "#6892C3", width: 250, height: 50 }}>
                                    <Typography fontWeight={"300"} fontSize={15} fontFamily="Futura-Heavy" color="black" style={{ marginTop: 10, marginLeft: 10 }} > {"BLOOM LABS"} </Typography>
                                    <Typography fontSize={12} fontFamily="Futura-Heavy" color="black" style={{ marginLeft: 10, marginTop: -5 }}> {"accurate, reliable, confidential testing."} </Typography>
                                </div>
                                <div style={{ marginTop: 5, }}>
                                    <Typography fontSize={12} fontFamily="Futura-Heavy" color="#A0B6CF" style={{ marginTop: 5, marginLeft: 10 }} > {"NAME"} </Typography>
                                    <Typography fontSize={15} fontFamily="Futura-Heavy" color="#EFF6FB" style={{ marginLeft: 10 }}> {this.props.userQrCode !== undefined ? this.props.userQrCode.first_name + " " + this.props.userQrCode.last_name : ""} </Typography>
                                </div>
                                <div >
                                    <Typography fontSize={12} fontFamily="Futura-Heavy" color="#A0B6CF" style={{ marginTop: 5, marginLeft: 10 }} > {"DATE OF BIRTH"} </Typography>
                                    <Typography fontSize={15} fontFamily="Futura-Heavy" color="#EFF6FB" style={{ marginLeft: 10, }}> {this.props.userQrCode !== undefined ? moment.utc(this.props.userQrCode.birth_date).format('MM-DD-YYYY') : ""} </Typography>
                                </div>
                                <div >
                                    <Typography fontSize={13} fontFamily="Futura-Heavy" color="#A0B6CF" style={{ marginTop: 5, marginLeft: 10 }} > {"INFORMATION"} </Typography>
                                    <Typography fontSize={15} fontFamily="Futura-Heavy" color="#EFF6FB" style={{ marginLeft: 10, }}> {"Your Personal QR Code"} </Typography>
                                </div>
                                <div style={{ display: "flex", marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                                    <div style={{ display: "flex", width: 150, height: 150, backgroundColor: "white", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
                                    <div style={{ height: 5 }} />
                                        {this.props.userQrCode === undefined ? 
                                        <CircularProgress />
                                        : <QRCode size={100} value={this.props.userQrCode !== undefined ? (this.props.userQrCode.qr_code !== null ? this.props.userQrCode.qr_code : '') : ""} />}
                                        {/* <div style={{height:5}}/> */}
                                        {/* <Typography fontWeight="bold" fontSize={15}  fontFamily="Futura-Heavy" color="#000">{this.props.userQrCode !==undefined ?this.props.userQrCode.last_name:"" }</Typography> */}
                                    </div>
                                    <div style={{ height: 10 }} />
                                </div>
                            </div>
                            <div style={{ height: 40 }} />
                        </div>
                    </Grid>               
                        {/* <Button variant="contained" onClick={() => Router.push({ pathname: '/' })} variant="contained" size={"medium"} style ={{backgroundColor:"#345C8C", width:100, height:30, borderRadius:10}}>
                            <Typography fontWeight="bold" fontSize={13} textAlign="center" fontFamily="Futura-Heavy" color="white" style={{ textTransform: "capitalize" }} >Home</Typography>
                        </Button>   
                        {
                        this.props.userQrCode !== undefined && Object.keys(this.props.userQrCode).length > 0 && this.props.userQrCode.qr_code !== undefined && this.props.userQrCode.qr_code !== null &&
                            <>
                                <div style={{flexDirection: 'column', display: 'flex', alignItems: 'center'}}>
                                    <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                                        <div style={{ flex: "display", justifyContent: "center", alignItems: "center", marginRight: 5 , marginLeft: 5 }} onClick={() => this.walletButtonAction()}>
                                            <Image src={walletButton} width="100" height="30" />
                                        </div>
                                        <Button target="_blank" href={`${ACCOUNT_END_POINT}user/qr-code/${this.props.userQrCode !== undefined ? this.props.userQrCode.qr_code : ""}`} variant="contained" size={"medium"} style ={{backgroundColor:"#345C8C", width:100, height:30, borderRadius:10}}>
                                            <Typography fontWeight="bold" fontSize={10} textAlign="center" fontFamily="Futura-Heavy" color="white" style={{ textTransform: "capitalize" }}>Download QR</Typography>
                                        </Button>
                                    </div>
                                    {
                                        this.props.userQrCode.email !== null &&
                                        <Button onClick={()=> this.sendEmail(this.props.userQrCode)} variant="contained" size={"small"} style ={{backgroundColor:"rgba(26, 137, 23, 0.7)", height:30, borderRadius:10 }}>
                                            Send Email
                                        </Button>
                                    }
                                </div>
                            </>
                        } */}
                        <div style={{flexDirection: 'column', display: 'flex', alignItems: 'center'}}>
                            <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                                <Button variant="contained" onClick={() => Router.push({ pathname: '/' })} variant="contained" size={"medium"} style ={{backgroundColor:"#345C8C", width:100, height:30, borderRadius:10}}>
                                    <Typography fontWeight="bold" fontSize={13} textAlign="center" fontFamily="Futura-Heavy" color="white" style={{ textTransform: "capitalize" }} >Home</Typography>
                                </Button> 
                                {
                                    this.props.userQrCode !== undefined && Object.keys(this.props.userQrCode).length > 0 && this.props.userQrCode.qr_code !== undefined && this.props.userQrCode.qr_code !== null &&
                                    <>
                                        <div style={{ flex: "display", justifyContent: "center", alignItems: "center", marginRight: 5 , marginLeft: 5 }} onClick={() => this.walletButtonAction()}>
                                            <Image src={walletButton} width="100" height="30" />
                                        </div>
                                        <Button target="_blank" href={`${ACCOUNT_END_POINT}user/qr-code/${this.props.userQrCode !== undefined ? this.props.userQrCode.qr_code : ""}`} variant="contained" size={"medium"} style ={{backgroundColor:"#345C8C", width:100, height:30, borderRadius:10}}>
                                            <Typography fontWeight="bold" fontSize={10} textAlign="center" fontFamily="Futura-Heavy" color="white" style={{ textTransform: "capitalize" }}>Download QR</Typography>
                                        </Button>
                                    </>
                                }
                            </div>
                            {
                                this.props.userQrCode !== undefined && Object.keys(this.props.userQrCode).length > 0 && this.props.userQrCode.qr_code !== undefined && this.props.userQrCode.qr_code !== null &&
                                this.props.userQrCode.email !== null &&
                                <Button onClick={()=> this.sendEmail(this.props.userQrCode)} variant="contained" size={"small"} style ={{backgroundColor:"rgba(26, 137, 23, 0.7)", height:30, borderRadius:10 }}>
                                    Send Email
                                </Button>
                            }
                        </div>
                </Grid>
                
                <div style={{ height: 50 }} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userQrCode: state.formReducer.userQrCode,
        user: state.sessionReducer.user
    }
}


QrCode.layout =  'login'
export default compose(withStyles(styles), connect(mapStateToProps))(QrCode);
