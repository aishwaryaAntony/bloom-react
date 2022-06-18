import React, { Component } from 'react';
import {
    Grid
} from '@mui/material';
import { withStyles } from '@mui/styles';
import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { compose } from "redux";

const styles = theme => ({
    card: {
        border: "1px solid #e5e5e5",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        //marginTop: 15,
        borderRadius: 0,
        backgroundColor: "#fff"
    },
    root: {
        padding: 20
    },
});

class ProvideFeedback extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                 <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={11} sm={10} md={10} lg={10}>
                        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdnekXfP-6TBLkAvdPpWsrD2h3fXKpLVFE1zp9coOTSc2kzRA/viewform?embedded=true" width="100%" height="1420" frameBorder="0" scrolling="no" loading="eager">Loading…</iframe>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.sessionReducer.user
    }
}

ProvideFeedback.layout = "default";

export default compose(withStyles(styles), connect(mapStateToProps))(ProvideFeedback);
