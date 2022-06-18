import React, { Component } from 'react';
import {
    Menu, Toolbar, MenuItem, Grid, Typography, Button, IconButton, Card,
    CardContent,
    CardActions,
    Divider,
    Chip, Select, FormControl, InputLabel
} from '@mui/material';
import { withStyles } from '@mui/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { compose } from "redux";
import TimelineIcon from '@mui/icons-material/Timeline';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ShareIcon from '@mui/icons-material/Share';
import { fetchAllTestResultByUser } from "../../store/actions/testResultAction";
import moment from 'moment';
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import { fetchAllContactsByUser } from "../../store/actions/userAction";
import { USER_QRCODE } from "../../store/actions/actionTypes";
import { REPORT_API_URL } from "../../helpers/constants";

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
    iconButton: {
        padding: 3,
        borderRadius: 0
    },
    buttonVariant: {
        boxShadow: "0px 0px 0px 0px #E1E7ED",
        backgroundColor: "#5D88C0",
        margin: "15px 0px",
        fontFamily: "MaisonNeue-Book",
        color: "#fff",
        borderRadius: 3,
        textTransform: 'none'
    },
    heading: {
        fontSize: 16,
        // marginTop: 5,
    },
    subheader: {
        fontSize: 14,
        color: 'gray',
        letterSpacing: '1px',
        marginBottom: 4,
    },
});

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

class UserHome extends Component {
    constructor() {
        super()
        this.state = {
            anchorEl: null,
            testResults: [],
            isLoading: false,
            selectedContact: "",
			userContacts: [],
            // filteredTestResults: []
        }
    }
    redirectToTestRegistration = () => {
        Router.push('/customer/test-registration-form')
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };


    componentDidMount(){
        this.setState({ isLoading: true, selectedContact: 0 });
        this.props.dispatch(fetchAllTestResultByUser(this));
        this.props.dispatch(fetchAllContactsByUser());
    }

    static getDerivedStateFromProps(props, state){
        if(state.testResults !== props.testResults || props.userContacts !== state.userContacts){
            return {
                testResults: props.testResults,
                userContacts: props.userContacts
            }
        }

        return null;
    }

    handleSelectContact = (event) => {
		let findContact = this.state.userContacts.find(contact => contact.Id === event.target.value);
        let User = typeof localStorage !== "undefined" && localStorage.getItem('user')
        const userObj = JSON.parse(User);
		if(findContact !== undefined){
			let findName = findContact.Name !== null ? findContact.Name : "";
			let firstName = null;
			let lastName = null;

			let splitName = findName.split(" ");
			if(splitName.length > 0){
				firstName = splitName[0];

				lastName = splitName.reduce((accumulator, currentvalue, index) => {
					if(index > 0){
					accumulator = accumulator + " " + currentvalue
					}
					
					return accumulator;
				}, "" );
			}
            this.setState({ selectedContact: event.target.value });
            let constructUserObj = {};
            constructUserObj.first_name = firstName;
            constructUserObj.last_name = lastName;
            constructUserObj.birth_date = findContact.Birthdate;
            constructUserObj.qr_code = findContact.QR_Code__c;
            constructUserObj.email = findContact.Email;
            this.props.dispatch({
                type: USER_QRCODE,
                data: constructUserObj
            });
		}else{
			this.setState({ selectedContact: event.target.value });
            let constructUserObj1 = {};
            constructUserObj1.first_name = userObj.first_name;
            constructUserObj1.last_name = userObj.last_name;
            constructUserObj1.birth_date = userObj.birth_date;
            constructUserObj1.qr_code = userObj.qr_code;
            constructUserObj1.email = userObj.email;
            this.props.dispatch({
                type: USER_QRCODE,
                data: constructUserObj1
            });
		}		
	}

    render() {
        const { classes } = this.props;
        const open = Boolean(this.state.anchorEl);
        const id = open ? 'simple-popover' : undefined;
        // console.log(`TestResults ===> ${JSON.stringify(this.state.testResults)}`)

        let User = typeof localStorage !== "undefined" && localStorage.getItem('user')
        const userObj = JSON.parse(User);
        let filteredTestResults = this.state.selectedContact === 0 ? this.state.testResults : this.state.testResults.filter(res => res.patient_id === this.state.selectedContact);
        let sortedTestResults = filteredTestResults.sort((a, b) => moment(b.registration_date) - moment(a.registration_date));
        return (
            <div style={{
                margin: 30,
                backgroundColor: "white",
                backgroundRepeat: "no-repeat",
            }}>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12}>                        
                        <Typography fontSize={15}>Hello</Typography>
                        <Typography fontWeight="bold" fontSize={20} fontFamily="Futura-Heavy" color="#144787"> {userObj !== undefined && userObj !== null ? userObj.first_name + " " + userObj.last_name : ""} !</Typography>
                        <Toolbar style={{ justifyContent: "space-between", padding: 0 }}>
                            <Chip icon={<TimelineIcon style={{ color: "white" }} />} label="Recent reports" style={{ backgroundColor: '#02449E', color: "white" }} />
                            {/* <Chip
                                label="View All"
                                component="a"
                                href="/customer/view-all-reports"
                                variant="outlined"
                                clickable
                                style={{ backgroundColor: '#00C37E', color: 'white' }}
                            /> */}
                            {/* <u><a style={{}} href="/view-all-reports">View All</a></u> */}
                            {
                                this.state.userContacts !== undefined && this.state.userContacts.length > 1 && 
                                <Grid item xs={12} sm={6}>
                                    <CssSelect fullWidth size="small">
                                        <InputLabel id="demo-simple-select-autowidth-label">Select Contact <span>*</span></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            value={this.state.selectedContact}
                                            onChange={this.handleSelectContact}
                                            fullWidth
                                            label="Select Contact"
                                            required={true}
                                        >
                                            <MenuItem key={0} style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} value={0} >All</MenuItem>
                                            {
                                                this.state.userContacts.map(contact => 
                                                    <MenuItem key={contact.Id} style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} value={contact.Id} >{contact.Name}</MenuItem>
                                                )
                                            }
                                            {/* <MenuItem style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} value={"Contact-1"} >{"Contact-1"}</MenuItem>
                                            <MenuItem style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} value={"Contact-2"} >{"Contact-2"}</MenuItem>
                                            <MenuItem style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} value={"Contact-3"} >{"Contact-3"}</MenuItem> */}
                                        </Select>
                                    </CssSelect>
                                    {this.state.selectedContact_error === true && <Typography className={classes.errorText}>Please select contact</Typography>}
                                </Grid>
                            }
                        </Toolbar>
                        <Grid container direction="row" spacing={2}>
                            {
                                this.state.isLoading === false 
                                ? sortedTestResults.length > 0 && sortedTestResults.map((item, index) => 
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Card sx={{ backgroundColor: '#EDF2F8', }}>
                                            <CardContent>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography className={classes.heading}>{item.test_type_name}</Typography>
                                                    {/* <IconButton aria-label="settings" onClick={this.handleClick}>
                                                        <MoreVertIcon />
                                                    </IconButton> */}
                                                    <Menu
                                                        anchorEl={this.state.anchorEl}
                                                        open={open}
                                                        onClose={this.handleClose}
                                                        PaperProps={{
                                                            elevation: 1,
                                                            sx: {
                                                                minWidth: 200,
                                                                overflow: 'visible',
                                                                
                                                            },
                                                        }}
                                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                    >
                                                        <MenuItem onClick={this.handleClose}>
                                                            <ListItemIcon>
                                                                <FileDownloadIcon fontSize="small" />
                                                            </ListItemIcon>
                                                            Download
                                                        </MenuItem>
                                                        <Divider />
                                                        {/* <MenuItem onClick={this.handleClose}>
                                                            <ListItemIcon>
                                                                <ShareIcon fontSize="small" />
                                                            </ListItemIcon>
                                                            Share
                                                        </MenuItem> */}
                                                    </Menu>
                                                </div>
                                                <Typography style={{ fontSize: 14, color: 'gray' }}>
                                                    Patient Name: {item.patient_name}
                                                </Typography>
                                                <Typography style={{ fontSize: 12, color: 'gray' }}>
                                                    Report Number: {item.test_name}
                                                </Typography>
                                                <Typography style={{ fontSize: 12, color: 'gray' }}>
                                                    Tube Number: {item.tube_number}
                                                </Typography>
                                                <Typography style={{ fontSize: 12, color: 'gray' }}>
                                                    Registration Date: {item.registration_date !== null ? moment(item.registration_date).format('MM/DD/YYYY hh:mm a') : ''}
                                                </Typography>
                                                <Typography style={{ fontSize: 12, color: 'gray' }}>
                                                    Collection Date: {item.collection_date !== null ? moment(item.collection_date).format('MM/DD/YYYY hh:mm a') : ''}
                                                </Typography>
                                            </CardContent>
                                            <Divider />
                                            <Typography style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 16}}><span style={{ fontSize: 15 }}>Status: </span><span style={{ fontSize: 15, color: (item.status === "Result_unavailable" || item.status === "Result unavailable") ? 'red' : 'green' }} >{(item.status === "Result_unavailable" || item.status === "Result unavailable") ? "Pending" : "Ready To View"} </span></Typography>
                                            <CardActions>
                                                <Button target="_blank" href={`${REPORT_API_URL}${item.download_url}`} disabled={(item.status !== "Result_unavailable" && item.status !== "Result unavailable") ? false : true} fullWidth variant="contained" className={classes.buttonVariant}>View Report</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                                :
                                <>
                                    <Grid item xs={12} sm={6} key={0}>
                                        <Card sx={{ backgroundColor: '#EDF2F8', }}>
                                            <CardContent>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Skeleton  width="60%" />            
                                                    {/* <IconButton aria-label="settings" onClick={this.handleClick}>
                                                        <MoreVertIcon />
                                                    </IconButton>                 */}
                                                </div>
                                                <Skeleton sx={{ height: 100 }} animation="wave" variant="rectangular" />    
                                                {/* <Skeleton />
                                                <Skeleton />
                                                <Skeleton  width="60%" /> */}
                                            </CardContent>
                                            <Divider />
                                            <div style={{ padding: 16 }}>
                                                <Skeleton width="60%" />
                                            </div>
                                            <CardActions>        
                                                <Skeleton width="100%"/>
                                            </CardActions>
                                        </Card>                                    
                                    </Grid>
                                    <Grid item xs={12} sm={6} key={1}>
                                        <Card sx={{ backgroundColor: '#EDF2F8', }}>
                                            <CardContent>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Skeleton  width="60%" />            
                                                    {/* <IconButton aria-label="settings" onClick={this.handleClick}>
                                                        <MoreVertIcon />
                                                    </IconButton>                 */}
                                                </div>
                                                <Skeleton sx={{ height: 100 }} animation="wave" variant="rectangular" />    
                                                {/* <Skeleton />
                                                <Skeleton />
                                                <Skeleton  width="60%" /> */}
                                            </CardContent>
                                            <Divider />
                                            <div style={{ padding: 16 }}>
                                                <Skeleton width="60%" />
                                            </div>
                                            <CardActions>        
                                                <Skeleton width="100%"/>
                                            </CardActions>
                                        </Card>                                    
                                    </Grid>
                                </>
                            }

                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.sessionReducer.user,
        testResults: state.testResultReducer.testResults,
        userContacts: state.userReducer.user_contacts
    }
}

UserHome.layout = "default";

export default compose(withStyles(styles), connect(mapStateToProps))(UserHome);