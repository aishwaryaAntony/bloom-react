import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import bloomicon from '../../../../public/images/ScottsdaleLogo.jpeg';
import bloomiconLogo from "../../../../public/images/Scottsdalefavicon.jpeg";
import {
     Toolbar, Grid, Typography, Button, IconButton, Drawer, List, ListItem, Hidden
} from '@mui/material';
import { withStyles } from '@mui/styles';
// import testing from "../../../public/images/newyork.jpeg";
import Image from 'next/image'
// import { height } from '@mui/system';
import swabtest from '../../../../public/images/swapImage.png';
import ResultImage from '../../../../public/images/Result.jpg'
import commontrusticon from '../../../../public/images/commonTrust.png'
import commonpass from "../../../../public/images/commonpass.png"
import phoenixLogo from "../../../../public/images/phoenixLogo.png"
import Router, { withRouter } from 'next/router';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import { isMobile, isIpad } from "../../../helpers/constants";
import CloseIcon from '@mui/icons-material/Close';
import { IS_MOBILE_VIEW } from '../../../store/actions/actionTypes';
// import pdf from "../../../../public/pdf/PrivacyPolicy.pdf"

const styles = theme => ({   
    covidTitle: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "#fff",
        fontWeight: "normal",
        fontSize: "calc((2.7 - 1) * 1.2vw + 1rem)",
        padding: "30px 20px 20px 20px"
    },
    secondTitle1: {
        fontFamily: "HomepageBaukasten-Book",       
        color: "white",
        fontWeight: "normal",
        fontSize: "calc((1.3 - 1) * 1.2vw + 1rem)",
        padding: "0px 20px",
        lineHeight: 1.5
    },
    secondSubTitle1: {
        fontFamily: "HomepageBaukasten-Book",      
        color: "white",
        fontWeight: "normal",
        fontSize: "18px",
        padding: "5px 0px",
        lineHeight: 1.5
    },
    secondSubTitle2: {
        fontFamily: "HomepageBaukasten-Book",     
        color: "white",
        fontWeight: "normal",
        fontSize: "18px",
        padding: "5px 0px",
        lineHeight: 1.5
    },
    secondSubTitle3: {
        fontFamily: "HomepageBaukasten-Book",      
        color: "white",
        fontWeight: "normal",
        fontSize: "18px",
        padding: "5px 0px",
        lineHeight: 1.5
    },
    secondSubTitle4: {
        fontFamily: "HomepageBaukasten-Book",       
        color: "white",
        fontWeight: "normal",
        fontSize: "16px",
        padding: "10px 0px"
    },
    fdaCertifiedStyle: {
        fontFamily: "HomepageBaukasten-Book",        
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
        padding: "5px 20px",
        lineHeight: 1.5
    },
    paymentTextStyle: {
        fontFamily: "HomepageBaukasten-Book",   
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
        padding: "10px 20px 60px 20px",
        lineHeight: 1.5
    },
    rtpcTextStyle: {
        fontFamily: "HomepageBaukasten-Book",    
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        padding: "45px 50px"
    },
    testContenetTitle: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "#000",
        fontWeight: "lighter",
        fontSize: "18px",       
    },
    resultsTitle: {
        fontFamily: "MaisonNeue-Book",       
        color: "white",
        fontWeight: "normal",
        fontSize: 20,
        padding: "0px 30px"
    },
    lastTitle: {
        fontFamily: "MaisonNeue-Book",     
        color: "white",
        fontWeight: "normal",
        fontSize: 20,
        padding: "30px 30px"
    },
    loginButton: {     
        backgroundColor: "#1879BB",   
        fontFamily: "MaisonNeue-Book",
        color: "#fff",
        textTransform: 'none',
        width: "40%",    
        padding: "10px 10px",
        borderRadius: 0
    },
    buttonVariant: {       
        backgroundColor: "#1879BB",      
        fontFamily: "MaisonNeue-Book",
        color: "#fff",
        textTransform: 'none',
        width: "20%",
        padding: "20px 20px",
        borderRadius: 1       
    },
    buttonText: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "center",
        color: "white",
        fontWeight: "normal",
        fontSize: 15,
        textTransform: "none"      
    },
    cardTitle: {
        fontFamily: "HomepageBaukasten-Bold",      
        color: "#1879BB",
        fontWeight: "normal",
        fontSize: "22px",
        padding: "20px 0px"
    },
    linkTitle: {
        fontFamily: "HomepageBaukasten-Book",       
        color: "#1879BB",
        fontWeight: "lighter",
        fontSize: "20px",
        padding: "10px 0px",
        textDecoration: "underline"
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignSelf: "flex-start",        
    },
    addressStyle: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "#1879BB",
        fontWeight: "normal",
        fontSize: 20,       
        padding: "6px 0px"
    },
    scheduleTestButton: {
        marginRight: 10,
        backgroundColor: "#1879BB",
        color: "#fff",
        textTransform: 'none',
        width: "150px",
        padding: "10px 10px",
        borderRadius: 0
    },
    loginButton: {       
        backgroundColor: "#1879BB",       
        color: "#fff",
        textTransform: 'none',
        width: "100px",      
        padding: "4px 0px",
        borderRadius: 0
    },
    launchImageStyle: {
        width: "100vw",
        background: `url(images/ScottsdaleLaunchScreen.jpeg)`,
        backgroundAttachment: "fixed",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        transition: "transform .5s",
        "&:hover": {
            transform: "scale(1.5)",
            zoom: "100%"
        }
    }
})

class LaunchScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobileOpen: false,
            isMobileView: null,
            isIpad: null,
            scale: 1,
            backgroundSize: null
        }
    }


    static getDerivedStateFromProps(props, state) {
        if (props.isMobileView !== state.isMobileView) {
            return {
                isMobileView: props.isMobileView,
                backgroundSize: props.isMobileView ? "300%" : "120%"
            }
        }
        return null
    }

    componentDidMount = async () => {
        if (typeof window !== "undefined") {
            await this.props.dispatch({ type: IS_MOBILE_VIEW, data: isMobile() })
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
            if (!this.props.isMobileView) {
                this.setState({ backgroundSize: `${120 - window.pageYOffset / 30}%` })
            }
            else {
                this.setState({ backgroundSize: `${300 - window.pageYOffset / 50}%` })
            }
        }
    };



    loginScreen = () => {
        window.location = '/login';
    }
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    handleClickList = (text) => {
        Router.push(text.href)
        this.handleDrawerToggle()
    }


    clickScheduleTestButton = async () => {
        await localStorage.clear();
        Router.push({ pathname: "/schedule-appointment" })
    }


    render() {
        let { classes, openAlert, alertSeverity, alertMessage, } = this.props;
        let isMobileView = isMobile();
        let isIpadView = isIpad();
        let pages = [
            {
                title: "FAQ",
                href: "/faq",
            },
            {
                title: "Travel Advisor",
                href: "/travel-advisor",
            },
            {
                title: "Group Events",
                href: "/groupEvents"
            }
        ]

        return (
            <div style={{ display: "flex", flexDirection: "column", overflowX: "hidden" }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Toolbar style={{ justifyContent: "space-between", padding: "10px 20px" }}>
                            <Hidden mdDown>
                                <Tooltip title="Home" arrow >
                                    <div style={{ width: 250, height: 110, display: 'flex', flexDirection: 'row'}}>
                                        <Image onClick={() => Router.push({ pathname: "/" })} src={bloomicon}  objectFit="contain" alt="COVID-19 Testing in Scottsdale, AZ"/>
                                    </div>
                                </Tooltip>
                            </Hidden>
                            <Hidden mdUp>
                                <Tooltip title="Home" arrow>
                                    <div style={{ width: 80, height: 40, display: 'flex', flexDirection: 'row'}}>
                                        <Image onClick={() => Router.push({ pathname: "/" })} src={bloomiconLogo} objectFit="contain" alt="COVID-19 Testing in Scottsdale, AZ"/>
                                    </div>
                                </Tooltip>
                            </Hidden>
                            <Hidden mdUp>
                                <Button fullWidth variant="contained" onClick={() => this.clickScheduleTestButton()} className={classes.scheduleTestButton}><Typography className={classes.buttonText}>Schedule a Test</Typography></Button>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={this.handleDrawerToggle}
                                    sx={{ mr: 2 }}
                                >
                                    <MenuIcon style={{ width: 40, height: 40 }} />
                                </IconButton>
                            </Hidden>
                            {/* {isMobileView !== undefined && isMobileView === false ? */}
                            <Hidden mdDown>
                                <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "row" }}>
                                    <div style={{ margin: "10px", display: "flex", justifyContent: "space-around", flexDirection: "row" }}>
                                        <Tooltip title="Travel Advisor" arrow>
                                            <Typography onClick={() => Router.push({ pathname: "/travel-advisor" })} style={{ color: "black", padding: "0px 10px", cursor: "pointer", fontFamily: "HomepageBaukasten-Book", fontSize: "1em" }}>Travel Advisor</Typography>
                                        </Tooltip>
                                        <Tooltip title="Group Events" arrow>
                                            <Typography onClick={() => Router.push({ pathname: "/groupEvents" })} style={{ color: "black", padding: "0px 10px", cursor: "pointer", fontFamily: "HomepageBaukasten-Book", }}>Group/Events</Typography>
                                        </Tooltip>
                                        <Tooltip title="Faq" arrow>
                                            <Typography onClick={() => Router.push({ pathname: "/faq" })} style={{ color: "black", padding: "0px 10px", cursor: "pointer", fontFamily: "HomepageBaukasten-Book", }}>FAQ</Typography>
                                        </Tooltip>
                                    </div>
                                    <Button fullWidth variant="contained" onClick={() => this.clickScheduleTestButton()} className={classes.scheduleTestButton}><Typography className={classes.buttonText}>Schedule a Test</Typography></Button>
                                    <Button fullWidth variant="contained" onClick={() => this.loginScreen()} className={classes.loginButton} ><Typography className={classes.buttonText}>Log In</Typography></Button>
                                </div>
                            </Hidden>
                        </Toolbar>
                        <Drawer
                            // container={container}
                            variant="temporary"
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            sx={{
                                display: { md: "none" },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "100%" },
                            }}
                        >
                            <List>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "15px" }}>
                                    <Image src={bloomiconLogo} width="100" height="50" objectFit="contain" alt="COVID-19 Testing in Scottsdale, AZ"/>
                                    <CloseIcon style={{ width: 30, height: 30 }} onClick={() => this.handleDrawerToggle()} />
                                </div>
                                <div style={{ margin: "20px" }}>
                                    {pages.length > 0 && pages.map((text, index) => (
                                        <ListItem key={index} onClick={() => this.handleClickList(text)}>
                                            <Button>
                                                <Typography style={{ textTransform: "capitalize", fontFamily: "HomepageBaukasten-Book" }}>{text.title}</Typography>
                                            </Button>
                                        </ListItem>
                                    ))}
                                </div>
                            </List>
                            <div style={{ display: "flex", position: "absolute", bottom: 20, flexDirection: "column", width: "100%", padding: "0 20px 0 20px" }}>
                                <Button fullWidth variant="contained" style={{
                                    marginRight: 10, backgroundColor: "#1879BB",
                                    fontFamily: "MaisonNeue-Book", color: "#fff",
                                    textTransform: 'none',
                                    width: "100%",
                                    padding: "10px 10px",
                                    borderRadius: 0
                                }} onClick={() => Router.push({ pathname: "/schedule-appointment" })} ><Typography className={classes.buttonText}>Schedule a Test</Typography></Button>
                                <Button fullWidth variant="contained" style={{
                                    marginRight: 10,
                                    marginTop: "15px",
                                    backgroundColor: "#1879BB",
                                    color: "#fff",
                                    textTransform: 'none',
                                    width: "100%",
                                    padding: "10px 10px",
                                    borderRadius: 0
                                }} onClick={() => this.loginScreen()}  ><Typography className={classes.buttonText}>Log In</Typography></Button>
                            </div>
                        </Drawer>
                    </Grid>
                </Grid>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Grid container justifyContent="center">
                        <Grid item xs={12}>
                            <div className='img' style={{
                                width: "100%",
                               // background: `url(images/ScottsdaleLaunchScreen.jpg)`,
                                position: "relative",
                                // backgroundAttachment: "fixed",
                                backgroundPosition: "center",
                                backgroundSize: this.state.backgroundSize,
                                backgroundRepeat: 'no-repeat',
                                // transition: "transform .5s",
                                // transform: `scale(${this.state.scale})`
                            }} title="COVID-19 Testing in Scottsdale, AZ" >
                                <div style={{
                                    backgroundColor: "rgba(0,0,0, 0.4)",
                                    color: "#fff",
                                    zIndex: 2
                                }}>
                                    <Grid container justifyContent="center" alignItems="center">
                                        <Grid item xs={12} md={9}>
                                            <Typography className={classes.covidTitle}>COVID-19 Testing in Scottsdale</Typography>
                                            <Typography className={classes.secondTitle1}><span style={{ fontWeight: "bold" }}>Accurate results, reliable turnaround times. Appointments and walk-ins at our walk-up location in Old Town Scottsdale.</span></Typography>
                                            <div style={{ padding: "0 20px" }}>
                                                <ul>
                                                    <li className={classes.secondSubTitle1}><span><span style={{ fontWeight: "bold", fontSize: "18px" }}>$299</span> - Same Day PCR: (Cutoff: 4:00pm M-F, 1:30pm S-Su). The most accurate test available and fast turnaround time. <span style={{ fontWeight: "bold", fontSize: "18px" }}>Results within 6 hours. </span></span></li>
                                                    <li className={classes.secondSubTitle2}><span><span style={{ fontWeight: "bold", fontSize: "18px" }}>$149</span> - RT-PCR Test: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Results within 24 hours on average.</span></span></li>
                                                    <li className={classes.secondSubTitle3}><span style={{ fontWeight: "bold", fontSize: "18px" }}>$59</span> - Rapid Antigen Test: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Results within 1 hour.</span></li>
                                                </ul>
                                            </div>
                                            <Typography className={classes.fdaCertifiedStyle}>FDA-certified shallow nasal swabs collections you do yourself. Plenty of parking, easy walk-up.</Typography>
                                            <Typography className={classes.paymentTextStyle}>All card payments accepted.</Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            {/* <Toolbar style={{ justifyContent: "center", padding: "30px 10px 0px 0px" }}>
                                <Button fullWidth variant="contained" className={classes.buttonVariant} onClick={() => Router.push({ pathname: "/test-registration-form-without-login" })}><Typography className={classes.buttonText} >SCHEDULE TEST</Typography></Button>
                            </Toolbar> */}
                        </Grid>
                        <Grid container justifyContent="center" padding="30px" spacing={4}>                            
                            <Grid item xs={12} lg={4} md={4}>
                                <div style={{ height: "280px", display: 'flex' }}>
                                    <Image src={swabtest} objectFit="cover" alt="COVID-19 Testing in Scottsdale, AZ"/>
                                </div>
                                <Typography className={classes.cardTitle} >Shallow nasal swab you do yourself</Typography>
                                <Typography className={classes.testContenetTitle} style={{ marginRight: 20, fontSize: "18px" }}>Saguaro Bloom uses FDA-certified shallow nasal swabs that <a href="https://www.youtube.com/watch?v=uYJBbph3w5I" target="_blank" rel="noreferrer"><span style={{ color: "#1879BB", textDecoration: "underline", cursor: "pointer" }}>you do on your own.</span></a> <span style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}>You control your comfort and speed of collection.</span> This method is the most comfortable available while protecting you and frontline workers from infection.</Typography>
                                {/* <Typography className={classes.linkTitle} style={{ cursor: "pointer" }}>More information from the CDC on self-collection</Typography> */}
                            </Grid>
                            <Grid item xs={12} lg={4} md={4}>
                                <div style={{ height: "280px", display: 'flex' }}>
                                    <Image src={ResultImage} objectFit="cover" alt="COVID-19 Testing in Scottsdale, AZ"/>
                                </div>
                                <Typography className={classes.cardTitle}>Reliable results times, flexible payment</Typography>
                                <Typography className={classes.testContenetTitle} style={{ marginRight: 30, fontSize: "18px" }}>Processed on-site for accurate turn-around.</Typography>
                                <div style={{ margin: "5px 30px 10px 20px" }}> 
                                    <Typography className={classes.testContenetTitle} style={{ marginRight: 30, fontSize: "18px" }}>Same Day PCR:  <strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}>Results within 6 hours</strong></Typography>
                                    <Typography className={classes.testContenetTitle} style={{ fontSize: "16px", lineHeight: 1.8 }}><strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}><span style={{fontSize: "12px",marginRight: 15}}>&#9679;</span>$299</strong> via debit, credit, and HSA cards</Typography>
                                    <Typography className={classes.testContenetTitle} style={{ fontSize: "16px", lineHeight: 1.8 }}><span style={{fontSize: "12px",marginRight: 15}}>&#9679;</span>The <strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}> MOST </strong> accurate test available AND <strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}> FAST </strong>turnaround time</Typography>
                                    <Typography className={classes.testContenetTitle} style={{ marginRight: 30, marginTop:'15px', fontSize: "18px" }}>RT-PCR: <strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}>Results within 24 hours on average</strong></Typography>
                                    <Typography className={classes.testContenetTitle} style={{ fontSize: "16px", lineHeight: 1.8 }}><span style={{ fontSize: "16px", lineHeight: 1.8, fontFamily: "HomepageBaukasten-Bold" }}><span style={{fontSize: "12px",marginRight: 15}}>&#9679;</span>$149 </span> via debit, credit, and HSA cards, submit to insurance for reimbursement.</Typography>
                                    <Typography className={classes.testContenetTitle} style={{ fontSize: "16px", lineHeight: 1.8 }}><span style={{fontSize: "12px",marginRight: 15}}>&#9679;</span>The <strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}> MOST </strong> accurate test available</Typography>
                                    <Typography className={classes.testContenetTitle} style={{ marginRight: 30,marginTop:'15px', fontSize: "18px" }}>Rapid Antigen: <strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}>Results within 1 hour</strong></Typography>
                                    <Typography className={classes.testContenetTitle} style={{ fontSize: "16px", lineHeight: 1.8 }}><span style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}><span style={{fontSize: "12px",marginRight: 15}}>&#9679;</span>$59 </span>via debit, credit, and HSA cards, submit to insurance for reimbursement. </Typography>
                                    <Typography className={classes.testContenetTitle} style={{ fontSize: "16px", lineHeight: 1.8 }}><span style={{fontSize: "12px",marginRight: 15}}>&#9679;</span>The <strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}>FASTEST</strong> turnaround time</Typography>
                                </div>
                                {/* <>
                                <div style={{ margin: "5px 30px 10px 20px" }}>                                  
                                    <Typography className={classes.testContenetTitle} style={{ marginRight: 30, fontSize: "18px" }}>Same Day PCR:  <strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}>Results within 6 hours</strong></Typography>
                                    
                                    {/* <div style={{ padding: "0 10px" }}> */}
                                        {/* <ul> */}
                                            {/* <li className={classes.testContenetTitle} style={{ fontSize: "16px", lineHeight: 1.8 }}><strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}>$299</strong> via debit, credit, and HSA cards</li> */}
                                            {/* <li className={classes.testContenetTitle} style={{ fontSize: "16px", lineHeight: 1.8 }}>The <strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}> MOST </strong> accurate test available AND <strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}> FAST </strong>turnaround time</li> */}
                                        {/* </ul> */}
                                    {/* </div> */}                                   
                                {/* </div>
                                <div style={{ margin: "15px 5px 10px 20px" }}>
                                    <Typography className={classes.testContenetTitle} style={{ marginRight: 30, fontSize: "18px" }}>RT-PCR: <strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}>Results within 24 hours on average</strong></Typography>
                                    {/* <div style={{ margin: "0 10px" }}> */}
                                        {/* <ul> */}
                                            {/* <li className={classes.testContenetTitle} style={{ fontSize: "16px", lineHeight: 1.8 }}><span style={{ fontSize: "16px", lineHeight: 1.8, fontFamily: "HomepageBaukasten-Bold" }}>$149 </span> via debit, credit, and HSA cards, submit to insurance for reimbursement.</li> */}
                                            {/* (<span style={{ color: "#1879BB", textDecoration: "underline", cursor: "pointer" }}>FAQ</span>) */}
                                            {/* <li className={classes.testContenetTitle} style={{ fontSize: "16px", lineHeight: 1.8 }}>The <strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}> MOST </strong> accurate test available</li> */}
                                        {/* </ul> */}
                                    {/* </div> */}
                                {/* </div>
                                <div style={{ margin: "5px 5px 10px 20px" }}>
                                    <Typography className={classes.testContenetTitle} style={{ marginRight: 30, fontSize: "18px" }}>Rapid Antigen: <strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}>Results within 1 hour</strong></Typography>
                                    {/* <div style={{ padding: "0 10px" }}> */}
                                        {/* <ul> */}
                                            {/* <li className={classes.testContenetTitle} style={{ fontSize: "16px", lineHeight: 1.8 }}><span style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}>$75 </span>via debit, credit, and HSA cards, submit to insurance for reimbursement. </li> */}
                                            {/* <li className={classes.testContenetTitle} style={{ fontSize: "16px", lineHeight: 1.8 }}>The <strong style={{ fontWeight: "lighter", fontFamily: "HomepageBaukasten-Bold" }}>FASTEST</strong> turnaround time</li> */}
                                            {/* (<span style={{ color: "#1879BB", textDecoration: "underline", cursor: "pointer" }}>FAQ</span>) */}
                                        {/* </ul> */}
                                    {/* </div> */}
                                {/* </div> */}
                                {/* </> */} 
                            </Grid>
                            <Grid item xs={12} lg={4} md={4}>
                                <div style={{ height: "280px", display: "flex" }}>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.1790361598282!2d-111.92967048517329!3d33.49671878076068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b0b3b8aebae4f%3A0x75cb5a41b5b53736!2sSaguaro%20Bloom!5e0!3m2!1sen!2sin!4v1639547578346!5m2!1sen!2sin" width="100%" height="100%" loading="lazy"  title="COVID-19 Testing in Scottsdale, AZ"></iframe>
                                    {/* <iframe style={{ height: "400px", width: "100%" }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755.6344167719436!2d-73.9858281707825!3d40.750197698708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a98445e64f%3A0xe67c3bba4c3ebc9c!2s34%20W%2036th%20St%2C%20New%20York%2C%20NY%2010018%2C%20USA!5e0!3m2!1sen!2sin!4v1638239031923!5m2!1sen!2sin" loading="lazy" ></iframe> */}
                                </div>
                                <Typography className={classes.cardTitle} >Find Us Here:</Typography>
                                <Typography className={classes.testContenetTitle} style={{ fontSize: "17px" }}> 4165 N Craftsman Ct., Ste. A</Typography>
                                <Typography className={classes.testContenetTitle} style={{ fontSize: "17px" }}>Scottsdale, AZ 85251</Typography>
                                <Typography className={classes.testContenetTitle} style={{ fontSize: "17px" }}>Mon - Fri: 8 am - 5 pm | Sat - Sun: 10 am - 2 pm </Typography>
                                {/* <div style={{ margin: "15px 0 10px 10px" }}>
                                    <ul>
                                        <li className={classes.linkTitle} style={{ fontSize: "20px", cursor: "pointer" }}>Old Town Scottsdale</li>
                                        <li className={classes.linkTitle} style={{ fontSize: "20px", cursor: "pointer" }}>Valley Shield (West Phoenix)</li>
                                    </ul>
                                </div> */}
                            </Grid>
                        </Grid>
                        {/* <Toolbar style={{ justifyContent: "center", padding:"30px 10px 0px 0px" }}>
                                <Button fullWidth variant="contained" className={classes.buttonVariant} ><Typography className={classes.buttonText} >SCHEDULE TEST</Typography></Button>
                            </Toolbar> */}
                        <Grid container justifyContent="center" style={{ margin: "20px" }}>
                            <Grid item xs={12}>
                                {this.props.isMobileView === false &&
                                    <Typography style={{ textAlign: "center", fontWeight: "bold", alignItems: "center", fontSize: "calc((2.7 - 1) * 1.2vw + 1rem)", fontFamily: "HomepageBaukasten-Book" }}>Memberships and Associations:</Typography>
                                }
                                {this.state.isMobileView === true &&
                                    <Typography style={{ textAlign: "center", fontWeight: "bold", padding: "0 80px", alignItems: "center", fontSize: "calc((2.7 - 1) * 1.2vw + 1rem)", fontFamily: "HomepageBaukasten-Book" }}>Memberships and Associations:</Typography>
                                }
                            </Grid>
                        </Grid>
                        <Grid container direction="row" spacing={4} justifyContent="center" alignItems="center" style={{ margin: "40px 30px 40px 30px" }}>
                            <Grid item xs={12} sm={5}>
                                <Image src={commontrusticon} height={50} width={400} alt="COVID-19 Testing in Scottsdale, AZ"/>
                            </Grid>
                            {/* {typeof this.state.isMobile !== undefined && this.state.isMobile === false && */}
                            <Grid item xs={12} sm={3.5}>
                                <Image src={commonpass} height={50} width={280} alt="COVID-19 Testing in Scottsdale, AZ" />
                                {/* <div style={{flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <div style={{
                                        borderWidth: 10,
                                        borderStyle: 'solid',
                                        // border:"3px solid red",
                                        borderRadius: '50%',
                                        width: 50,
                                        height: 50,
                                        borderColor: "#193FA2",
                                        borderRightColor: '#2AC479'
                                    }}>
                                    </div> 
                                    <Typography color="#161e92" style={{ fontSize: "27px", padding: "0 12px",  fontWeight: "bold" }}>Common<span style={{ color:"#2661e4" }}>Pass</span></Typography>
                                </div>                                  */}
                            </Grid>
                            {/* }  */}
                            {/* {typeof this.state.isMobile !== undefined && this.state.isMobile === true && 
                                <Grid item xs={12} sm={3.5} >
                                    <Image src={commonpass} height={35} width={180}/> */}
                            {/* <div style={{flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <div style={{
                                        borderWidth: 8,
                                        borderStyle: 'solid',
                                        // border:"3px solid red",
                                        borderRadius: '50%',
                                        width: 40,
                                        height: 40,
                                        borderColor: "#193FA2",
                                        borderRightColor: '#2AC479'
                                    }}>
                                    </div> 
                                    <Typography color="#161e92" style={{ fontSize: 25, padding: "0px 20px",  fontWeight: "bold" }}>CommomPass</Typography>
                                </div>  */}
                            {/* </Grid>
                            } */}
                            <Grid item xs={12} sm={3.5}>
                                <Image src={phoenixLogo} height={120} width={180} alt="COVID-19 Testing in Scottsdale, AZ" />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="center" spacing={3} style={{ margin: "80px 30px 30px 30px" }}>
                            <Grid item xs={12} sm={1.5}></Grid>
                            <Grid item xs={12} sm={4.5}>
                                <Typography className={classes.cardTitle} style={{ padding: "10px 0", fontSize: "18px" }}>Saguaro Bloom Diagnostics LLC</Typography>
                                <Typography className={classes.addressStyle} style={{ padding: "5px 0", fontSize: "16px" }}>(856) 502-0781</Typography>
                                <Typography className={classes.addressStyle} style={{ padding: "5px 0", fontSize: "16px" }}>support@bloomsafely.com</Typography>
                                {/* <Typography className={classes.linkTitle} style={{ padding: "20px 0 5px 0", fontSize: "16px", cursor: "pointer" }}>Contact</Typography>
                                <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>Bloom Blog</Typography>
                                <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>About Saguaro Bloom</Typography>
                                <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>Saguaro Bloom Business and Group COVID-19 Testing</Typography> */}
                                <a href={"/privacy-policy"} rel="noreferrer" target="_blank"><Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>Privacy Policy</Typography></a>
                                <a href={"/terms-of-service"} rel="noreferrer" target="_blank"><Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>Terms of Service</Typography></a> 
                                <Typography className={classes.addressStyle} style={{ padding: "5px 0", fontSize: "16px" }}>CLIA Certification # 03D2188271</Typography>
                                <Typography className={classes.addressStyle} style={{ padding: "5px 25px 5px 0", fontSize: "16px" }}>Copyright © 2022 Saguaro Bloom Diagnostics LLC. All rights reserved.</Typography>                               
                            </Grid>
                            <Grid item xs={12} sm={4.5}>
                                {/* <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>Location</Typography>
                                <Typography className={classes.cardTitle} style={{ padding: "5px 0", fontSize: "18px" }}>Saguaro Bloom Scottsdale - Old Town</Typography> */}
                                <div style={{ height: "48px" }} />
                                <a href="https://g.page/saguarobloomlab?share" rel="noreferrer">
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
        isMobileView: state.sessionReducer.isMobileView
    }
}
export default compose(withStyles(styles), connect(mapStateToProps))(LaunchScreen);