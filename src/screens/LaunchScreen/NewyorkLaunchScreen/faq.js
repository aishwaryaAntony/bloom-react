import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import bloomicon from "../../../../public/images/BloomLabsSideBySide.png";
// import testing from "../../../public/images/newyork.jpeg";
import Image from 'next/image'

import {
    Menu, Toolbar, MenuItem, Grid, Typography, Button, IconButton,
    CardContent,
    CardActions,
    Divider, Card
} from '@mui/material';
import { withStyles } from '@mui/styles';
import Router, { withRouter } from 'next/router';



const styles = theme => ({
    scheduleTestButton: {
        marginRight: 10,
        backgroundColor: "#1879BB",
        fontFamily: "HomepageBaukasten-Book",
        color: "#fff",
        textTransform: 'none',
        width: "150px",
        padding: "10px 10px",
        borderRadius: 0
    },
    freqTitle: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "#1879BB",
        fontWeight: "bold",
        fontSize: 'calc(2.04vh + 1.5rem)',
        padding: "13px 30px"
    },
    secondTitle: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "#1879BB",
        fontWeight: "bold",
        fontSize: 18,
        padding: "0px 30px"
    },
    contentTitle: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        padding: "15px 10px",
        lineHeight: 1.5
    },
    contentTitle1: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        padding: "15px 30px",
        lineHeight: 1.5
    },
    secondLineContent: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        padding: "0px 10px",
        lineHeight: 1.5
    },
    thirdLineContent: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        padding: "10px 10px",
        lineHeight: 1.5
    },
    forthLineContent: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        padding: "0px 10px",
        lineHeight: 1.5
    },
    fifthLineConten: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        padding: "10px 10px",
        lineHeight: 1.5
    },
    travLineConten: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "#1879BB",
        fontWeight: "bold",
        fontSize: 16,
        padding: "20px 30px"
    },
    travLineConten2: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        padding: "0px 30px"
    },
    pcrTestTitle: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "#1879BB",
        fontWeight: "bold",
        fontSize: 16,
        padding: "20px 30px"
    },
    insuranceTitle: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        padding: "20px 30px"
    },
    pointStyle: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        padding: "10px 10px"
    },
    pointStyle1: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        padding: "6px 10px"
    },
    pointStyle2: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        padding: "6px 10px "
    },
    diagnosisTitle: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        padding: "10px 10px ",
        lineHeight: 1.5
    },
    insuranceTitle3: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        padding: "0px 30px"
    },
    testChildrenTitle: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "#1879BB",
        fontWeight: "bold",
        fontSize: 16,
        padding: "20px 30px"
    },
    testChildrenTitle1: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        padding: "0px 30px"
    },
    buttonVariant: {
        // boxShadow: "0px 0px 0px 0px #E1E7ED",
        backgroundColor: "#1879BB",
        //marginBottom: "20px",
        fontFamily: "HomepageBaukasten-Book",
        color: "#fff",
        textTransform: 'none',
        width: "20%",
        padding: "20px 20px",
        borderRadius: 1
        // height: "fit-content",
        // '&:hover': {
        //     backgroundColor: "#2FB0D5",
        // },
    },
    footerTitle: {
        fontFamily: "HomepageBaukasten-Bold",
        //textAlign: "left",
        color: "#1879BB",
        fontWeight: "normal",
        fontSize: "22px",
        padding: "20px 0px"
    },
    addressStyle: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "#1879BB",
        fontWeight: "normal",
        fontSize: 20,
        // padding: "30px"
        padding: "6px 0px"
    },
    linkTitle: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "#1879BB",
        fontWeight: "lighter",
        fontSize: "20px",
        padding: "10px 0px",
        textDecoration: "underline"
    },
})

class Faq extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        let { classes, openAlert, alertSeverity, alertMessage, } = this.props;
        return (
            <div>
                <div style={{ display: "flex", overflowX: "hidden", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Grid container justifyContent="center" style={{ marginBottom: "50px" }}>
                        <Grid item xs={12} md={8}>
                            <Typography className={classes.freqTitle}>Frequently Asked Questions</Typography>
                            <Typography className={classes.secondTitle}>Are your test results accepted for entry into Hawaii?</Typography>
                            <Typography className={classes.contentTitle1}>Yes. You will have to complete the following steps to ensure that your test result is accepted:</Typography>
                            <div style={{ padding: "0px 30px" }}>
                            <ol>
                                <li className={classes.contentTitle}>Download the CommonPass app and begin the signup process. When you are prompted to enter an invitation code enter "HAWAII". If you already have the app set up, click the 3-dot icon in the top right of the app, then "Change invitation code" to enter code "HAWAII".</li>
                                <li className={classes.secondLineContent}>Upload your negative test result onto the CommonPass app to create a pass. There will be detailed instructions for this on the 2nd page of your test result form.</li>
                                <li className={classes.thirdLineContent}>Create or login to your account on the Hawaii Safe Travels website.</li>
                                <li className={classes.forthLineContent}>Click the icon for "Trips" to add your trip details (ID, flights, dates, hotels etc).</li>
                                <li className={classes.fifthLineConten}>Click the icon for "Apply for Exemption/Exception from Quarantine", then click the icon for "CommonPass Exception". Enter the ID from your CommonPass pass (under the QR code) and then verify.</li>
                             </ol>   
                            </div>
                            {/* <Typography className={classes.contentTitle}>If you have any difficulty with these steps email us at support@bloomsafely.com and our team will be able to assist you.</Typography> */}
                            <Typography className={classes.contentTitle1}>If you have trouble with CommonPass, please visit <a href="https://commonpass.org/hawaii"><span style={{ color: "#1879BB", textDecoration: "underline", cursor: "pointer" }}>https://commonpass.org/hawaii</span></a></Typography>
                            <Typography className={classes.travLineConten}>I am traveling and I need a COVID PCR (RT-PCR) test before I depart, how do I know when to test?</Typography>
                            <Typography className={classes.travLineConten2}>Please visit our comprehensive <a href="/travel-advisor"><span style={{ color: "#1879BB", textDecoration: "underline", cursor: "pointer" }}>travel advisor</span></a> for details on when to test and destination specific requirements.</Typography>
                            {/* <Typography className={classes.pcrTestTitle}>Is an RT-PCR test the same as a PCR test?</Typography> */}
                            {/* <Typography className={classes.travLineConten2}>Yes. We use real time RT-PCR (Reverse Transcription Polymerase Chain Reaction) technology, considered the gold standard for COVID-19 testing (>97% sensitivity).</Typography> */}
                            <Typography className={classes.pcrTestTitle}>What kind of documentation do you provide for travel?</Typography>
                            <Typography className={classes.travLineConten2}>You will receive travel friendly documentation that can be used for boarding your flight and at customs upon your arrival. Sometimes known as a “fit-to-fly” certificate, our documentation contains all the information commonly requested by airlines and foreign countries. We have helped thousands of travelers to their destination all over the world.</Typography>
                            <Typography className={classes.pcrTestTitle}>How do I submit a claim to my insurance for reimbursement?</Typography>
                            <Typography className={classes.travLineConten2}>1) You should receive a receipt within an hour after payment for your test. The receipt will contain a CPT (procedure code) and our Tax ID number. If there is an issue with your receipt, please contact help@bloomlabs.co. </Typography>
                            <Typography className={classes.insuranceTitle}>2) Contact your insurance company to obtain a health care claim form or download one from their website. The following codes will be useful when filing your claim form.</Typography>
                            <div style={{ padding: "0px 20px" }}>
                            <ul>
                                <li className={classes.pointStyle}><span>TIN/EIN: 85-4289083</span></li>
                                <li className={classes.pointStyle}><span>CPT Codes (Procedure):</span></li>                                                      
                                <div style={{ padding: "0px 10px" }}>
                                <ul>
                                <li className={classes.pointStyle1}><span>87426 (rapid antigen test)</span></li>
                                <li className={classes.pointStyle1}><span>U0003 (RT-PCR Test)</span></li>
                            </ul>                                    
                                </div>
                                <li className={classes.diagnosisTitle}>Diagnosis Codes (we do not provide): please include the code that describes your symptoms or exposure at the time of testing</li>
                                <div style={{ padding: "0px 10px" }}>
                                    <ul>
                                    <li className={classes.pointStyle1}>Suspected COVID (w/symptoms) </li>
                                    <li className={classes.pointStyle2}>Cough: R05</li>
                                    <li className={classes.pointStyle2}>Fever: R50.9</li>
                                    <li className={classes.pointStyle2}>Shortness of Breath: R06.02</li>
                                    <li className={classes.pointStyle2}>Exposure to someone confirmed to have COVID-19: Z20.828</li>
                                    <li className={classes.pointStyle2}>No exposure/No symptoms (Traveling): Z11.59</li>
                                    <li className={classes.pointStyle2}>Positive test: U07.1</li>
                                    </ul>
                                </div>
                                <li className={classes.diagnosisTitle}>Ordering Provider NPI number: If required by your insurance, you will need to provide the NPI number of an ordering provider. We suggest you contact your health care provider (physician, nurse practitioner, PA, pharmacist, etc) to obtain their NPI number. We are a laboratory and unable to place orders.</li>
                            </ul>
                            </div>
                            <Typography className={classes.insuranceTitle3}>3) Make a copy just in case.</Typography>
                            <Typography className={classes.insuranceTitle3}>4) Review and then submit to your insurance.</Typography>
                            <Typography className={classes.testChildrenTitle}>Do you test children?</Typography>
                            <Typography className={classes.testChildrenTitle1}>We recommend children 7 years of age and older.</Typography>
                            <Typography className={classes.testChildrenTitle}>How fast will I get my rapid antigen results?</Typography>
                            <Typography className={classes.testChildrenTitle1} >Rapid Antigen results are typically available within 1 hour. During high-demand times, sometimes results can take as long as 2 hours. If you have not received your results after 2 hours, please check your spam/junk folder and then contact help@bloomlabs.co.</Typography>
                            {/* <Toolbar style={{ justifyContent: "center", padding: "30px 10px 0px 0px" }}>
                                <Button fullWidth variant="contained" className={classes.buttonVariant} ><Typography className={classes.buttonText} >SCHEDULE TEST</Typography></Button>
                            </Toolbar> */}
                            <Typography className={classes.testChildrenTitle}>How fast will I get my Same-Day PCR (RT-PCR) results?</Typography>
                            <Typography className={classes.testChildrenTitle1} > Same day RT-PCR results will be available within 3-4 hours. We take our same-day PCR tests very seriously and are available at help@bloomlabs.co to keep you updated on the progress of your test. </Typography>
                            <Typography className={classes.testChildrenTitle}>Do you test businesses, organizations or schools?</Typography>
                            <Typography className={classes.testChildrenTitle1}>Yes! And we have been doing so for months. We offer all types of solutions from small businesses to large venues. We are also able to integrate with all types of software and verification applications to make it easy. Please contact us at help@bloomlabs.co to inquire about solutions for your organization.</Typography>
                            <Typography className={classes.testChildrenTitle} >Will this test tell me if I am currently infected with COVID?</Typography>
                            <Typography className={classes.testChildrenTitle1}>Yes, both the Rapid Antigen and RT-PCR test indicate whether you have an infection currently. Antigen tests are frequently confused with antibody tests, which indicate if you had a previous infection. Antibody tests are typically done using blood -- a blood draw or finger prick -- whereas COVID diagnostic tests, like Rapid Antigen and PCR tests, use swabs of the nose or saliva collection.</Typography>
                            <Typography className={classes.testChildrenTitle}>I need to travel. What test do I need?</Typography>
                            <Typography className={classes.testChildrenTitle1}>COVID-19 testing requirements differ wildly between location and are constantly changing. We do not provide advice regarding specific locations for this reason. It is the traveler’s responsibility to determine what type of test is needed (link to types of tests) and how close to travel it needs to be performed. </Typography>
                            <Typography className={classes.testChildrenTitle}>How do you test? Is it a deep nasal swab?!??</Typography>
                            <Typography className={classes.testChildrenTitle1}>Here at Bloom Labs, customers do a painless shallow nasal swab. It is not a deep “brain tickler”. It looks like this.</Typography>
                            <Typography className={classes.testChildrenTitle1}>You will insert the swab no more than 3⁄4 of an inch (1.5 cm) into your nose and slowly rotate the swab in a circular path against the inside of your nostril at least 4 times for a total of 15 seconds. </Typography>
                        </Grid>
                        <Grid container direction="row" justifyContent="center" spacing={3} style={{ margin: "80px 30px 30px 30px" }}>
                        <Grid item xs={12} sm={1.5}></Grid>
                        <Grid item xs={12} sm={4.5}>
                            <Typography className={classes.footerTitle} style={{ padding: "10px 0", fontSize: "18px" }}>Saguaro Bloom Diagnostics LLC</Typography>
                            <Typography className={classes.addressStyle} style={{ padding: "5px 0", fontSize: "16px" }}>(856) 502-0781</Typography>
                            <Typography className={classes.addressStyle} style={{ padding: "5px 0", fontSize: "16px" }}>support@bloomsafely.com</Typography>
                            {/* <Typography className={classes.linkTitle} style={{ padding: "20px 0 5px 0", fontSize: "16px", cursor: "pointer" }}>Contact</Typography>
                                <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>Bloom Blog</Typography>
                                <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>About Saguaro Bloom</Typography>
                                <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>Saguaro Bloom Business and Group COVID-19 Testing</Typography> */}
                                <a href={"/privacy-policy"} target="_blank"><Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>Privacy Policy</Typography></a>
                                <a href={"/terms-of-service"} target="_blank"><Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>Terms of Service</Typography></a> 
                            <Typography className={classes.addressStyle} style={{ padding: "5px 0", fontSize: "16px" }}>CLIA Certification # 03D2188271</Typography>
                            <Typography className={classes.addressStyle} style={{ padding: "5px 25px 5px 0", fontSize: "16px" }}>Copyright © 2022 Saguaro Bloom Diagnostics LLC. All rights reserved.</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4.5}>
                            {/* <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>Location</Typography>
                                <Typography className={classes.cardTitle} style={{ padding: "5px 0", fontSize: "18px" }}>Saguaro Bloom Scottsdale - Old Town</Typography> */}
                            <div style={{ height: "48px" }} />
                            <a href="https://g.page/saguarobloomlab?share">
                                <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer", }}>4165 N Craftsman Ct., Ste. A</Typography>
                                <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer", }}>Scottsdale, AZ 85251</Typography>
                            </a>
                            <Typography className={classes.addressStyle} style={{ padding: "5px 0", fontSize: "16px" }}>Mon - Fri: 8 am - 5 pm   |   Sat - Sun:  10 am - 2 pm</Typography>
                        </Grid>
                        <Grid item xs={12} sm={1.5}></Grid>
                    </Grid>
                    </Grid>                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(Faq);