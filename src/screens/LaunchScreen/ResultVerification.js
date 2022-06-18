import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import Image from 'next/image'
import ResultVerificationImage from "../../../public/images/ResultVerificationImage.png"
import {
    Menu, Toolbar, MenuItem, Grid, Typography, Button, IconButton, FormControl, InputLabel, Select, Radio, RadioGroup, FormControlLabel, FormHelperText,
    CardContent,
    CardActions,
    Divider, Card, TextField
} from '@mui/material';
import { withStyles } from '@mui/styles';
import Router, { withRouter } from 'next/router';


const styles = theme => ({
    cardTitle: {
        fontFamily: "HomepageBaukasten-Bold",
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
        padding: "6px 0px"
    },
    linkTitle: {
        fontFamily: "HomepageBaukasten-Book",
        color: "#1879BB",
        fontWeight: "lighter",
        fontSize: "20px",
        padding: "10px 0px",
        textDecoration: "underline"
    },
    titleText: {
        fontSize: "calc((2.7 - 1) * 1.2vw + 1rem)",
        color: "#000",
        padding: "20px 10px",
        textAlign: "center",
        fontFamily: "HomepageBaukasten-Book",
        fontWeight: "bold"
    },
    bodyText: {
        fontSize: "22px",
        fontFamily: "HomepageBaukasten-Bold",
        textAlign: "center",
        color: "#000",
        padding: "10px 0"
    }
})

class ResultVerification extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        let { classes } = this.props;
        return (
            <div style={{ display: "flex" }}>
                <Grid container justifyContent=" center">
                    <Grid item xs={12}>
                        <Typography className={classes.titleText}>Test Verification Service</Typography>
                    </Grid>
                    <Grid item xs={12} md={5} sm={6} style={{ padding: "10px 15px" }}>
                        <Image src={ResultVerificationImage} objectFit="cover" />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Typography className={classes.bodyText}>This test was completed by Saguaro Bloom Labs in Scottsdale, Arizona.</Typography>
                            <Typography className={classes.bodyText}>To verify the results of this test, please call us at <a href="tel:555-666-7777"><span style={{ color: "#1879BB", textDecoration: "underline", cursor: "pointer" }} >(856) 502-0781</span></a> or email us at <a href="mailto:support@bloomsafely.com"><span style={{ color: "#1879BB", textDecoration: "underline", cursor: "pointer" }}>support@bloomsafely.com</span></a></Typography>
                        </div>
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
                                <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>Saguaro Bloom Business and Group COVID-19 Testing</Typography>
                                <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>Privacy Policy</Typography>
                                <Typography className={classes.linkTitle} style={{ padding: "5px 0", fontSize: "16px", cursor: "pointer" }}>Terms of Service</Typography>  */}
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
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {

    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(ResultVerification);