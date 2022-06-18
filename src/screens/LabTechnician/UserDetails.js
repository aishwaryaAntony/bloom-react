import React, { Component } from "react";
import { Grid, Typography, Button, Dialog, IconButton, DialogTitle, DialogActions, DialogContent, TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { compose } from "redux";
import Router from 'next/router';
import dynamic from "next/dynamic";
import CancelIcon from '@mui/icons-material/Cancel';
import { fetchUserRegisterTest, assignUserTestTupe } from "../../store/actions/labTechnician"
import LoadingOverlay from "react-loading-overlay";

const BarcodeScannerComponent = dynamic(
    () => import('react-qr-barcode-scanner'),
    { ssr: false }
)

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        height: "100vh",
        flexDirection: "column",
        backgroundColor: "#eaeaea"
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
    infoText: {
        fontSize: 18,
        paddingTop: 10,
        color: "#fff",
        textAlign: "center",
    },
    photoContainer: {
        height: "100vh",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        zIndex: 102
    },
    textContainer: {
        display: 'inline-block',
        position: 'relative',
        textAlign: 'center',
        paddingTop: 5,
        zIndex: 100
    },
    inputStyle: {
        fontFamily: "Lato-Regular !important",
        fontSize: "15px !important",
        padding: "10px !important",
        color: "#1D8878",
        opacity: 1,
        "&&:after": {
            color: "#1D8878",
        }
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    },
    inputRoot: {
        backgroundColor: "#FFFFFF",
        border: "1px solid #E1E7ED",
        borderRadius: "4px",
        fontSize: "15px !important",
        fontFamily: "Lato-Regular !important",
        "&:hover": {
            border: "1px solid #1D8878",
            backgroundColor: "#FFFFFF"
        }
    }
})

class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenCamera: false,
            tupeNumber: null,
            dialogOpen: false,
            tupeNumbeError: false,
            isLoading: false,
            width: null,
            height: null

        }
        // this.handleScan = this.handleScan.bind(this)

    }

    componentDidMount() {
        this.props.dispatch(fetchUserRegisterTest(this.props.qr_code))
        if (typeof window !== undefined) {
            this.setState({ width: window.innerWidth, height: window.innerHeight })
            window.addEventListener("resize", () => {
                if (typeof window !== undefined) {
                    this.setState({ width: window.innerWidth, height: window.innerHeight })
                }
            })
        }
    }


    assignTupeNumber = (item, userInfoAndUserTest) => {
        this.setState({ isOpenCamera: true })
        typeof localStorage !== "undefined" && localStorage.setItem('test_result_id', item.test_result_id);
        typeof localStorage !== "undefined" && localStorage.setItem('qrCode', userInfoAndUserTest.profile.qr_code);
        typeof localStorage !== "undefined" && localStorage.setItem('isCabTest', item.isCabTest);
    }

    enterNumberAction = (item, userInfoAndUserTest) => {
        typeof localStorage !== "undefined" && localStorage.setItem('test_result_id', item.test_result_id);
        typeof localStorage !== "undefined" && localStorage.setItem('qrCode', userInfoAndUserTest.profile.qr_code);
        typeof localStorage !== "undefined" && localStorage.setItem('isCabTest', item.isCabTest);
        this.setState({ dialogOpen: true })
    }

    handleSubmit = async () => {
        if (this.state.tupeNumber !== null) {
            this.setState({ dialogOpen: false, isLoading: true })
            let test_result_id = typeof await localStorage !== "undefined" && localStorage.getItem('test_result_id')
            let qrCode = typeof localStorage !== "undefined" && await localStorage.getItem('qrCode');
            let isCabTest = typeof localStorage !== "undefined" && await localStorage.getItem('isCabTest');
            this.setState({ isOpenCamera: false })
            let dataValues = {}
            dataValues.test_tube_number = this.state.tupeNumber;
            dataValues.test_result_id = test_result_id;
            dataValues.isCabTest = isCabTest === "true" ? true : false;
            this.props.dispatch(assignUserTestTupe(qrCode, dataValues, this))
            this.setState({ tupeNumber: null })
        } else {
            this.setState({ tupeNumbeError: true })
        }
    }

    handleClose = () => {
        this.setState({ dialogOpen: false })
    }

    handleScan(data) {
        let test_result_id = typeof localStorage !== "undefined" && localStorage.getItem('test_result_id')
        let qrCode = typeof localStorage !== "undefined" && localStorage.getItem('qrCode');
        let isCabTest = typeof localStorage !== "undefined" && localStorage.getItem('isCabTest');
        this.setState({ isOpenCamera: false, isLoading: true });
        let dataValues = {};
        dataValues.test_tube_number = data;
        dataValues.test_result_id = test_result_id;
        dataValues.isCabTest = isCabTest === "true" ? true : false;
        this.props.dispatch(assignUserTestTupe(qrCode, dataValues, this));
    }

    render() {
        const { classes, userInfoAndUserTest } = this.props;
        const { width, height } = this.state;
        const previewStyle = {
            height: "100vh",
            width: '100%',
            left: 0,
            display: "flex",
            overflow: 'hidden',
            objectFit: 'cover',
        }

        if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
            const { innerWidth: width, innerHeight: height } = window;
        }

        return (
            <div>
                {!this.state.isOpenCamera &&
                    <div style={{ flexDirection: "row", display: "flex", justifyContent: "flex-end", backgroundColor: "#eaeaea" }}>
                        <Button onClick={() => Router.push({ pathname: '/lab-technician/lab-tech-home' })} style={{ backgroundColor: "#144787", width: "20%", height: "20%", margin: 10, borderRadius: "0 5px 5px 0" }}>
                            <Typography fontWeight="bold" style={{ textTransform: 'capitalize' }} fontSize={14} fontFamily="Futura-Heavy" color="#fff">Scan Another User</Typography>
                        </Button>
                    </div>
                }
                <div >
                    {!this.state.isOpenCamera ?
                        <div className={classes.root}>
                            <LoadingOverlay active={this.state.isLoading} spinner={this.state.isLoading} text="Assigning tube number..." >
                                <Grid container justifyContent="center" spacing={3} direction="column" style={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                    <Typography fontWeight="bold" fontSize={20} textAlign="center" fontFamily="Futura-Heavy" color="#144787">User Details</Typography>
                                    <Grid item xs={12} sm={6} style={{ padding: "20px", margin: "10px 0 0 25px", boxShadow: "inset 0 0 10px #9E9E9E", backgroundColor: "#fff", borderRadius: 5, }}>
                                        <Grid container justifyContent="center" spacing={3} >
                                            <Grid item xs={12} sm={6} >
                                                <div style={{ flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <Typography fontSize={18} textAlign="center" fontFamily="Futura-Heavy" color="#00aae4">First Name :</Typography>
                                                    <Typography marginLeft={2} fontSize={16} textAlign="center" fontFamily="Futura-Heavy" color="#144787">{userInfoAndUserTest !== undefined && userInfoAndUserTest !== null && userInfoAndUserTest.profile.first_name}</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <div style={{ flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <Typography fontSize={18} textAlign="center" fontFamily="Futura-Heavy" color="#00aae4">Last Name :</Typography>
                                                    <Typography marginLeft={2} fontSize={16} textAlign="center" fontFamily="Futura-Heavy" color="#144787">{userInfoAndUserTest !== undefined && userInfoAndUserTest !== null && userInfoAndUserTest.profile.last_name}</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <div style={{ flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <Typography fontSize={18} textAlign="cente</div>r" fontFamily="Futura-Heavy" color="#00aae4">Phone Number :</Typography>
                                                    <Typography marginLeft={2} fontSize={16} textAlign="center" fontFamily="Futura-Heavy" color="#144787">{userInfoAndUserTest !== undefined && userInfoAndUserTest !== null && userInfoAndUserTest.profile.hashed_phone_number}</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <div style={{ flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <Typography fontSize={18} textAlign="center" fontFamily="Futura-Heavy" color="#00aae4">Email :</Typography>
                                                    <Typography marginLeft={2} fontSize={16} textAlign="center" fontFamily="Futura-Heavy" color="#144787">{userInfoAndUserTest !== undefined && userInfoAndUserTest !== null && userInfoAndUserTest.profile.email}</Typography>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography fontWeight="bold" fontSize={20} textAlign="center" fontFamily="Futura-Heavy" color="#144787">Test Types</Typography>
                                        <Grid container justifyContent="center" direction="column" style={{ marginTop: "10px" }} spacing={2}>
                                            {userInfoAndUserTest !== null && userInfoAndUserTest !== undefined && userInfoAndUserTest.test.map((item, index) =>
                                                <Grid item xs={12} >
                                                    <div style={{ display: "flex", alignItem: "center", justifyContent: "space-between", flexDirection: "row", borderLeft: "3px solid #144787", backgroundColor: "#fff", borderRadius: 0, }}>
                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "25px" }}>
                                                            <Typography fontWeight="bold" style={{ textTransform: 'capitalize' }} fontSize={16} textAlign="center" fontFamily="Futura-Heavy" color="#144787">{item.test_type}</Typography>
                                                        </div>
                                                        <div style={{ width: 10, backgroundColor: "#eaeaea" }} />
                                                        <Button onClick={() => this.assignTupeNumber(item, userInfoAndUserTest)} style={{ backgroundColor: "#144787", width: "40%", borderRadius: "0 0px 0px 0" }}>
                                                            <Typography fontWeight="bold" style={{ textTransform: 'capitalize' }} fontSize={14} textAlign="center" fontFamily="Futura-Heavy" color="#fff">Assign Tube Number</Typography>
                                                        </Button>
                                                        <div style={{ width: 10, backgroundColor: "#eaeaea" }} />
                                                        <Button onClick={() => this.enterNumberAction(item, userInfoAndUserTest)} style={{ backgroundColor: "#144787", width: "40%", borderRadius: "0 0px 0px 0" }}>
                                                            <Typography fontWeight="bold" style={{ textTransform: 'capitalize' }} fontSize={14} textAlign="center" fontFamily="Futura-Heavy" color="#fff"> Enter Number</Typography>
                                                        </Button>
                                                    </div>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </LoadingOverlay >
                            <div style={{ height: 30, backgroundColor: "#eaeaea" }} />
                        </div> :
                        <div style={{ display: "flex", height: height - 55, width: width, overflowY: "hidden" }}>
                            <Grid container justifyContent="center">
                                <Grid item xs={12}>
                                    <div style={{ display: "flex", zIndex: "1", position: 'relative' }}>
                                        <div style={{ zIndex: "2", position: "absolute", left: "10px", top: "10px", display: "flex" }} >
                                            <CancelIcon onClick={() => this.setState({ isOpenCamera: false })} style={{ color: "#fff", width: 50, height: 50 }} />
                                        </div>
                                        <BarcodeScannerComponent
                                            onUpdate={(err, result) => {
                                                if (result) {
                                                    this.handleScan(result.text)
                                                }
                                            }} />
                                    </div>
                                    {/* <div className={classes.photoContainer}>
                                        <div style={{ zIndex: 102 }} onClick={() => this.setState({ isOpenCamera: false })}>
                                            <CancelIcon style={{ color: "#fff", width: 40, height: 40, position: "absolute", left: "5px", top: "20px", display: "flex" }} />
                                        </div> */}
                                    {/* <div style={{ height: height / 12.5 }}></div>
                                        <div style={{ height: height / 5.0, width: width / 1.2, border: '4px solid #0098cd', display: 'inline-block', zIndex: 101, }}></div>
                                        <div style={{ height: height / 4.5 }}></div> */}
                                    {/* </div>
                                    <div>
                                        <BarcodeScannerComponent
                                            style={previewStyle}
                                            onUpdate={(err, result) => {
                                                if (result) {
                                                    this.handleScan(result.text)
                                                }
                                            }} />
                                    </div> */}
                                </Grid>
                            </Grid>
                        </div>
                    }
                    <Dialog maxWidth={"md"} open={this.state.dialogOpen} onClose={() => this.handleClose()}>
                        <DialogContent style={{ overflowY: "auto", boxShadow: "inset 0px 4px 0px #1D8878", borderRadius: 4, padding: 10 }}>
                            <Grid container spacing={2} justifyContent="space-between" style={{ marginTop: -20, padding: "2% 5% 0 5%" }}>
                                <Grid item xs={12}>
                                    <Typography className={classes.textStyle}> Tube Number</Typography>
                                    <TextField
                                        placeholder="Enter Name"
                                        variant="filled"
                                        value={this.state.tupeNumber}
                                        onChange={(event) => this.setState({ tupeNumber: event.target.value, name_error: false })}
                                        InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                        fullWidth
                                        autoComplete="off"
                                        error={this.state.tupeNumbeError === true ? true : false}
                                        helperText={this.state.tupeNumbeError === true ? "Please enter Tube number" : false}
                                        FormHelperTextProps={{
                                            className: classes.helperText
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} style={{ display: "flex", justifyContent: "center", padding: 9 }}>
                                    <DialogActions>
                                        <Button size="small" onClick={() => this.handleSubmit()} variant="contained" color="primary" className={classes.addButton}>Submit</Button>
                                        <Button size="small" onClick={() => this.handleClose()} variant="contained" style={{ backgroundColor: "red" }} className={classes.cancelButton}>Cancel</Button>
                                    </DialogActions>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfoAndUserTest: state.labTechnicianReducer.userInfoAndUserTest
    }
}

UserDetails.getInitialProps = async (context) => {
    const { qr_code } = context.query;
    return { qr_code: qr_code };
};


UserDetails.layout = "lab";

export default compose(withStyles(styles), connect(mapStateToProps))(UserDetails);