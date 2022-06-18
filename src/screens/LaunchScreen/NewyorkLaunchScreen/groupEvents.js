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
        fontWeight: "normal",
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
        padding: "0px 0px"
    },
    testContenetTitle1: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: "18px",
        padding: "15px 0px"
    },
    testContenetTitle2: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: "18px",
        padding: "0px 0px"
    },
    testContenetTitle3: {
        fontFamily: "MaisonNeue-Book",
        textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: "18px",
        padding: "10px 0px"
    },
    samedayTitle: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "#1879BB",
        fontWeight: "bold",
        fontSize: "20px",
        padding: "5px 0px"
    },
    rtpcrcontent: {
        fontFamily: "HomepageBaukasten-Book",
        textAlign: "left",
        color: "black",
        fontWeight: "normal",
        fontSize: "16px",
        padding: "5px 0px"
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
        fontFamily: "MaisonNeue-Book",
        color: "#fff",
        textTransform: 'none',
        width: "100px",
        //height:"10%",
        padding: "4px 0px",
        borderRadius: 0
    },
    lableStyle: {
        fontFamily: "Futura-Book",
        fontSize: 15,
        color: 'rgba(0, 0, 0, 0.54)'
    },
})
const CssField = withStyles({
    root: {
        "& .MuiOutlinedInput-input": {
            fontSize: 16,
            color: "#144787",
            fontFamily: "Futura-Heavy"
        },
        "& .MuiInputLabel-root": {
            fontSize: 16,
            fontFamily: "Futura-Heavy"
        },
        "& .MuiInputLabel-outlined": {
            fontSize: 16,
            fontFamily: "Futura-Heavy"
        },
        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
            fontSize: 16,
            fontFamily: "Futura-Heavy"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d4dade"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "#144787"
        },
        "&:hover .MuiInputLabel-root": {
            color: "#4C5C73"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4C5C73"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#144787",

        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#144787",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#144787"
        }
    }
})(TextField);

const CssSelect = withStyles({
    root: {
        "& .MuiOutlinedInput-input": {
            fontSize: 16,
            color: "#144787",
            fontFamily: "Futura-Heavy"
        },
        "& .MuiInputLabel-root": {
            fontSize: 16,
            fontFamily: "Futura-Heavy"
        },
        "& .MuiInputLabel-outlined": {
            fontSize: 16,
            fontFamily: "Futura-Heavy"
        },
        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
            fontSize: 16,
            fontFamily: "Futura-Heavy"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d4dade"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "#144787"
        },
        "&:hover .MuiInputLabel-root": {
            color: "#4C5C73"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4C5C73"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#144787",

        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#144787",
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
            selectLoctions: ["Business", "Senior care Facility", "Non-Porfit,Other"],
            days: ["Daily", "Weekly", "Monthly"],
            peoplesCount: ["1-10", "10-25", "25-50", "50 or More"],
            resultStatus: ["No,just send the result to our employess", "yes,our organization needs the test results"]
        }
    }
    render() {
        let { classes, openAlert, alertSeverity, alertMessage, } = this.props;
        return (
            <div>
                <Grid container >
                    <Grid item xs={12}>
                        <div style={{
                            height: "450px",
                            width: "100vw",
                            backgroundImage: `url(images/eventicon.jpg)`,
                            backgroundRepeat: "no-repeat",
                            //  objectPosition: "center",
                            backgroundSize: "cover",
                        }}>
                            <div style={{
                                display: "flex",
                                padding: "0 14vw", backgroundColor: "black",
                                opacity: 0.8,
                            }}>
                                {/* <div style={{ color: "#fff", justifyContent: "center", alignItems: "center", fontSize: 35, fontWeight: "bold" }}>Easily Test Your Organization For COVID-19</div> */}
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <div style={{ padding: "20px" }}>
                    <Grid container >
                        <Grid item xs={12}  >
                            <div style={{ padding: "0px 30px" }}>
                                <Typography className={classes.bloomTitle}>Bloom COVID-19 testing services helps your business not skip a beat</Typography>
                                <Typography className={classes.testContenetTitle}> Bloom provides New york businesses fast-turnaround Rapid Antigen and 1-3 day turn-around RT-PCR tests.</Typography>
                                <div style={{ padding: "0px 30px" }}>
                                    <li className={classes.testContenetTitle1}><span style={{ fontWeight: "bold", fontSize: "17px" }}>Business Accounts for Visits to Bloom Labs:</span> Set up a corporate Bloom account so your employees can visit one of our locations for simple, fast tests. We provide multiple invoicing & payment options as well as usage reporting for accounting. No minimums, commitments, or contracts.</li>
                                    <li className={classes.testContenetTitle2}><span style={{ fontWeight: "bold", fontSize: "17px" }}>On-Site Rapid Response Testing:</span> Bloom testing comes to your location with test results in under an hour from collection.</li>
                                    <li className={classes.testContenetTitle3}><span style={{ fontWeight: "bold", fontSize: "17px" }}>Event Management Testing: </span>Quickly and safely deploy a testing protocol for your event using Bloom’s lab. Provide us with a roster of guests & staff, and we’ll handle the rest.</li>
                                </div>
                                <Typography className={classes.samedayTitle}>Same Day RT-PCR Service</Typography>
                                <Typography className={classes.rtpcrcontent}>Sometimes you need an RT-PCR test on a faster or very precise timeline. Bloom provides a unique process RT-PCR test that provides the same top-grade PCR results back to patients the same day as their test. Business travelers frequently use this test for international or controlled travel requirements. Bloom sends people to destinations around the world with confidence and the proper paperwork needed for entry.</Typography>
                                <Typography className={classes.samedayTitle}>Something We’re Missing?  Questions?</Typography>
                                <Typography className={classes.rtpcrcontent}>We’re a fast-moving team of locals, and we’re here to help.  If you have any questions or requests, please contact us.</Typography>
                                <Typography className={classes.gropTestingContent}>Group Testing Contact Form</Typography>
                            </div>
                            <Grid container style={{ padding: "0 50px 50px 20px" }} justifyContent="center">
                                <Grid item xs={12} md={11} sm={11} >
                                    <Grid container justifyContent="center" spacing={4}>
                                        <Grid item xs={12}>
                                            <Typography fontWeight="normal" marginTop="10px" fontSize={15} fontFamily="Futura-Heavy" color="balck">Name *</Typography>
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
                                    <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="Futura-Heavy" color="balck">Email</Typography>
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
                                    <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="Futura-Heavy" color="balck">What type is your organization?</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <CssSelect fullWidth size="small">
                                        <InputLabel id="demo-simple-select-autowidth-label">Select location</InputLabel>
                                        <Select

                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            // value={this.state.location}
                                            // onChange={this.handleLocation}
                                            fullWidth
                                            label="Select Location"
                                        >
                                            {this.state.selectLoctions.map((name) => (
                                                <MenuItem key={name} style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} value={name} >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                            {/* <MenuItem style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} ></MenuItem> */}
                                        </Select>
                                    </CssSelect>
                                    {this.state.selectedLocation_error === true && <Typography className={classes.errorText}>Please select location</Typography>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="Futura-Heavy" color="balck">Name of Organization *</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <CssField
                                        fullWidth
                                        size="small"
                                        id="street-address_line2"
                                        label="Street Address Line2"
                                        name="street-address_line2"
                                        autoComplete="off"
                                    // value={this.state.street_address_line2}
                                    // onChange={(event) => this.setState({ street_address_line2: event.target.value, street_address_line2_error: false })}
                                    // helperText={this.state.street_address_line2_error === true ? <Typography className={classes.errorText}>Please enter street address line2</Typography> : null}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="Futura-Heavy" color="balck">Phone Number</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <CssField
                                        fullWidth
                                        size="small"
                                        id="street-address_line2"
                                        label="Phone Number"
                                        name="street-address_line2"
                                        autoComplete="off"
                                    // value={this.state.street_address_line2}
                                    // onChange={(event) => this.setState({ street_address_line2: event.target.value, street_address_line2_error: false })}
                                    // helperText={this.state.street_address_line2_error === true ? <Typography className={classes.errorText}>Please enter street address line2</Typography> : null}
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <div>
                                        <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="Futura-Heavy" color="balck">What type of testing do you need?</Typography>
                                        <FormControl component="fieldset">
                                            <RadioGroup aria-label="position" name="position" value={this.state.is_insurance_test}
                                                onChange={(event) => this.setState({ is_insurance_test: event.target.value, is_insurance_test_error: false })} row>
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
                                    <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="Futura-Heavy" color="balck">If recurring, how often will you need testing?</Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <CssSelect fullWidth size="small">
                                        {/* <InputLabel id="demo-simple-select-autowidth-label">Daily</InputLabel> */}
                                        <Select
                                            //   sx={{ width: 80, marginRight: 0.5 }}
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                        // value={this.state.location}
                                        // onChange={this.handleLocation}
                                        >
                                            {this.state.days.map((name) => (
                                                <MenuItem key={name} style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} value={name} >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                            {/* <MenuItem style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} ></MenuItem> */}
                                        </Select>
                                    </CssSelect>
                                    {this.state.selectedLocation_error === true && <Typography className={classes.errorText}>Please select location</Typography>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="Futura-Heavy" color="balck">How many people need to be tested?</Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <CssSelect fullWidth size="small">
                                        {/* <InputLabel id="demo-simple-select-autowidth-label">Daily</InputLabel> */}
                                        <Select
                                            //   sx={{ width: 80, marginRight: 0.5 }}
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            // value={this.state.location}
                                            // onChange={this.handleLocation}
                                            fullWidth

                                        >
                                            {this.state.peoplesCount.map((name) => (
                                                <MenuItem key={name} style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} value={name} >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                            <MenuItem style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} ></MenuItem>
                                        </Select>
                                    </CssSelect>
                                    {this.state.selectedLocation_error === true && <Typography className={classes.errorText}>Please select location</Typography>}
                                </Grid>
                                <Grid item xs={12}>
                                </Grid>
                                <Grid item xs={6} >
                                    <div>
                                        <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="Futura-Heavy" color="balck">Are you interested in on-site testing?</Typography>
                                        <Typography margin="0px 0px 10px" style={{ fontFamily: "Futura-Book", fontSize: 12, color: 'rgba(0, 0, 0, 0.54)' }}>On-site testing occurs at your place of business. </Typography>
                                        <FormControl component="fieldset">
                                            <RadioGroup aria-label="position" name="position" value={this.state.is_insurance_test}
                                                onChange={(event) => this.setState({ is_insurance_test: event.target.value, is_insurance_test_error: false })} row>
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
                                <Grid item xs={6}>
                                    {/* <Typography fontWeight="normal" marginTop="5px" fontSize={15} fontFamily="Futura-Heavy" color="balck">Who will cover the cost of testing?</Typography> */}
                                </Grid>
                                <Grid item xs={6} >
                                    <div>
                                        <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="Futura-Heavy" color="balck">What type of testing do you need?</Typography>
                                        <FormControl component="fieldset">
                                            <RadioGroup aria-label="position" name="position" value={this.state.is_insurance_test}
                                                onChange={(event) => this.setState({ is_insurance_test: event.target.value, is_insurance_test_error: false })} row>
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
                                    <Typography fontWeight="normal" margin="20px 0 20px 0" fontSize={15} fontFamily="Futura-Heavy" color="balck">Do results need to be sent to someone other than the person taking the test?</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <CssSelect fullWidth size="small">
                                        <InputLabel id="demo-simple-select-autowidth-label">Select location</InputLabel>
                                        <Select

                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            // value={this.state.location}
                                            // onChange={this.handleLocation}
                                            fullWidth
                                            label="Select Location"
                                        >


                                            {this.state.resultStatus.map((name) => (
                                                <MenuItem key={name} style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} value={name} >
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
                                    <Button fullWidth variant="contained" style={{marginTop: "20px"}} className={classes.loginButton} ><Typography className={classes.buttonText} >Submit</Typography></Button>
                                </Grid>
                                </Grid>                           
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

export default compose(withStyles(styles), connect(mapStateToProps))(GroupEvents);