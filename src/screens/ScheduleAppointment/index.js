import React, { Component } from "react";
import { Grid, Typography, Button, Dialog, DialogTitle, Tooltip, DialogActions, DialogContent, InputLabel, FormControlLabel, Checkbox, Autocomplete, TextField, MenuItem, FormControl, Select, Input, RadioGroup, Radio, FormLabel } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionActions from '@mui/material/AccordionActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { compose } from "redux";
import Image from 'next/image';
import { fetchAllLocation } from "../../store/actions/locationAction";
import { fetchAllLocationTestType } from "../../store/actions/locationTestTypeAction";
import DoubleArrowRounded from '@mui/icons-material/DoubleArrowRounded';
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRounded from "@mui/icons-material/KeyboardArrowRightRounded";
import CircularProgress from '@mui/material/CircularProgress';
import { ACCOUNT_END_POINT, isMobile, screenWidth } from "../../helpers/constants";
import { IMaskInput } from 'react-imask';
import moment from "moment";
import { sendOtp, sendEmailOtp } from "../../store/actions/sessionAction";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { createUserAppointment, deleteUserAppointment } from "../../store/actions/appointmentAction";
// import Link from 'next/link';
import Router, { withRouter } from 'next/router';

const hasWindow = typeof window !== 'undefined';
const width = hasWindow ? window.innerWidth : null;
const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#eeefee",
        padding: '100px 0px 50px 0px'
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
        // height: "30vh",
        minHeight: 500,
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        // backgroundColor: "#5d6c85",
        backgroundColor: 'transparent',
        margin: "20px 0 20px 0",
        // border: '1px solid #dfdfdf',
        // boxShadow: '0 0 5px 0 rgb(0 0 0 / 10%)'
    },
    imageContainer: {
        // display: "flex",
        // margin: "10px 0 10px 0",
        marginTop: -200,
        backgroundColor: '#fff',
        paddingBottom: 75
        //maxHeight: 200
    },
    imageBanner: {
        // border: '1px solid #dfdfdf',
        background: '#fff',
    },
    imageStyle: {
        padding: 20,
        border: '1px solid #dfdfdf',
        boxShadow: '0 0 5px 0 rgb(0 0 0 / 10%)'
    },
    accordionSpacing: {
        marginBottom: 10,
        border: '1px solid #e2e2e2',
        boxShadow: '0 0 5px 0 rgb(0 0 0 / 10%)',
        borderRadius: 0
    },
    accordionTestTypeSpacing: {
        marginBottom: 15,
        border: '1px solid #e2e2e2',
        boxShadow: '0 0 5px 0 rgb(0 0 0 / 10%)',
        borderRadius: 0
    },
    numberStyle: {
        // background: '#313131',
        backgroundColor: '#1878ba',
        color: '#fff',
        borderRadius: '50%',
        width: 37.5,
        height: 37.5,
        display: 'inline-block',
        textAlign: 'center',
        paddingTop: 8,
        // marginRight: 7.5
        fontSize: '15px !important',
        marginRight: 15
    },
    locationContainer: {
        fontWeight: 400,
        cursor: 'pointer',
        border: '1px solid #e2e2e2',
        marginBottom: 7.5,
        padding: '15px 22.5px',
        marginBottom: 10,
        marginRight: 10,
        "&:hover": {
            // backgroundColor: 'rgb(7, 177, 77, 0.42)'
            backgroundColor: 'rgba(24,120,186, 0.7)',
            color: '#fff'
        },
        // "&:active": {
        //     backgroundColor: '#1878ba'
        // },
    },
    activeLocationContainer: {
        backgroundColor: '#1878ba'
    },
    testTypeContainer: {
        fontWeight: 400,
        cursor: 'pointer',
        borderBottom: '1px solid #e2e2e2',
        // marginBottom: 7.5,
        padding: '15px 22.5px',
        // marginBottom: 10,
        "&:hover": {
            backgroundColor: '#f5f5f5'
        },
    },
    dateContainer: {
        cursor: 'pointer',
        // marginBottom: 7.5,
        padding: '15px 22.5px',
    },
    showTestType: {
        display: 'flex',
        flexDirection: 'column'
    },
    selectors: {
        color: '#686868',
        textTransform: 'uppercase',
        letterSpacing: '.05em',
        fontWeight: 700,
        fontSize: 14,
        textDecoration: 'underline'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: '#686868',
    },
    progress: {
        backgroundColor: '#f9f9f9',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        minHeight: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeStyle: {
        fontWeight: 400,
        color: '#4f4f4f',
        padding: '7.5px 15px',
        margin: '5px 0',
        cursor: 'pointer',
        position: 'relative'
    },
    timeContainerStyle: {
        "&:hover": {
            border: '3px solid #1878ba !important',
            backgroundColor: '#f5f5f5'
        },
    },
    homeButton: {
		marginRight: 10,
		backgroundColor: "#1879BB",
		fontFamily: "MaisonNeue-Book",
		color: "#fff",
		textTransform: 'none',
		width: "50px",
		margin: "10px",
		borderRadius: 5
	}
});

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

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="(#00) 000-0000"
            definitions={{
                '#': /[0-9]/,
            }}
            type="tel"
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

class ScheduleAppointment extends Component {
    constructor() {
        super();
        this.state = {
            expanded: "panel1",
            expandTestType: 0,
            selectedLocation: 0,
            selectedLocationTestType: 0,
            selectedTimeSlot: "",
            locations: [],
            locationsTestTypes: [],
            appointmentDates: [],
            appointmentDateWithTimes: [],
            isDatesLoading: false,
            columnsPerPage: width <= 450 ? 3 : 5,
            percentageWidth: width <= 450 ? "33.33%" : "20%",
            pageNumber: 1,
            start: 0,
            end: width <= 450 ? 3 : 5,
            countryCodes: ["+1"],
            locationName: "",
            testTypeName: "",
            first_name: "",
            first_name_error: false,
            last_name: "",
            last_name_error: false,
            phone_number: "",
            phone_number_error: false,
            selectedCountryCode: "+1",
            verification_code: "",
            email: "",
            email_error: false,
            invalid_phone_number_error: false,
            invalid_verification_code_error: false,
            isLoading: false,
            appointmentId: "",
            verify_otp: "",
            verify_use: "PHONE",
            verify_email_otp: "",
            price: 0,
            verifyUsingError: false,
            currentTestType: null,
            locationParam: null,
            testTypeParam: null,
            locationAddress: " "
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.locations !== state.locations || props.locationsTestTypes !== state.locationsTestTypes) {
            return {
                locations: props.locations,
                locationsTestTypes: props.locationsTestTypes
            }
        }

        return null;
    }

    componentDidMount() {
        this.props.dispatch(fetchAllLocation());
        this.props.dispatch(fetchAllLocationTestType());
    }

    componentDidUpdate(prevProps, prevState){
        const query = new URLSearchParams(window.location.search);
        let getLocation = query.get('location');
        let getTestType = query.get('test-type');
        if((getLocation !== undefined && getLocation !== null && getTestType !== undefined && getTestType !== null)){
            if(this.props.locationsTestTypes.length > 0){
                if((this.state.locationParam !== getLocation || this.state.testTypeParam !== getTestType)){
                    let fetchLocationTestType = this.state.locationsTestTypes.find(locTest => locTest.location.code === getLocation && locTest.testType.code === getTestType && locTest.status === 'ACTIVE');

                    if(fetchLocationTestType !== undefined){
                        this.handleQuerySelector(fetchLocationTestType.location, fetchLocationTestType);
                    }
                }
            }
        }else if(getLocation !== undefined && getLocation !== null){
            if(this.props.locationsTestTypes.length > 0){
                if((this.state.locationParam !== getLocation)){
                    let fetchLocationTestTypeWithLocation = this.state.locationsTestTypes.find(locTest => locTest.location.code === getLocation && locTest.status === 'ACTIVE');

                    if(fetchLocationTestTypeWithLocation !== undefined){
                        this.handleQuerySelectorLocation(fetchLocationTestTypeWithLocation.location);
                    }
                }
            }
        }
    }

    handleChange = (name) => {
        // console.log(`Name ==> ${name}`)
        if(name === 'panel1'){
           this.setState({ expanded: name, expandTestType: 0, currentTestType: null, isDatesLoading: true, start: 0, end: 5, selectedLocationTestType: 0, testTypeName: "", price: 0, selectedTimeSlot: "" }) ;
        }else{
            this.setState({ expanded: name });
        }
        // this.setState({ expanded: name });
    }

    handleTestTypeChange = (testType) => {
        // const { start, end } = this.state;
        if (this.state.selectedLocationTestType !== testType.id) {
            let testTypeName = testType.testType.display_name !== null ? testType.testType.display_name : testType.testType.name;
            this.setState({ expandTestType: testType.id, currentTestType: testType, selectedLocationTestType: testType.id, testTypeName: testTypeName, price: testType.price, isDatesLoading: true, start: 0, end: 5 });
            // this.fetchLocationTypeDates();
            let count = width <= 450 ? 3 : 5;
            this.fetchAvailableDateTimes(0, count, testType.location.acuity_ref, testType.acuity_ref);
        }
    }
    
    handleQuerySelector = (location, testType) => {
        let testTypeName = testType.testType.display_name !== null ? testType.testType.display_name : testType.testType.name;
        this.setState({ 
            selectedLocation: location.id, 
            locationName: location.name, 
            expandTestType: testType.id, 
            currentTestType: testType, 
            selectedLocationTestType: testType.id, 
            // testTypeName: testType.testType.name, 
            testTypeName: testTypeName,
            price: testType.price, 
            isDatesLoading: true, 
            start: 0, 
            end: 5,
            locationParam: location.code, 
            testTypeParam: testType.testType.code, 
            expanded: 'panel2',
            locationAddress: `${!!location.street_address_line1 ? `${location.street_address_line1},` : " " } ${!!location.street_address_line2 ? `${location.street_address_line2},`: " "} ${!!location.city? `${location.city},`: " "} ${!!location.state ? `${location.state},` : " "} ${!!location.country ? `${location.country},`: " "} ${!!location.zipcode ? `${location.zipcode}`: " "}`

        });
        // this.fetchLocationTypeDates();
        let count = width <= 450 ? 3 : 5;
        this.fetchAvailableDateTimes(0, count, testType.location.acuity_ref, testType.acuity_ref);
    }

    handleQuerySelectorLocation = (location)=> {
        this.setState({
            selectedLocation: location.id, 
            locationName: location.name, 
            start: 0, 
            end: 5,
            locationParam: location.code, 
            expanded: 'panel2',
            locationAddress: `${!!location.street_address_line1 ? `${location.street_address_line1},` : " " } ${!!location.street_address_line2 ? `${location.street_address_line2},`: " "} ${!!location.city? `${location.city},`: " "} ${!!location.state ? `${location.state},` : " "} ${!!location.country ? `${location.country},`: " "} ${!!location.zipcode ? `${location.zipcode}`: " "}`
        });
    }

    handleLocation = (currentLocation) => {
        this.setState({ selectedLocation: currentLocation.id, locationName: currentLocation.name, locationAddress: `${!!currentLocation.street_address_line1 ? `${currentLocation.street_address_line1},` : " " } ${!!currentLocation.street_address_line2 ? `${currentLocation.street_address_line2},`: " "} ${!!currentLocation.city? `${currentLocation.city},`: " "} ${!!currentLocation.state ? `${currentLocation.state},` : " "} ${!!currentLocation.country ? `${currentLocation.country},`: " "} ${!!currentLocation.zipcode ? `${currentLocation.zipcode}`: " "}`});
    }

    handleTestType = (currentTestType) => {
        this.setState({ selectedLocationTestType: currentTestType.id });
    }

    handleNext = () => {
        const { pageNumber, columnsPerPage, appointmentDates, currentTestType } = this.state;
        // if(((pageNumber + 1) * columnsPerPage) <= appointmentDates.length){
        let start = pageNumber > 0 ? ((pageNumber) * columnsPerPage) : 0;
        let end = (pageNumber + 1) * columnsPerPage;
        this.setState({ pageNumber: pageNumber + 1, start: start, end: end, isDatesLoading: true }, () => {
            // It is an callback function.
            // Here you can access the update value
            this.fetchAvailableDateTimes(start, end, currentTestType.location.acuity_ref, currentTestType.acuity_ref);
        });
        // }
    }

    handlePrevious = () => {
        const { pageNumber, columnsPerPage, currentTestType } = this.state;
        if (pageNumber > 1) {
            let end = pageNumber > 0 ? ((pageNumber - 1) * columnsPerPage) : 0;
            let start = (pageNumber - 2) * columnsPerPage;
            this.setState({ pageNumber: pageNumber - 1, start: start, end: end, isDatesLoading: true }, () => {
                // It is an callback function.
                // Here you can access the update value
                this.fetchAvailableDateTimes(start, end, currentTestType.location.acuity_ref, currentTestType.acuity_ref);
            });
        }
    }

    handleTextChange = (event) => {
        if (this.state.verify_use === 'PHONE') {
            if (event.target.value !== "") {
                this.setState({
                    phone_number: event.target.value, phone_number_error: false, invalid_phone_number_error: false
                });
            } else {
                this.setState({
                    phone_number: event.target.value, phone_number_error: false, verify_otp: ""
                });
            }
        } else {
            this.setState({
                phone_number: event.target.value, phone_number_error: false, invalid_phone_number_error: false
            });
        }

    };

    fetchLocationTypeDates = () => {
        let url = `acuity-scheduling/appointment-slots?appointmentTypeID=28950776&calendarId=6306720&start=${this.state.start}&end=${this.state.end}`;
        // this.setState({ isDatesLoading: true });
        // need to add appointmentTypeId and calendarId
        fetch(`${ACCOUNT_END_POINT}${url}`).then(response => {
            response.json().then(resp => {
                if (resp.status === 'success') {
                    this.setState({ appointmentDates: resp.payload, isDatesLoading: false });
                } else {
                    this.setState({ isDatesLoading: false });
                }
            });
        });
    }

    fetchAvailableDateTimes = (start, end, calendarId, appointmentTypeId) => {
        let url = `acuity-scheduling/appointment-slots?appointmentTypeID=${appointmentTypeId}&calendarId=${calendarId}&start=${start}&end=${end}`;
        // this.setState({ isDatesLoading: true });
        // need to add appointmentTypeId and calendarId
        fetch(`${ACCOUNT_END_POINT}${url}`).then(response => {
            response.json().then(resp => {
                if (resp.status === 'success') {
                    this.setState({ appointmentDates: resp.payload, isDatesLoading: false });
                } else {
                    this.setState({ isDatesLoading: false });
                }
            });
        });
    }

    pickTimeSLot = (time) => {
        console.log(`Time ---> ${time}`)
        this.setState({ selectedTimeSlot: time });
    }

    createAppointment = () => {
        const { first_name, last_name, phone_number, email, selectedCountryCode, selectedLocation, selectedLocationTestType, selectedTimeSlot, verify_otp, verify_email_otp, verify_use, currentTestType } = this.state;
        let isError = false;
        if (first_name === "" || first_name === null) {
            this.setState({ first_name_error: true });
            isError = true
        }

        if (last_name === "" || last_name === null) {
            this.setState({ last_name_error: true })
            isError = true
        }

        if (phone_number === "" || phone_number === null || phone_number === undefined) {
            this.setState({ phone_number_error: true })
            isError = true
        } else {
            if (phone_number.length < 10) {
                this.setState({ invalid_phone_number_error: true })
                isError = true
            }
        }

        if (email === "" || email === null) {
            this.setState({ email_error: true })
            isError = true
        } else {
            if (!this.validateEmail(email)) {
                this.setState({ invalid_email_error: true });
                isError = true;
            }
        }
        if (verify_use === "PHONE" && (phone_number === "") && (verify_otp === undefined || verify_otp !== "VERIFIED" || verify_otp === "")) {
            this.setState({ invalid_verification_code_error: true })
            isError = true
        }

        if (verify_use === "EMAIL" && (email === "") && (verify_email_otp === undefined || verify_email_otp !== "VERIFIED" || verify_email_otp === "")) {
            this.setState({ invalid_verification_code_error: true })
            isError = true
        }

        // if (verify_use === "EMAIL" && verify_email_otp === null && email !== undefined) {
        //     this.setState({ invalid_verification_code_error: true })
        //     isError = true
        // }

        // if (verify_use === "EMAIL" && email === "" && (verify_email_otp !== "VERIFIED" || verify_email_otp === undefined)) {
        //     this.setState({ invalid_verification_code_error: true })
        //     isError = true
        // }

        // if (verify_use === null) {
        //     this.setState({ verifyUsingError: true })
        //     isError = true
        // }

        if (isError === false) {
            this.setState({ isLoading: true });
            let testType = this.state.locationsTestTypes.find(type => type.id === this.state.selectedLocationTestType);
            let userObj = {};
            userObj.first_name = first_name;
            userObj.last_name = last_name;
            userObj.phone_number = phone_number;
            userObj.country_code = selectedCountryCode;
            userObj.email = email;
            userObj.location_id = selectedLocation;
            userObj.test_type_id = testType !== undefined ? testType.testType.id : 0;
            userObj.location_test_type_id = selectedLocationTestType;
            userObj.appointment_date = selectedTimeSlot !== null && selectedTimeSlot !== '' ? moment(selectedTimeSlot).format('YYYY-MM-DD') : '';
            userObj.appointment_time = selectedTimeSlot !== null && selectedTimeSlot !== '' ? selectedTimeSlot : '';
            //  acuity_appointment_id
            // userObj.appointmentTypeID = 28950776;
            // userObj.calendarId = 6306720;
            userObj.appointmentTypeID = currentTestType !== null ? currentTestType.acuity_ref : null;
            userObj.calendarId = currentTestType !== null ? currentTestType.location.acuity_ref : null;
            this.props.dispatch(createUserAppointment(userObj, this));
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    refreshScheduleAppointment = () => {
        this.setState({
            expanded: 'panel1',
            expandTestType: 0,
            selectedLocation: 0,
            selectedLocationTestType: 0,
            selectedTimeSlot: '',
            locations: [],
            locationsTestTypes: [],
            appointmentDates: [],
            appointmentDateWithTimes: [],
            isDatesLoading: false,
            columnsPerPage: width <= 450 ? 3 : 5,
            pageNumber: 1,
            start: 0,
            end: width <= 450 ? 3 : 5,
            countryCodes: ["+1"],
            locationName: '',
            testTypeName: '',
            first_name: "",
            first_name_error: false,
            last_name: "",
            last_name_error: false,
            phone_number: "",
            phone_number_error: false,
            selectedCountryCode: "+1",
            email: "",
            email_error: false,
            invalid_phone_number_error: false,
            isLoading: false,
            appointmentId: '',
            verify_otp: '',
            verify_use: 'PHONE',
            verify_email_otp: '',
            price: 0,
            currentTestType: null,
            locationAddress: ""
        });

        Router.push({ pathname: '/schedule-appointment' });
    }

    cancleAppointment = (appointmentId) => {
        if (appointmentId !== "") {
            this.props.dispatch(deleteUserAppointment(appointmentId, this));
            Router.push({ pathname: '/schedule-appointment' });
        }
    }


    radioButtonAction = (event) => {
        this.setState({ verify_use: event.target.value, verify_otp: '', verify_email_otp: '', invalid_verification_code_error: false, verifyUsingError: false });
    };


    sendOtp = () => {

        let isError = false;
        let { phone_number } = this.state;
        if (phone_number === "" || phone_number === null || phone_number === undefined) {
            this.setState({ phone_number_error: true })
            isError = true
        } else {
            if (phone_number.length < 10) {
                this.setState({ invalid_phone_number_error: true })
                isError = true
            }
        }
        if (isError === false) {
            let data = {};
            data.country_code = "+1";
            data.phone = phone_number;
            this.props.dispatch(sendOtp(this, data))
        }
    }

    sendEmailOtp = () => {

        let isError = false;
        let { email } = this.state;
        if (email === "" || email === null || email === undefined) {
            this.setState({ email_error: true })
            isError = true
        } else {
            if (!this.validateEmail(email)) {
                this.setState({ invalid_email_error: true })
                isError = true
            }
        }
        if (isError === false) {
            let data = {};
            data.email = email;
            this.props.dispatch(sendEmailOtp(this, data))
        }
    }

    verifyOtp = () => {
        if (this.props.verification_code === this.state.verification_code) {
            let verify_email_otp = this.state.verify_email_otp;
            this.setState({ verify_otp: "VERIFIED", verify_email_otp: "VERIFIED", verification_code: "", verified_through: verify_email_otp !== null ? 'EM' : 'PN' });
        } else {
            this.setState({ invalid_verification_code_error: true })
        }
    }

    render() {
        const { classes } = this.props;
        const { expanded, start, end, pageNumber } = this.state;
        // let filterPaidLocationTestType = this.state.locationsTestTypes !== null && this.state.locationsTestTypes.length > 0 && this.state.locationsTestTypes.filter(type => type.location_id === this.state.selectedLocation && type.is_paid_type === true && type.status === 'ACTIVE');
        // let filterFreeLocationTestType = this.state.locationsTestTypes !== null && this.state.locationsTestTypes.length > 0 && this.state.locationsTestTypes.filter(type => type.location_id === this.state.selectedLocation && type.is_paid_type === false && type.status === 'ACTIVE');

        let filterFreeLocationTestType = this.state.locationsTestTypes !== null && this.state.locationsTestTypes.length > 0 && this.state.locationsTestTypes.filter(type => type.location_id === this.state.selectedLocation && type.status === 'ACTIVE');

        return (
            <div style={{ backgroundColor: "#eeefee", }} >
                <Button variant="contained" onClick={() => Router.push({ pathname: '/' })} className={classes.homeButton} >
                    <Typography fontWeight="bold" fontSize={15} textAlign="center" fontFamily="Futura-Heavy" color="white" style={{ textTransform: "capitalize" }} >Home </Typography>
                </Button>
                <div className={classes.root}>
                    {/* <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={11} sm={10} md={9} lg={8}>                    
                        <div className={classes.mainDiv}>
                            <div className={classes.imageContainer}>
                                <div className={classes.imageStyle}>
                                    <Image src={require('../../../public/images/logoBanner.png')} height="150" width="478" alt="Logo" className={classes.imageBanner} />
                                </div>                                
                            </div>
                        </div>
                    </Grid>
                </Grid> */}

                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={11} sm={10} md={9} lg={8}>
                            <div className={classes.mainDiv}>
                                {/* <div className={classes.imageContainer}>
                                <div className={classes.imageStyle}>
                                    <Image src={require('../../../public/images/logoBanner.png')} height="150" width="478" alt="Logo" className={classes.imageBanner} />
                                </div>                                
                            </div> */}
                                <Accordion expanded={expanded === 'panel1'} className={classes.accordionSpacing}>
                                    <AccordionSummary
                                        //expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        style={{ marginTop: 100 }}
                                    >


                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                            <div className={classes.imageContainer}>
                                                <div className={classes.imageStyle}>
                                                    {/* <Image src={require('../../../public/images/logoBanner.png')} height="150" width="478" alt="Logo" className={classes.imageBanner} /> */}
                                                    <Image src={require('../../../public/images/ScottsdaleLogo.jpeg')} height="150" width="523" alt="Logo" className={classes.imageBanner} />
                                                    
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                <div style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                    {/* <span className={classes.numberStyle}>1</span> */}
                                                    <Typography sx={{ flexShrink: 0, fontSize: 20 }}>
                                                        <span className={classes.numberStyle}>1</span>Select Location
                                                    </Typography>
                                                </div>
                                                {
                                                    this.state.selectedLocation !== 0 && expanded !== 'panel1' && this.state.locationName !== '' &&
                                                    <>
                                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 54 }}>
                                                            <Typography sx={{ flexShrink: 0, fontSize: 16, color: '#555', fontWeight: 'bold', paddingRight: '10px !important' }}>{this.state.locationName}</Typography>          
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 54 }}>                                                    
                                                            <Typography sx={{ flexShrink: 0, fontSize: 14, color: '#555', paddingRight: '10px !important' }}>{this.state.locationAddress}</Typography>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails style={{ padding: 30 }}>
                                        <Grid container>
                                            {
                                                this.state.locations !== null && this.state.locations.length > 0 && this.state.locations.map((location, index) => (
                                                    location.status === 'ACTIVE' &&
                                                    <Grid item xs={12} sm={6} lg={4} key={`L-${location.id}`}>
                                                        <div className={classes.locationContainer} key={`L-${location.id}`} style={{ backgroundColor: this.state.selectedLocation === location.id ? '#1878ba' : undefined, color: this.state.selectedLocation === location.id ? '#fff' : undefined }} onClick={() => this.handleLocation(location)}>
                                                            <Typography style={{fontWeight: "bold"}}>
                                                                {location.name}
                                                            </Typography>
                                                            {                                                            
                                                                <Typography style={{fontSize: 14}}>
                                                                    {`${!!location.street_address_line1 ? `${location.street_address_line1},` : " " } ${!!location.street_address_line2 ? `${location.street_address_line2},`: " "} ${!!location.city? `${location.city},`: " "} ${!!location.state ? `${location.state},` : " "} ${!!location.country ? `${location.country},`: " "} ${!!location.zipcode ? `${location.zipcode}`: " "}`}
                                                                </Typography>
                                                            }
                                                        </div>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                        {/* <div style={{ display: 'flex', flexDirection: 'row'}}>
                                        {
                                            this.state.locations !== null && this.state.locations.length > 0 && this.state.locations.map((location, index) => (
                                                <div className={classes.locationContainer} key={`L-${location.id}`} style={{backgroundColor: this.state.selectedLocation === location.id ? '#1878ba' : undefined, color: this.state.selectedLocation === location.id ? '#fff' : undefined }} onClick={()=> this.handleLocation(location)}>
                                                    <Typography>
                                                        {location.name}
                                                    </Typography>
                                                </div>
                                            ))
                                        }
                                    </div> */}

                                    </AccordionDetails>
                                    {
                                        this.state.selectedLocation !== 0 &&
                                        <AccordionActions style={{ float: 'left', padding: '0px 0px 20px 30px' }}>
                                            <Button size="small" variant="contained" style={{ textTransform: 'none', backgroundColor: 'rgb(24, 120, 186)' }} color="primary" onClick={() => this.handleChange('panel2')}>Continue <DoubleArrowRounded fontSize="20px" /></Button>
                                        </AccordionActions>
                                    }

                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} className={classes.accordionSpacing}>
                                    <AccordionSummary
                                        //expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                    >
                                        <div style={{ flexDirection: 'column', width: '100%' }}>
                                            <div style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                {/* <span className={classes.numberStyle}>2</span> */}
                                                <Typography sx={{ flexShrink: 0, fontSize: 20 }} noWrap={false}>
                                                    <span className={classes.numberStyle}>2</span>Choose Test (Scroll Down to See All Options)
                                                </Typography>
                                            </div>
                                            {
                                                this.state.selectedLocation !== 0 && expanded !== 'panel2' && this.state.testTypeName !== '' &&
                                                <div style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 54 }}>
                                                    <Typography sx={{ flexShrink: 0, fontSize: 16, color: '#555', paddingRight: '10px !important' }}><span style={{ fontWeight: 'bold' }}>{this.state.testTypeName} (${this.state.price})</span> - {moment(this.state.selectedTimeSlot).format('MMMM DD, YYYY h:mma')}</Typography>
                                                    {/* <Typography sx={{  flexShrink: 0, fontSize: 16, color: '#777' }}>{` ${moment(this.state.selectedTimeSlot).format('MMMM DD, YYYY h:mma')}`}</Typography> */}
                                                </div>
                                            }
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails style={{ padding: 30 }}>
                                        {/* {
                                            filterPaidLocationTestType.length > 0 &&
                                            <div style={{ paddingTop: 10, paddingBottom: 10 }} key={0}>
                                                <Typography sx={{ flexShrink: 0, fontSize: 18, color: '#777', fontWeight: 'bold' }}>
                                                    1. Testing Options
                                                </Typography>
                                            </div>
                                        } */}
                                        {/* {
                                            filterPaidLocationTestType.length > 0 && filterPaidLocationTestType.sort((a,b)=>parseInt(a.rank_order !== null ? a.rank_order : 0)-parseInt(b.rank_order !== null ? b.rank_order : 0)).map((testType, index) => (
                                                <Accordion key={`TT-${testType.id}`} expanded={this.state.expandTestType === testType.id} onChange={() => this.handleTestTypeChange(testType)} className={classes.accordionTestTypeSpacing}>
                                                    <AccordionSummary aria-controls={`panel${testType.id}d-content`} id={`panel${testType.id}d-header`} className={classes.testTypeContainer} style={{ backgroundColor: this.state.selectedLocationTestType === testType.id ? '#f5f5f5' : undefined, color: this.state.selectedLocationTestType === testType.id ? '#fff' : undefined }}>
                                                        <div className={classes.showTestType}>
                                                            <Typography sx={{ flexShrink: 0, fontSize: 18, color: '#000', fontWeight: 'bold' }}>
                                                                {`${testType.testType.display_name !== null ? testType.testType.display_name : testType.testType.name}`}
                                                            </Typography>
                                                            <Typography sx={{ flexShrink: 0, fontSize: 14, color: '#777' }}>
                                                                {`$${testType.price}`}
                                                            </Typography>
                                                            <div style={{ flexShrink: 0, fontSize: 14, color: '#777' }} dangerouslySetInnerHTML={{ __html: testType.testType.description }}></div>
                                                        </div>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={classes.dateContainer}>
                                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            {
                                                                start > 0
                                                                    ? <span className={classes.row} onClick={() => this.state.isDatesLoading === false ? this.handlePrevious() : null}><KeyboardArrowLeftRounded /> <Typography className={classes.selectors}>Previous</Typography></span>
                                                                    : <div></div>
                                                            }

                                                            <span className={classes.row} onClick={() => this.state.isDatesLoading === false ? this.handleNext() : null} style={{ float: 'right' }}><Typography className={classes.selectors}>More Times</Typography> <KeyboardArrowRightRounded /></span>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 15 }}>
                                                            {
                                                                this.state.isDatesLoading === true
                                                                    ? <div key={`T0`} className={classes.progress}>
                                                                        <CircularProgress />
                                                                    </div>
                                                                    : this.state.appointmentDates.length > 0 &&
                                                                    this.state.appointmentDates.map((currentDate, index) => (
                                                                        <div key={currentDate.date} style={{ width: this.state.percentageWidth, textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                                                                            <div style={{ backgroundColor: '#f9f9f9', textAlign: 'center', display: 'flex', flexDirection: 'column', padding: 10 }}>
                                                                                <Typography sx={{ flexShrink: 0, fontSize: 16, color: '#333', fontWeight: 'bold' }}>{moment(currentDate.date).format('dddd')}</Typography>
                                                                                <Typography sx={{ flexShrink: 0, fontSize: 14, color: '#686868' }}>{moment(currentDate.date).format('MMMM DD')}</Typography>
                                                                            </div>
                                                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                                {
                                                                                    currentDate.times.length === 0
                                                                                        ? <div style={{ backgroundColor: 'rgba(104, 104, 104,0.3)', margin: 5 }}>
                                                                                            <Typography className={classes.timeStyle} style={{ color: '#333' }}> CLOSED</Typography>
                                                                                        </div>
                                                                                        : currentDate.times.map(time => (
                                                                                            <div key={moment(time.time).format('DD-MM-hh-mm')} className={classes.timeContainerStyle} style={{ margin: 5, padding: 5, border: this.state.selectedTimeSlot === time.time ? '3px solid #1878ba' : 'none' }} onClick={() => this.pickTimeSLot(time.time)}>
                                                                                                <Typography className={classes.timeStyle}> {moment(time.time).format('h:mma')}</Typography>
                                                                                                {
                                                                                                    this.state.selectedTimeSlot === time.time &&
                                                                                                    <Button size="small" variant="contained" style={{ textTransform: 'none', backgroundColor: 'rgb(24, 120, 186)' }} color="primary" onClick={() => this.handleChange('panel3')}>Continue <DoubleArrowRounded fontSize="20px" /></Button>
                                                                                                }
                                                                                            </div>
                                                                                        ))
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                            }
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            ))
                                        } */}

                                        {/* {
                                            filterFreeLocationTestType.length > 0 &&
                                            <div style={{ paddingTop: 10, paddingBottom: 10 }} key={`F0`}>
                                                <Typography sx={{ flexShrink: 0, fontSize: 18, color: '#777', fontWeight: 'bold' }}>
                                                    2. Free Testing Options
                                                </Typography>
                                            </div>
                                        } */}
                                        {
                                            filterFreeLocationTestType.length > 0 && filterFreeLocationTestType.sort((a,b)=>parseInt(a.rank_order !== null ? a.rank_order : 0)-parseInt(b.rank_order !== null ? b.rank_order : 0)).map((testType, index) => (
                                                <Accordion key={`TT-${testType.id}`} expanded={this.state.expandTestType === testType.id} onChange={() => this.handleTestTypeChange(testType)} className={classes.accordionTestTypeSpacing}>
                                                    <AccordionSummary aria-controls={`panel${testType.id}d-content`} id={`panel${testType.id}d-header`} className={classes.testTypeContainer} style={{ backgroundColor: this.state.selectedLocationTestType === testType.id ? '#f5f5f5' : undefined, color: this.state.selectedLocationTestType === testType.id ? '#fff' : undefined }}>
                                                        <div className={classes.showTestType}>
                                                            <Typography sx={{ flexShrink: 0, fontSize: 18, color: '#000', fontWeight: 'bold' }}>
                                                                {`${testType.testType.display_name !== null ? testType.testType.display_name : testType.testType.name}`}
                                                            </Typography>
                                                            <Typography sx={{ flexShrink: 0, fontSize: 14, color: '#777' }}>
                                                                {`$${testType.price}`}
                                                            </Typography>
                                                            {/* <Typography sx={{  flexShrink: 0, fontSize: 14, color: '#777' }}>
                                                            {testType.testType.description}
                                                        </Typography> */}
                                                            <div style={{ flexShrink: 0, fontSize: 14, color: '#777' }} dangerouslySetInnerHTML={{ __html: testType.testType.description }}></div>
                                                        </div>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={classes.dateContainer}>
                                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            {
                                                                start > 0
                                                                    ? <span className={classes.row} onClick={() => this.state.isDatesLoading === false ? this.handlePrevious() : null}><KeyboardArrowLeftRounded /> <Typography className={classes.selectors}>Previous</Typography></span>
                                                                    : <div></div>
                                                            }
                                                            {/* <span className={classes.row} onClick={()=> this.handlePrevious()}><KeyboardArrowLeftRounded /> <Typography className={classes.selectors}>Previous</Typography></span> */}
                                                            <span className={classes.row} onClick={() => this.handleNext()} style={{ float: 'right' }}><Typography className={classes.selectors}>More Times</Typography> <KeyboardArrowRightRounded /></span>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 15 }}>
                                                            {
                                                                this.state.isDatesLoading === true
                                                                    ? <div key={`TF0`} className={classes.progress}>
                                                                        <CircularProgress />
                                                                    </div>
                                                                    : this.state.appointmentDates.length > 0 &&
                                                                    this.state.appointmentDates.map((currentDate, index) => (
                                                                        <div key={currentDate.date} style={{ width: this.state.percentageWidth, textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                                                                            <div style={{ backgroundColor: '#f9f9f9', textAlign: 'center', display: 'flex', flexDirection: 'column', padding: 10 }}>
                                                                                <Typography sx={{ flexShrink: 0, fontSize: 16, color: '#333', fontWeight: 'bold' }}>{moment(currentDate.date).format('dddd')}</Typography>
                                                                                <Typography sx={{ flexShrink: 0, fontSize: 14, color: '#686868' }}>{moment(currentDate.date).format('MMMM DD')}</Typography>
                                                                            </div>
                                                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                                {
                                                                                    currentDate.times.length === 0
                                                                                        ? <div style={{ backgroundColor: 'rgba(104, 104, 104,0.3)', margin: 5 }}>
                                                                                            <Typography className={classes.timeStyle} style={{ color: '#333' }}> CLOSED</Typography>
                                                                                        </div>
                                                                                        : currentDate.times.map(time => (
                                                                                            <div key={moment(time.time).format('DD-MM-hh-mm')} className={classes.timeContainerStyle} style={{ margin: 5, padding: 5, border: this.state.selectedTimeSlot === time.time ? '3px solid #1878ba' : 'none' }} onClick={() => this.pickTimeSLot(time.time)}>
                                                                                                <Typography className={classes.timeStyle}> {moment(time.time).format('h:mma')}</Typography>
                                                                                                {
                                                                                                    this.state.selectedTimeSlot === time.time &&
                                                                                                    <Button size="small" variant="contained" style={{ textTransform: 'none', backgroundColor: 'rgb(24, 120, 186)' }} color="primary" onClick={() => this.handleChange('panel3')}>Continue <DoubleArrowRounded fontSize="20px" /></Button>
                                                                                                }
                                                                                            </div>
                                                                                        ))
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                            }
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            ))
                                        }
                                    </AccordionDetails>
                                    <AccordionActions style={{ float: 'left', padding: '0px 0px 20px 30px' }}>
                                        <Button size="small" variant="contained" style={{ textTransform: 'none', backgroundColor: 'rgb(24, 120, 186)', marginRight: 10 }} color="primary" onClick={() => this.handleChange('panel1')}><KeyboardArrowLeftRounded fontSize="20px" /> Previous</Button>
                                        {
                                            this.state.selectedLocationTestType !== 0 && this.state.selectedTimeSlot !== '' &&
                                            <Button size="small" variant="contained" style={{ textTransform: 'none', backgroundColor: 'rgb(24, 120, 186)' }} color="primary" onClick={() => this.handleChange('panel3')}>Continue <DoubleArrowRounded fontSize="20px" /></Button>
                                        }
                                    </AccordionActions>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel3'} className={classes.accordionSpacing}>
                                    <AccordionSummary
                                        //expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3bh-content"
                                        id="panel3bh-header"
                                    >
                                        <div style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            {/* <span className={classes.numberStyle}>3</span> */}
                                            <Typography sx={{ flexShrink: 0, fontSize: 20 }}>
                                                <span className={classes.numberStyle}>3</span>Your Information
                                            </Typography>
                                        </div>
                                    </AccordionSummary>

                                    <AccordionDetails style={{ padding: 30 }}>
                                        <FormControl component="fieldset" style={{ marginBottom: 20 }} >
                                            <Typography fontSize={16} color={"#444"}>Verify using Phone or Mail<span style={{ color: "red", paddingBottom: 5 }}>*</span></Typography>
                                            {/* <FormLabel component="legend" style={{ paddingTop: '5px !important' }}> Verify</FormLabel> */}
                                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group"
                                                onChange={this.radioButtonAction}
                                                value={this.state.verify_use}
                                                style={{ fontSize: 12 }}
                                            >
                                                <FormControlLabel value="PHONE" control={<Radio />} label={<Typography fontSize={14} color={"#444"}>Phone</Typography>} />
                                                <FormControlLabel value="EMAIL" control={<Radio />} label={<Typography fontSize={14} color={"#444"}>Email</Typography>} />
                                            </RadioGroup>
                                        </FormControl>

                                        <Typography sx={{ flexShrink: 0, fontSize: 16, color: '#444', paddingBottom: '5px !important' }}>
                                            Name <span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6} md={5} lg={5}>
                                                <TextField
                                                    error={this.state.first_name_error === true ? true : false}
                                                    fullWidth
                                                    size="small"
                                                    id="first-name"
                                                    name="first-name"
                                                    placeholder="First Name"
                                                    autoComplete="off"
                                                    required={true}
                                                    value={this.state.first_name}
                                                    onChange={(event) => this.setState({ first_name: event.target.value, first_name_error: false })}
                                                //helperText={this.state.first_name_error === true ? <Typography className={classes.errorText}>Please enter first name</Typography> : null}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={7} lg={7}>
                                                <TextField
                                                    fullWidth
                                                    error={this.state.last_name_error === true ? true : false}
                                                    size="small"
                                                    id="last_name"
                                                    name="last_name"
                                                    placeholder="Last Name"
                                                    autoComplete="off"
                                                    required={true}
                                                    value={this.state.last_name}
                                                    onChange={(event) => this.setState({ last_name: event.target.value, last_name_error: false })}
                                                //helperText={this.state.last_name_error === true ? <Typography className={classes.errorText}>Please enter last name</Typography> : null}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Typography sx={{ flexShrink: 0, fontSize: 16, color: '#444', paddingBottom: '5px !important', paddingTop: '20px !important' }}>
                                            Phone Number <span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <TextField
                                                        sx={{ width: 100, marginRight: 0.5 }}
                                                        select
                                                        size="small"
                                                        InputProps={{ classes: { input: classes.inputStyle, underline: classes.underline, root: classes.inputRoot } }}
                                                        value={this.state.selectedCountryCode}
                                                        onChange={(event) => this.setState({ selectedCountryCode: event.target.value })}
                                                    >
                                                        {this.state.countryCodes.map((name, index) => (
                                                            <MenuItem key={name} value={name}>
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                    <TextField
                                                        fullWidth
                                                        error={this.state.phone_number_error === true ? true : false}
                                                        size="small"
                                                        id="Phone Number"
                                                        placeholder={"(000) 000-0000"}
                                                        type={'verification code'}
                                                        value={this.state.phone_number}
                                                        onChange={this.handleTextChange}
                                                        name="textmask"
                                                        // id="formatted-text-mask-input"
                                                        InputProps={{
                                                            inputComponent: TextMaskCustom,

                                                        }}
                                                    //helperText={this.state.phone_number_error === true ? <Typography className={classes.errorText}>Please enter phone number</Typography> : this.state.invalid_phone_number_error === true ? <Typography className={classes.errorText}>Please enter valid Phone Number</Typography> : ""}
                                                    />
                                                </div>
                                                <div>
                                                    <Typography sx={{ flexShrink: 0, fontSize: '85%', color: '#444', paddingTop: '5px !important' }}>
                                                        You will receive a text message reminder before your appointment
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                {this.state.verify_use === "PHONE" && (this.state.verify_otp === "OTP" ?
                                                    <div>
                                                        <div style={{ display: 'flex' }}>
                                                            <TextField
                                                                fullWidth
                                                                type="number"
                                                                size="small"
                                                                //type={'verification code'}
                                                                id="verification-code"
                                                                placeholder="Verification Code"
                                                                autoComplete="off"
                                                                required={true}
                                                                inputProps={{ maxLength: 6 }}
                                                                error={this.state.invalid_verification_code_error === true ? true : false}
                                                                value={this.state.verification_code}
                                                                onChange={(event) => this.setState({ verification_code: event.target.value, invalid_verification_code_error: false })}
                                                            />
                                                            <Button variant="contained" onClick={() => this.verifyOtp()} style={{ margin: '0px 5px', textTransform: 'none', backgroundColor: 'rgb(24, 120, 186)' }}> Verify </Button>
                                                        </div>
                                                        {this.state.invalid_verification_code_error === true && <Typography className={classes.errorText}>Invalid verification code</Typography>}
                                                    </div>
                                                    :
                                                    this.state.verify_otp === "VERIFIED" ?
                                                        <CheckCircleOutlineIcon style={{ color: "green" }} fontSize="medium" />
                                                        :
                                                        <div>
                                                            <Button variant="contained" onClick={() => this.sendOtp()} className={classes.captureButton} style={{ textTransform: 'none', backgroundColor: 'rgb(24, 120, 186)', margin: 0 }} > Verify </Button>
                                                            {this.state.invalid_verification_code_error === true && <Typography className={classes.errorText}>Please verify your phone </Typography>}
                                                        </div>
                                                )}
                                            </Grid>

                                        </Grid>
                                        <Typography sx={{ flexShrink: 0, fontSize: 16, color: '#444', paddingBottom: '5px !important', paddingTop: '20px !important' }}>
                                            Email <span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    error={this.state.email_error === true ? true : false}
                                                    size="small"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    autoComplete="off"
                                                    required={true}
                                                    value={this.state.email}
                                                    onChange={(event) => {
                                                        if (this.state.verify_use === 'EMAIL') {
                                                            if (event.target.value !== "") {
                                                                this.setState({ email: event.target.value, email_error: false, invalid_email_error: false })
                                                            } else {
                                                                this.setState({ email: event.target.value, email_error: false, invalid_email_error: false, verify_email_otp: '' })
                                                            }
                                                        } else {
                                                            this.setState({ email: event.target.value, email_error: false, invalid_email_error: false })
                                                        }
                                                    }}
                                                //helperText={this.state.email_error === true ? <Typography className={classes.errorText}>Please enter email</Typography> : this.state.invalid_email_error === true ? <Typography className={classes.errorText}>Please enter valid email</Typography> : ""}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                {this.state.verify_use === "EMAIL" && (this.state.verify_email_otp === "OTP" ?
                                                    <div>
                                                        <div style={{ display: 'flex' }}>
                                                            <TextField
                                                                fullWidth
                                                                type="number"
                                                                size="small"
                                                                //type={'verification code'}
                                                                id="verification-code"
                                                                placeholder="Verification Code"
                                                                autoComplete="off"
                                                                required={true}
                                                                inputProps={{ maxLength: 6 }}
                                                                error={this.state.invalid_verification_code_error === true ? true : false}
                                                                value={this.state.verification_code}
                                                                onChange={(event) => this.setState({ verification_code: event.target.value, invalid_verification_code_error: false })}
                                                            />
                                                            <Button variant="contained" color="primary" onClick={() => this.verifyOtp()} style={{ margin: '0px 5px', textTransform: 'none', backgroundColor: 'rgb(24, 120, 186)' }}> Verify </Button>
                                                        </div>
                                                        {this.state.invalid_verification_code_error === true && <Typography className={classes.errorText}>Invalid verification code</Typography>}
                                                    </div>
                                                    :
                                                    this.state.verify_email_otp === "VERIFIED" ?
                                                        <CheckCircleOutlineIcon style={{ color: "green" }} fontSize="medium" />
                                                        :
                                                        <div>
                                                            <Button variant="contained" onClick={() => this.sendEmailOtp()} style={{ textTransform: 'none', backgroundColor: 'rgb(24, 120, 186)' }}> Verify </Button>
                                                            {this.state.invalid_verification_code_error === true && <Typography className={classes.errorText}>Please verify your email</Typography>}
                                                        </div>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                    <AccordionActions style={{ float: 'left', padding: '0px 0px 20px 30px' }}>
                                        <Button size="small" variant="contained" disabled={this.state.isLoading} style={{ textTransform: 'none', backgroundColor: 'rgb(24, 120, 186)', marginRight: 10 }} color="primary" onClick={() => this.handleChange('panel2')}><KeyboardArrowLeftRounded fontSize="20px" /> Previous</Button>
                                        {
                                            this.state.isLoading === false
                                                ? this.state.verify_otp === "VERIFIED" && <Button size="small" variant="contained" style={{ textTransform: 'none', backgroundColor: 'rgb(24, 120, 186)' }} color="primary" onClick={() => this.createAppointment()}>Continue <DoubleArrowRounded fontSize="20px" /></Button>
                                                : <CircularProgress size="20px" />
                                        }

                                    </AccordionActions>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel4'} className={classes.accordionSpacing}>
                                    <AccordionSummary
                                        //expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3bh-content"
                                        id="panel3bh-header"
                                    >
                                        <div style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            {/* <span className={classes.numberStyle}>4</span> */}
                                            <Typography sx={{ flexShrink: 0, fontSize: 20 }}>
                                                <span className={classes.numberStyle}>4</span>Confirmation
                                            </Typography>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails style={{ padding: 30 }}>
                                        {/* <div style={{ display: 'flex', flexDirection: 'column', marginTop: 15}}>
                                        <Typography sx={{  flexShrink: 0, fontSize: 16, color: '#777', paddingRight: '10px !important' }}><span style={{ fontWeight: 'bold' }}>{this.state.testTypeName}</span> ({this.state.locationName})</Typography>
                                    </div> */}
                                        <Grid container alignItems="center" justifyContent="center">
                                            <Grid item xs={11} sm={10} md={9} lg={7}>
                                                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 15 }}>
                                                    <Typography sx={{ flexShrink: 0, fontSize: 16, color: '#444', paddingRight: '10px !important' }}><span style={{ fontWeight: 'bold' }}>{this.state.testTypeName}</span> ({this.state.locationName})</Typography>
                                                    <Typography sx={{ flexShrink: 0, fontSize: '200%', color: '#444', paddingRight: '10px !important' }}><span style={{ fontWeight: 700 }}>{this.state.selectedTimeSlot !== "" ? moment(this.state.selectedTimeSlot).format('dddd, MMMM DD, YYYY') : ''}</span></Typography>
                                                    <Typography sx={{ flexShrink: 0, fontSize: '200%', color: '#444', }}><span style={{ fontWeight: 400, paddingRight: '12px !important' }}>{this.state.selectedTimeSlot !== "" ? moment(this.state.selectedTimeSlot).format('h:mma') : ''}</span>  <span style={{ fontWeight: 400, fontSize: 16 }}>$ {this.state.price}</span></Typography>
                                                    <div style={{ minWidth: '20%', marginTop: 10 }}>
                                                        <Button size="small" variant="contained" style={{ textTransform: 'none', backgroundColor: 'rgb(24, 120, 186)', marginRight: 10 }} color="primary" onClick={() => this.cancleAppointment(this.state.appointmentId)}>Cancel</Button>
                                                    </div>


                                                    <Typography sx={{ flexShrink: 0, fontSize: '200%', color: '#444', paddingTop: '50px !important', textDecoration: 'underline' }}>
                                                        To save time at your appointment, use the link below to pre-register and pay for your test:
                                                    </Typography>

                                                    <a href={`/test-registration-form-without-login?acuityAppt=${this.state.appointmentId}`}>
                                                        <Typography sx={{ flexShrink: 0, fontSize: '200%', marginTop: '75px !important', color: '#2f80ed', textDecoration: 'underline' }}>
                                                            Pre Register My Test
                                                        </Typography>
                                                    </a>

                                                    <Typography sx={{ flexShrink: 0, fontSize: 16, marginTop: '75px !important', color: '#444' }}>
                                                        *Please note that your card will be charged once you submit your registration*
                                                    </Typography>

                                                    <Typography sx={{ flexShrink: 0, fontSize: 16, paddingTop: '25px !important', color: '#444' }}>
                                                        If you are taking this PCR test for international travel, please bring your passport number so we can include it in your certificate of results.
                                                    </Typography>
                                                    {/* <Typography sx={{ flexShrink: 0, fontSize: 16, paddingTop: '5px !important', color: '#444' }}>
                                                        4165 N Craftsman Ct, Scottsdale, AZ 85251
                                                    </Typography> */}
                                                    <Typography sx={{ flexShrink: 0, fontSize: 16, paddingTop: '5px !important', color: '#444' }}>
                                                        We look forward to serving you.
                                                    </Typography>

                                                    <div style={{ minWidth: '40%', marginTop: 10 }}>
                                                        <Button size="small" variant="outlined" style={{ textTransform: 'none', backgroundColor: 'none' }} color="primary" onClick={() => this.refreshScheduleAppointment()}>Schedule another Appointment <DoubleArrowRounded fontSize="20px" /></Button>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        locations: state.locationReducer.locations,
        locationsTestTypes: state.locationTestTypeReducer.locationsTestType,
        verification_code: state.sessionReducer.verification_code
    }
}

ScheduleAppointment.layout = "login";

// export default ScheduleAppointment;
export default compose(withStyles(styles), connect(mapStateToProps))(ScheduleAppointment);