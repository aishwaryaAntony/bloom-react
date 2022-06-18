import React, { Component } from "react";
import { Grid, Typography, List, Collapse, ListItemButton, Button, Dialog, IconButton, DialogTitle, DialogActions, DialogContent, TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { compose } from "redux";
import Router from 'next/router';
import { fetchAllLocationTestType } from "../../store/actions/locationTestTypeAction";
import { object } from "prop-types";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import QRCode from "react-qr-code";
import { TEST_REGISTER_FORM_URL } from '../../helpers/constants'

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column",
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "20%",
        paddingRight: "20%",
        backgroundColor: "#eaeaea",
        // height: "100vh"              
    }
})



class ScheduleTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CollapseOpen: false
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchAllLocationTestType())
    }
    groupBy = (objectArray, property) => {
        return objectArray.reduce((acc, obj) => {
            const key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            // Add object to list for given key's value
            acc[key].push(obj);
            return acc;
        }, {});
    }

    handleClick = (item) => {
        this.setState(prevState => (
            { [item]: !prevState[item] }
        ))
    }

    render() {
        const { classes, locationsTestType } = this.props;
        let filteredLocationTestTypes = locationsTestType !== undefined && locationsTestType !== null && this.groupBy(locationsTestType.map((item) => ({ id: item.id, location: item.location.name, testType: item.testType.name })), 'location')
        let result = Object.keys(filteredLocationTestTypes).map(key => ({
            location: key,
            testTypes: filteredLocationTestTypes[key]
        }));
        // let groupedByLocation =  this.groupBy(filteredLocationTestTypes, 'location')  
        return (
            <div className={classes.root}>
                <Typography fontWeight="bold" fontSize={25} textAlign="center" fontFamily="Futura-Heavy" color="#144787">Schedule Test</Typography>
                <Grid container justifyContent="center" spacing={4} style={{ margin: "20px", display: 'flex' }} >
                    {result.map((item, index) =>
                        <Grid item sm={6}>
                            <div>
                                <Typography color="#144787" fontWeight="bold" fontSize={16} textAlign="left" fontFamily="Futura-Heavy">{item.location}</Typography>
                            </div>
                            <div style={{ boxShadow: "inset 0 0 10px #9E9E9E", backgroundColor: "#fff", borderTop: "3px solid #1E90FF", borderRadius: 5 }}>
                                <div style={{ padding: 20 }}>
                                    {item.testTypes.map((i, index) => {
                                        //  const open = this.state[index] || false;
                                        return (
                                            <div key={index}>
                                                <List>
                                                    <Grid container >
                                                        <Grid item xs={10}>
                                                            <ListItemButton onClick={() => this.handleClick(i.id)}>
                                                                <Typography color="#144787" fontWeight="bold" fontSize={16} textAlign="left" fontFamily="Futura-Heavy">{i.testType}</Typography>
                                                            </ListItemButton>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <div onClick={() => this.handleClick(i.id)}>
                                                            {this.state[i.id] ? <ExpandLess /> : <ExpandMore />}
                                                            </div>
                                                        </Grid>
                                                        <Collapse in={this.state[i.id]} timeout="auto" unmountOnExit>
                                                            <QRCode size={100} value={`${TEST_REGISTER_FORM_URL}test-registration-form-without-login/${i.id}`} />
                                                        </Collapse>
                                                    </Grid>
                                                </List>

                                                {/* <Typography>{i.testType}</Typography> */}
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                            </div>
                        </Grid>
                    )}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        locationsTestType: state.locationTestTypeReducer.locationsTestType
    }
}

ScheduleTest.layout = "login";

export default compose(withStyles(styles), connect(mapStateToProps))(ScheduleTest);
