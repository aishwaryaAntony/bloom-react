import React, { Component } from 'react';
import {
    Hidden, Toolbar, Grid, Typography, Button,
    Divider,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { compose } from "redux";
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const styles = theme => ({
    card: {
        border: "1px solid #e5e5e5",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        borderRadius: 0,
        backgroundColor: "#fff"
    },
    paper: {
        borderRadius: 0,
        backgroundColor: "#efefef",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
    },
    buttonVariant: {
        boxShadow: "0px 0px 0px 0px #E1E7ED",
        backgroundColor: "#5D88C0",
        marginBottom: "10px",
        fontFamily: "MaisonNeue-Book",
        color: "#fff",
        borderRadius: 3,
        textTransform: 'none',
    },
})

const data = [
    {
        'test_name': "Rapid Antigent Test",
        'number': "B760Z10-120-A05",
        'date': "18/11/2010",
        'status': "PENDDING"
    },
    {
        'test_name': "HRSA PCR Test",
        'number': "B760Z11-120-A06",
        'date': "19/11/2010",
        'status': "READYTOVIEW"
    },
    {
        'test_name': "RT-PCR Test",
        'number': "B760Z12-120-A07",
        'date': "20/11/2010",
        'status': "PENDDING"
    },
    {
        'test_name': "Insurance PCR Test",
        'number': "B760Z13-120-A08",
        'date': "21/11/2010",
        'status': "READYTOVIEW"
    },
    {
        'test_name': "RT-PCR Test",
        'number': "B760Z12-120-A07",
        'date': "20/11/2010",
        'status': "PENDDING"
    },
    {
        'test_name': "Insurance PCR Test",
        'number': "B760Z13-120-A08",
        'date': "21/11/2010",
        'status': "READYTOVIEW"
    }
]

class ViewAllReports extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    redirectToTestRegistration = () => {
        Router.push('/customer/test-registration-form')
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{
                margin: "10px 15px 40px 15px",
                backgroundColor: "white",
                backgroundRepeat: "no-repeat",
            }}>
                <Hidden lgUp>
                    <Toolbar style={{ justifyContent: "center", padding: "5px 0px 0px 0px" }}>
                        <Button fullWidth variant="contained" onClick={() => this.redirectToTestRegistration()} className={classes.buttonVariant} >Register For New Test</Button>
                    </Toolbar>
                </Hidden>
                <Hidden lgDown>
                    <Toolbar style={{ justifyContent: "center", padding: "5px 0px 0px 0px" }}>
                        <Button variant="contained" onClick={() => this.redirectToTestRegistration()} className={classes.buttonVariant} >Register For New Test</Button>
                    </Toolbar>
                </Hidden>
                <Grid >
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                        <DescriptionIcon /> <Typography style={{ marginLeft: 10 }}>Recent Registrations </Typography>
                    </div>
                    {data.length > 0 && data.map((item, index) =>
                        <div>
                            <div style={{ margin: 20 }} key={index}>
                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                                    <InsertDriveFileIcon style={{ width: 20, height: 20 }} /> <Typography style={{ marginLeft: 10, fontSize: 13, alignSelf: 'center' }}>TEST NAME1 </Typography>
                                </div>
                                <Typography style={{ fontSize: 10, marginLeft: 20, padding: 10 }}>{item.test_name}-{item.number}-{item.date} </Typography>
                            </div>
                            <Divider />
                        </div>
                    )}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // user: state.sessionReducer.user
    }
}

ViewAllReports.layout = "default";

export default compose(withStyles(styles), connect(mapStateToProps))(ViewAllReports);

