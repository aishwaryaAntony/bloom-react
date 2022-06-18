import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from '@mui/styles';

const styles = (theme) => ({
    root: {
        display: "flex",
        width: "100%",
        height: "100vh"
    }
})

class PrivacyPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let { classes } = this.props;
        return (
            <div className={classes.root}>
                <iframe width="100%" height="100%" src={"./pdf/PrivacyPolicy.pdf"} />
            </div>
        )
    }
}

export default compose(withStyles(styles), connect(null))(PrivacyPolicy)
