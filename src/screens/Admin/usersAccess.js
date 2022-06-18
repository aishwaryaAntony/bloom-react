import React, { Component } from 'react';
import { Toolbar, MenuItem, Grid, Typography, Button, Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper, styled, tableCellClasses, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import { BsPlusCircleFill } from "react-icons/bs";
import { connect } from 'react-redux';
import { createInternalUser, fetchAllRoles, fetchAllInternalUsers, fetchUserEmail, deleteInternalUser } from "../../store/actions/userAction";
import { compose } from "redux";
import _ from 'underscore'
import DeleteIcon from '@mui/icons-material/Delete';

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


class usersAccess extends Component {
    constructor() {
        super()
        this.state = {
            id: null,
            dialogOpen: false,
            mode: "",
            first_name: "",
            first_name_error: false,
            last_name: "",
            last_name_error: false,
            email: "",
            email_error: false,
            invalid_email_error: false,
            selectedRole: "",
            selectedRole_error: false,
            status: "ACTIVE"
        }
    }

    componentDidMount = () => {
        this.props.dispatch(fetchAllInternalUsers());
        this.props.dispatch(fetchAllRoles());
    }

    handleClick = (item, mode) => {
        if (mode === "ADD") {
            this.setState({ mode: mode, dialogOpen: true });
        } else {
            this.setState({
                code_error: false,
                name_error: false
            });
        }
    }
    handleClose = () => {
        this.setState({
            dialogOpen: false,
            mode: "",
            first_name: "",
            first_name_error: false,
            last_name: "",
            last_name_error: false,
            email: "",
            email_error: false,
            invalid_email_error: false,
            selectedRole: "",
            selectedRole_error: false
        })
    }

    /**
    *
    * This function representing email validation.
    * @param {String} email The email string
    */
    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    handleSubmit = (mode) => {
        let { first_name, last_name, email, selectedRole } = this.state
        let isError = false;

        if (first_name === "" || first_name === null) {
            this.setState({ first_name_error: true })
            isError = true;
        }

        if (last_name === "" || last_name === null) {
            this.setState({ last_name_error: true })
            isError = true;
        }

        if (email === "" || email === null) {
            this.setState({ email_error: true })
            isError = true;
        }
        if (!this.validateEmail(email)) {
            this.setState({ invalid_email_error: true });
            isError = true;
        }
        if (selectedRole === "" || selectedRole === null) {
            this.setState({ selectedRole_error: true })
            isError = true;
        }

        if (isError === false) {
            let userObj = {};
            userObj.first_name = first_name;
            userObj.last_name = last_name;
            userObj.email = email;
            userObj.role_code = selectedRole;
            userObj.status = "ACTIVE";
            console.log(`Test UserObj  ==> ${JSON.stringify(userObj)}`)
            if (mode === "ADD") {
                this.props.dispatch(createInternalUser(this, userObj))
            }
        }
    }

    handlePhoneNumber = (event) => {
        const re = /^[0-9\b]{1,10}$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            if (event.target.value.length <= 10) {
                this.setState({ phone_number: event.target.value, phone_number_error: false, invalid_phone_number_error: false })
            }
        }
    }

    handleDelete = (item) => {
        if(window.confirm('Are you sure want to delete?')){
            this.props.dispatch(deleteInternalUser(this, item.id));
        }
    }

    searchUser = () => {
        let { email } = this.state;
        let isError = false;
        if (email === "" || email === null) {
            this.setState({ email_error: true })
            isError = true;
        } else {
            if (!this.validateEmail(email)) {
                this.setState({ invalid_email_error: true });
                isError = true;
            }
        }

        if (isError === false) {
            this.props.dispatch(fetchUserEmail(this, email))
        }
    }

    render() {
        const { classes, all_users } = this.props;
        // console.log(`All Users ==> ${JSON.stringify(all_users)}`)

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
                            <Typography fontWeight="bold" fontSize={25} fontFamily="Futura-Heavy" color="#144787" style={{ padding: 5 }}>Users and Access</Typography>
                            <Tooltip title="Add Users">
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
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Role</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Email</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Status</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Action</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {all_users !== null && all_users.length > 0 && _.sortBy(all_users).map((item, index) =>
                                        <StyledTableRow key={index}>
                                            <StyledTableCell className={classes.tableCell}>{`${item.first_name} ${item.last_name}`}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell}>{(item.userRoles !== undefined && item.userRoles !== null && item.userRoles.length > 0) ? item.userRoles.map(x => x.is_default === "true" ? x.role.name : "") : ""}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell}>{item.email}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell}>{item.status}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell}>
                                                {
                                                    item.status === "ACTIVE" && 
                                                    <IconButton variant="contained" onClick={()=> this.handleDelete(item)} style={{ marginLeft: 10 }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                }
                                                
                                            </StyledTableCell>
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
                            <Typography style={{ padding: "1% 2% 0 1%", fontFamily: "Futura-Heavy", fontSize: 15, fontWeight: "bold", color: "#1D8878" }}>{this.state.mode === "ADD" ? "Add User" : "Update Test Type"}</Typography>
                        </DialogTitle>
                        <Grid container spacing={3} justifyContent="center" style={{ padding: "2% 5% 0 5%" }}>
                            {
                                this.state.mode === 'ADD' &&

                                <Grid item xs={8}>
                                    <Typography className={classes.textStyle}>Email</Typography>
                                    <TextField
                                        placeholder="Enter Email"
                                        variant="filled"
                                        value={this.state.email}
                                        onChange={(event) => this.setState({ email: event.target.value, email_error: false, invalid_email_error: false })}
                                        InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                        fullWidth
                                        autoComplete="off"
                                        error={this.state.email_error === true ? true : this.state.invalid_email_error === true ? true : false}
                                        helperText={this.state.email_error === true ? "Please enter email" : this.state.invalid_email_error === true ? "Please enter valid email" : ""}
                                        FormHelperTextProps={{
                                            className: classes.helperText
                                        }}
                                    />
                                </Grid>
                            }
                            <Grid item xs={4} style={{ alignItems: "center", display: "flex" }}>
                                <Button size="small" onClick={() => this.searchUser()} variant="contained" style={{ backgroundColor: "#1D8878" }}><Typography style={{ fontSize: "13px", textTransform: "capitalize", color: "#fff", fontFamily: "Futura-Heavy", fontWeight: "700", textAlign: "center" }}>Find User</Typography></Button>
                            </Grid>
                            {
                                this.state.mode === 'ADD' &&
                                <Grid item xs={12}>
                                    <Typography className={classes.textStyle}>Role</Typography>
                                    <TextField
                                        id="role"
                                        variant="filled"
                                        value={this.state.selectedRole}
                                        onChange={(event) => this.setState({ selectedRole: event.target.value, selectedRole_error: false })}
                                        InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                        fullWidth
                                        select
                                        placeholder="Select Role"
                                        name="Virus_id"
                                        required
                                        error={this.state.selectedRole_error === true ? true : false}
                                        helperText={this.state.selectedRole_error === true ? "Please select role" : ""}
                                    >
                                        {this.props.all_roles.length > 0 && this.props.all_roles.map((item, index) => (
                                            item.code !== "CSR" && <MenuItem key={index} value={item.code}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            }
                            <Grid item xs={12} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>First Name</Typography>
                                <TextField
                                    placeholder="Enter First Name"
                                    variant="filled"
                                    value={this.state.first_name}
                                    onChange={(event) => this.setState({ first_name: event.target.value, first_name_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    autoComplete="off"
                                    error={this.state.first_name_error === true ? true : false}
                                    helperText={this.state.first_name_error === true ? "Please enter first name" : ""}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>Last Name</Typography>
                                <TextField
                                    placeholder="Enter Last Name"
                                    variant="filled"
                                    value={this.state.last_name}
                                    onChange={(event) => this.setState({ last_name: event.target.value, last_name_error: false })}
                                    InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                    fullWidth
                                    autoComplete="off"
                                    error={this.state.last_name_error === true ? true : false}
                                    helperText={this.state.last_name_error === true ? "Please enter last name" : ""}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
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
        all_users: state.userReducer.all_users,
        all_roles: state.userReducer.all_roles
    }
};
usersAccess.layout = "default";
export default compose(withStyles(styles), connect(mapStateToProps))(usersAccess);