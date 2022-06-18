
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import bloomicon from '../../../public/images/bloomlabs.png';
// import bloomlabicon from "../../../public/images/bloomlabicon.png";
import Image from 'next/image'
import { Grid, Typography, Button, FormControl, Select, MenuItem, Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper, TextField, InputAdornment, IconButton } from '@mui/material';
import OtpInput from "react-otp-input";
import { connect } from 'react-redux';
import { compose } from "redux";
import { postInternalUserLogin } from "../../store/actions/sessionAction";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Link from 'next/link';
import bloomIconLogo from '../../../public/images/ScottsdaleLogo.jpeg';


const styles = theme => ({
    container: {
        minHeight: "100vh",
        backgroundColor: "#eaeaea",
        backgroundRepeat: "no-repeat",
    },
    card: {
        border: "1px solid #E1E7ED",
        backgroundColor: "#FFFFFF",
        // boxShadow: "inset 0px 4px 0px #2FB0D5",
        borderRadius: 4,
        padding: 20,
        // marginBottom: 90,
    },
    inputRoot: {
        backgroundColor: "#FFFFFF",
        border: "1px solid #E1E7ED",
        borderRadius: "4px",
        fontSize: "13x !important",
        // "&:hover": {
        //     border: "1px solid #2FB0D5",
        //     backgroundColor: "#FFFFFF"
        // }
    },
    inputStyle: {
        fontFamily: "MaisonNeue-Book !important",
        fontSize: "18x !important",
        padding: "10px !important",
        color: "black",
        fontWeight: "bold",
        // opacity: 1,
        // "&&:after": {
        //     color: "#2FB0D5",
        // }
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignSelf: "flex-start",
        //marginTop: -40,
        // marginBottom: 50
        // paddingButtom:80
    },
    textFieldContainer: {
        padding: "10px 0px"
    },
    otpFieldContainer: {
        justifyContent: "center",
        alignSelf: "flex-start",
        padding: "20px 0px",
    },
    textContainer: {
        borderRadius: 4,
        border: "1px solid #E1E7ED",
        backgroundColor: "#F7F8FA, 100%",
        padding: "5px 10px",
        margin: "15px 0px"
    },
    textStyle: {
        fontFamily: "MaisonNeue-Book",
        fontSize: "14px !important",
        padding: "3px 0px",
        color: "#6E8CA8"
    },
    buttonVariant: {
        boxShadow: "0px 0px 0px 0px #E1E7ED",
        backgroundColor: "#1879BB",
        margin: "15px 0px",
        fontFamily: "MaisonNeue-Book",
        color: "#fff",
        borderRadius: 3,
        padding: "8px 20px",
        // height: "fit-content",
        // '&:hover': {
        //     backgroundColor: "#2FB0D5",
        // },
    },
    linkText: {
        fontFamily: "MaisonNeue-Book",
        fontSize: "14px !important",
        padding: "3px 5px",
        color: "#1844D6",
        cursor: "pointer"
    },
    errorText: {
        padding: 10,
        fontSize: 12,
        color: "#f44336",
        fontFamily: "MaisonNeue-Book"
    },
    cardTitle: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "center",
        color: "#1F2F3A",
        fontWeight: "bold",
        fontSize: 17,
        paddingTop: "10px "
    },
    labTitle: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "center",
        color: "#DEC498",
        fontWeight: "bold",
        fontSize: 10,

        //paddingButtom: "40px"
        // marginBottom:"40px"
    },
    otpTitle: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "center",
        color: "gray",
        fontWeight: "bold",
        fontSize: 15,
        padding: "10px 0px"
    },
    resendOtpTitle: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "center",
        color: "#1879BB",
        fontWeight: "bold",
        fontSize: 15,
        padding: "10px 0px"
    },
    internalUserTitle: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "center",
        color: "#1879BB",
        fontWeight: "bold",
        fontSize: 15,
        padding: "10px 0px",
        textDecoration: "underline",
        cursor: "pointer"
    },
    donthaveTitle: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "center",
        color: "#000000",
        fontWeight: "bold",
        fontSize: 15,
        padding: "10px 0px"
    },
    smstextTitle: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "center",
        color: "#838383",
        fontWeight: "bold",
        fontSize: 15,
        padding: "10px 0px"
    },
    phoneNumbertextTitle: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "left",
        color: "#838383",
        fontWeight: "bold",
        fontSize: 15,
        padding: "10px 0px"
    }

});

class InternalUserLogin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            email_error: false,
            invalid_email_error: false,
            password: "",
            password_error: false,
            showPassword: false,
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange = (event) => {
        const re = /^[0-9\b]{1,10}$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            if (event.target.value.length <= 10) {
                this.setState({ phone_number: event.target.value, phone_number_error: false, invalid_phone_number_error: false, error_text: null })
            }
        }
    }

    /**
  *
  * This function representing email validation.
  * @param {String} email The email string
  */
    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    /**
       *
       * This function representing password validation.
       * @param {String} password The password string
       */
    passwordValidation = (params) => {
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(\S){8,}$/
        return re.test(params)
    }

    loginAction = () => {
        let { email, password } = this.state;
        let isError = false;

        if (email === "" || email === null) {
            this.setState({ email_error: true })
            isError = true
        }
        if (!this.validateEmail(email)) {
            this.setState({ invalid_email_error: true });
            isError = true;
        }
        if (password === "" || password === null) {
            this.setState({ password_error: true })
            isError = true
        }
        else {
            if (!this.passwordValidation(password)) {
                this.setState({ invalid_password_error: true });
                isError = true;
            }
        }
        if (isError === false) {
            let data = {};
            data.email = email;
            data.password = password;
            this.props.dispatch(postInternalUserLogin(this, data))
        }
    }


    lowercaseFirstLetter = (string) => {  
        this.setState({ email: string.charAt(0).toLowerCase() + string.slice(1), email_error: false, invalid_email_error: false })
	}
	  

    render() {
        let { classes } = this.props;

        return (
            <div className={classes.container}>
                <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={6} md={3} >
                            <div className={classes.card}>
                                <div className={classes.imageContainer}>
                                    <Image src={bloomIconLogo} width="250" height="80" />
                                </div>
                                <div style={{ minHeight: "6vh" }} />
                                <div className={classes.textFieldContainer}>
                                    <Typography className={classes.phoneNumbertextTitle}>Email</Typography>
                                    <TextField
                                        id="standard-basic"
                                        // placeholder="Phone Number"
                                        variant="filled"
                                        // type={'Phone Number'}
                                        value={this.state.email}
                                        onChange={(event) => this.lowercaseFirstLetter(event.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment >
                                                    <MailOutlineIcon />
                                                </InputAdornment>
                                            ), classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot }
                                        }}
                                        fullWidth
                                        autoComplete="off"
                                        error={this.state.email_error ? true : this.state.invalid_email_error ? true : false}
                                        helperText={this.state.email_error ? "Please enter email" : this.state.invalid_email_error ? "Please enter valid email" : ""}
                                    />
                                </div>
                                <div className={classes.textFieldContainer}>
                                    <Typography className={classes.phoneNumbertextTitle}>Password</Typography>
                                    <TextField
                                        id="standard-basic"
                                        // placeholder="Phone Number"
                                        variant="filled"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={(event) => this.setState({ password: event.target.value, password_error: false, invalid_password_error: false })}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment >
                                                    <LockOutlinedIcon />
                                                </InputAdornment>
                                            ), endAdornment: (
                                                <InputAdornment >
                                                    <IconButton onClick={() => this.setState({ showPassword: !this.state.showPassword })}>
                                                        {this.state.showPassword === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ), classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot }
                                        }}
                                        fullWidth
                                        autoComplete="off"
                                        onKeyPress={e => {
                                            if (e.key === "Enter") {
                                                this.loginAction();
                                            }
                                        }}
                                        error={this.state.password_error ? true : this.state.invalid_password_error ? true : false}
                                        helperText={this.state.password_error ? "Please enter password" : this.state.invalid_password_error ? "Please enter a password with at least 8 characters, a number, an uppercase and a lowercase character." : ""}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                    <Button fullWidth variant="contained" className={classes.buttonVariant} onClick={() => this.loginAction()}>Submit</Button>
                                    <div style={{ display: 'flex', alignSelf: "center", justifyContent: "center" }}>
                                        <Link href="/forgot-password">
                                            <Typography className={classes.internalUserTitle}>
                                                Forgot Password
                                            </Typography>
                                        </Link>
                                    </div>
                                    <div style={{ display: 'flex', alignSelf: "center", justifyContent: "center", width: "25%" }}>
                                        <Link href="/login">
                                            <Typography className={classes.internalUserTitle}>
                                                Back
                                            </Typography>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // openAlert: state.userReducer.openAlert,
        // alertSeverity: state.userReducer.alertSeverity,
        // alertMessage: state.userReducer.alertMessage
    };
};
// Login.propTypes = {
// classes: PropTypes.object.isRequired,
// };
InternalUserLogin.layout = "login";

export default compose(withStyles(styles), connect(mapStateToProps))(InternalUserLogin);