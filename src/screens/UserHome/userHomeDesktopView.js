import React, { Component } from 'react';
import {
    Toolbar, MenuItem, Grid, Typography, Button, Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper, styled, tableCellClasses, IconButton, Tooltip
    , Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Avatar
} from '@mui/material';
import { withStyles } from '@mui/styles';
import fileDownload from 'js-file-download';
import Axios from 'axios';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import Router, { withRouter } from 'next/router';
import { BsPlusCircleFill } from "react-icons/bs";
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
    paper: {
        //\\minWidth: 540,
        borderRadius: 0,
        backgroundColor: "#efefef",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
    },
    tableHead: {
        backgroundColor: "#fff",
    },
    tableRow: {
        padding: 0,
        height: '35px'
    },
    tableCell: {
        fontSize: 14,
        padding: "10px 10px",
        whiteSpace: 'nowrap',
        fontFamily: 'Lato-Regular',
    },
    tableCellBoldText: {
        fontSize: 14,
        fontWeight: "bold",
        whiteSpace: 'nowrap',
        fontFamily: 'Lato-Regular',
    },
    tableCellText: {
        fontSize: 13,
        whiteSpace: 'initial',
        fontFamily: 'Lato-Regular',
    },
    tableHeadCell: {
        padding: "10px 10px",
        fontSize: 15,
        // fontWeight: "bold",
        // color: "#1D8878",
        color: '#00bcd4',
        // backgroundColor: theme.palette.primary.light,
        backgroundColor: '#fff',
        // borderRight: "1px solid #cccccc",
        //border: '1px solid #e5e5e5',
        fontFamily: 'Lato-Bold',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    iconButton: {
        padding: 3,
        borderRadius: 0
    },
    tableHeadLastCell: {
        padding: "10px 10px",
        fontSize: 12,
        // fontWeight: "bold",
        // color: "#1D8878",
        color: '#283252',
        // backgroundColor: theme.palette.primary.light,
        backgroundColor: '#fff',
        border: '1px solid #e5e5e5',
        fontFamily: 'Lato-Bold',
        textTransform: 'uppercase'
    },
    buttonVariant: {
        boxShadow: "0px 0px 0px 0px #E1E7ED",
        backgroundColor: "#5D88C0",
        margin: "15px 0px",
        fontFamily: "MaisonNeue-Book",
        color: "#fff",
        borderRadius: 3,
        textTransform: 'none'
        //padding: "8px 20px",
        // height: "fit-content",
        // '&:hover': {
        //     backgroundColor: "#2FB0D5",
        // },
    },
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        //backgroundColor: theme.palette.common.black,
        color: '#00bcd4',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




class UserHomeDesktopView extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    // download_pdf = () => {
    //     Axios({
    //         url: 'http://africau.edu/images/default/sample.pdf',
    //         method: 'GET',
    //         responseType: 'blob'
    //     }).then((rse) => {
    //         fileDownload(res.data, 'sample.pdf');
    //     })
    // }

    redirectToTestRegistration = () => {
        Router.push('/test-registration-form')
    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{
                margin: 10,
                backgroundColor: "white",
                backgroundRepeat: "no-repeat",
                // display: 'flex'

            }}>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} >

                        <Typography fontWeight="bold" fontSize={25} fontFamily="Futura-Heavy" color="#144787" style={{ padding: 5 }}>Hello, Jane Doe</Typography>
                        {/* <Typography style={{ fontSize: 25, fontWeight: 'bold', padding: 10 }}> Hello, Jane Doe</Typography> */}
                        <Toolbar style={{ justifyContent: "space-between", padding: "5px 20px 0px 0px" }}>
                            <Typography style={{ fontSize: 20, fontFamily: "Futura-Heavy", color: "#144787", paddingLeft: 20 }}> Test Reports</Typography>
                            <Tooltip title="New Test Registration">
                                <IconButton className={classes.iconButton} onClick={() => this.redirectToTestRegistration()}>
                                    <BsPlusCircleFill size={35} color={"green"} />
                                </IconButton>
                            </Tooltip>
                        </Toolbar>

                        {/* <Toolbar style={{ justifyContent: "space-between", padding: "5px 20px 0px 0px" }}>
                             <Typography style={{ fontSize: 25, fontWeight: 'bold', padding: 50 }}> Hello, Jane Doe</Typography>

                        </Toolbar>   */}

                        <TableContainer component={Paper} className={classes.paper}>
                            <Table className={classes.card}>
                                <TableHead className={classes.tableHead}>
                                    <StyledTableRow>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Date</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Test Type</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>View</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Status</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow >
                                        <StyledTableCell className={classes.tableCell}>01/11/2021</StyledTableCell>
                                        <StyledTableCell className={classes.tableCell}>Rapid Antigen Test</StyledTableCell>
                                        <StyledTableCell className={classes.tableCell}>
                                            <a style={{ color: '#03a9f4' }} href="http://africau.edu/images/default/sample.pdf">View Report</a>
                                        </StyledTableCell>
                                        <StyledTableCell className={classes.tableCell} style={{ color: 'green', fontWeight: 'bold' }}>
                                            Test Report Ready

                                        </StyledTableCell>
                                    </StyledTableRow >
                                    <StyledTableRow>
                                        <StyledTableCell className={classes.tableCell}>02/11/2021</StyledTableCell>
                                        <StyledTableCell className={classes.tableCell}>HRSA PCR Test</StyledTableCell>
                                        <StyledTableCell className={classes.tableCell}>
                                            <a style={{ color: '#03a9f4' }} href="http://africau.edu/images/default/sample.pdf">View Report</a>
                                        </StyledTableCell>
                                        <StyledTableCell className={classes.tableCell} style={{ color: '#8B8000', fontWeight: 'bold' }}>
                                            Pending

                                        </StyledTableCell>
                                    </StyledTableRow >
                                    <StyledTableRow>
                                        <StyledTableCell className={classes.tableCell}>03/11/2021</StyledTableCell>
                                        <StyledTableCell className={classes.tableCell}>RT-PCR Test</StyledTableCell>
                                        <StyledTableCell className={classes.tableCell}>
                                            <a style={{ color: '#03a9f4' }} href="http://africau.edu/images/default/sample.pdf">View Report</a>
                                        </StyledTableCell>
                                        <StyledTableCell className={classes.tableCell} style={{ color: '#8B8000', fontWeight: 'bold' }}>
                                            Pending

                                        </StyledTableCell>
                                    </StyledTableRow >
                                    <StyledTableRow>
                                        <StyledTableCell className={classes.tableCell}>03/11/2021</StyledTableCell>
                                        <StyledTableCell className={classes.tableCell}>Insurance PCR Test</StyledTableCell>
                                        <StyledTableCell className={classes.tableCell}>
                                            <a style={{ color: '#03a9f4' }} href="http://africau.edu/images/default/sample.pdf">View Report</a>
                                        </StyledTableCell>
                                        <StyledTableCell className={classes.tableCell} style={{ color: 'green', fontWeight: 'bold' }}>
                                            Test Report Ready

                                        </StyledTableCell>
                                    </StyledTableRow >
                                </TableBody>
                            </Table>
                        </TableContainer>
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

UserHomeDesktopView.layout = "mobile";

export default compose(withStyles(styles), connect(mapStateToProps))(UserHomeDesktopView);

