import React, { Component } from "react";
import { Grid, Typography, Button, Dialog, DialogTitle, DialogActions, DialogContent, InputLabel, FormControlLabel, Checkbox, Autocomplete, TextField, MenuItem, FormControl, Select } from '@mui/material';
import { withStyles } from '@mui/styles';
import DatePicker from '@mui/lab/DatePicker';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import SignaturePad from 'react-signature-canvas';
import Background from '../../../public/images/signature.png';
import { connect } from 'react-redux';
import { compose } from "redux";
import { fetchAllLocation } from "../../store/actions/locationAction";
import { fetchAllLocationTestType } from "../../store/actions/locationTestTypeAction";
import { createUserByForm } from "../../store/actions/formAction";
import { fetchAllContactsByUser } from "../../store/actions/userAction";
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { isMobile, isIpad, PUBLISHABLE_KEY } from "../../helpers/constants";
import Image from 'next/image'
import { IMaskInput } from 'react-imask';
import NumberFormat from 'react-number-format';
import { ACCOUNTAPI } from "../../api";
import { loadStripe } from "@stripe/stripe-js";
import InputMask from 'react-input-mask';
const stripePromise = loadStripe(PUBLISHABLE_KEY);

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

const TextMaskCustomforSocialSecurity = React.forwardRef(function TextMaskCustomforSocialSecurity(props, ref) {
	const { onChange, ...other } = props;
	return (
		<IMaskInput
			{...other}
			mask="XXX-XX-0000"
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

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: "30px 30px 40px 30px",
		flexDirection: "column",
		backgroundColor: "#EBF6FA"
	},
	captureButton: {
		backgroundColor: "#2473cb",
		marginTop: 15
	},
	signPad: {
		width: "100%",
		height: "100%",
		display: "flex"
	},
	signContainer: {
		width: "100%",
		height: "90%",
		marginTop: "15px",
		borderRadius: "5px",
		border: "1px solid gray",
		display: "flex"
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
			color: "#2175b5",
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
			color: "#2175b5",
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

const CssDatePicker = withStyles({
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
})(DatePicker);

class TestRegistrationForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			location_id: null,
			selectedLocation_error: false,
			errorText: "",
			first_name: "",
			first_name_error: false,
			last_name: "",
			last_name_error: false,
			phone_number: "",
			phone_number_error: false,
			country_code: "+1",
			id_image: null,
			countryCodes: ["+1"],
			selectedCountryCode: "+1",
			id_image_error: false,
			front_insurance_card_image: null,
			front_insurance_card_image_error: false,
			back_insurance_card_image: null,
			back_insurance_card_image_error: false,
			invalid_phone_number_error: false,
			email: "",
			email_error: false,
			invalid_email_error: false,
			date_of_birth: null,
			date_of_birth_error: false,
			invalid_date_of_birth_error: false,
			future_date_error: false,
			sex: ["Male", "Female", "Others"],
			selectedSex: "",
			selectedSex_error: false,
			ethnicity: ["Hispanic", "Non-Hispanic", "Unknown"],
			selectedEthnicity: "",
			selectedEthnicity_error: false,
			race: ["Americal Indian or Alaska Native", "Asian or Pacific Islander", "Black", "White", "Hawaiian or Pacific Islander", "Other", "Unknown"],
			selectedRace: "",
			selectedRace_error: false,
			street_address: "",
			street_address_error: false,
			street_address_line2: "",
			city: "",
			city_error: false,
			state: "",
			state_error: false,
			zip_code: "",
			zip_code_error: false,
			invalid_zip_code_error: false,
			id_number_label: "",
			id_number: "",
			idList: ["State ID or Driver's License", "Social Security", "Passport"],
			selectedId: "",
			selectedId_error: false,
			insurance_carrier_name: "",
			insurance_carrier_name_error: false,
			insurance_street_address: "",
			insurance_street_address_error: false,
			insurance_street_address_line2: "",
			insurance_city: "",
			insurance_city_error: false,
			insurance_state: "",
			insurance_state_error: false,
			insurance_zip_code: "",
			insurance_zip_code_error: false,
			insurance_invalid_zip_code_error: false,
			insurance_phone_number: "",
			insurance_phone_number_error: false,
			insurance_policy_group_number: "",
			insurance_policy_group_number_error: false,
			selectedYesPhysician: false,
			selectedYesPhysician_error: false,
			selectedYes: false,
			selectedYes_error: false,
			isCheckedToAgree: false,
			isCheckedToAgree_error: false,
			isCheckedDisclaimer: false,
			isCheckedDisclaimer_error: false,
			corporate_account_code: "",
			corporate_account_code_error: false,
			coupon_code: "",
			coupon_code_error: false,
			signatureImage: null,
			hover: false,
			testTypes: ["Rapid Test - West Valley, $19", "Insurance PCR Test - West Valley, Free", "HRSA PCR Test - West Valley, Free", "Rapid Test - Old Town, $75"],
			discliamerDialogOpen: false,
			selectedTags: [],
			selectedTags_error: false,
			signature_error: false,
			idBackCameraOpen: false,
			idFrontCameraOpen: false,
			idBackCameraOpen: false,
			id_image_error: false,
			front_insurance_card_image_error: false,
			back_insurance_card_image_error: false,
			is_loading: false,
			isPaid: false,
			selectedContact: "",
			userContacts: [],
			verified_through: 'PN',
			health_insurance_policy_member_id: "",
			health_insurance_policy_member_id_error: false,
			description: "",
			isError:false
		}
		this.hiddenFileInput = React.createRef();
		this.hiddenFileInput1 = React.createRef();
		this.hiddenFileInput2 = React.createRef();
		this.onIdImageChange = this.onIdImageChange.bind(this);
		this.onFrontIdImageChange = this.onFrontIdImageChange.bind(this);
		this.onBackIdImageChange = this.onBackIdImageChange.bind(this);
	}

	handleLocation = (event) => {
		this.setState({ location_id: event.target.value, selectedLocation_error: false, selectedTags: [] })
	}

	handleSelectContact = (event) => {
		let findContact = this.state.userContacts.find(contact => contact.Id === event.target.value);
		if (findContact !== undefined) {
			let findName = findContact.Name !== null ? findContact.Name : "";
			let firstName = null;
			let lastName = null;

			let splitName = findName.split(" ");
			if (splitName.length > 0) {
				firstName = splitName[0];

				lastName = splitName.reduce((accumulator, currentvalue, index) => {
					if (index > 0) {
						accumulator = accumulator + " " + currentvalue
					}

					return accumulator;
				}, "");
			}

			this.setState({
				first_name: firstName,
				last_name: lastName,
				email: findContact.Email !== null ? findContact.Email : "",
				phone_number: findContact.Phone_number_text__c !== null ? findContact.Phone_number_text__c : "",
				selectedCountryCode: '+1',
				selectedRace: findContact.Race__c,
				selectedEthnicity: findContact.Ethnicity__c,
				selectedSex: findContact.Sex__c,
				street_address_line2: findContact.Patient_Address_Line_2__c !== null ? findContact.Patient_Address_Line_2__c : "",
				street_address: findContact.MailingAddress !== null ? findContact.MailingAddress.street : "",
				city: findContact.MailingAddress !== null ? findContact.MailingAddress.city : "",
				state: findContact.MailingAddress !== null ? findContact.MailingAddress.state : "",
				country: findContact.MailingAddress !== null ? findContact.MailingAddress.country : "",
				zip_code: findContact.Zip_Code__c !== null ? findContact.Zip_Code__c : "",
				date_of_birth: new Date(findContact.Birthdate),
				selectedContact: event.target.value,
				selectedContact: event.target.value,
				selectedContact_error: false
			});

		} else {
			this.setState({ selectedContact: event.target.value, selectedContact_error: false });
		}
	}

	clear = () => {
		this.sigPad.clear(),
			this.setState({ hover: false })
	}

	onSelectTag = (event, value) => {
		// this.setState({ selectedTags: value, selectedTags_error: false })
		let isPaid = value.filter(tag => tag.is_paid_type === true);
		// this.setState({ selectedTags: value, selectedTags_error: false, isPaid: isPaid.length > 0 ? true : false });
		let description = "";
		if (this.state.selectedTags.length > 0) {
			description = value.length > 0 ? this.state.selectedTags[0].test_type.description : "";
			this.setState({ selectedTags: value, selectedTags_error: false, isPaid: isPaid.length > 0 ? true : false, description: description });
		} else {
			description = value.length > 0 ? value[0].test_type.description : "";
			this.setState({ selectedTags: value, selectedTags_error: false, isPaid: isPaid.length > 0 ? true : false, description: description });
		}
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



	handleChange = (event) => {
		this.setState({
			phone_number: event.target.value,
		});
	};


	/**
	*
	* This function representing ZipCode validation.
	* @param {String} code The code string
	*/
	validateZipCode(code) {
		var re = /^[\d]{5}$/;
		return re.test(code);
	}

	handlePhoneNumber = (event) => {
		const re = /^[0-9\b]{1,10}$/;
		if (event.target.value === '' || re.test(event.target.value)) {
			if (event.target.value.length <= 10) {
				this.setState({ phone_number: event.target.value, phone_number_error: false, invalid_phone_number_error: false })
			}
		}
	}

	onSubmit = async () => {
		this.setState({ is_loading: true });
		await this.setState({
			signatureImage: this.sigPad.getTrimmedCanvas()
				.toDataURL('image/png')
		})
		let { location_id, selectedTags, selectedCountryCode, first_name, last_name, phone_number, email, date_of_birth, selectedSex, selectedEthnicity, selectedRace, street_address,
			street_address_line2, city, state, zip_code, selectedId, id_number, insurance_carrier_name, insurance_street_address, insurance_street_address_line2, insurance_city,
			insurance_state, insurance_zip_code, insurance_phone_number, insurance_policy_group_number, selectedYesPhysician, selectedYes, isCheckedToAgree,
			isCheckedDisclaimer, corporate_account_code, coupon_code, signatureImage, health_insurance_policy_member_id, id_image, front_insurance_card_image, back_insurance_card_image, country_code, verified_through } = this.state;

		let insurance_test = this.state.selectedTags.find(item => item.is_insurance_test === true && item.name.toLowerCase().includes("insurance") === true)
		let hrsa_test = this.state.selectedTags.find(item => item.is_insurance_test === true && item.name.toLowerCase().includes("hrsa") === true)

		let isError = false;
		if (location_id === "" || location_id === null) {
			this.setState({ selectedLocation_error: true })
			isError = true
		}
		if (selectedTags === "" || selectedTags === null || selectedTags.length === 0) {
			this.setState({ selectedTags_error: true })
			isError = true
		}
		if (first_name === "" || first_name === null) {
			this.setState({ first_name_error: true })
			isError = true
		}
		if (last_name === "" || last_name === null) {
			this.setState({ last_name_error: true })
			isError = true
		}
		if (phone_number === "" || phone_number === null || phone_number === undefined) {
			this.setState({ phone_number_error: true })
			isError = true
		}
		if (phone_number.length < 10) {
			this.setState({ invalid_phone_number_error: true })
			isError = true
		}
		if (email === "" || email === null) {
			this.setState({ email_error: true })
			isError = true
		}
		if (!this.validateEmail(email)) {
			this.setState({ invalid_email_error: true });
			isError = true;
		}
		if (date_of_birth === "" || date_of_birth === null) {
			this.setState({ date_of_birth_error: true })
			isError = true
		}
		if (date_of_birth !== null && (new Date(date_of_birth) == 'Invalid Date' || date_of_birth.length < 10)) {
			this.setState({ invalid_date_of_birth_error: true, errorText: "Please enter valid date of birth(MM/DD/YYYY)" });
			isError = true;
		}		
		if (new Date().getTime() < new Date(moment(date_of_birth).format('MM/DD/YYYY')).getTime()) {
			this.setState({ future_date_error: true, errorText: "Future date not allowed" });
			isError = true;
		}
		if (selectedSex === "" || selectedSex === null) {
			this.setState({ selectedSex_error: true })
			isError = true
		}
		if (selectedEthnicity === "" || selectedEthnicity === null) {
			this.setState({ selectedEthnicity_error: true })
			isError = true
		}
		if (selectedRace === "" || selectedRace === null) {
			this.setState({ selectedRace_error: true })
			isError = true
		}
		if (street_address === "" || street_address === null) {
			this.setState({ street_address_error: true })
			isError = true
		}
		if (city === "" || city === null) {
			this.setState({ city_error: true })
			isError = true
		}
		if (state === "" || state === null) {
			this.setState({ state_error: true })
			isError = true
		}
		if (zip_code === "" || zip_code === null) {
			this.setState({ zip_code_error: true })
			isError === true
		}
		if (!this.validateZipCode(zip_code)) {
			this.setState({ invalid_zip_code_error: true });
			isError = true;
		}
		if (selectedId === "" || selectedId === null) {
			this.setState({ selectedId_error: true })
			isError = true
		}


		if (isCheckedDisclaimer === false) {
			this.setState({ isCheckedDisclaimer_error: true })
			isError = true
		}

		if (hrsa_test !== undefined || insurance_test !== undefined) {
			if (id_image === null || id_image === undefined) {
				this.setState({ id_image_error: true })
				isError = true
			}
			if (selectedYesPhysician === false) {
				this.setState({ selectedYesPhysician_error: true })
				isError = true
			}
		}

		if (hrsa_test !== undefined) {
			if (isCheckedToAgree === false) {
				this.setState({ isCheckedToAgree_error: true })
				isError = true
			}
		}

		if (this.state.selectedId !== null && (id_number === "" || id_number.length === 0)) {
			this.setState({ id_number_error: true });
			isError = true

		}

		if (insurance_test !== undefined) {
			if (front_insurance_card_image === null || front_insurance_card_image === undefined) {
				this.setState({ front_insurance_card_image_error: true })
				isError = true
			}
			if (back_insurance_card_image === null || back_insurance_card_image === undefined) {
				this.setState({ back_insurance_card_image_error: true })
				isError = true
			}
			if (selectedYesPhysician === false) {
				this.setState({ selectedYesPhysician_error: true })
				isError = true
			}
			if (selectedYesPhysician === false) {
				this.setState({ selectedYesPhysician_error: true })
				isError = true
			}
			if (insurance_carrier_name === "" || insurance_carrier_name === null) {
				this.setState({ insurance_carrier_name_error: true })
				isError = true
			}
			if (health_insurance_policy_member_id === "" || health_insurance_policy_member_id === null) {
				this.setState({ health_insurance_policy_member_id_error: true })
				isError = true
			}
			if (insurance_phone_number === "" || insurance_phone_number === null) {
				this.setState({ insurance_phone_number_error: true })
				isError = true
			}
			if (insurance_policy_group_number === "" || insurance_policy_group_number === null) {
				this.setState({ insurance_policy_group_number_error: true })
				isError = true
			}
			if (insurance_street_address === "" || insurance_street_address === null) {
				this.setState({ insurance_street_address_error: true })
				isError = true
			}
			if (insurance_city === "" || insurance_city === null) {
				this.setState({ insurance_city_error: true })
				isError = true
			}
			if (insurance_state === "" || insurance_state === null) {
				this.setState({ insurance_state_error: true })
				isError = true
			}
			if (insurance_zip_code === "" || insurance_zip_code === null) {
				this.setState({ insurance_zip_code_error: true })
				isError = true
			}
			if (!this.validateZipCode(insurance_zip_code)) {
				this.setState({ insurance_invalid_zip_code_error: true });
				isError = true;
			}
		}
		// if (corporate_account_code === "" || corporate_account_code === null) {
		//     this.setState({ corporate_account_code_error: true })
		//     isError = true
		// }
		// if (coupon_code === "" || coupon_code === null) {
		//     this.setState({ coupon_code_error: true })
		//     isError = true
		// }
		if (this.sigPad !== undefined && this.sigPad.isEmpty()) {
			this.setState({ signature_error: true })
			isError = true
		}
		if (isError === false) {
			this.setState({isError:false})
			let data = {};
			// data.location = selectedLocation;
			data.test_types = selectedTags;
			data.first_name = first_name;
			data.last_name = last_name;
			data.gender = selectedSex;
			data.country_code = selectedCountryCode;
			data.phone_number = phone_number.replace(/[()" "-]/g, '');
			data.email = email;
			data.birth_date = moment(date_of_birth).format('YYYY-MM-DD');
			data.ethnicity = selectedEthnicity;
			data.race = selectedRace;
			data.address_line1 = street_address;
			data.address_line2 = street_address_line2;
			data.city = city;
			data.state = state;
			data.zipcode = zip_code;
			data.idType = selectedId;
			data.ssn_number = selectedId === "Social Security" ? id_number : null;
			data.license_number = selectedId === "State ID or Driver's License" ? id_number : null;
			data.passport_number = selectedId === "Passport" ? id_number : null;
			data.insurance_provider = insurance_carrier_name;
			data.provider_phone_number = insurance_phone_number;
			data.policy_group_number = insurance_policy_group_number;
			data.insurance_street_address = insurance_street_address;
			data.insurance_street_address_line2 = insurance_street_address_line2;
			data.insurance_city = insurance_city;
			data.insurance_state = insurance_state;
			data.insurance_zip_code = insurance_zip_code;
			// data.corporate_account_code = corporate_account_code;
			// data.coupon_code = coupon_code;
			data.id_image = id_image;
			data.front_insurance_card_image = front_insurance_card_image;
			data.back_insurance_card_image = back_insurance_card_image;
			data.signatureImage = signatureImage;
			data.verified_through = verified_through;
			data.health_insurance_policy_member_id = health_insurance_policy_member_id;

			if (this.state.isPaid === true) {
				let dataObj = {};
				dataObj.testTypes = selectedTags;
				dataObj.isLoggedIn = true;
				ACCOUNTAPI.post("user/create-payment-session", dataObj).then(async (response) => {
					if (response.status === "success") {
						const stripe = await stripePromise;
						let session = response.payload;

						let constructData = {};
						constructData[session.id] = data;
						// this.props.dispatch({ type: SAVE_USER_TEST_REGISTRATION, data: constructData });

						typeof localStorage !== "undefined" && localStorage.setItem('savedTestRegistrations', JSON.stringify(constructData));
						// When the customer clicks on the button, redirect them to Checkout.

						const result = stripe.redirectToCheckout({
							sessionId: session.id,
						});

						// if (result.error) {
						// 	// If `redirectToCheckout` fails due to a browser or network
						// 	// error, display the localized error message to your customer
						// 	// using `result.error.message`.
						// }
					}

				});
			} else {
				this.props.dispatch(createUserByForm(this, data));
			}
		} else {
			this.setState({ is_loading: false, isError:true });
		}
	}

	handleIdCard = (event) => {

		this.setState({ selectedId: event.target.value, id_number_label: event.target.value, selectedId_error: false,id_number_error: false ,id_number:"" })
		
	}

	static getDerivedStateFromProps(props, state) {
		if (props.userContacts !== state.userContacts) {
			return {
				userContacts: props.userContacts
			}
		}

		return null;
	}

	componentDidMount = () => {
		let User = typeof localStorage !== "undefined" && localStorage.getItem('user')
		const userObj = JSON.parse(User);
		let login_type = typeof localStorage !== "undefined" && localStorage.getItem('preferred_login_type');
		/** fetching location details. */
		this.props.dispatch(fetchAllContactsByUser());
		this.props.dispatch(fetchAllLocation());
		this.props.dispatch(fetchAllLocationTestType());



		if (userObj !== null && userObj !== undefined) {

			this.setState({
				first_name: userObj.first_name,
				last_name: userObj.last_name,
				email: userObj.email,
				phone_number: userObj.hashed_phone_number,
				selectedCountryCode: userObj.country_code,
				selectedRace: userObj.race,
				selectedEthnicity: userObj.ethnicity,
				selectedSex: userObj.gender,
				street_address: userObj.address_line1,
				street_address_line2: userObj.address_line2,
				city: userObj.city,
				state: userObj.state,
				country: userObj.country,
				zip_code: userObj.zipcode,
				date_of_birth: moment(userObj.birth_date).format('MM/DD/YYYY'),
				selectedContact: userObj.contact_id,
				verified_through: login_type
			});
		}
	}

	/**
	* @function
	* This function declared to convert image to base64 
	* @param {file} file
	*/
	toBase64 = file => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});


	/**
	* @function
	* This function declared to uploading the document photo 
	*/
	onIdImageChange = async (event) => {
		if (event.target.files && event.target.files[0]) {
			let img = await event.target.files[0];
			let baseString = await this.toBase64(img);
			let blobUrl = URL.createObjectURL(img);
			this.setState({ id_image: baseString, id_image_error: false })
		}
	};

	onFrontIdImageChange = async (event) => {
		if (event.target.files && event.target.files[0]) {
			let img = await event.target.files[0];
			let baseString = await this.toBase64(img);
			let blobUrl = URL.createObjectURL(img);
			this.setState({ front_insurance_card_image: baseString, front_insurance_card_image_error: false })
		}
	};

	onBackIdImageChange = async (event) => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			let baseString = await this.toBase64(img);
			let blobUrl = URL.createObjectURL(img);
			this.setState({ back_insurance_card_image: baseString, back_insurance_card_image_error: false })
		}
	};

	render() {
		const { classes, locations, locationsTestType } = this.props;
		let filterLocationTestTypeById = locationsTestType !== undefined && locationsTestType !== null && locationsTestType.filter((item) => item.location_id === this.state.location_id)
			.map((item) => ({ name: item.testType.name, price: item.price, is_insurance_test: item.is_insurance_test, location_test_type_ref: item.location_test_type_ref, id: item.id, is_paid_type: item.is_paid_type, test_type: item.testType }));
		const videoConstraints = {
			width: 1280,
			height: 720,
			facingMode: { exact: "environment" }
		};
		let isMobileView = isMobile();
		let isIpadView = isIpad();
		let insurance_test = this.state.selectedTags.find(item => item.is_insurance_test === true && item.name.toLowerCase().includes("insurance") === true)
		let hrsa_test = this.state.selectedTags.find(item => item.is_insurance_test === true && item.name.toLowerCase().includes("hrsa") === true)

		return (
			<div className={classes.root}>
				<Typography fontWeight="bold" fontSize={20} textAlign="center" fontFamily="Futura-Heavy" color="#144787">Test Registration Form</Typography>
				<Grid container justifyContent="center" style={{ margin: "20px 0 40px 0", padding: "10px 30px 30px 8px", backgroundColor: "#fff", borderRadius: "5px" }} spacing={3}>
					<Grid item xs={12} sm={6} >
						<CssSelect fullWidth size="small">
							<InputLabel id="demo-simple-select-autowidth-label">Select location <span>*</span></InputLabel>
							<Select
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={this.state.location}
								onChange={this.handleLocation}
								fullWidth
								label="Select Location"
								required={true}
							>
								{locations !== undefined && locations !== null && locations.map((item, index) => (
									item.status === 'ACTIVE' && <MenuItem style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} value={item.id} key={index}>{item.name}</MenuItem>
								))}
							</Select>
						</CssSelect>
						{this.state.selectedLocation_error === true && <Typography className={classes.errorText}>Please select location</Typography>}
					</Grid>
					<Grid item xs={12} sm={6}>
						<CssSelect fullWidth size="small" >
							<Autocomplete
								classes={{ root: classes.inputLabel }}
								size="small"
								multiple
								options={filterLocationTestTypeById}
								value={this.state.selectedTags}
								required={true}
								isOptionEqualToValue={(option, value) => option.location_test_type_ref === value.location_test_type_ref}
								//getOptionLabel={(option) => <Typography style={{ fontSize: 16, fontFamily: "Futura-Heavy" }}>{option.name}{option.price !== null && ", $"}{option.price}</Typography>}
								getOptionLabel={(option) => `${option.name}${option.price !== null ? ', $' + option.price : ''}`}
								onChange={this.onSelectTag}
								filterSelectedOptions
								renderInput={(params) => (
									<TextField
										{...params}
										label="Test Type"
										required={true}
									/>
								)}
							/>
						</CssSelect>
						{this.state.selectedTags_error === true && <Typography className={classes.errorText}>Please select test type</Typography>}
					</Grid>
					{
						this.state.description !== "" &&
						<Grid item xs={12}>
							<Typography fontWeight="bold" marginTop="20px" fontSize={18} fontFamily="Futura-Heavy" color="#2473cb">{this.state.description}</Typography>
						</Grid>
					}
					{(insurance_test !== undefined || hrsa_test !== undefined) &&
						<Grid item xs={12}>
							<Typography fontWeight="bold" marginTop="20px" fontSize={18} fontFamily="Futura-Heavy" color="#2473cb">By checking yes, I affirm that I am concerned I have been exposed to and
								infected with COVID-19 or have received testing orders from a physician.<span style={{ color: "red" }}>*</span></Typography>
							<FormControlLabel
								value="Yes"
								control={<Checkbox checked={this.state.selectedYesPhysician} onChange={(event) => this.setState({ selectedYesPhysician: event.target.checked, selectedYesPhysician_error: false })} icon={<RadioButtonUncheckedIcon />} checkedIcon={<RadioButtonCheckedIcon />} />}
								label={<Typography style={{ textTransform: "capitalize" }} fontSize={14} fontFamily="Futura-Heavy" color="#000">Yes</Typography>}
								labelPlacement="end"
							/>
							{this.state.selectedYesPhysician_error === true && <Typography className={classes.errorText}>Checkbox is mandatory</Typography>}
						</Grid>
					}
					{
						hrsa_test !== undefined && <Grid item xs={12}>
							<Grid container justifyContent="center" spacing={3}>
								<Grid item xs={12}>
									<FormControlLabel
										style={{ marginTop: 15, fontSize: 30 }}
										value="Yes"
										control={<Checkbox checked={this.state.isCheckedToAgree} onChange={(event) => this.setState({ isCheckedToAgree: event.target.checked, isCheckedToAgree_error: false })} />}
										label={<Typography fontWeight="bold" style={{ textTransform: "capitalize" }} fontSize={16} fontFamily="Futura-Heavy" color="#2473cb">I personally certify that I am not covered under a health insurance plan. This
										includes AHCCCS, Medicare, and all private insurance. If it is later discovered
										that I have insurance (knowingly or not), I agree to reimburse Saguaro Bloom
											Diagnostics LLC the retail cost of the test ($150).<span style={{ color: "red" }}>*</span></Typography>}
										labelPlacement="end"
									/>
									{this.state.isCheckedToAgree_error === true && <Typography className={classes.errorText}>Checkbox is mandatory</Typography>}
								</Grid>
							</Grid>
						</Grid>}
					<Grid item xs={12}>
						<Typography fontWeight="bold" marginTop="20px" fontSize={20} fontFamily="Futura-Heavy" color="#2165C0">Basic Information</Typography>
					</Grid>
					{
						this.state.userContacts !== undefined && this.state.userContacts.length > 1 &&
						<Grid item xs={11} sm={6}>
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

					<Grid item xs={12}>
						<Typography fontWeight="bold" fontSize={17} fontFamily="Futura-Heavy" color="#f95f00">Name</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CssField
							fullWidth
							size="small"
							id="first-name"
							label="First Name"
							name="first-name"
							autoComplete="off"
							required={true}
							value={this.state.first_name}
							onChange={(event) => this.setState({ first_name: event.target.value, first_name_error: false })}
							helperText={this.state.first_name_error === true ? <Typography className={classes.errorText}>Please enter first name</Typography> : null}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CssField
							fullWidth
							size="small"
							id="last_name"
							label="Last Name"
							name="last_name"
							autoComplete="off"
							required={true}
							value={this.state.last_name}
							onChange={(event) => this.setState({ last_name: event.target.value, last_name_error: false })}
							helperText={this.state.last_name_error === true ? <Typography className={classes.errorText}>Please enter last name</Typography> : null}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography fontWeight="bold" fontSize={17} fontFamily="Futura-Heavy" color="#f95f00">Date of Birth</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
					<InputMask
									placeholder={"MM/DD/YYYY"}
									fullWidth
									// style={{ borderBottomStyle: 'solid', color: this.state.date_of_birth_error ? "#F44336" : "rgba(0,0,0,0.9)", borderBottomWidth: this.state.date_of_birth_error || this.state.invalid_age_error || this.state.invalid_date_of_birth_error ? 2 : 1, borderBottomColor: this.state.date_of_birth_error || this.state.invalid_age_error || this.state.invalid_date_of_birth_error ? "#F44336" : 'gray' }}
									type='tel'
									mask="99/99/9999"
									maskChar={null}
									value={this.state.date_of_birth}
									onChange={(event) => this.setState({ date_of_birth: event.target.value, date_of_birth_error: false, invalid_date_of_birth_error: false, future_date_error: false })} >
									{(inputProps) =>
										<CssField
											fullWidth
											id="date_of_birth"
											label="Date Of Birth"
											name="date_of_birth"
											autoComplete="off"
											size="small"
											{...inputProps}										
											disableUnderline="true"
											onChange={this.props.onChange}
											helperText={this.state.date_of_birth_error === true ? <Typography className={classes.errorText}>Please enter date of birth</Typography> : this.state.invalid_date_of_birth_error || this.state.future_date_error ? <Typography className={classes.errorText}>{this.state.errorText}</Typography> : ""} />}
								</InputMask>
					</Grid>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12}>
						<Typography fontWeight="bold" fontSize={17} fontFamily="Futura-Heavy" color="#f95f00">Address</Typography>
					</Grid>
					<Grid item xs={12} sm={12}>
						<CssField
							fullWidth
							size="small"
							id="street-address"
							label="Street Address"
							name="street-address"
							autoComplete="off"
							required={true}
							value={this.state.street_address}
							onChange={(event) => this.setState({ street_address: event.target.value, street_address_error: false })}
							helperText={this.state.street_address_error === true ? <Typography className={classes.errorText}>Please enter street address</Typography> : null}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<CssField
							fullWidth
							size="small"
							id="street-address_line2"
							label="Street Address Line2"
							name="street-address_line2"
							autoComplete="off"
							// required={true}
							value={this.state.street_address_line2}
							onChange={(event) => this.setState({ street_address_line2: event.target.value })}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CssField
							fullWidth
							size="small"
							id="city"
							label="City"
							name="city"
							required={true}
							autoComplete="off"
							value={this.state.city}
							onChange={(event) => this.setState({ city: event.target.value, city_error: false })}
							helperText={this.state.city_error === true ? <Typography className={classes.errorText}>Please enter city</Typography> : null}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CssField
							fullWidth
							size="small"
							id="state"
							label="State"
							name="state"
							autoComplete="off"
							required={true}
							value={this.state.state}
							onChange={(event) => this.setState({ state: event.target.value, state_error: false })}
							helperText={this.state.state_error === true ? <Typography className={classes.errorText}>Please enter state</Typography> : null}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<CssField
							fullWidth
							size="small"
							id="zip-code"
							label="Zip Code"
							name="zip-code"
							autoComplete="off"
							required={true}
							type="tel"
							value={this.state.zip_code}
							inputProps={{ maxLength: 5 }}
							onChange={(event) => this.setState({ zip_code: event.target.value, zip_code_error: false, invalid_zip_code_error: false })}
							helperText={this.state.zip_code_error === true ? <Typography className={classes.errorText}>Please enter zip code</Typography> : this.state.invalid_zip_code_error === true ? <Typography className={classes.errorText}>Please enter valid zip code</Typography> : ""}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography fontWeight="bold" marginTop="20px" fontSize={20} fontFamily="Futura-Heavy" color="#2165C0">Contact Information</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<div style={{ display: "flex", justifyContent: "row" }}>
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
							<CssField
								fullWidth
								size="small"
								//id="Phone Number"
								label="Phone Number"
								placeholder={"(000) 000-0000"}
								type={'verification code'}
								value={this.state.phone_number}
								onChange={this.handleChange}
								name="textmask"
								id="formatted-text-mask-input"
								InputProps={{
									inputComponent: TextMaskCustom,

								}}
							/>
						</div>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CssField
							fullWidth
							size="small"
							id="email"
							label="Email"
							name="email"
							autoComplete="off"
							required={true}
							value={this.state.email}
							onChange={(event) => this.setState({ email: event.target.value, email_error: false, invalid_email_error: false })}
							helperText={this.state.email_error === true ? <Typography className={classes.errorText}>Please enter email</Typography> : this.state.invalid_email_error === true ? <Typography className={classes.errorText}>Please enter valid email</Typography> : ""}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography fontWeight="bold" marginTop="20px" fontSize={20} fontFamily="Futura-Heavy" color="#2165C0">Demographic Information</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CssSelect fullWidth size="small">
							<InputLabel id="demo-simple-select-autowidth-label">Sex *</InputLabel>
							<Select
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={this.state.selectedSex}
								required={true}
								onChange={(event) => this.setState({ selectedSex: event.target.value, selectedSex_error: false })}
								fullWidth
								label="Sex"
							>
								{this.state.sex.map((item, index) => (
									<MenuItem style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} value={item} key={index}>{item}</MenuItem>
								))}
							</Select>
						</CssSelect>
						{this.state.selectedSex_error === true && <Typography className={classes.errorText}>Please select sex</Typography>}
					</Grid>
					<Grid item xs={12} sm={6}>
						<CssSelect fullWidth size="small">
							<InputLabel id="demo-simple-select-autowidth-label">Ethnicity *</InputLabel>
							<Select
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								required={true}
								value={this.state.selectedEthnicity}
								onChange={(event) => this.setState({ selectedEthnicity: event.target.value, selectedEthnicity_error: false })}
								fullWidth
								label="Ethnicity"
							>
								{this.state.ethnicity.map((item, index) => (
									<MenuItem style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} value={item} key={index}>{item}</MenuItem>
								))}
							</Select>
						</CssSelect>
						{this.state.selectedEthnicity_error === true && <Typography className={classes.errorText}>Please select ethnicity</Typography>}
					</Grid>
					<Grid item xs={12} sm={6}>
						<CssSelect fullWidth size="small">
							<InputLabel id="demo-simple-select-autowidth-label">Race *</InputLabel>
							<Select
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								required={true}
								value={this.state.selectedRace}
								onChange={(event) => this.setState({ selectedRace: event.target.value, selectedRace_error: false })}
								fullWidth
								label="Race"
							>
								{this.state.race.sort((a, b) => a.localeCompare(b)).map((item, index) => (
									<MenuItem style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} value={item} key={index}>{item}</MenuItem>
								))}
							</Select>
						</CssSelect>
						{this.state.selectedRace_error === true && <Typography className={classes.errorText}>Please select race</Typography>}
					</Grid>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12}>
						<Typography fontWeight="bold" marginTop="20px" fontSize={20} fontFamily="Futura-Heavy" color="#f95f00">ID Card</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CssSelect fullWidth size="small">
							<InputLabel id="demo-simple-select-autowidth-label">Select ID Type *</InputLabel>
							<Select
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={this.state.selectedId}
								onChange={this.handleIdCard}
								fullWidth
								label="Select ID Type"
								required={true}
							>
								{this.state.idList.map((item, index) => (
									<MenuItem style={{ fontSize: 16, fontFamily: "Futura-Heavy" }} value={item} key={index}>{item}</MenuItem>
								))}
							</Select>
						</CssSelect>
						{this.state.selectedId_error === true && <Typography className={classes.errorText}>Please select ID</Typography>}
					</Grid>

					<Grid item xs={12} sm={6}>
					  {this.state.selectedId === "Social Security" ?
									<CssField
									fullWidth
									size="small"
									id="license-number"
									label={`${this.state.id_number_label} ${this.state.id_number_label !== "" ? "number" : ""}`}
									name="license-number"
									autoComplete="off"
									inputProps={{ maxLength: 9 }}
									type={"password"}
									value={this.state.id_number}
									onChange={(event) => this.setState({id_number: event.target.value})}										
									helperText={this.state.id_number_error === true ? <Typography className={classes.errorText}>Please enter State ID or Driver's License</Typography> : ""}
								/>  :
									<CssField
										fullWidth
										size="small"
										id="license-number"
										label={`${this.state.id_number_label} ${this.state.id_number_label !== "" ? "number" : ""}`}
										name="license-number"
										autoComplete="off"
										value={this.state.id_number}
										onChange={(event) => this.setState({ id_number: event.target.value })}
										helperText={this.state.id_number_error === true ? <Typography className={classes.errorText}>Please enter State ID or Driver's License</Typography> : ""}
									/>
								}
					</Grid>

					{(this.state.selectedId !== "" && this.state.selectedId === "State ID or Driver's License") && ( insurance_test !== undefined || hrsa_test !== undefined) && <Grid item xs={12}>
						<Typography fontWeight="bold" marginTop="20px" fontSize={17} fontFamily="Futura-Heavy" color="#f95f00">Upload a photo of your ID<span style={{ color: "red" }}>*</span></Typography>
						<div>
							{this.state.id_image !== null &&
								<div className={classes.imageContainer}>
									<Image src={this.state.id_image} width={160} height={200} />
								</div>}
							<Button variant="contained" onClick={() => this.hiddenFileInput.current.click()} className={classes.captureButton} startIcon={<CameraAltIcon style={{ color: "#fff" }} />}>
								<Typography fontWeight="bold" style={{ textTransform: "capitalize" }} fontSize={14} fontFamily="Futura-Heavy" color="#fff">{this.state.id_image === null ? "Upload Photo" : "Retake Photo"}</Typography>
							</Button>
							<input type="file" ref={this.hiddenFileInput} name="myImage" style={{ display: 'none' }} onChange={this.onIdImageChange} accept=".jpg,.jpeg,.png" />
							{this.state.id_image_error === true && <Typography className={classes.errorText}>Please upload a photo of your ID</Typography>}
						</div>
					</Grid>}
					{
						insurance_test !== undefined && <Grid item xs={12}>
							<Grid container justifyContent="center" spacing={3}>
								<Grid item xs={12}>
									<Typography fontWeight="bold" marginTop="20px" fontSize={20} fontFamily="Futura-Heavy" color="#2165C0">Health Insurance Information</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography fontWeight="bold" marginTop="10px" fontSize={17} fontFamily="Futura-Heavy" color="#f95f00">Upload a photo of the front of your health insurance card<span style={{ color: "red" }}>*</span></Typography>
									<div>
										{this.state.front_insurance_card_image !== null &&
											<div className={classes.imageContainer}>
												<Image src={this.state.front_insurance_card_image} width={160} height={200} />
											</div>}
										<Button variant="contained" onClick={() => this.hiddenFileInput1.current.click()} className={classes.captureButton} startIcon={<CameraAltIcon style={{ color: "#fff" }} />}>
											<Typography fontWeight="bold" style={{ textTransform: "capitalize" }} fontSize={14} fontFamily="Futura-Heavy" color="#fff">{this.state.front_insurance_card_image === null ? "Upload Photo" : "Retake Photo"}</Typography>
										</Button>
										<input type="file" ref={this.hiddenFileInput1} name="myImage" style={{ display: 'none' }} onChange={this.onFrontIdImageChange} accept=".jpg,.jpeg,.png" />
										{this.state.front_insurance_card_image_error === true && <Typography className={classes.errorText}>Please upload a photo of the front of your health insurance card</Typography>}
									</div>
								</Grid>
								<Grid item xs={12}>
									<Typography fontWeight="bold" marginTop="10px" fontSize={17} fontFamily="Futura-Heavy" color="#f95f00">Upload a photo of the back of your health insurance card<span style={{ color: "red" }}>*</span></Typography>
									<div>
										{this.state.back_insurance_card_image !== null &&
											<div className={classes.imageContainer}>
												<Image src={this.state.back_insurance_card_image} width={160} height={200} />
											</div>}
										<Button variant="contained" onClick={() => this.hiddenFileInput2.current.click()} className={classes.captureButton} startIcon={<CameraAltIcon style={{ color: "#fff" }} />}>
											<Typography fontWeight="bold" style={{ textTransform: "capitalize" }} fontSize={14} fontFamily="Futura-Heavy" color="#fff">{this.state.back_insurance_card_image === null ? "Upload Photo" : "Retake Photo"}</Typography>
										</Button>
										<input type="file" ref={this.hiddenFileInput2} name="myImage" style={{ display: 'none' }} onChange={this.onBackIdImageChange} accept=".jpg,.jpeg,.png" />
										{this.state.back_insurance_card_image_error === true && <Typography className={classes.errorText}>Please upload a photo of the back of your health insurance card</Typography>}
									</div>
								</Grid>
								<Grid item xs={12} sm={6}>
									<CssField
										fullWidth
										size="small"
										id="provider-name"
										label="Health Insurance Carrier Name"
										name="provider-name"
										autoComplete="off"
										required={true}
										value={this.state.insurance_carrier_name}
										onChange={(event) => this.setState({ insurance_carrier_name: event.target.value, insurance_carrier_name_error: false })}
										helperText={this.state.insurance_carrier_name_error === true ? <Typography className={classes.errorText}>Please enter insurance carrier name</Typography> : ""}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<CssField
										fullWidth
										size="small"
										id="provider-name"
										label="Health Insurance Policy Member Id"
										name="provider-name"
										required={true}
										autoComplete="off"
										value={this.state.health_insurance_policy_member_id}
										onChange={(event) => this.setState({ health_insurance_policy_member_id: event.target.value, health_insurance_policy_member_id_error: false })}
										helperText={this.state.health_insurance_policy_member_id_error === true ? <Typography className={classes.errorText}>Please enter Health Insurance Policy Member Id</Typography> : ""}
									/>

								</Grid>
								<Grid item xs={12}>
									<Typography fontWeight="bold" marginTop="10px" fontSize={17} fontFamily="Futura-Heavy" color="#f95f00">Health Insurance Carrier Address</Typography>
								</Grid>
								<Grid item xs={12} sm={12}>
									<CssField
										fullWidth
										size="small"
										id="insurance_street-address"
										label="Street Address"
										name="insurance_street-address"
										autoComplete="off"
										required={true}
										value={this.state.insurance_street_address}
										onChange={(event) => this.setState({ insurance_street_address: event.target.value, insurance_street_address_error: false })}
										helperText={this.state.insurance_street_address_error === true ? <Typography className={classes.errorText}>Please enter insurance street address</Typography> : ""}
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<CssField
										fullWidth
										size="small"
										id="insurance_street-address_line2"
										label="Street Address Line2"
										name="insurance_street-address_line2"
										autoComplete="off"
										//required={true}
										value={this.state.insurance_street_address_line2}
										onChange={(event) => this.setState({ insurance_street_address_line2: event.target.value })}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<CssField
										fullWidth
										size="small"
										id="insurance_city"
										label="City"
										name="insurance_city"
										autoComplete="off"
										required={true}
										value={this.state.insurance_city}
										onChange={(event) => this.setState({ insurance_city: event.target.value, insurance_city_error: false })}
										helperText={this.state.insurance_city_error === true ? <Typography className={classes.errorText}>Please enter insurance city</Typography> : ""}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<CssField
										fullWidth
										size="small"
										id="insurance_state"
										label="State"
										name="insurance_state"
										autoComplete="off"
										required={true}
										value={this.state.insurance_state}
										onChange={(event) => this.setState({ insurance_state: event.target.value, insurance_state_error: false })}
										helperText={this.state.insurance_state_error === true ? <Typography className={classes.errorText}>Please enter insurance state</Typography> : ""}
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<CssField
										fullWidth
										size="small"
										id="insurance-zip-code"
										label="Zip Code"
										name="insurance-zip-code"
										autoComplete="off"
										required={true}
										type="number"
										value={this.state.insurance_zip_code}
										onChange={(event) => this.setState({ insurance_zip_code: event.target.value, insurance_zip_code_error: false, insurance_invalid_zip_code_error: false })}
										helperText={this.state.insurance_zip_code_error === true ? <Typography className={classes.errorText}>Please enter zip code</Typography> : this.state.insurance_invalid_zip_code_error === true ? <Typography className={classes.errorText}>Please enter valid zip code</Typography> : ""}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<CssField
										fullWidth
										size="small"
										id="insurance_phone"
										label="Health Insurance Carrier Phone Number"
										name="insurance_phone"
										autoComplete="off"
										required={true}
										type="number"
										value={this.state.insurance_phone_number}
										onChange={(event) => this.setState({ insurance_phone_number: event.target.value, insurance_phone_number_error: false })}
										helperText={this.state.insurance_phone_number_error === true ? <Typography className={classes.errorText}>Please enter insurance phoone number</Typography> : ""}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<CssField
										fullWidth
										size="small"
										id="insurance_policy-group-number"
										label="Health Insurance Policy Group Number"
										name="insurance_policy-group-number"
										autoComplete="off"
										required={true}
										value={this.state.insurance_policy_group_number}
										onChange={(event) => this.setState({ insurance_policy_group_number: event.target.value, insurance_policy_group_number_error: false })}
										helperText={this.state.insurance_policy_group_number_error === true ? <Typography className={classes.errorText}>Please enter insurance policy group number</Typography> : ""}
									/>
								</Grid>
							</Grid>
						</Grid>}
					{/*
                    <Grid item xs={12} sm={6}>
                        <CssField
                            fullWidth
                            size="small"
                            id="corporate-account-code"
                            label="Corporate Account Code"
                            name="corporate-account-code"
                            autoComplete="off"
                            value={this.state.corporate_account_code}
                            onChange={(event) => this.setState({ corporate_account_code: event.target.value, corporate_account_code_error: false })}
                            helperText={this.state.corporate_account_code_error === true ? <Typography className={classes.errorText}>Please enter corporate account code</Typography> : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CssField
                            fullWidth
                            size="small"
                            id="coupon-code"
                            label="Coupon Code"
                            name="coupon-code"
                            autoComplete="off"
                            value={this.state.coupon_code}
                            onChange={(event) => this.setState({ coupon_code: event.target.value, coupon_code_error: false })}
                            helperText={this.state.coupon_code_error === true ? <Typography className={classes.errorText}>Please enter coupon code</Typography> : ""}
                        />
                    </Grid> */}
					<Grid item xs={12}>
						<Typography fontWeight="bold" marginTop="20px" fontSize={20} fontFamily="Futura-Heavy" color="#2165C0">Signature</Typography>
					</Grid>
					<Grid item xs={12}>
						<div style={{ flexDirection: 'row', display: "flex", alignItems: "center" }}>
							<Checkbox checked={this.state.isCheckedDisclaimer} onChange={(event) => this.setState({ isCheckedDisclaimer: event.target.checked, isCheckedDisclaimer_error: false })} />
							<Typography fontWeight="bold" style={{ textTransform: "capitalize" }} fontSize={16} fontFamily="Futura-Heavy" color="#2473cb" >I consent to the terms of the <Typography fontWeight="bold" fontSize={16} fontFamily="Futura-Heavy" display="inline" className={classes.disclaimerText} onClick={() => this.setState({ discliamerDialogOpen: true })}>PCR Diagnostic Test Authorization Waiver</Typography>.
								<span style={{ color: "red" }}>*</span></Typography>
						</div>
						{this.state.isCheckedDisclaimer_error === true && <Typography className={classes.errorText}>Please indicate that you accept the Terms and Conditions</Typography>}
					</Grid>
					<Grid item xs={12} sm={6}>
						<div style={{ backgroundImage: `url(${Background})` }} onClick={this.onMouseEnterHandler} className={classes.signContainer}>
							<SignaturePad clearOnResize={false} onBegin={() => this.setState({ signature_error: false })} canvasProps={{ className: classes.signPad }}
								ref={(ref) => { this.sigPad = ref }} />
						</div>
						<div className={classes.buttonContainer}>
							<Button className={classes.clearButton} onClick={() => this.clear()}>
								<Typography style={{ textTransform: "capitalize" }} fontSize={14} fontFamily="Futura-Heavy" color="#5e6c85">Clear</Typography>
							</Button>
						</div>
						{this.state.signature_error === true && <Typography className={classes.errorText}>Please sign here</Typography>}
					</Grid>
					<Grid item xs={12} sm={6}></Grid>
				   {this.state.isError === true &&
				   <Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "center" ,marginTop:"20px"}}> 
				     <Typography className={classes.errorText}>Please fill in all the required fields.  </Typography>
                   </Grid>
	               }
					<Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
						{this.state.is_loading === true ?
							<CircularProgress />
							:
							<Button style={{ width: "25%" }} variant="contained" className={classes.captureButton} onClick={() => this.onSubmit()}>
								<Typography fontWeight="bold" style={{ textTransform: "capitalize" }} fontSize={16} fontFamily="Futura-Heavy" color="#fff">{this.state.isPaid === true ? 'Pay With Stripe' : 'Submit'}</Typography>
							</Button>
						}

					</Grid>
				</Grid>
				<Dialog
					open={this.state.discliamerDialogOpen}
					onClose={() => this.setState({ discliamerDialogOpen: false })}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						<Typography fontWeight="bold" style={{ textTransform: "capitalize" }} fontSize={16} fontFamily="Futura-Heavy" color="#2473cb">Disclaimer</Typography>
					</DialogTitle>
					<DialogContent>
						<Typography display="inline" style={{ textTransform: "capitalize" }} fontSize={14} fontFamily="Futura-Heavy">
							Authorization for Use & Disclosure of Protected Health Information
							<br/>I consent and authorize that test results reported by Saguaro Bloom Diagnostics LLC (SBD) will be reported directly to me via telephone and/or electronic mail. <br/>I understand that it is my responsibility to consult my own medical professional for the interpretation, analysis, evaluation, and explanation of my test results. I understand that neither SBD nor its clinical authority will analyze, evaluate, critique, review, or otherwise interpret the results of said tests.
							<br/>I agree that SBD, directors, staff, or its other agents or employees shall not be liable for any claims including, but not limited to, those arising out of or related to inaccurate, uninterpreted, misinterpreted, or unreceived results. I do hereby expressly forever release and discharge all claims, demands, injuries, damage, actions, or causes of action.
							I understand and agree that the services provided by SBD and the test results will be maintained as confidential, protected health information. ​This test and its results may become part of my medical record and that an insurance company may discover the results of this test by obtaining a copy of my medical record in accordance with the terms of my insurance policies. I understand that my test results will only be provided to other third parties upon my request.
							<br/>I understand that my COVID-19 test results must be reported to state and federal health agencies and SBD will report these results. ​My identifying information will only be reported to the applicable local or state health authority as required.
							I agree to self-isolate according to the CDC's recommended guidelines should I test positive.
							<br/>I consent and authorize SBD for retention of my sample and de-identified information for future research purposes by SBD or its affiliated partners.
							All of the above has been reviewed by me and I have had the opportunity to have any questions answered that I have regarding my rights to privacy. ​I have read and agreed to all the above terms and statements.
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.setState({ discliamerDialogOpen: false })}>
							<Typography fontWeight="bold" style={{ textTransform: "capitalize" }} fontSize={16} fontFamily="Futura-Heavy" color="#2473cb">Agree</Typography>
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		locations: state.locationReducer.locations,
		locationsTestType: state.locationTestTypeReducer.locationsTestType,
		user: state.sessionReducer.user,
		userContacts: state.userReducer.user_contacts
	}
}

let User = typeof localStorage !== "undefined" && localStorage.getItem('user')
const userObj = JSON.parse(User);

TestRegistrationForm.layout = "default";

export default compose(withStyles(styles), connect(mapStateToProps))(TestRegistrationForm);