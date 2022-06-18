import React, { Component } from 'react';
import { Toolbar, MenuItem, Grid, Typography, Button, Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper, styled, tableCellClasses, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText } from '@mui/material';
import { withStyles } from '@mui/styles';
import fileDownload from 'js-file-download';
import Axios from 'axios';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import Router, { withRouter } from 'next/router';
import { BsPlusCircleFill } from "react-icons/bs";
import { connect } from 'react-redux';
import { compose } from "redux";
import { fetchAllLocation } from "../../store/actions/locationAction";
import { fetchAllTestType } from "../../store/actions/testTypeAction";
import { fetchAllLocationTestType, createLocationTestType, updateLocationTestType } from '../../store/actions/locationTestTypeAction'
import _ from 'underscore'



const styles = theme => ({
    card: {
        border: "1px solid #e5e5e5",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        //marginTop: 15,
        borderRadius: 0,
        backgroundColor: "#fff"
    },
    papers: {
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
    textStyle: {
        padding: "8px"
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
    inputStyle: {
        fontFamily: "Lato-Regular !important",
        fontSize: "15px !important",
        padding: "10px !important",
        color: "#1D8878",
        opacity: 1,
        "&&:after": {
            color: "#1D8878",
        }
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    },
    inputRoot: {
        backgroundColor: "#FFFFFF",
        border: "1px solid #E1E7ED",
        borderRadius: "4px",
        fontSize: "15px !important",
        fontFamily: "Lato-Regular !important",
        "&:hover": {
            border: "1px solid #1D8878",
            backgroundColor: "#FFFFFF"
        }
    }
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


class LocationTestType extends Component {
    constructor() {
        super()
        this.state = {
            id: null,
            dialogOpen: false,
            mode: "",
            location_id: "",
            location_id_error: false,
            test_type_id: "",
            test_type_id_error: false,
            price: "",
            price_error: false,
            is_paid_type: "",
            is_paid_type_error: false,
            is_insurance_test: "",
            is_insurance_test_error: false,
            dialogOpen: false,
            description: '',
            qr_code: '',
            status: "ACTIVE",
            acuity_appointment_id: '',
            acuity_appointment_id_error: false,
            location_test_type_ref: '',
            location_test_type_ref_error: false,
            display_name: null,
            display_name_error: false,
            rank_order: 0,
            rank_order_error: false,
            search: ''
        }
    }

    componentDidMount = () => {
        this.props.dispatch(fetchAllLocation())
        this.props.dispatch(fetchAllTestType())
        this.props.dispatch(fetchAllLocationTestType())

        // const query = new URLSearchParams(window.location.search);
		// let search = query.get("search");
        // console.log(`Search ---> ${search}`)
    }

    handleClick = (item, mode) => {
        if (mode === "ADD") {
            this.setState({ 
                mode: mode, 
                dialogOpen: true ,
                location_id: "",
                location_id_error: false,
                test_type_id: "",
                test_type_id_error: false,
                price: "",
                price_error: false,
                is_paid_type: "",
                is_paid_type_error: false,
                is_insurance_test: "",
                is_insurance_test_error: false,
                description: '',
                qr_code: '',
                status: "ACTIVE",
                acuity_appointment_id: '',
                acuity_appointment_id_error: false,
                location_test_type_ref: '',
                location_test_type_ref_error: false,
                display_name: null,
                display_name_error: false,
                rank_order: 0,
                rank_order_error: false
            });
        }
        else {
            this.setState({
                id: item.id,
                dialogOpen: true,
                mode: mode,
                location_id: item.location_id,
                location_id_error: false,
                test_type_id: item.test_type_id,
                price: item.price,
                description: item.description,
                price_error: false,
                is_paid_type: item.is_paid_type,
                is_paid_type_error: false,
                is_insurance_test: item.is_insurance_test,
                is_insurance_test_error: false,
                test_type_id_error: false,
                qr_code: item.qr_code,
                qr_code_error: false,
                status: item.status,
                acuity_appointment_id: item.acuity_ref,
                acuity_appointment_id_error: false,
                location_test_type_ref: item.location_test_type_ref,
                location_test_type_ref_error: false,                
                display_name: item.display_name,
                display_name_error: false,
                rank_order: item.rank_order,
                rank_order_error: false
            })
        }
    }
    handleClose = () => {
        this.setState({
            dialogOpen: false,
            id: null,
            location_id: "",
            location_id_error: false,
            test_type_id: "",
            test_type_id_error: false,
            price: "",
            price_error: false,
            is_paid_type: "",
            is_paid_type_error: false,
            is_insurance_test: "",
            is_insurance_test_error: false,
            description: "",
            qr_code: "",
            qr_code_error: false,
            status: "ACTIVE",
            acuity_appointment_id: '',
            acuity_appointment_id_error: false,
            location_test_type_ref: '',
            location_test_type_ref_error: false
        })
    }

    handleRankOrder = (event) => {
		const re = /[0-9]/;
		if (event.target.value === '' || re.test(event.target.value)) {
			this.setState({ rank_order: event.target.value, rank_order_error: false });
		}
	}

    handleSubmit = (mode) => {
        let { id, location_id, test_type_id, price, is_paid_type, is_insurance_test, display_name, display_name_error, rank_order, rank_order_error, description, qr_code, status, acuity_appointment_id, location_test_type_ref } = this.state
        let isError = false;
        if (location_id === "" || location_id === null) {
            this.setState({ location_id_error: true })
            isError = true;
        }

        if (test_type_id === "" || test_type_id === null) {
            this.setState({ test_type_id_error: true })
            isError = true;
        }
        if (price === "" || price === null) {
            this.setState({ price_error: true })
            isError = true;
        }
        if (is_paid_type === "" || is_paid_type === null) {
            this.setState({ is_paid_type_error: true })
            isError = true;
        }
        if (is_insurance_test === "" || is_insurance_test === null) {
            this.setState({ is_insurance_test_error: true })
            isError = true;
        }

        if (qr_code === "" || qr_code === null) {
            this.setState({ qr_code_error: true })
            isError = true;
        }

        if(acuity_appointment_id === '' || acuity_appointment_id === null){
            this.setState({ acuity_appointment_id_error: true });
            isError = true;
        }

        if(location_test_type_ref === '' || location_test_type_ref === null){
            this.setState({location_test_type_ref_error: true });
        }

        // if(display_name === '' || display_name === null){
        //     this.setState({display_name_error: true });
        //     isError = true;
        // }

        if(rank_order === '' || rank_order === null){
            this.setState({rank_order_error: true });
            isError = true;
        }

        if (isError === false) {
            let locationTestTypeObj = {};
            locationTestTypeObj.location_id = location_id;
            locationTestTypeObj.test_type_id = test_type_id;
            locationTestTypeObj.price = price;
            locationTestTypeObj.is_paid_type = is_paid_type;
            locationTestTypeObj.is_insurance_test = is_insurance_test;
            // locationTestTypeObj.description = description;
            locationTestTypeObj.status = status;
            locationTestTypeObj.qr_code = qr_code;
            locationTestTypeObj.acuity_ref = acuity_appointment_id;
            locationTestTypeObj.location_test_type_ref = location_test_type_ref;
            locationTestTypeObj.display_name = display_name;
            locationTestTypeObj.rank_order = rank_order;
            if (mode === "ADD") {
                this.props.dispatch(createLocationTestType(this, locationTestTypeObj))
            }
            else {
                this.props.dispatch(updateLocationTestType(this, locationTestTypeObj, id))
            }
        }
    }
    render() {
        const { classes } = this.props;
        let filterLocationTestType = this.props.location_test_type !== null && this.props.location_test_type.filter(testType => ((testType.location.name.toLowerCase()).indexOf(this.state.search.toLowerCase()) >= 0) || ((testType.testType.name.toLowerCase()).indexOf(this.state.search.toLowerCase()) >= 0) );
        let sortedLocationType = _.sortBy(filterLocationTestType, 'id');
        // console.log(`filterLocationTestType ---> ${JSON.stringify(filterLocationTestType)}`);
        
        return (
            <div
                style={{
                    margin: 10,
                    backgroundColor: "white",
                    backgroundRepeat: "no-repeat",
                    // display: 'flex'
                }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} >
                        <Toolbar style={{ justifyContent: "space-between", padding: "10px 20px 2px 2px" }}>
                            <Typography fontWeight="bold" fontSize={25} fontFamily="Futura-Heavy" color="#144787" style={{ padding: 5 }}>Location Test Types</Typography>

                            <Toolbar>
                                <TextField
                                    placeholder="Search by location or test type"
                                    variant="filled"
                                    value={this.state.search}
                                    onChange={(event) => this.setState({search: event.target.value})}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth                                    
                                    autoComplete="off"
                                    style={{ marginRight: 10}}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                                <Tooltip title="Add Location Test Type">
                                    <IconButton className={classes.iconButton} onClick={() => this.handleClick(null, "ADD")} >
                                        <BsPlusCircleFill size={35} color={"green"} />
                                    </IconButton>
                                </Tooltip>
                            </Toolbar>
                            {/* <Tooltip title="Add Location Test Type">
                                <IconButton className={classes.iconButton} onClick={() => this.handleClick(null, "ADD")} >
                                    <BsPlusCircleFill size={35} color={"green"} />
                                </IconButton>
                            </Tooltip> */}
                        </Toolbar>
                        <TableContainer component={Paper} className={classes.paper} >
                            <Table className={classes.card}>
                                <TableHead className={classes.tableHead}>
                                    <StyledTableRow>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Location</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Test Type</StyledTableCell>
                                        {/* <StyledTableCell align="left" className={classes.tableHeadCell}>Display Name</StyledTableCell> */}
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Rank Order</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Price</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Is Paid Type</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Is Insurance Test</StyledTableCell>
                                        {/* <StyledTableCell align="left" className={classes.tableHeadCell}>Description</StyledTableCell> */}
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Status</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Actions</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {sortedLocationType.map(item =>
                                        <StyledTableRow key={item.id}>
                                            <StyledTableCell className={classes.tableCell}>{item.location !== null && item.location !== undefined && Object.keys(item.location).length > 0 && item.location.name}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell}>{item.location !== null && item.location !== undefined && Object.keys(item.location).length > 0 && item.testType.name}</StyledTableCell>
                                            {/* <StyledTableCell className={classes.tableCell}>{item.display_name !== null && item.display_name !== undefined && item.display_name}</StyledTableCell> */}
                                            <StyledTableCell className={classes.tableCell}>{item.rank_order !== null && item.rank_order !== undefined && item.rank_order}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell}>{item.price} {(item.price !== null && item.price !== "") && "$"}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell}>{item.is_paid_type === true ? "YES" : "NO"}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell}>{item.is_insurance_test === true ? "YES" : "NO"}</StyledTableCell>
                                            {/* <StyledTableCell className={classes.tableCell}>{item.description}</StyledTableCell> */}
                                            <StyledTableCell className={classes.tableCell}>{item.status}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell}> <Button className={classes.outlineButton} variant="outlined" onClick={() => this.handleClick(item, "EDIT")}>Edit</Button></StyledTableCell>
                                        </StyledTableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Dialog
                    maxWidth={"sm"}
                    open={this.state.dialogOpen}
                    onClose={() => this.handleClose()}
                >
                    <DialogContent style={{
                        overflowY: "auto", boxShadow: "inset 0px 4px 0px #1D8878",
                        borderRadius: 4,
                        padding: 10
                    }}>
                        <DialogTitle id="form-dialog-title">
                            <Typography style={{ padding: "1% 2% 0 1%", fontFamily: "Futura-Heavy", fontSize: 15, fontWeight: "bold", color: "#1D8878" }}>{this.state.mode === "ADD" ? "Add Location Test Type" : "Update Location Test Type"}</Typography>
                        </DialogTitle>
                        <Grid container spacing={2} justifyContent="space-between" style={{ marginTop: -20, padding: "2% 5% 0 5%" }}>
                            <Grid item xs={6}>
                                <Typography className={classes.textStyle}>Location</Typography>
                                <TextField
                                    id="location_id"
                                    variant="filled"
                                    value={this.state.location_id}
                                    onChange={(event) => this.setState({ location_id: event.target.value, location_id_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    select
                                    placeholder="Select Virus"
                                    name="Virus_id"
                                    required
                                    error={this.state.location_id_error === true ? true : false}
                                    helperText={this.state.location_id_error === true ? "Please select location" : false}
                                >

                                    {this.props.locations !== null && this.props.locations.map(item => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>Test Type</Typography>
                                <TextField
                                    id="test_type_id"
                                    variant="filled"
                                    value={this.state.test_type_id}
                                    onChange={(event) => this.setState({ test_type_id: event.target.value, test_type_id_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    select
                                    placeholder="Select Virus"
                                    name="test_type_id"
                                    required
                                    error={this.state.test_type_id_error === true ? true : false}
                                    helperText={this.state.test_type_id_error === true ? "Please select test type" : false}
                                >
                                    {this.props.test_types !== null && this.props.test_types.map(item => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </Grid>
                            {/* <Grid item xs={6} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>Display Name</Typography>
                                <TextField
                                    placeholder="Display Name"
                                    variant="filled"
                                    value={this.state.display_name}
                                    onChange={(event) => this.setState({ display_name: event.target.value, display_name_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth                                    
                                    autoComplete="off"
                                    error={this.state.display_name_error === true ? true : false}
                                    helperText={this.state.display_name_error === true ? "Please enter display name" : false}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid> */}
                            <Grid item xs={6} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>Rank Order</Typography>
                                <TextField
                                    placeholder="Rank Order"
                                    variant="filled"
                                    value={this.state.rank_order}
                                    onChange={(event) => this.handleRankOrder(event)}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth                                    
                                    autoComplete="off"
                                    error={this.state.rank_order_error === true ? true : false}
                                    helperText={this.state.rank_order_error === true ? "Please enter rank order" : false}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.textStyle}>QR Code</Typography>
                                <TextField
                                    placeholder="QR Code"
                                    variant="filled"
                                    value={this.state.qr_code}
                                    onChange={(event) => this.setState({ qr_code: event.target.value, qr_code_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    disabled={this.state.mode === "ADD" ? false : true}
                                    autoComplete="off"
                                    error={this.state.qr_code_error === true ? true : false}
                                    helperText={this.state.qr_code_error === true ? "Please enter QR Code" : false}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.textStyle}>Price</Typography>
                                <TextField
                                    placeholder="Price"
                                    variant="filled"
                                    value={this.state.price}
                                    onChange={(event) => this.setState({ price: event.target.value, price_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    autoComplete="off"
                                    error={this.state.price_error === true ? true : false}
                                    helperText={this.state.price_error === true ? "Please enter price" : false}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Typography className={classes.textStyle}>Description</Typography>
                                <TextField
                                    placeholder="Description"
                                    variant="filled"
                                    value={this.state.description}
                                    onChange={(event) => this.setState({ description: event.target.value })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    autoComplete="off"
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid> */}
                            
                            <Grid item xs={6} style={{ paddingRight: 8 }}>
                                <div style={{ padding: "2% 0 2% 0" }}>
                                    <Typography className={classes.textStyle}>Acuity Appointment Id</Typography>
                                    <TextField
                                        placeholder="Acuity Appointment Id"
                                        variant="filled"
                                        value={this.state.acuity_appointment_id}
                                        onChange={(event) => this.setState({ acuity_appointment_id: event.target.value, acuity_appointment_id_error: false })}
                                        InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                        fullWidth
                                        autoComplete="off"
                                        error={this.state.acuity_appointment_id_error === true ? true : false}
                                        helperText={this.state.acuity_appointment_id_error === true ? "Please enter acuity appointment id" : false}
                                        FormHelperTextProps={{
                                            className: classes.helperText
                                        }}
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={6} style={{ paddingRight: 8 }}>
                                <div style={{ padding: "2% 0 2% 0" }}>
                                    <Typography className={classes.textStyle}>Salesforce ID</Typography>
                                    <TextField
                                        placeholder="Salesforce ID"
                                        variant="filled"
                                        value={this.state.location_test_type_ref}
                                        onChange={(event) => this.setState({ location_test_type_ref: event.target.value, location_test_type_ref_error: false })}
                                        InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                        fullWidth
                                        autoComplete="off"
                                        error={this.state.location_test_type_ref_error === true ? true : false}
                                        helperText={this.state.location_test_type_ref_error === true ? "Please enter salesforce id" : false}
                                        FormHelperTextProps={{
                                            className: classes.helperText
                                        }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6} style={{ paddingRight: 8 }}>
                                <div style={{ padding: "2% 0 2% 0" }}>
                                    <Typography style={{ fontFamily: "Futura-Book", fontSize: 12, color: 'rgba(0, 0, 0, 0.54)' }}>Is Paid Type</Typography>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="position" name="position" value={this.state.is_paid_type}
                                            onChange={(event) => this.setState({ is_paid_type: event.target.value, is_paid_type_error: false })} row>
                                            <FormControlLabel
                                                value="true"
                                                control={<Radio style={{ color: "#20478e" }} />}
                                                label={<span className={classes.labelStyle}>Yes</span>}
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="false"
                                                control={<Radio style={{ color: "#20478e" }} />}
                                                label={<span className={classes.labelStyle}>No</span>}
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>
                                        {this.state.is_paid_type_error === true && <FormHelperText style={{ color: "red" }}>{"Please select Is Paid Type"}</FormHelperText>}
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid item xs={6} style={{ paddingRight: 8 }}>
                                <div style={{ padding: "2% 0 2% 0" }}>
                                    <Typography style={{ fontFamily: "Futura-Book", fontSize: 12, color: 'rgba(0, 0, 0, 0.54)' }}>Is Insurance Test</Typography>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="position" name="position" value={this.state.is_insurance_test}
                                            onChange={(event) => this.setState({ is_insurance_test: event.target.value, is_insurance_test_error: false })} row>
                                            <FormControlLabel
                                                value="true"
                                                control={<Radio style={{ color: "#20478e" }} />}
                                                label={<span className={classes.labelStyle}>Yes</span>}
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="false"
                                                control={<Radio style={{ color: "#20478e" }} />}
                                                label={<span className={classes.labelStyle}>No</span>}
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>
                                        {this.state.is_insurance_test_error === true && <FormHelperText style={{ color: "red" }}>{"Please select is insurance test"}</FormHelperText>}
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid item xs={6} style={{ paddingRight: 8 }}>
                                <div style={{ padding: "2% 0 2% 0" }}>
                                    <Typography>Status</Typography>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="position" name="position" value={this.state.status}
                                            onChange={(event) => this.setState({ status: event.target.value, status_error: false })} row>
                                            <FormControlLabel
                                                value="ACTIVE"
                                                control={<Radio style={{ color: "#20478e" }} />}
                                                label={<span style={{ textTransform: "none" }}>Active</span>}
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="INACTIVE"
                                                control={<Radio style={{ color: "#20478e" }} />}
                                                label={<span style={{ textTransform: "none" }}>InActive</span>}
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </Grid>

                            <Grid item xs={12} style={{ display: "flex", justifyContent: "center", padding: 9 }}>
                                <DialogActions>
                                    <Button size="small" onClick={() => this.handleSubmit(this.state.mode)} variant="contained" color="primary" className={classes.addButton}>Submit</Button>
                                    <Button size="small" onClick={() => this.handleClose()} variant="contained" style={{ backgroundColor: "red" }} className={classes.cancelButton}>Cancel</Button>
                                </DialogActions>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }


}
const mapStateToProps = (state) => {
    return {
        locations: state.locationReducer.locations,
        test_types: state.testTypeReducer.testType,
        location_test_type: state.locationTestTypeReducer.locationsTestType

    }
};
LocationTestType.layout = "default";
export default compose(withStyles(styles), connect(mapStateToProps))(LocationTestType);