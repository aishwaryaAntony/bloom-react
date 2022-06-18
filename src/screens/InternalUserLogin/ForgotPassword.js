
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import bloomicon from '../../../public/images/bloomlabs.png';
// import bloomlabicon from "../../../public/images/bloomlabicon.png";
import Image from 'next/image'
import { Grid, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { connect } from 'react-redux';
import { compose } from "redux";
import { forgotPassword } from "../../store/actions/sessionAction";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { withRouter } from "next/router";
import bloomIconLogo from '../../../public/images/ScottsdaleLogo.jpeg';
import Link from 'next/link';


const styles = () => ({
    container: {
        minHeight: "100vh",
        backgroundColor: "#eaeaea",
        backgroundRepeat: "no-repeat",
    },
    card: {
        border: "1px solid #E1E7ED",
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        padding: 20,
        // marginBottom: 90,

    },
    inputRoot: {
        backgroundColor: "#FFFFFF",
        border: "1px solid #E1E7ED",
        borderRadius: "4px",
        fontSize: "13x !important",
    },
    inputStyle: {
        fontFamily: "MaisonNeue-Book !important",
        fontSize: "18x !important",
        padding: "10px !important",
        color: "black",
        fontWeight: "bold",
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
    },
    title: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "center",
        color: "#000000",
        fontWeight: "bold",
        fontSize: 20,
        padding: "10px 0px"
    }

});

class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            email_error: false,
            invalid_email_error: false
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


    submitAction = () => {
        let { email } = this.state;
        let isError = false;


        if (email === "" || email === null) {
            this.setState({ email_error: true })
            isError = true
        } else {
            if (!this.validateEmail(email)) {
                this.setState({ invalid_email_error: true });
                isError = true;
            }
        }

        if (isError === false) {
            let data = {};
            data.email = email;
            this.props.dispatch(forgotPassword(data))
        }
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
                                    {/* <Image src={bloomicon} width="90" height="90" /> */}
                                    <Image src={bloomIconLogo} width="250" height="80" />
                                </div>
                                <Typography className={classes.title}>Reset Password </Typography>
                                <div style={{ minHeight: "6vh" }} />
                                <div className={classes.textFieldContainer}>
                                    <Typography className={classes.phoneNumbertextTitle}>Email</Typography>
                                    <TextField
                                        id="standard-basic"
                                        // placeholder="Phone Number"
                                        variant="filled"
                                        // type={'Phone Number'}
                                        value={this.state.email}
                                        onChange={(event) => this.setState({ email: event.target.value, email_error: false, invalid_email_error: false })}
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
                                <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                    <Button fullWidth variant="contained" className={classes.buttonVariant} onClick={() => this.submitAction()}>Submit</Button>
                                    <div style={{ display: 'flex', alignSelf: "center", justifyContent: "center", width: "25%" }}>
                                        <Link href="/internal_user_login">
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
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

export default withRouter(compose(withStyles(styles), connect(mapStateToProps))(ForgotPassword));