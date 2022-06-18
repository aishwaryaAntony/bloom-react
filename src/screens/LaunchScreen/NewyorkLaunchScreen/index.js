import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import bloomicon from '../../../../public/images/BloomLabsSideBySide.png';
import bloomLogo from '../../../../public/images/BloomLogoNew.png';
import {
    Menu, Toolbar, MenuItem, Grid, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText,
    CardContent,
    CardActions,
    Divider, Card, useMediaQuery, Hidden
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import testing from "../../../public/images/newyork.jpeg";
import Image from 'next/image'
// import { height } from '@mui/system';
import swabtest from '../../../../public/images/swapImage.png';
import googleicon from '../../../../public/images/google.png';
import commontrusticon from '../../../../public/images/commonTrust.png'
import commonpass from "../../../../public/images/commonpass.png"
import mobilecommonpass from "../../../../public/images/mobileviewcommonpass.png"
import Router, { withRouter } from 'next/router';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import { isMobile, isIpad } from "../../../helpers/constants";
import CloseIcon from '@mui/icons-material/Close';
const drawerWidth = 240;

const styles = theme => ({
    // backimg:{
    //     backgroundImage: `url(${background.src})`,
    //     width:"100%",
    //     height:"100%"
    // },
    covidTitle: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "white",
        fontWeight: "normal",
        fontSize: "calc((2.7 - 1) * 1.2vw + 1rem)",
        padding: "40px"
    },
    secondTitle1: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "white",
        fontWeight: "normal",
        fontSize: "calc((1.3 - 1) * 1.2vh + 1rem)",
        padding: "0px 40px"
    },
    secondSubTitle1: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "white",
        fontWeight: "normal",
        fontSize: "16px",
        padding: "10px 0px"
    },
    secondSubTitle2: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "white",
        fontWeight: "normal",
        fontSize: "16px",
        padding: "10px 0px"
    },
    secondSubTitle3: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "white",
        fontWeight: "normal",
        fontSize: "16px",
        padding: "10px 0px"
    },
    secondSubTitle4: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "white",
        fontWeight: "normal",
        fontSize: "16px",
        padding: "10px 0px"
    },
    fdaCertifiedStyle: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        padding: "15px 50px"
    },
    paymentTextStyle: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        padding: "3px 50px"
    },
    rtpcTextStyle: {
        fontFamily: "HomepageBaukasten-Book",
        //textAlign: "left",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        padding: "45px 50px"
    },
    testContenetTitle: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: 20,
        //padding: "10px 0px"
    },
    resultsTitle: {
        fontFamily: "MaisonNeue-Book",
        //textAlign: "left",
        color: "white",
        fontWeight: "normal",
        fontSize: 20,
        padding: "0px 30px"
    },
    lastTitle: {
        fontFamily: "MaisonNeue-Book",
        //textAlign: "left",
        color: "white",
        fontWeight: "normal",
        fontSize: 20,
        padding: "30px 30px"
    },
    loginButton: {
        // boxShadow: "0px 0px 0px 0px #E1E7ED",
        backgroundColor: "#1879BB",
        //marginBottom: "20px",
        fontFamily: "MaisonNeue-Book",
        color: "#fff",
        textTransform: 'none',
        width: "40%",
        //height:"40%",
        padding: "10px 10px",
        borderRadius: 0
    },
    buttonVariant: {
        // boxShadow: "0px 0px 0px 0px #E1E7ED",
        backgroundColor: "#1879BB",
        //marginBottom: "20px",
        fontFamily: "MaisonNeue-Book",
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
    buttonText: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "center",
        color: "white",
        fontWeight: "normal",
        fontSize: 15,
        textTransform: "none"
        // padding: "0px 30px" 
    },
    cardTitle: {
        fontFamily: "MaisonNeue-Book",
        //textAlign: "left",
        color: "#1879BB",
        fontWeight: "bold",
        fontSize: 25,
        padding: "10px 0px"
    },
    linkTitle: {
        fontFamily: "MaisonNeue-Book",
        //textAlign: "left",
        color: "#1879BB",
        fontWeight: "normal",
        fontSize: 20,
        padding: "8px 0px",
        textDecoration: "underline"
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignSelf: "flex-start",
        //marginTop: -40,
        // marginBottom: 50
        // paddingButtom:80
    },
    addressStyle: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "left",
        color: "#1879BB",
        fontWeight: "normal",
        fontSize: 20,
        // padding: "30px"
        padding: "6px 0px"
    },
    scheduleTestButton: {
        marginRight: 10,
        backgroundColor: "#1879BB",
        fontFamily: "MaisonNeue-Book",
        color: "#fff",
        textTransform: 'none',
        width: "150px",
        padding: "10px 10px",
        borderRadius: 0
    },
    loginButton: {
        // boxShadow: "0px 0px 0px 0px #E1E7ED",
        backgroundColor: "#1879BB",
        //marginBottom: "20px",
        fontFamily: "MaisonNeue-Book",
        color: "#fff",
        textTransform: 'none',
        width: "100px",
        //height:"10%",
        padding: "4px 0px",
        borderRadius: 0
    },

})

class LaunchScreen extends Component {
    constructor() {
        super()
        this.state = {
            mobileOpen: false,
            isMobile: isMobile(),
            isIpad: isIpad()
        }
    }


    static getDerivedStateFromProps(props, state) {
        return {
            isMobile: isMobile(),
            isIpad: isIpad()
        }

    }

    componentDidMount() {

    }

    loginScreen = () => {
        window.location = '/login';
    }
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

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
                href: "/admin/test-type",
            },
            {
                title: "Group Events",
                href: "/groupEvents"
            }
        ]
        return (
            <div>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Toolbar style={{ justifyContent: "space-between", padding: "10px 20px" }}>
                            <div>
                                <Image onClick={() => Router.push({ pathname: "/" })} src={bloomicon} width="220" height="80" objectFit="contain" />
                            </div>
                            <Hidden mdUp>
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
                                        <Tooltip title="Faq" arrow>
                                            <Typography onClick={() => Router.push({ pathname: "/faq" })} style={{ color: "black", padding: "0px 10px", cursor: "pointer" }}>FAQ</Typography>
                                        </Tooltip>
                                        <Tooltip title="Travel Advisor" arrow>
                                            <Typography style={{ color: "black", padding: "0px 10px", cursor: "pointer", fontFamily: "HomepageBaukasten-Book", fontSize: "1em" }}>Travel Advisor</Typography>
                                        </Tooltip>
                                        <Tooltip title="Group Events" arrow>
                                            <Typography onClick={() => Router.push({ pathname: "/groupEvents" })} style={{ color: "black", padding: "0px 10px", cursor: "pointer" }}>Group/Events</Typography>
                                        </Tooltip>
                                    </div>
                                    <Button fullWidth variant="contained" onClick={() => Router.push({ pathname: "/test-registration-form-without-login" })} className={classes.scheduleTestButton}><Typography className={classes.buttonText}>Schedule a Test</Typography></Button>
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
                                display : { md: "none"},  
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "100%" },
                            }}
                        >
                            <List>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "15px" }}>
                                    <Image src={bloomLogo} width="100" height="50" objectFit="contain" />
                                    <CloseIcon style={{ width: 30, height: 30 }} onClick={() => this.handleDrawerToggle()} />
                                </div>
                                <div style={{ margin: "20px" }}>
                                    {pages.length > 0 && pages.map((text, index) => (
                                        <ListItem key={index} onClick={() => Router.push(text.href)}>
                                            <Button>
                                                <Typography style={{ textTransform: "capitalize" }}>{text.title}</Typography>
                                            </Button>
                                        </ListItem>
                                    ))}
                                </div>
                            </List>
                            <div style={{ display: "flex", position: "absolute", bottom: 20, flexDirection: "column", width: "100%", padding: "0 20px 0 20px" }}>
                                <Button fullWidth variant="contained" style={{
                                    marginRight: 10, backgroundColor: "#1879BB", fontFamily: "MaisonNeue-Book", color: "#fff",
                                    textTransform: 'none',
                                    width: "100%",
                                    padding: "10px 10px",
                                    borderRadius: 0
                                }} onClick={() => Router.push({ pathname: "/test-registration-form-without-login" })} ><Typography className={classes.buttonText}>Schedule a Test</Typography></Button>
                                <Button fullWidth variant="contained" style={{
                                    marginRight: 10,
                                    marginTop: "15px",
                                    backgroundColor: "#1879BB",
                                    fontFamily: "MaisonNeue-Book",
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
                            <div style={{
                                // height: "450px",
                                width: "100vw",
                                backgroundImage: `url(images/new.jpg)`,
                                backgroundRepeat: "no-repeat",
                                //  objectPosition: "center",
                                backgroundSize: "cover",
                            }}>
                                <div style={{
                                    backgroundColor: "black",
                                    opacity: 0.8,
                                }}>
                                    <Grid container justifyContent="center" alignItems="center">
                                        <Grid item xs={12} md={9} >
                                            <Typography className={classes.covidTitle}>COVID-19 Testing in New York City</Typography>
                                            <Typography className={classes.secondTitle1}>Accurate results, reliable turnaround times. Appointments and walk-ins at our walk-up location in Midtown Manhattan</Typography>
                                            <div style={{ padding: "0px 90px" }}>
                                                <li className={classes.secondSubTitle1}><span style={{ fontWeight: "bold", fontSize: "16px" }}>Same Day RT-PCR Test: </span> Results within 3-4 hours. Valid for international travel.</li>
                                                <li className={classes.secondSubTitle2}><span style={{ fontWeight: "bold", fontSize: "16px" }}>Standard RT-PCR Test:</span> Results back the next day. Valid for international travel.</li>
                                                <li className={classes.secondSubTitle3}><span style={{ fontWeight: "bold", fontSize: "16px" }}>NAAT Test:</span> Molecular Test. Results within 3-4 hours. </li>
                                                <li className={classes.secondSubTitle4}><span style={{ fontWeight: "bold", fontSize: "16px" }}>Rapid Antigen Test: </span> Results within 1-2 hours </li>
                                            </div>
                                            <Typography className={classes.fdaCertifiedStyle}>FDA-certified shallow nasal swabs collections you do yourself. Quick access to major subway stations</Typography>
                                            <Typography className={classes.paymentTextStyle}>All card payments accepted.</Typography>
                                            <Typography className={classes.rtpcTextStyle}>Free RT-PCR tests are available to those experiencing symptoms or who had exposure.</Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            {/* <Toolbar style={{ justifyContent: "center", padding: "30px 10px 0px 0px" }}>
                                <Button fullWidth variant="contained" className={classes.buttonVariant} onClick={() => Router.push({ pathname: "/test-registration-form-without-login" })}><Typography className={classes.buttonText} >SCHEDULE TEST</Typography></Button>
                            </Toolbar> */}
                        </Grid>
                        <Grid container spacing={3} justifyContent="center" padding="30px">
                            <Grid item xs={12} sm={6} >
                                <div style={{ height: "400px", display: 'flex' }}>
                                    <Image src={swabtest} objectFit="cover" />
                                </div>
                                <Typography className={classes.cardTitle}>Shallow nasal swab you do yourself</Typography>
                                <Typography className={classes.testContenetTitle} style={{ marginRight: 30 }}>Bloom Labs uses FDA-certified shallow nasal swabs that you do on your own. <span style={{ fontWeight: "bold" }}  >You control your comfort and speed of collection.</span> This method is the most comfortable available while protecting you and frontline workers from infection.</Typography>
                                <Typography className={classes.linkTitle}>More information from the CDC on self-collection</Typography>

                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <div style={{ height: "400px", display: "flex" }}>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.1790361598282!2d-111.92967048517329!3d33.49671878076068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b0b3b8aebae4f%3A0x75cb5a41b5b53736!2sSaguaro%20Bloom!5e0!3m2!1sen!2sin!4v1639547578346!5m2!1sen!2sin" width="100%" height="100%"   loading="lazy"></iframe>
                                    {/* <iframe style={{ height: "400px", width: "100%" }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755.6344167719436!2d-73.9858281707825!3d40.750197698708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a98445e64f%3A0xe67c3bba4c3ebc9c!2s34%20W%2036th%20St%2C%20New%20York%2C%20NY%2010018%2C%20USA!5e0!3m2!1sen!2sin!4v1638239031923!5m2!1sen!2sin" loading="lazy" ></iframe> */}
                                </div>
                                <Typography className={classes.cardTitle} >Convenient Location</Typography>
                                <Typography className={classes.testContenetTitle} style={{ textAlign: "left" }}>Bloom Labs is located on 36th St. Between 5th and 6th Avenue. Just minutes from Herald Square and Penn Station. </Typography>
                            </Grid>
                        </Grid>
                        {/* <Toolbar style={{ justifyContent: "center", padding:"30px 10px 0px 0px" }}>
                                <Button fullWidth variant="contained" className={classes.buttonVariant} ><Typography className={classes.buttonText} >SCHEDULE TEST</Typography></Button>
                            </Toolbar> */}
                        <div style={{ justifyContent: "center", alignItems: "center", fontSize: 35 }}>Partners:</div>
                        <Grid container direction="row" spacing={4} alignItems='center' justifyContent="center" style={{ margin: "20px 25px 20px 25px" }}>

                            <Grid item xs={12} sm={6} >
                                <Image src={commontrusticon}
                                />
                                {/* <div style={{
                                    borderWidth: 15,
                                    borderStyle: 'solid',
                                    // border:"3px solid red",
                                    borderRadius: '50%',
                                    width: 70,
                                    height: 70,
                                    borderColor: "#193FA2",
                                    borderRightColor: '#2AC479'
                                }}>
                                </div> */}
                            </Grid>
                            {isMobileView !== undefined && isMobileView === false &&

                                <Grid container direction="row" item xs={12} sm={6}>
                                    <Image src={commonpass} height={80} width={450} />
                                    {/* <div style={{
                                        borderWidth: 15,
                                        borderStyle: 'solid',
                                        // border:"3px solid red",
                                        borderRadius: '50%',
                                        width: 70,
                                        height: 70,
                                        borderColor: "#193FA2",
                                        borderRightColor: '#2AC479'
                                    }}>
                                    </div> */}
                                    {/* <Typography style={{ fontSize: 35, padding: "0px 20px", fontSize: 50, fontWeight: "bold" }}>CommomPass</Typography> */}
                                </Grid>}
                            {isMobileView !== undefined && isMobileView === true &&
                                <Grid item xs={12} sm={6} >
                                    <Image src={mobilecommonpass} />
                                </Grid>
                            }

                        </Grid>
                        <Grid container direction="row" spacing={3} style={{ margin: "150px " }}>
                            <Grid item xs={12} sm={6} >
                                <Typography className={classes.linkTitle}>Bloom Labs</Typography>
                                <Typography className={classes.addressStyle}>(917) 456-4033</Typography>
                                <Typography className={classes.addressStyle}>help@bloomlabs.co</Typography>
                                <Typography className={classes.addressStyle}>Contact</Typography>
                                <Typography className={classes.addressStyle}>Bloom Blog</Typography>
                                <Typography className={classes.addressStyle}>Privacy Policy</Typography>
                                <Typography className={classes.addressStyle}>CLIA Certification # 33D2233329</Typography>
                                <Typography className={classes.addressStyle}>Copyright © 2021 Saguaro Bloom Diagnostics LLC. All rights reserved.</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Typography className={classes.linkTitle}>Locations</Typography>
                                <Typography className={classes.addressStyle}>Bloom Labs - Midtown</Typography>
                                <Typography className={classes.addressStyle}>34 W. 36th St</Typography>
                                <Typography className={classes.addressStyle}>New York, NY 10018</Typography>
                                <Typography className={classes.addressStyle}>Mon - Fri: 8am - 8pm   |   Sat - Sun:  10am - 6pm</Typography>
                            </Grid>
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
export default compose(withStyles(styles), connect(mapStateToProps))(LaunchScreen);