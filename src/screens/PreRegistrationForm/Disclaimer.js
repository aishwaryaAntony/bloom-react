import React, { Component } from "react";
import { Grid, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { compose } from "redux";
import { withStyles } from '@mui/styles';

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#efefef",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "center",
        color: "#1879BB",
        fontWeight: "bold",
        fontSize: "22px",
        padding: "20px 30px"
    },
    text: {
        fontFamily: "HomepageBaukasten-Book",
        color: "#000",
        fontSize: 'calc(2.04vh + 0.3rem)',
        padding: "30px 30px",
        lineHeight: 1.5
    },
    bodyContainer: {
        margin: "10px 10px 40px 10px"
    },
    pdfView: {
        display: "flex",
        backgroundColor: "#fff",
        boxShadow: "0 3px 10px  #E1E7ED"
    }
})


/**
* @class
*
* Class representing  TermsOfService component
*
*/

class Disclaimer extends Component {
    constructor() {
        super();
        this.state = {
            numPages: null, pageNumber: 1
        }
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages: numPages });
    };


    /** render the  TermsOfService details. */
    render() {
        let { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container justifyContent="center" margin="0 15px">
                    <Grid item xs={12} md={8} sm={8} className={classes.bodyContainer}>
                        <Typography className={classes.title}>Authorization for Use & Disclosure of Protected Health Information</Typography>
                        <div className={classes.pdfView}>
                            <Typography className={classes.text}>Authorization for Use & Disclosure of Protected Health Information
                                <br />I consent and authorize that test results reported by Saguaro Bloom Diagnostics LLC (SBD) will be reported directly to me via telephone and/or electronic mail.
                                I understand that it is my responsibility to consult my own medical professional for the interpretation, analysis, evaluation, and explanation of my test results.
                                I understand that neither SBD nor its clinical authority will analyze, evaluate, critique, review, or otherwise interpret the results of said tests.
                                <br />I agree that SBD, directors, staff, or its other agents or employees shall not be liable for any claims including, but not limited to, those arising out of or related to inaccurate, uninterpreted, misinterpreted, or unreceived results.
                                I do hereby expressly forever release and discharge all claims, demands, injuries, damage, actions, or causes of action. <br />I understand and agree that the services provided by SBD and the test results will be maintained as confidential, protected health information.
                                This test and its results may become part of my medical record and that an insurance company may discover the results of this test by obtaining a copy of my medical record in accordance with the terms of my insurance policies.
                                <br />I understand that my test results will only be provided to other third parties upon my request, unless it is in accordance with any of the reasons outlined below. <br />I understand that my COVID-19 test results must be reported to state and federal health agencies and SBD will report these results.
                                My identifying information will only be reported to the applicable local or state health authority as required.
                                <br />If I am completing a test that is requested and subsidized by my employer or third party, I consent and authorize SBD to release my test results to said employer or third party.
                                <br />If I am completing this test at the request of my doctor,
                                <br />I consent and authorize SBD to share the results with my doctor and relevant medical staff at his office. I consent and authorize SBD for retention of my sample and de-identified information for future research purposes by SBD or its affiliated partners.
                                <br />All of the above has been reviewed by me and I have had the opportunity to have any questions answered that I have regarding my rights to privacy. I have read and agreed to all the above terms and statements.</Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default compose(withStyles(styles), connect(null))(Disclaimer)