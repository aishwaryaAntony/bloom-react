import React, { Component } from 'react';
import { Toolbar, MenuItem, Grid, Typography, Button, Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper, styled, tableCellClasses, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText } from '@mui/material';
import { withStyles } from '@mui/styles';
import { BsPlusCircleFill } from "react-icons/bs";
import { connect } from 'react-redux';
import { compose } from "redux";
import { fetchAllLocation, createLocation, updateLocation } from "../../store/actions/locationAction";
import _ from 'underscore';

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
        whiteSpace: "wrap",
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
        textTransform: 'uppercase',
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
    textStyle: {
        padding: "8px "
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



class Location extends Component {
    constructor() {
        super()
        this.state = {
            id: null,
            dialogOpen: false,
            mode: "",
            code: "",
            code_error: false,
            name: "",
            name_error: false,
            street_address_line1: "",
            street_address_line1_error: false,
            street_address_line2: "",
            street_address_line2_error: false,
            city: "",
            city_error: false,
            state: "",
            state_error: false,
            country: "",
            country_error: false,
            zipcode: "",
            zipcode_error: false,
            phone: "",
            phone_error: false,
            status: "ACTIVE",
            acuity_calendar_id: '',
            acuity_calendar_id_error: false
        }
    }
    componentDidMount = () => {
        this.props.dispatch(fetchAllLocation())

    }
    handleClick = (item, mode) => {
        if (mode === "ADD") {
            this.setState({ mode: mode, dialogOpen: true })
        }
        else {

            this.setState({
                id: item.id,
                dialogOpen: true,
                mode: mode,
                code: item.code,
                code_error: false,
                name: item.name,
                name_error: false,
                street_address_line1: item.street_address_line1,
                street_address_line1_error: false,
                street_address_line2: item.street_address_line2,
                street_address_line2_error: false,
                city: item.city,
                city_error: false,
                state: item.state,
                state_error: false,
                country: item.country,
                country_error: false,
                zipcode: item.zipcode,
                zipcode_error: false,
                phone: item.phone,
                phone_error: false,
                status: item.status,
                acuity_calendar_id: item.acuity_ref,
                acuity_calendar_id_error: false
            })
        }
    }
    handleClose = () => {
        this.setState({
            dialogOpen: false,
            id: null,
            code: "",
            code_error: false,
            name: "",
            name_error: false,
            street_address_line1: "",
            street_address_line1_error: false,
            street_address_line2: "",
            street_address_line2_error: false,
            city: "",
            city_error: false,
            state: "",
            state_error: false,
            country: "",
            country_error: false,
            zipcode: "",
            zipcode_error: false,
            phone: "",
            phone_error: false,
            status: "ACTIVE",
            acuity_calendar_id: '',
            acuity_calendar_id_error: false
        })
    }

    handleSubmit = (mode) => {
        let { id, name, code, street_address_line1, street_address_line2, city, state, country, zipcode, phone, status, acuity_calendar_id } = this.state
        let isError = false;
        if (name === "" || name === null) {
            this.setState({ name_error: true })
            isError = true;
        }

        if (code === "" || code === null) {
            this.setState({ code_error: true })
            isError = true;
        }

        if (acuity_calendar_id === "" || acuity_calendar_id === null) {
            this.setState({ acuity_calendar_id_error: true });
            isError = true;
        }
        // if (street_address_line1 === "" || street_address_line1 === null) {
        //     this.setState({ street_address_line1_error: true })
        //     isError = true;
        // }
        // if (street_address_line2 === "" || street_address_line2 === null) {
        //     this.setState({ street_address_line2_error: true })
        //     isError = true;
        // }
        // if (city === "" || city === null) {
        //     this.setState({ city_error: true })
        //     isError = true;
        // }
        // if (state === "" || state === null) {
        //     this.setState({ state_error: true })
        //     isError = true;
        // }
        // if (country === "" || country === null) {
        //     this.setState({ country_error: true })
        //     isError = true;
        // }
        // if (zipcode === "" || zipcode === null) {
        //     this.setState({ zipcode_error: true })
        //     isError = true;
        // }
        // if (phone === "" || phone === null) {
        //     this.setState({ phone_error: true })
        //     isError = true;
        // }

        if (isError === false) {
            let locationObj = {};
            locationObj.name = name;
            locationObj.code = code;
            locationObj.street_address_line1 = street_address_line1;
            locationObj.street_address_line2 = street_address_line2;
            locationObj.city = city;
            locationObj.state = state;
            locationObj.country = country;
            locationObj.zipcode = zipcode;
            locationObj.phone = phone;
            locationObj.acuity_ref = acuity_calendar_id;

            locationObj.status = status;
            if (mode === "ADD") {
                this.props.dispatch(createLocation(this, locationObj))
            }
            else {
                this.props.dispatch(updateLocation(this, locationObj, id))
            }
        }
    }
    render() {
        const { classes } = this.props;
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
                            <Typography fontWeight="bold" fontSize={25} fontFamily="Futura-Heavy" color="#144787" style={{ padding: 5 }}>Locations</Typography>
                            <Tooltip title="Add location">
                                <IconButton className={classes.iconButton} onClick={() => this.handleClick(null, "ADD")} >
                                    <BsPlusCircleFill size={35} color={"green"} />
                                </IconButton>
                            </Tooltip>
                        </Toolbar>
                        <TableContainer component={Paper} className={classes.paper} >
                            <Table className={classes.card}>
                                <TableHead className={classes.tableHead}>
                                    <StyledTableRow>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Name</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Code</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Address</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>status</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>ACTIONS</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.locations !== null && this.props.locations.length > 0 && _.sortBy(this.props.locations, 'id').map(item =>

                                        <StyledTableRow>
                                            <StyledTableCell className={classes.tableCell}>{item.name}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell}>{item.code}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell} style={{ width: "25%" }}>{item.street_address_line1} {item.street_address_line2} {item.city} {item.state} {item.country} {item.zipcode} </StyledTableCell>
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
                    maxWidth={"md"}
                    open={this.state.dialogOpen}
                    onClose={() => this.handleClose()}
                >
                    <DialogContent style={{
                        overflowY: "auto", boxShadow: "inset 0px 4px 0px #1D8878",
                        borderRadius: 4,
                        padding: 10
                    }}>
                        <DialogTitle id="form-dialog-title">
                            <Typography style={{ padding: "1% 2% 0 1%", fontFamily: "Futura-Heavy", fontSize: 15, fontWeight: "bold", color: "#1D8878" }}>{this.state.mode === "ADD" ? "Add Location" : "Update Location"}</Typography>
                        </DialogTitle>
                        <Grid container spacing={2} justifyContent="space-between" style={{ marginTop: -20, padding: "2% 5% 0 5%" }}>
                            <Grid item xs={4}>
                                <Typography className={classes.textStyle}>Name</Typography>
                                <TextField
                                    placeholder="Enter Name"
                                    variant="filled"
                                    value={this.state.name}
                                    onChange={(event) => this.setState({ name: event.target.value, name_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    autoComplete="off"
                                    error={this.state.name_error === true ? true : false}
                                    helperText={this.state.name_error === true ? "Please enter name" : false}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>Code</Typography>
                                <TextField
                                    placeholder="Enter Code"
                                    variant="filled"
                                    value={this.state.code}
                                    onChange={(event) => this.setState({ code: event.target.value, code_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    autoComplete="off"
                                    error={this.state.code_error === true ? true : false}
                                    helperText={this.state.code_error === true ? "Please enter code" : false}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>Phone</Typography>
                                <TextField
                                    placeholder="Enter phone"
                                    variant="filled"
                                    value={this.state.phone}
                                    onChange={(event) => this.setState({ phone: event.target.value, phone_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth                                   
                                    inputProps={{ maxLength: 10 }}									
									type={"tel"}
									onKeyPress={(event) => {
										if (!/[0-9]/.test(event.key)) {
											event.preventDefault();
										}
									}}                                 
                                    error={this.state.phone_error === true ? true : false}
                                    helperText={this.state.phone_error === true ? "Please enter phone number" : false}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>Address1</Typography>
                                <TextField
                                    placeholder="Enter Address1"
                                    variant="filled"
                                    value={this.state.street_address_line1}
                                    onChange={(event) => this.setState({ street_address_line1: event.target.value, street_address_line1_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    autoComplete="off"
                                    error={this.state.street_address_line1_error === true ? true : false}
                                    helperText={this.state.street_address_line1_error === true ? "Please enter Address1" : false}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>

                            <Grid item xs={4} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>Address2</Typography>
                                <TextField
                                    placeholder="Enter Address2"
                                    variant="filled"
                                    value={this.state.street_address_line2}
                                    onChange={(event) => this.setState({ street_address_line2: event.target.value, street_address_line2_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    autoComplete="off"
                                    error={this.state.street_address_line2_error === true ? true : false}
                                    helperText={this.state.street_address_line2_error === true ? "Please enter Address2" : false}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>City</Typography>
                                <TextField
                                    placeholder="Enter city"
                                    variant="filled"
                                    value={this.state.city}
                                    onChange={(event) => this.setState({ city: event.target.value, city_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    autoComplete="off"
                                    error={this.state.city_error === true ? true : false}
                                    helperText={this.state.city_error === true ? "Please enter city" : false}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>State</Typography>
                                <TextField
                                    placeholder="Enter state"
                                    variant="filled"
                                    value={this.state.state}
                                    onChange={(event) => this.setState({ state: event.target.value, state_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    autoComplete="off"
                                    error={this.state.state_error === true ? true : false}
                                    helperText={this.state.state_error === true ? "Please enter state" : false}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>


                            <Grid item xs={4} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>Country</Typography>
                                <TextField
                                    placeholder="Enter Country"
                                    variant="filled"
                                    value={this.state.country}
                                    onChange={(event) => this.setState({ country: event.target.value, country_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    autoComplete="off"
                                    error={this.state.country_error === true ? true : false}
                                    helperText={this.state.country_error === true ? "Please enter country" : false}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>Zipcode</Typography>
                                <TextField
                                    placeholder="Enter zipcode"
                                    variant="filled"
                                    value={this.state.zipcode}
                                    onChange={(event) => this.setState({ zipcode: event.target.value, zipcode_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    autoComplete="off"
                                    onInput={(e) => {
                                        e.target.value = Math.max(5, parseInt(e.target.value)).toString().slice(0, 5)
                                    }}
                                    error={this.state.zipcode_error === true ? true : false}
                                    helperText={this.state.zipcode_error === true ? "Please enter zipcode" : false}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>Acuity Calendar Id</Typography>
                                <TextField
                                    placeholder="Acuity Calendar Id"
                                    variant="filled"
                                    value={this.state.acuity_calendar_id}
                                    onChange={(event) => this.setState({ acuity_calendar_id: event.target.value, acuity_calendar_id_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    autoComplete="off"
                                    error={this.state.acuity_calendar_id_error === true ? true : false}
                                    helperText={this.state.acuity_calendar_id_error === true ? "Please enter acuity calendar id" : false}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} style={{ paddingRight: 8 }}>
                                <Typography style={{ fontFamily: "Futura-Book", fontSize: 12, color: 'rgba(0, 0, 0, 0.54)' }}>Status</Typography>
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
        user: state.sessionReducer.user,
        openAlert: state.sessionReducer.openAlert
    }
};

Location.layout = "default";

export default compose(withStyles(styles), connect(mapStateToProps))(Location);