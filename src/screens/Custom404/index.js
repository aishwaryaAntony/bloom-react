import React, { Component } from "react";
import { Grid, Typography, Button, Dialog, DialogTitle, DialogActions, DialogContent, InputLabel, FormControlLabel, Checkbox, Autocomplete, TextField, MenuItem, FormControl, Select } from '@mui/material';
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { compose } from "redux";
import Image from 'next/image';
import moment from 'moment';
import Router, { withRouter } from 'next/router';
import bloomIconLogo from '../../../public/images/ScottsdaleLogo.jpeg';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100vh',        
    flexDirection: "column",
    padding: "20px"
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    marginTop: 30
  },

})

class Custom404 extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container justifyContent="center" >
          <Grid item xs={12} style={{ border: 1, borderRadius: 10, marginTop: "20px" }} >
            <div style={{ border: 1, display: "flex", flexDirection: "column", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", width: 250, height: 70, }}>
                <div style={{ width: 150, height: 50, margin: 10 }}>
                  <Image src={bloomIconLogo} />
                </div>
              </div>
              <div style={{ display: "flex", backgroundColor: "white", justifyContent: "center", alignItems: "center", width: 250, height: 300, flexDirection: "column" }}>
                <Typography style={{ fontSize: 25, color: "#00000" }}>404</Typography>
                <Typography style={{ fontSize: 25, color: "#00000" }}> PAGE NOT FOUND</Typography>

              </div>
              <div style={{ height: 5 }} />
            </div>
          </Grid>
          <Button variant="contained" onClick={() => Router.push({ pathname: '/' })} size={"medium"} style={{ backgroundColor: "#345C8C", width: 100, height: 30, borderRadius: 10 }}>
            <Typography fontWeight="bold" fontSize={13} textAlign="center" fontFamily="Futura-Heavy" color="white" style={{ textTransform: "capitalize" }} >HOME</Typography>
          </Button>
        </Grid>

        <div style={{ height: 20 }} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userQrCode: state.formReducer.userQrCode,
    user: state.sessionReducer.user
  }
}


Custom404.layout = 'login'
export default compose(withStyles(styles), connect(mapStateToProps))(Custom404);
