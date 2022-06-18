import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import bloomicon from '../../../../public/images/BloomLabsSideBySide.png';
// import testing from "../../../public/images/newyork.jpeg";
import Image from 'next/image'

import {
    Menu, Toolbar, MenuItem, Grid, Typography, Button, IconButton, FormControl, InputLabel, Select, Radio, RadioGroup, FormControlLabel, FormHelperText,
    CardContent,
    CardActions,
    Divider, Card, TextField
} from '@mui/material';
import { withStyles } from '@mui/styles';
import Router, { withRouter } from 'next/router';


const styles = theme => ({
    bloomTitle: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "#1879BB",
        fontWeight: "bold",
        fontSize: "22px",
        padding: "25px 0px",
        // border:""
    },
    testContenetTitle: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: "16px",
        padding: "0px 0px",
        lineHeight: 1.5
    },
    testContenetTitle1: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: "18px",
        padding: "15px 0px",
        lineHeight: 1.5
    },
    testContenetTitle2: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: "18px",
        padding: "0px 0px",
        lineHeight: 1.5
    },
    testContenetTitle3: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: "18px",
        padding: "10px 0px",
        lineHeight: 1.5
    },
    samedayTitle: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "#1879BB",
        fontWeight: "bold",
        fontSize: "22px",
        padding: "10px 0px"
    },
    rtpcrcontent: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: "16px",
        padding: "5px 0px",
        lineHeight: 1.5
    },
    gropTestingContent: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "#1879BB",
        fontWeight: "bold",
        fontSize: "20px",
        padding: "40px 0px"
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
        padding: "15px 10px",
        borderRadius: 0
    },
    lableStyle: {
        fontFamily: "HomepageBaukasten-Book",
        fontSize: 14,
        color: "#000"
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
const CssField = withStyles({
    root: {
        "& .MuiOutlinedInput-input": {
            fontSize: 14,
            color: "#000",
            fontFamily: "HomepageBaukasten-Book"
        },
        "& .MuiInputLabel-root": {
            fontSize: 14,
            fontFamily: "HomepageBaukasten-Book"
        },
        "& .MuiInputLabel-outlined": {
            fontSize: 14,
            fontFamily: "HomepageBaukasten-Book"
        },
        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
            fontSize: 14,
            fontFamily: "HomepageBaukasten-Book"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d4dade"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "#000"
        },
        "&:hover .MuiInputLabel-root": {
            color: "#000"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4C5C73"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#000",

        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#000",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#144787"
        }
    }
})(TextField);

const CssSelect = withStyles({
    root: {
        "& .MuiOutlinedInput-input": {
            fontSize: 14,
            color: "#000",
            fontFamily: "HomepageBaukasten-Book"
        },
        "& .MuiInputLabel-root": {
            fontSize: 14,
            fontFamily: "HomepageBaukasten-Book"
        },
        "& .MuiInputLabel-outlined": {
            fontSize: 14,
            fontFamily: "HomepageBaukasten-Book"
        },
        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
            fontSize: 14,
            fontFamily: "HomepageBaukasten-Book"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d4dade"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "#000"
        },
        "&:hover .MuiInputLabel-root": {
            color: "#000"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4C5C73"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#000",

        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#000",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#144787"
        }
    }
})(FormControl);

class GroupEvents extends Component {
    constructor() {
        super()
        this.state = {
            selectLoctions: ["Business", "Senior care Facility", "Non-Profit", "Community Service/ Youth Activities/ Church", "Other"],
            selectedOrganizationType: "Business",
            days: ["Daily", "Weekly", "Biweekly", "Monthly"],
            selectedDay: "Daily",
            peoplesCount: ["1-10", "10-25", "25-50", "50 or More"],
            selectedPeopleCount: "1-10",
            resultStatus: ["No, just send the result to our employess", "yes, our organization needs the test results"],
            resultConfirmation: "No, just send the result to our employess"
        }
    }
    render() {
        let { classes, openAlert, alertSeverity, alertMessage, } = this.props;
        return (
            <div style={{ display: "flex", flexDirection: "column", overflowX: "hidden" }}>
                <Grid container >
                    <Grid item xs={12}>
                        <div style={{
                            width: "100%",
                            background: `url(images/groupEvents.png)`,
                            // backgroundAttachment: "fixed",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: 'no-repeat',
                        }}>
                            <div style={{
                                backgroundColor: "rgba(0,0,0, 0.2)",
                                color: "#fff",
                                zIndex: 2,
                                height: "250px",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex"
                            }}>
                                <Grid container justifyContent="center" style={{ margin: "0 10px" }}>
                                    <Grid item xs={12} style={{ textAlign: "center" }}>
                                        <Typography style={{ color: "#fff", justifyContent: "center", alignItems: "center", fontSize: "calc((2.7 - 1) * 1.2vw + 1rem)" }}>Easily Test Your Organization For COVID-19</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <div style={{ padding: "20px 10px" }}>
                    <Grid container >
                        <Grid item xs={12}  >
                            <div style={{ padding: "0px 30px" }}>
                                <Typography className={classes.bloomTitle}>Bloom COVID-19 testing services helps your business not skip a beat</Typography>
                                <Typography className={classes.testContenetTitle}>Bloom provides Arizona businesses fast-turnaround Rapid Antigen and 1-3 day turn-around RT-PCR tests.</Typography>
                                <div style={{ padding: "0px 4px" }}>
                                    <ul>
                                        <li className={classes.testContenetTitle1}><span style={{ fontWeight: "bold", fontSize: "17px" }}>Business Accounts for Visits to Bloom Labs:</span> Set up a corporate Bloom account so your employees can visit one of our locations for simple, fast tests. We provide multiple invoicing & payment options as well as usage reporting for accounting. No minimums, commitments, or contracts.</li>
                                        <li className={classes.testContenetTitle2}><span style={{ fontWeight: "bold", fontSize: "17px" }}>On-Site Rapid Response Testing:</span> Bloom testing comes to your location with test results in under an hour from collection.</li>
                                        <li className={classes.testContenetTitle3}><span style={{ fontWeight: "bold", fontSize: "17px" }}>Event Management Testing: </span>Quickly and safely deploy a testing protocol for your event using Bloom’s lab. Provide us with a roster of guests & staff, and we’ll handle the rest.</li>
                                    </ul>
                                </div>
                                <Typography className={classes.samedayTitle}>Same Day RT-PCR Service</Typography>
                                <Typography className={classes.rtpcrcontent}>Sometimes you need an RT-PCR test on a faster or very precise timeline. Bloom provides a unique process RT-PCR test that provides the same top-grade PCR results back to patients the same day as their test. <span style={{ fontWeight: "bold" }}>Business travelers</span> frequently use this test for international or controlled travel requirements. Bloom sends people to destinations around the world with confidence and the proper paperwork needed for entry.</Typography>
                                <Typography className={classes.samedayTitle}>Something We’re Missing?  Questions?</Typography>
                                <Typography className={classes.rtpcrcontent}>We’re a fast-moving team of locals, and we’re here to help.  If you have any questions or requests, please contact us.</Typography>
                                <Typography className={classes.gropTestingContent}>Group Testing Contact Form</Typography>
                            </div>
                            <Grid container style={{ padding: "0 50px 50px 20px" }} justifyContent="center">
                                <Grid item xs={12} md={11} sm={11} >
                                    <Grid container justifyContent="center" spacing={4}>
                                        <Grid item xs={12}>
                                            <Typography fontWeight="normal" marginTop="10px" fontSize={15} fontFamily="HomepageBaukasten-Book" color="balck">Name *</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <CssField
                                                fullWidth
                                                size="small"
                                                id="first-name"
                                                label="First Name"
                                                name="first-name"
                                                autoComplete="off"
                                            // value={this.state.first_name}
                                            // onChange={(event) => this.setState({ first_name: event.target.value, first_name_error: false })}
                                            // helperText={this.state.first_name_error === true ? <Typography className={classes.errorText}>Please enter first name</Typography> : null}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <CssField
                                                fullWidth
                                                size="small"
                                                id="last_name"
                                                label="Last Name"
                                                name="last_name"
                                                autoComplete="off"
                                            // value={this.state.last_name}
                                            // onChange={(event) => this.setState({ last_name: event.target.value, last_name_error: false })}
                                            // helperText={this.state.last_name_error === true ? <Typography className={classes.errorText}>Please enter last name</Typography> : null}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="HomepageBaukasten-Book" color="balck">Email</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <CssField
                                            fullWidth
                                            size="small"
                                            id="street-address_line2"
                                            label="Email"
                                            name="street-address_line2"
                                            autoComplete="off"
                                        // value={this.state.street_address_line2}
                                        // onChange={(event) => this.setState({ street_address_line2: event.target.value, street_address_line2_error: false })}
                                        // helperText={this.state.street_address_line2_error === true ? <Typography className={classes.errorText}>Please enter street address line2</Typography> : null}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="HomepageBaukasten-Book" color="balck">What type is your organization?</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <CssSelect fullWidth size="small">
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth"
                                                value={this.state.selectedOrganizationType}
                                                onChange={(event) => this.setState({ selectedOrganizationType: event.target.value })}
                                                fullWidth
                                            >
                                                {this.state.selectLoctions.map((name) => (
                                                    <MenuItem key={name} style={{ fontSize: 14, fontFamily: "HomepageBaukasten-Book" }} value={name} >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                                {/* <MenuItem style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} ></MenuItem> */}
                                            </Select>
                                        </CssSelect>
                                        {this.state.selectedLocation_error === true && <Typography className={classes.errorText}>Please select location</Typography>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="HomepageBaukasten-Book" color="balck">Name of Organization *</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <CssField
                                            fullWidth
                                            size="small"
                                            id="street-address_line2"
                                            label="Organization name"
                                            name="street-address_line2"
                                            autoComplete="off"
                                        // value={this.state.street_address_line2}
                                        // onChange={(event) => this.setState({ street_address_line2: event.target.value, street_address_line2_error: false })}
                                        // helperText={this.state.street_address_line2_error === true ? <Typography className={classes.errorText}>Please enter street address line2</Typography> : null}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography fontWeight="normal" margin="20px 0 0 0" fontSize={15} fontFamily="HomepageBaukasten-Book" color="black">Approximate Date Needed for Testing *</Typography>
                                        <Typography fontWeight="normal" margin="10px 0 20px 0" fontSize={11} fontFamily="HomepageBaukasten-Book" color="rgba(0, 0, 0, 0.54)">If Need is Recurring, Provide First Date</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <CssField
                                                size="small"
                                                id="street-address_line2"
                                                label="MM"
                                                name="street-address_line2"
                                                autoComplete="off"
                                                style={{ width: 60 }}
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                inputProps={{ maxLength: 2, style: { textAlign: 'center' } }}
                                            // value={this.state.street_address_line2}
                                            // onChange={(event) => this.setState({ street_address_line2: event.target.value, street_address_line2_error: false })}
                                            // helperText={this.state.street_address_line2_error === true ? <Typography className={classes.errorText}>Please enter street address line2</Typography> : null}
                                            />
                                            <CssField
                                                size="small"
                                                id="street-address_line2"
                                                label="DD"
                                                name="street-address_line2"
                                                autoComplete="off"
                                                style={{ width: 60, marginLeft: "15px" }}
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                inputProps={{ maxLength: 2, style: { textAlign: 'center' } }}
                                            // value={this.state.street_address_line2}
                                            // onChange={(event) => this.setState({ street_address_line2: event.target.value, street_address_line2_error: false })}
                                            // helperText={this.state.street_address_line2_error === true ? <Typography className={classes.errorText}>Please enter street address line2</Typography> : null}
                                            />
                                            <CssField
                                                size="small"
                                                id="street-address_line2"
                                                label="YYYY"
                                                name="street-address_line2"
                                                autoComplete="off"
                                                style={{ width: 90, marginLeft: "15px" }}
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                inputProps={{ maxLength: 4, style: { textAlign: 'center' } }}
                                            // value={this.state.street_address_line2}
                                            // onChange={(event) => this.setState({ street_address_line2: event.target.value, street_address_line2_error: false })}
                                            // helperText={this.state.street_address_line2_error === true ? <Typography className={classes.errorText}>Please enter street address line2</Typography> : null}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="HomepageBaukasten-Book" color="balck">Phone Number</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <CssField
                                            fullWidth
                                            size="small"
                                            id="street-address_line2"
                                            label="Phone Number"
                                            name="street-address_line2"
                                            autoComplete="off"
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                        // value={this.state.street_address_line2}
                                        // onChange={(event) => this.setState({ street_address_line2: event.target.value, street_address_line2_error: false })}
                                        // helperText={this.state.street_address_line2_error === true ? <Typography className={classes.errorText}>Please enter street address line2</Typography> : null}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div>
                                            <Typography fontWeight="normal" margin="20px 0 10px 0" fontSize={15} fontFamily="HomepageBaukasten-Book" color="black">What type of testing do you need?</Typography>
                                            <FormControl component="fieldset">
                                                <RadioGroup aria-label="position" name="position" value={this.state.is_insurance_test}
                                                    onChange={(event) => this.setState({ is_insurance_test: event.target.value, is_insurance_test_error: false })} column>
                                                    <FormControlLabel
                                                        value="true"
                                                        control={<Radio style={{ color: "#20478e" }} />}
                                                        label={<span className={classes.lableStyle}>Recurring Testing</span>}
                                                        labelPlacement="end"
                                                    />
                                                    <FormControlLabel
                                                        value="false"
                                                        control={<Radio style={{ color: "#20478e" }} />}
                                                        label={<span className={classes.lableStyle}> One Time Testing</span>}
                                                        labelPlacement="end"
                                                    />
                                                </RadioGroup>
                                                {this.state.is_insurance_test_error === true && <FormHelperText style={{ color: "red" }}>{"Please select is insurance test"}</FormHelperText>}
                                            </FormControl>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="HomepageBaukasten-Book" color="balck">If recurring, how often will you need testing?</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <CssSelect fullWidth size="small">
                                            {/* <InputLabel id="demo-simple-select-autowidth-label">Daily</InputLabel> */}
                                            <Select
                                                //   sx={{ width: 80, marginRight: 0.5 }}
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth"
                                                value={this.state.selectedDay}
                                                onChange={(event) => this.setState({ selectedDay: event.target.value })}
                                            >
                                                {this.state.days.map((name, index) => (
                                                    <MenuItem key={index} style={{ fontSize: 14, fontFamily: "HomepageBaukasten-Book" }} value={name} >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                                {/* <MenuItem style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} ></MenuItem> */}
                                            </Select>
                                        </CssSelect>
                                        {this.state.selectedLocation_error === true && <Typography className={classes.errorText}>Please select location</Typography>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="HomepageBaukasten-Book" color="balck">How many people need to be tested?</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <CssSelect fullWidth size="small">
                                            {/* <InputLabel id="demo-simple-select-autowidth-label">Daily</InputLabel> */}
                                            <Select
                                                //   sx={{ width: 80, marginRight: 0.5 }}
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth"
                                                value={this.state.selectedPeopleCount}
                                                onChange={(event) => this.setState({ selectedPeopleCount: event.target.value })}
                                                fullWidth
                                            >
                                                {this.state.peoplesCount.map((name) => (
                                                    <MenuItem key={name} style={{ fontSize: 14, fontFamily: "HomepageBaukasten-Book" }} value={name} >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                                <MenuItem style={{ fontSize: 16, fontFamily: "HomepageBaukasten-Book" }} ></MenuItem>
                                            </Select>
                                        </CssSelect>
                                        {this.state.selectedLocation_error === true && <Typography className={classes.errorText}>Please select location</Typography>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography fontWeight="normal" margin="20px 0 10px 0" fontSize={15} fontFamily="HomepageBaukasten-Book" color="balck">Are you interested in on-site testing?</Typography>
                                        <Typography margin="0px 0px 10px" style={{ fontFamily: "HomepageBaukasten-Book", fontSize: 12, color: 'rgba(0, 0, 0, 0.54)' }}>On-site testing occurs at your place of business. </Typography>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <div>
                                            <FormControl component="fieldset">
                                                <RadioGroup aria-label="position" name="position" value={this.state.is_insurance_test}
                                                    onChange={(event) => this.setState({ is_insurance_test: event.target.value, is_insurance_test_error: false })} column>
                                                    <FormControlLabel
                                                        value="true"
                                                        control={<Radio style={{ color: "#20478e" }} />}
                                                        label={<span className={classes.lableStyle}>Yes</span>}
                                                        labelPlacement="end"
                                                    />
                                                    <FormControlLabel
                                                        value="false"
                                                        control={<Radio style={{ color: "#20478e" }} />}
                                                        label={<span className={classes.lableStyle}>No</span>}
                                                        labelPlacement="end"
                                                    />
                                                </RadioGroup>
                                                {this.state.is_insurance_test_error === true && <FormHelperText style={{ color: "red" }}>{"Please select is insurance test"}</FormHelperText>}
                                            </FormControl>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography fontWeight="normal" margin="20px 0 10px 0" fontSize={15} fontFamily="HomepageBaukasten-Book" color="balck">Who will cover the cost of testing?</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div>
                                            <FormControl component="fieldset">
                                                <RadioGroup aria-label="position" name="position" value={this.state.is_insurance_test}
                                                    onChange={(event) => this.setState({ is_insurance_test: event.target.value, is_insurance_test_error: false })} column>
                                                    <FormControlLabel
                                                        value="true"
                                                        control={<Radio style={{ color: "#20478e" }} />}
                                                        label={<span className={classes.lableStyle}> Our company will cover the cost of testing</span>}
                                                        labelPlacement="end"
                                                    />
                                                    <FormControlLabel
                                                        value="false"
                                                        control={<Radio style={{ color: "#20478e" }} />}
                                                        label={<span className={classes.lableStyle}> Employees will pay out of pocket (the company can offer a discount)</span>}
                                                        labelPlacement="end"
                                                    />
                                                </RadioGroup>
                                                {this.state.is_insurance_test_error === true && <FormHelperText style={{ color: "red" }}>{"Please select is insurance test"}</FormHelperText>}
                                            </FormControl>
                                        </div>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography fontWeight="normal" margin="20px 0 10px 0" fontSize={15} fontFamily="HomepageBaukasten-Book" color="balck">Do results need to be sent to someone other than the person taking the test?</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <CssSelect fullWidth size="small">

                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth"
                                                value={this.state.resultConfirmation}
                                                onChange={(event) => this.setState({ resultConfirmation: event.target.value })}
                                                fullWidth
                                            >
                                                {this.state.resultStatus.map((name) => (
                                                    <MenuItem key={name} style={{ fontSize: 14, fontFamily: "HomepageBaukasten-Book" }} value={name} >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </CssSelect>
                                        {this.state.selectedLocation_error === true && <Typography className={classes.errorText}>Please select location</Typography>}
                                    </Grid>
                                    <Grid item xs={8}>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Button fullWidth variant="contained" style={{ marginTop: "20px" }} className={classes.loginButton} ><Typography className={classes.buttonText} >Submit</Typography></Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="center" spacing={3} style={{ margin: "80px 20px 20px 20px" }}>
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
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {

    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(GroupEvents);