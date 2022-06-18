import React, { Component } from "react";
import { Grid, Typography, Button, TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { compose } from "redux";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import dynamic from "next/dynamic";
import CancelIcon from '@mui/icons-material/Cancel';
const BarcodeScannerComponent = dynamic(
    () => import('react-qr-barcode-scanner'),
    { ssr: false }
)
import { fetchUserRegisterTest } from "../../store/actions/labTechnician"



const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        height: "80vh",
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
        height: "100vh",
        display: "flex",
        alignItems: "center",
    },
    photoContainer: {       
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',        
        overflowY: "hidden",
        zIndex: "101",
        width: "100%"
    },
    textContainer: {
        display: 'flex',
        alignItems: "flex-start",
        position: 'relative',
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
    cameraRectangle: {
        height: 200,
        width: 700,
        border: '4px solid #0098cd',
        display: 'inline-block',
        zIndex: 101
    },
     previewStyle : {
        // height: "100vh",
        width: "50%",
        // top: '50%',
        left: 0,
        // display: "flex",
        overflow: 'hidden',
        // objectFit: 'cover',
    }
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

class LabTechHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            delay: 300,
            isOpenCamera: false,
            scanResultDialogOpen: false,
            width: null,
            height: null
        }
        // this.handleScan = this.handleScan.bind(this)
    }

    handleScan(data){     
        this.props.dispatch(fetchUserRegisterTest(data))
    }

    cameraAction = () => {
        this.setState({ isOpenCamera: true })
    }

    closeCamera = () => {
        this.setState({ isOpenCamera: false })
    }

    componentDidMount() {        
        if (typeof window !== undefined) {
            this.setState({ width: window.innerWidth, height: window.innerHeight })
            window.addEventListener("resize", () => {
                if(typeof window !== undefined) {
                    this.setState({ width: window.innerWidth, height: window.innerHeight })
                }
            })           
        }
    }

    render() {
        const { classes } = this.props;
        const { width, height } = this.state;
        const previewStyle = {
            // height: "100vh",
            width: "100%",
            // top: '50%',
            left: 0,
            // display: "flex",
            overflow: 'hidden',
            // objectFit: 'cover',
        }


        return (
            <div>
                {!this.state.isOpenCamera ?
                    <div className={classes.root}>
                        <Typography fontWeight="bold" fontSize={25} textAlign="center" fontFamily="Futura-Heavy" color="#144787">Scan QR code to view users information</Typography>
                        <Grid container justifyContent="center" style={{ marginTop: 20 }} spacing={3}>
                            <Grid item>
                                <Button onClick={() => this.cameraAction()} endIcon={<QrCodeScannerIcon style={{ color: "#fff", width: 30, height: 30 }} />} className={classes.scanButton}>
                                    <Typography fontWeight="bold" style={{ textTransform: "capitalize" }} fontSize={18} fontFamily="Futura-Heavy" color="#fff">Scan QR Code</Typography>
                                </Button>
                            </Grid>                            
                        </Grid>
                    </div> :
                    <div style={{display: "flex", height: height-55, width: width, overflowY: "hidden"}}>
                        <Grid container justifyContent="center">
                            <Grid item xs={12}>
                                <div style={{display: "flex", zIndex: "1", position: 'relative' }}>
                                <div style={{ zIndex: "2", position: "absolute", left: "10px", top: "10px", display: "flex" }} >
                                        <CancelIcon onClick={() => this.closeCamera()} style={{ color: "#fff", width: 50, height: 50  }} />
                                </div>
                                <BarcodeScannerComponent                                                                                                        
                                        onUpdate={(err, result) => {
                                            if (result) {
                                                this.handleScan(result.text)
                                            }
                                        }} />
                                </div>                            
                                {/* <div className={classes.photoContainer}>
                                    <div style={{ zIndex: "102" }} >
                                        <CancelIcon onClick={() => this.closeCamera()} style={{ color: "#fff", width: 40, height: 40, position: "absolute", left: "5px", top: "5px", display: "flex" }} />
                                    </div> */}
                                    {/* <div style={{ height: height / 1.5, width: width / 1.2, border: '4px solid #0098cd', display: 'inline-block', zIndex: 101, }}></div> */}
                                    {/* <div style={{ height: height / 4.5 }}></div> */}
                                    {/* <div style={{display: "flex", width: width, height: height, zIndex: "101"}}>
                                    <BarcodeScannerComponent 
                                    //    width = {width}
                                    //    height = {height}                                                                    
                                        onUpdate={(err, result) => {
                                            if (result) {
                                                this.handleScan(result.text)
                                            }
                                        }} />
                                </div>
                                </div> */}
                                
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

    }
}

LabTechHome.layout = "lab";

export default compose(withStyles(styles), connect(mapStateToProps))(LabTechHome);
