import React, { Component } from "react";
import { Grid, Typography, Button, Dialog, DialogTitle, Tooltip, DialogActions, DialogContent, InputLabel, FormControlLabel, Checkbox, Autocomplete, TextField, MenuItem, FormControl, Select, Input, RadioGroup, Radio } from '@mui/material';
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { compose } from "redux";
import DatePicker from '@mui/lab/DatePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from "moment";
import Skeleton from '@mui/material/Skeleton';
import { ACCOUNT_END_POINT } from "../../helpers/constants";

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		// paddingTop: "20px",
		// paddingBottom: "20px",
		// paddingLeft: "10%",
		// paddingRight: "10%",
		padding: "30px 25px 40px 25px",
		backgroundColor: "#eeefee",
		flexDirection: "column"
	},
	captureButton: {
		backgroundColor: "#2473cb",
		marginTop: 15
	},
	signPad: {
		width: "100%",
		height: "100%",
		display: "flex",
	},
	signContainer: {
		width: "100%",
		height: "90%",
		marginTop: "15px",
		borderRadius: "5px",
		border: "1px solid gray",
	},
	buttonContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "flex-end"
	},
	clearButton: {
		backgroundColor: "#e6eefd",
	},
	errorText: {
		color: "red",
		fontSize: 14,
		fontFamily: "Futura-Heavy"
	},
	disclaimerText: {
		textDecoration: "underline",
		cursor: "pointer",
		'&:hover': {
			color: "#144787",
		},
	},
	comboOptions: {
		fontSize: '12px',
		color: 'red'
	},
	mainDiv: {
		width: "100%",
		height: "30vh",
		display: "flex",
		justifyContent: "center",
		backgroundColor: "#5d6c85",
		margin: "10px 0 10px 0"
	},
	imageContainer: {
		display: "flex",
		margin: "10px 0 10px 0",
		//marginTop: -40,
		// marginBottom: 50
		// paddingButtom:80
	},
})

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

const CssField = withStyles({
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
})(TextField);

class ScheduleAppointment extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            selectedDate: moment().format('YYYY-MM-DD'),
            selectedTime: null,
            timeArray: [],
            selectedTestTypeId: 0,
            selectedCalendarId: 0,
            selectedTestType: props.testType.name,
            isLoading: false
        }
    }

    componentDidMount(){
        this.fetchTimeSlots(this.state.selectedDate);
    }

    handleDate = (value) => {
        let date = moment(value).format('YYYY-MM-DD');
        this.fetchTimeSlots(date);
        this.setState({
            selectedDate: date
        });
    }

    handleTime = (event) => {
        this.setState({
            selectedTime: event.target.value
        });
    }

    fetchTimeSlots = (date) => {
        let url = `acuity-scheduling/appoinment-times?date=${date}`;
        this.setState({ isLoading: true });
        fetch(`${ACCOUNT_END_POINT}${url}`).then(response => {
            response.json().then(resp => {
                if(resp.status === 'success'){
                    this.setState({ timeArray: resp.payload, isLoading: false });
                }else{
                    this.setState({ isLoading: false });
                }
            });
        });
    }

    render(){
        return(            
            <Grid container justifyContent="center" spacing={2} style={{ marginTop: 10, marginBottom: 10}}>
                <Grid item xs={12} sm={4}>
                    <CssField size="small" value={this.state.selectedTestType} fullWidth></CssField>                    
                </Grid>
                <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DatePicker
                            fullWidth
                            label="Select Date"
                            InputFormat="MM/DD/YYYY"
                            disablePast
                            required={true}
                            value={this.state.selectedDate}
                            onChange={(value) => this.handleDate(value)}
                            renderInput={(params) => <CssField size="small" required={true} fullWidth {...params} helperText={this.state.selectedDate_error === true ? <Typography className={classes.errorText}>Please select date</Typography> : ""} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}> <Skeleton  height={70} /></Grid>
                    {/* {
                        this.state.isLoading === false
                        ?	<Grid item xs={12} sm={4}>   
								<CssSelect fullWidth size="small">
									<InputLabel id="demo-simple-select-autowidth-label">Select Time <span>*</span></InputLabel>
									<Select
										labelId="demo-simple-select-autowidth-label"
										id="demo-simple-select-autowidth"
										value={this.state.selectedTime}
										onChange={this.handleTime}
										fullWidth
										label="Select Date"
										required={true}
									>
										{this.state.timeArray.map((item, index) => (
											<MenuItem style={{ fontSize: 16 }} value={item.time} key={index}>{moment(item.time).format('hh:mm a')}</MenuItem>
										))}
									</Select>
								</CssSelect>
							</Grid>
                        :   <Grid item xs={12} sm={4}> <Skeleton  height={70} /></Grid>
                    } */}
                    
                
            </Grid>
            
        );
    }
}

const mapStateToProps = (state) => {
	return {
        ...state
	}
}

// export default ScheduleAppointment;
export default compose(withStyles(styles), connect(mapStateToProps))(ScheduleAppointment);