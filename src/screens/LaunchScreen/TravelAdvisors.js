import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import bloomicon from '../../../public/images/BloomLabsSideBySide.png';
import Image from 'next/image'
import { Menu, Toolbar, MenuItem, Grid, Typography, Button, IconButton, TextareaAutosize, FormControl, InputLabel, Select, Radio, RadioGroup, FormControlLabel, FormHelperText, CardContent, CardActions, Divider, Card, TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import Router, { withRouter } from 'next/router';
import travelicon from "../../../public/images/travelmap.jpeg";
import travelpic from "../../../public/images/travelpic.jpeg";
import certifiedicon from '../../../public/images/certifiedicon.png';
import travelmembericon from "../../../public/images/travelmembericon.png";
import saguaroteam from "../../../public/images/sagorateam.jpeg";
import travelPic from "../../../public/images/travelpic.jpeg";
import travelnatural from "../../../public/images/travelnatural.jpeg"
import { flexbox } from '@mui/system';
import { isMobile, isIpad } from "../../helpers/constants";
import { IS_IPAD_VIEW, IS_MOBILE_VIEW } from '../../store/actions/actionTypes';

const styles = theme => ({
    travelHedStyle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "bold",
        fontSize: "calc((2.7 - 1) * 1.2vw + 1rem)",
        padding: "25px 0px",
        letterSpacing: ".01em"
    },
    travelHedStyleSubTitle1: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontStyle: "normal",
        fontSize: "calc((1.3 - 1) * 1.2vh + 1rem)",
        padding: "0px 0px",
        fontWeight: "400"
    },
    travelHedStyleSubTitle2: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "normal",
        fontSize: "calc((1.3 - 1) * 1.2vh + 1rem)",
        padding: "10px 0px"
    },
    windowsWayTitle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "bold",
        fontSize: "calc((1.8 - 1) * 1.2vh + 1rem)",
        // letterSpacing: ".01em",
        marginTop: "20px"
    },
    windowsWaySubTitle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "normal",
        fontSize: "calc((1.2 - 1) * 1.2vh + 1rem)",
        padding: "10px 0px"
    },
    beforeDepartureStyle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "bold",
        fontSize: "calc((1.5 - 1) * 1.2vh + 1rem)",
        padding: "10px 0px"
    },
    exampleStyle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontSize: "calc((1.2 - 1) * 1.2vh + 1rem)",
        padding: "10px 0"
    },
    requirementStyle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontSize: "calc((1.2 - 1) * 1.2vh + 1rem)",
        padding: "10px 0px"
    },
    beforeArrivalStyle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "bold",
        fontSize: "calc((1.2 - 1) * 1.2vh + 1rem)",
        padding: "10px 0px"
    },
    exampleSubStyle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontSize: "calc((1.2 - 1) * 1.2vh + 1rem)",
        padding: "10px 0"
    },
    requirementSubStyle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontSize: "calc((1.2 - 1) * 1.2vh + 1rem)",
        padding: "10px 0 30px 0"
    },
    buttonVariant: {
        backgroundColor: "#1879BB",
        fontFamily: "MaisonNeue-Book",
        color: "#fff",
        textTransform: 'none',
        width: "50%",
        padding: "20px 20px",
        borderRadius: 1

    },
    cardTitle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "white",
        fontWeight: "bold",
        fontSize: "calc((2.7 - 1) * 1.2vw + 1rem)",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 0"
    },
    cardSubTitle1: {
        fontFamily: "HomepageBaukasten-Book",
        color: "white",
        fontWeight: "normal",
        fontSize: "calc((1.5 - 1) * 1.2vh + 1rem)",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 0px"
    },
    cardSubTitle2: {
        fontFamily: "HomepageBaukasten-Book",
        color: "white",
        fontWeight: "normal",
        fontSize: "calc((1.5 - 1) * 1.2vh + 1rem)",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 0px"
    },
    travelPlanTitle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "bold",
        fontSize: "calc(2.04vw + 1rem)",
        letterSpacing: ".01em",
        padding: "40px 0 10px 10px"
    },
    travelPlanSubTitle1: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "normal",
        fontSize: "16px",
        padding: "10px"
    },
    travelPlanSubTitle2: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "normal",
        fontSize: "16px",
        padding: "10px 0 60px 10px"
    },
    certifiediTitle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "bold",
        fontSize: "calc((1.5 - 1) * 1.2vh + 1rem)",
        padding: "20px 0px"
    },
    certifiediSubTitle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "normal",
        fontSize: "calc((1- 1) * 1.2vh + 1rem)",
        lineHeight: 1.5
    },
    travelerTitle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "bold",
        fontSize: "calc((1.5 - 1) * 1.2vh + 1rem)",
        padding: "20px 0px"
    },
    travelerSubTitle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "normal",
        fontSize: "calc((1- 1) * 1.2vh + 1rem)",
        lineHeight: 1.5
    },
    sagutoTeamTitle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "bold",
        fontSize: "calc((1.5 - 1) * 1.2vh + 1rem)",
        padding: "20px 0px"
    },
    sagutoTeamSubTitle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "normal",
        fontSize: "calc((1- 1) * 1.2vh + 1rem)",
        lineHeight: 1.5
    },
    Traveltestimonials: {
        fontFamily: "HomepageBaukasten-Book",
        color: "black",
        fontWeight: "bold",
        fontSize: "calc(2.04vw + 1rem)",
        letterSpacing: ".01em",
        padding: "40px 10px 10px 10px"
    },
    back: {
        backgroundImage: `url(${travelpic})`,
        backgroundPosition: "right",
        backgroundSize: "60%",
        backgroundRepeat: "no-repeat",
        height: "450px",

    },
    travelTitle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "#fff",
        fontWeight: "normal",
        fontSize: "calc((2.7 - 1) * 1.2vw + 1rem)",
        padding: "0px 20px",
    },
    secondTitle1: {
        fontFamily: "HomepageBaukasten-Book",
        color: "white",
        fontWeight: "normal",
        fontSize: "calc((1.2 - 1) * 1.2vw + 1rem)",
        padding: "20px 20px 0 20px",
        lineHeight: 1.5
    },
    secondTitle2: {
        fontFamily: "HomepageBaukasten-Book",
        color: "white",
        fontWeight: "normal",
        fontSize: "calc((1.2 - 1) * 1.2vw + 1rem)",
        padding: "15px 20px",

    },
    corporateTitle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "white",
        fontWeight: "bold",
        fontSize: "22px",
        letterSpacing: ".01em",
        padding: "10px 0",
        marginTop: 10
    },
    corporateSubTitle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "white",
        fontWeight: "normal",
        lineHeight: 1.5,
        fontSize: "calc((1.3 - 1) * 1.2vw + 1rem)",
        letterSpacing: ".01em",
        padding: "10px 0",
        marginTop: 5
    },
    inputRoot: {
        backgroundColor: "#fff",
        border: "1px solid #E1E7ED",
        borderRadius: "0px",
        fontSize: "15px !important",
        fontFamily: "Lato-Regular !important",

    },
    inputStyle: {
        fontFamily: "Lato-Regular !important",
        fontSize: "15px !important",
        padding: "10px !important",
        color: "#000",
        opacity: 1,
        // "&&:after": {
        //     color: "#0E465E",
        // }
    },
    underline: {
        "&&&:before": {
            //borderBottom: "none"
        },
        "&&:after": {
            // borderBottom: "none"
        }
    },
    textStyle: {
        fontSize: 15,
        marginBottom: 5,
        //marginLeft:22,
        color: 'white',
        fontFamily: 'Lato-Black',
    },
    lableStyle: {
        marginTop: 5,
        fontSize: 15,
        color: 'white',
        fontFamily: 'Lato-Black',
    },
    buttonText: {
        fontFamily: "Lato-Black",
        textAlign: "center",
        color: "white",
        fontWeight: "normal",
        fontSize: 15,
        textTransform: "none"
        // padding: "0px 30px" 
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

class TravelAdvisor extends Component {
    constructor() {
        super()
        this.state = {
            first_name: null,
            last_name: null,
            companyName: null,
            email: null,
            message: null,
            isMobileView: null,
            backgroundSize: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isMobileView !== state.isMobileView) {
            return {
                isMobileView: props.isMobileView,
                backgroundSize: props.isMobileView ? "700%" : props.isIpadView ? "900%": "300%"
            }
        }
        return null
    }

    componentDidMount = async () => {
        if (typeof window !== "undefined") {
            await this.props.dispatch({ type: IS_MOBILE_VIEW, data: isMobile() })
            await this.props.dispatch({ type: IS_IPAD_VIEW, data: isIpad() })
            window.addEventListener("scroll", this.onScroll, false)
        }
    }

    componentWillUnmount() {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", this.onScroll, false)
        }
    }

    onScroll = () => {
        if (typeof window !== "undefined") {
            if (this.props.isMobileView) {
                this.setState({ backgroundSize: `${700 - window.pageYOffset / 50}%` })                
            }
            else if(this.props.isIpadView){
                this.setState({ backgroundSize: `${800 - window.pageYOffset / 30}%` })
            }
            else {
                this.setState({ backgroundSize: `${300 - window.pageYOffset / 30}%` })
            }
        }
    };

    render() {
        let { classes, openAlert, alertSeverity, alertMessage, } = this.props;
        return (
            <div style={{ margin: "20px 0" }}>
                <Grid container>
                    <Grid item xs={12} >
                        <div style={{
                            width: "100%",
                            background: `url(images/aeroplane.jpeg)`,
                            // backgroundAttachment: "fixed",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: 'no-repeat',
                        }}>
                            <div style={{
                                backgroundColor: "rgba(0,0,0, 0.4)",
                                color: "#fff",
                                zIndex: 2,
                                height: "350px",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex"
                            }}>
                                <Grid container justifyContent="center" alignItems="center" spacing={4}>
                                    <Grid item xs={12} md={0.5}></Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography className={classes.travelTitle}>Don’t Miss Your Window</Typography>
                                        <Typography className={classes.secondTitle1}>Saguaro Bloom is proud to provide reliable, accurate and comprehensive travel testing services. </Typography>
                                        <Typography className={classes.secondTitle2}><span style={{ fontWeight: "bold" }}>We’ve sent thousands of people all over the world and would be happy to serve you. </span></Typography>
                                    </Grid>
                                    <Grid item xs={12} md={2.5}></Grid>
                                </Grid>
                            </div>
                        </div >
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center">
                            <Grid item xs={11}>
                                <Typography className={classes.travelHedStyle}>Timing Your Test For Travel</Typography>
                                <Typography className={classes.travelHedStyleSubTitle1}>A successful trip during COVID requires careful coordination of your test. Due to the incubation period of COVID19, destinations require tests to be completed within a certain time window- missing this window can result in being stopped at the your departure gate or facing mandatory quarantine on arrival.</Typography>
                                <Typography className={classes.travelHedStyleSubTitle2}>Here are some popular destinations and their time windows for tests:</Typography>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography className={classes.windowsWayTitle}>Windows May Vary</Typography>
                                        <Typography className={classes.windowsWaySubTitle}>There are generally two types of testing windows, before departure and before arrival. </Typography>
                                        <Typography className={classes.beforeDepartureStyle}>Before Departure</Typography>
                                        <Typography className={classes.exampleStyle}><span style={{ fontWeight: "bold", fontFamily: "HomepageBaukasten-Book" }}>Example:</span> Canada</Typography>
                                        <Typography className={classes.requirementStyle}><span style={{ fontWeight: "bold", fontFamily: "HomepageBaukasten-Book" }}>Requirement:</span> Tests must be performed within 72 hours of scheduled flight departure time.</Typography>
                                        <Typography className={classes.beforeArrivalStyle}>Before Arrival</Typography>
                                        <Typography className={classes.exampleSubStyle}><span style={{ fontWeight: "bold", fontFamily: "HomepageBaukasten-Book" }}>Example:</span> Germany</Typography>
                                        <Typography className={classes.requirementSubStyle}><span style={{ fontWeight: "bold", fontFamily: "HomepageBaukasten-Book" }}>Requirement:</span> Test samples must be collected within 48 hours of arrival to German customs. </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Image src={travelicon} objectFit="cover" position="absolute" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ backgroundColor: "#1879BB", marginTop: "35px" }}>
                        <Grid container justifyContent="center">
                            <Grid item xs={11}>
                                <Typography className={classes.cardTitle}>Check Destinations Requirements From New York</Typography>
                                <Typography className={classes.cardSubTitle1}>We’ve compiled testing requirements from a wide range of international destinations for your convenience. Click the magnifying glass on the far right to find yours. </Typography>
                                <Typography className={classes.cardSubTitle2}>Questions? Contact us at <u>support@bloomsafely.com </u>and we’d be happy to help.  </Typography>
                                <Grid container justifyContent="center">
                                    <Grid item xs={12} md={2.5}></Grid>
                                    <Grid item xs={12} md={7} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                                        <iframe class="airtable-embed" src="https://airtable.com/embed/shrxr4OZwbjrfylE3/tblouRpkmhy36w2DJ?backgroundColor=cyan&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="500" ></iframe>
                                    </Grid>
                                    <Grid item xs={12} md={2.5}></Grid>
                                </Grid>
                                <div style={{ height: 50 }} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center">
                            <Grid item xs={11}>
                                <Typography className={classes.travelPlanTitle}>Plan Your Travel Test Visit</Typography>
                                <Typography className={classes.travelPlanSubTitle1}>We’ve tailored our RT-PCR travel tests with feedback from thousands of our customers who’ve safely visited dozens of countries during the COVID pandemic. </Typography>
                                <Typography className={classes.travelPlanSubTitle2}>Our tests are fast and reliable with built in support to get you through gates and customs easily.</Typography>
                                <Grid container justifyContent="center" spacing={4}>
                                    <Grid item xs={12} md={4}>
                                        <Image src={certifiedicon} height={350} width={400} objectFit="cover" />
                                        <Typography className={classes.certifiediTitle}>Results Ready For Takeoff</Typography>
                                        <Typography className={classes.certifiediSubTitle}>Our results documents provide vital information on your test status as well as contact information a gate agent or customers officer can use to confirm your status with Saguaro Bloom directly. </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Image src={travelmembericon} height={350} width={400} objectFit="cover" />
                                        <Typography className={classes.travelerTitle}>Same Day Option</Typography>
                                        <Typography className={classes.travelerSubTitle}>Travel requirements and your plans change. If you find yourself in need of a RT-PCR test fast, Saguaro Bloom provides Same Day tests. Come by the lab before 4pm (1pm on weekends) and get your result and documents the same day.</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Image src={saguaroteam} height={350} width={400} objectFit="cover" />
                                        <Typography className={classes.sagutoTeamTitle}>Real Human Support</Typography>
                                        <Typography className={classes.sagutoTeamSubTitle}>We proudly provide support from our offices in Old Town Scottsdale. A member of the Bloom team will always answer your email or phone call, whether you’re at home or abroad.</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <div style={{ height: 100 }} />
                    </Grid>
                    <Grid item xs={12} style={{ backgroundColor: "#95C2E4" }}>
                        <Grid container justifyContent="center">
                            <Grid item xs={11}>
                                <Typography className={classes.Traveltestimonials}>Travel Testimonials</Typography>
                                {this.props.isMobileView || this.props.isIpadView ?
                                    <div>
                                        <div style={{ display: "flex", width: "85%", margin: "20px 0 0 50px", position: 'relative', zIndex: '1' }}>
                                            <Image src={travelPic} objectFit="cover" />
                                        </div>
                                        <div style={{ display: "flex", backgroundColor: "#fff", width: "85%", padding: "30px", flexDirection: "column", position: 'relative', zIndex: '2', marginTop: -50 }}>
                                            <Typography style={{ fontWeight: "bold", fontWeight: "bold", fontFamily: "HomepageBaukasten-Book", lineHeight: "1.1424", fontSize: "calc((1.5 - 1) * 1.2vh + 1rem)" }}>I had a close timeline in which I needed my PCR results required for international travel. They provide a detailed certificate signed by their physician which they send in PDF format by email. It satisfies travel requirements perfectly. Highly recommended!</Typography>
                                            <Typography style={{ fontWeight: "bold", marginTop: "10px", fontWeight: "bold", textAlign: "left", fontFamily: "HomepageBaukasten-Book", fontSize: "16px" }}>— Karen L., RT-PCR Customer</Typography>
                                        </div>
                                        <div style={{ display: "flex", width: "85%", margin: "40px 50px 0 0", position: 'relative', zIndex: '1' }}>
                                            <Image src={travelnatural} objectFit="cover" />
                                        </div>
                                        <div style={{ display: "flex", backgroundColor: "#fff", width: "85%", marginLeft: "40px", padding: "30px", flexDirection: "column", position: 'relative', zIndex: '2', marginTop: -50 }}>
                                            <Typography style={{ fontWeight: "bold", fontWeight: "bold", fontFamily: "HomepageBaukasten-Book", lineHeight: "1.1424", fontSize: "calc((1.5 - 1) * 1.2vh + 1rem)" }}>“Easily the best testing site around! I had to take a flight and Saguaro was the only place around offering a SAME DAY PCR! Service was fast, efficient, and everyone there was super friendly.”</Typography>
                                            <Typography style={{ fontWeight: "bold", marginTop: "10px", fontWeight: "bold", textAlign: "left", fontFamily: "HomepageBaukasten-Book", fontSize: "16px" }}>— Jason P., Same Day RT-PCR Customer</Typography>
                                        </div>
                                    </div> :
                                    <div>
                                        <Grid container alignItems="center">
                                            <Grid item xs={12} sm={5} style={{ marginRight: -70, zIndex: 2 }}>
                                                <div style={{ display: "flex", padding: "60px 50px", flexDirection: "column", backgroundColor: "#fff" }}>
                                                    <Typography style={{ fontWeight: "bold", fontWeight: "bold", fontFamily: "HomepageBaukasten-Book", lineHeight: "1.1424", fontSize: "calc((1.5 - 1) * 1.2vh + 1rem)" }}>I had a close timeline in which I needed my PCR results required for international travel. They provide a detailed certificate signed by their physician which they send in PDF format by email. It satisfies travel requirements perfectly. Highly recommended!</Typography>
                                                    <Typography style={{ fontWeight: "bold", marginTop: "10px", fontWeight: "bold", textAlign: "left", fontFamily: "HomepageBaukasten-Book", fontSize: "16px" }}>— Karen L., RT-PCR Customer</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={7} style={{ zIndex: 1, display: "flex" }}>
                                                <Image src={travelPic} />
                                            </Grid>
                                        </Grid>
                                        <Grid container alignItems="center" style={{ marginTop: "80px" }}>
                                            <Grid item xs={12} sm={7} style={{ zIndex: 1, display: "flex" }}>
                                                <Image src={travelnatural} />
                                            </Grid>
                                            <Grid item xs={12} sm={5} style={{ marginLeft: -70, zIndex: 2 }}>
                                                <div style={{ display: "flex", padding: "60px 50px", flexDirection: "column", backgroundColor: "#fff" }}>
                                                    <Typography style={{ fontWeight: "bold", fontWeight: "bold", fontFamily: "HomepageBaukasten-Book", lineHeight: "1.1424", fontSize: "calc((1.5 - 1) * 1.2vh + 1rem)" }}>“Easily the best testing site around! I had to take a flight and Saguaro was the only place around offering a SAME DAY PCR! Service was fast, efficient, and everyone there was super friendly.”</Typography>
                                                    <Typography style={{ fontWeight: "bold", marginTop: "10px", fontWeight: "bold", textAlign: "left", fontFamily: "HomepageBaukasten-Book", fontSize: "16px" }}>— Jason P., Same Day RT-PCR Customer</Typography>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                }

                                {/* <Grid item xs={12} sm={12} style={{
                                //     backgroundImage: `url(images/travelpic.jpeg)`,
                                //     backgroundPosition: "right",
                                //     backgroundSize: "contain",
                                //     backgroundRepeat: "no-repeat",
                                //     height: "500px",
                                //     display: "flex",
                                //     alignItems: "center",
                                //     marginTop: 50
                                // }} >
                                //     <div>
                                //         <Typography style={{ width: "50%", fontWeight: "bold", backgroundColor: "white", fontWeight: "bold", padding: "75px 75px 0 75px", fontFamily: "HomepageBaukasten-Book", lineHeight: "1.1424", fontSize: "calc((1.5 - 1) * 1.2vh + 1rem)" }}>I had a close timeline in which I needed my PCR results required for international travel. They provide a detailed certificate signed by their physician which they send in PDF format by email. It satisfies travel requirements perfectly. Highly recommended!</Typography>
                                //         <Typography style={{ width: "50%", fontWeight: "bold", backgroundColor: "white", fontWeight: "bold", padding: "15px 75px 75px 75px", fontFamily: "HomepageBaukasten-Book", fontSize: "16px" }}>— Karen L., RT-PCR Customer</Typography>
                                //     </div>
                                // </Grid>
                                // <Grid item xs={12} sm={12} style={{
                                //     backgroundImage: `url(images/travelnatural.jpeg)`,
                                //     backgroundPosition: "left",
                                //     backgroundSize: "contain",
                                //     backgroundRepeat: "no-repeat",
                                //     height: "500px",
                                //     display: "flex",
                                //     justifyContent: "left",
                                //     alignItems: "center",
                                //     marginTop: 100
                                // }}>
                                //     <div>
                                //         <Typography style={{ width: "50%", backgroundColor: "white", fontSize: "20px", fontWeight: "bold", padding: "75px 75px 0 75px", fontFamily: "HomepageBaukasten-Book", lineHeight: "1.1424", fontSize: "calc((1.5 - 1) * 1.2vh + 1rem)" }}>“Easily the best testing site around! I had to take a flight and Saguaro was the only place around offering a SAME DAY PCR! Service was fast, efficient, and everyone there was super friendly.”</Typography>
                                //         <Typography style={{ width: "50%", fontWeight: "bold", backgroundColor: "white", fontWeight: "bold", padding: "15px 75px 75px 75px", fontFamily: "HomepageBaukasten-Book", fontSize: "16px" }}>— Jason P., Same Day RT-PCR Customer</Typography>
                                //     </div>
                                // </Grid> */}
                            </Grid>
                        </Grid>
                        <div style={{ height: 100 }} />
                    </Grid>
                    <div style={{
                        width: "100%",
                        background: `url(images/dubaInternational.jpeg)`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: this.state.backgroundSize,
                        opacity: 0.9
                    }}>
                        <div style={{
                            backgroundColor: "rgba(0,0,0, 0.8)",
                            color: "#fff",
                            zIndex: 2,
                        }}>
                            <Grid container justifyContent="center" alignItems="center" >
                                <Grid xs={12} style={{ padding: "30px 40px 50px 35px" }}>
                                    <Typography className={classes.corporateTitle}>We also offer corporate accounts for travel testing.</Typography>
                                    <Typography className={classes.corporateSubTitle}>With card on file convenience, Saguaro Bloom <br /> provides businesses throughout the valley with <br /> reliable testing for corporate travel. Our high <br /> complexity lab runs 7 days a week, and every test <br /> includes access to our support team who can help <br /> with  any COVID restriction issues on your journey. </Typography>
                                    <Typography className={classes.corporateSubTitle}> travel@bloomsafely.com <br /> <u style={{ color: "#009acd" }}>(856) 502-0781</u> </Typography>
                                    <Grid item xs={12} sm={6} style={{ marginTop: "20px" }}>
                                        <Typography className={classes.textStyle}>Name *</Typography>
                                        <Grid container spacing={2} >
                                            <Grid item xs={6}>
                                                <TextField
                                                    // variant="filled"
                                                    value={this.state.first_name}
                                                    onChange={(event) => this.setState({ first_name: event.target.value })}
                                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                                    fullWidth
                                                    autoComplete="off"
                                                />
                                                <Typography className={classes.lableStyle}>First Name</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    // variant="filled"
                                                    value={this.state.last_name}
                                                    onChange={(event) => this.setState({ last_name: event.target.value })}
                                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                                    fullWidth
                                                    autoComplete="off"
                                                />
                                                <Typography className={classes.lableStyle}>Last Name</Typography>
                                            </Grid>

                                            <Grid item xs={12} >
                                                <Typography className={classes.textStyle}>Company</Typography>
                                                <TextField
                                                    // variant="filled"
                                                    value={this.state.companyName}
                                                    onChange={(event) => this.setState({ companyName: event.target.value })}
                                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                                    fullWidth
                                                    autoComplete="off"
                                                />
                                            </Grid>

                                            <Grid item xs={12} >
                                                <Typography className={classes.textStyle}>Email *</Typography>
                                                <TextField
                                                    // variant="filled"
                                                    value={this.state.email}
                                                    onChange={(event) => this.setState({ email: event.target.value })}
                                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                                    fullWidth
                                                    autoComplete="off"
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <Typography className={classes.textStyle}>Message *</Typography>
                                                <TextareaAutosize
                                                    // variant="filled"
                                                    minRows={10}
                                                    value={this.state.message}
                                                    onChange={(event) => this.setState({ message: event.target.value })}
                                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                                    style={{ width: "100%" }}
                                                    autoComplete="off"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button variant="contained" style={{
                                                    marginRight: 10, backgroundColor: "#1879BB",
                                                    fontFamily: "MaisonNeue-Book", color: "#fff",
                                                    textTransform: 'none',
                                                    padding: "25px 35px",
                                                    borderRadius: 0
                                                }} >
                                                    <Typography className={classes.buttonText}>Send</Typography>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid xs={6} style={{ margin: 10 }}>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
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
                            <a href="https://g.page/saguarobloomlab?share" style={{ backgroundColor: "red" }}>
                                <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer", }}>4165 N Craftsman Ct., Ste. A</Typography>
                                <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer", }}>Scottsdale, AZ 85251</Typography>
                            </a>
                            <Typography className={classes.addressStyle} style={{ padding: "5px 0", fontSize: "16px" }}>Mon - Fri: 8 am - 5 pm   |   Sat - Sun:  10 am - 2 pm</Typography>
                        </Grid>
                        <Grid item xs={12} sm={1.5}></Grid>
                    </Grid>
                </Grid>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isMobileView: state.sessionReducer.isMobileView,
        isIpadView: state.sessionReducer.isIpadView
    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(TravelAdvisor);