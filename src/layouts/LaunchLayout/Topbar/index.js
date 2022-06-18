import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
// import bloomicon from '../../../public/images/BloomLabsSideBySide.png';
import bloomicon from '../../../../public/images/BloomLabsSideBySide.png';
import bloomIconScottsdale from '../../../../public/images/ScottsdaleLogo.jpeg';
import bloomiconLogo from "../../../../public/images/Scottsdalefavicon.jpeg"
import bloomLogo from '../../../../public/images/BloomLogoNew.png';
import {
    Toolbar, Grid, Typography, Button, IconButton, Drawer, List, ListItem, Hidden
} from '@mui/material';
import { withStyles } from '@mui/styles';
import Image from 'next/image'
import Router, { withRouter } from 'next/router';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import { isMobile, isIpad } from "../../../helpers/constants";
import CloseIcon from '@mui/icons-material/Close';


const styles = theme => ({
    buttonText: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "center",
        color: "white",
        fontWeight: "normal",
        fontSize: 15,
        textTransform: "none"
        // padding: "0px 30px" 
    },
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
    loginButton: {
        // boxShadow: "0px 0px 0px 0px #E1E7ED",
        backgroundColor: "#1879BB",
        //marginBottom: "20px",
        fontFamily: "HomepageBaukasten-Book",
        color: "#fff",
        textTransform: 'none',
        width: "100px",
        //height:"10%",
        padding: "4px 0px",
        borderRadius: 0
    }
})


class Topbar extends Component {
    constructor() {
        super()
        this.state = {
            mobileOpen: false
        }
    }
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

    render() {
        let { classes } = this.props;
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
            <div>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Toolbar style={{ justifyContent: "space-between", padding: "10px 20px" }}>                           
                            <Hidden mdDown>
                            <Tooltip title="Home" arrow >
                                <div>
                                    <Image onClick={() => Router.push({ pathname: "/" })} src={bloomIconScottsdale} width="250" height="110" objectFit="contain" />
                                </div>
                            </Tooltip>
                            </Hidden>
                            <Hidden mdUp>
                            <Tooltip title="Home" arrow>
                                <div>
                                    <Image onClick={() => Router.push({ pathname: "/" })} src={bloomiconLogo} width="80" height="40" objectFit="contain" />
                                </div>
                            </Tooltip>
                            </Hidden>                            
                            <Hidden mdUp>
                            <Button fullWidth variant="contained"
                                        //onClick={() => Router.push({ pathname: "/test-registration-form-without-login" })} 
                                        onClick={() => Router.push({ pathname: "/schedule-appointment" })}
                                        className={classes.scheduleTestButton}
                                    >
                                        <Typography className={classes.buttonText}>Schedule a Test</Typography>
                                    </Button>
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
                                            <Typography onClick={() => Router.push({pathname: "/travel-advisor"})} style={{ color: "black", padding: "0px 10px", cursor: "pointer", fontFamily: "HomepageBaukasten-Book", fontSize: "1em", textDecoration: typeof window !== 'undefined' && Router.pathname === "/travel-advisor" ? "underline" : "none"}}>Travel Advisor</Typography>
                                        </Tooltip>
                                        <Tooltip title="Group Events" arrow>
                                            <Typography onClick={() => Router.push({ pathname: "/groupEvents" })} style={{ color: "black", padding: "0px 10px", cursor: "pointer", fontFamily: "HomepageBaukasten-Book", textDecoration: typeof window !== 'undefined' && Router.pathname === "/groupEvents" ? "underline" : "none" }}>Group/Events</Typography>
                                        </Tooltip>
                                        <Tooltip title="Faq" arrow>
                                            <Typography onClick={() => Router.push({ pathname: "/faq" })} style={{ color: "black", padding: "0px 10px", cursor: "pointer", fontFamily: "HomepageBaukasten-Book", textDecoration: typeof window !== 'undefined' && Router.pathname === "/faq" ? "underline" : "none" }}>FAQ</Typography>
                                        </Tooltip>                                  
                                    </div>
                                    <Button fullWidth variant="contained"
                                        //onClick={() => Router.push({ pathname: "/test-registration-form-without-login" })} 
                                        onClick={() => Router.push({ pathname: "/schedule-appointment" })}
                                        className={classes.scheduleTestButton}
                                    >
                                        <Typography className={classes.buttonText}>Schedule a Test</Typography>
                                    </Button>
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
                                    <Image src={bloomiconLogo} width="100" height="50" objectFit="contain" />
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
                                    marginRight: 10, backgroundColor: "#1879BB", fontFamily: "MaisonNeue-Book", color: "#fff",
                                    textTransform: 'none',
                                    width: "100%",
                                    padding: "10px 10px",
                                    borderRadius: 0
                                }}
                                    //onClick={() => Router.push({ pathname: "/test-registration-form-without-login" })} 
                                    onClick={() => Router.push({ pathname: "/schedule-appointment" })}
                                >
                                    <Typography className={classes.buttonText}>Schedule a Test</Typography>
                                </Button>
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}
export default compose(withStyles(styles), connect(mapStateToProps))(Topbar);