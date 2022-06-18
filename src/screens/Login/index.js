import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import bloomicon from '../../../public/images/bloomlabs.png';
import bloomIconLogo from '../../../public/images/ScottsdaleLogo.jpeg';
// import bloomlabicon from "../../../public/images/bloomlabicon.png";
import Image from 'next/image'
import { Grid, Typography, Button, FormControl, Select, MenuItem, Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper, TextField, InputAdornment, IconButton } from '@mui/material';
import OtpInput from "react-otp-input";
import { connect } from 'react-redux';
import { compose } from "redux";
import { postLogin, otpVerification, ResendPassword } from "../../store/actions/sessionAction";
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import homeicon from "../../../public/images/home.png";
import PersonIcon from '@mui/icons-material/Person';
import CircularProgress from '@mui/material/CircularProgress';
import { IMaskInput } from 'react-imask';
import moment from "moment";
import InputMask from 'react-input-mask';

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
const styles = theme => ({
	container: {
		minHeight: "100vh",
		backgroundColor: "#eaeaea",
		backgroundRepeat: "no-repeat",
	},
	card: {
		border: "1px solid #E1E7ED",
		backgroundColor: "#FFFFFF",
		// boxShadow: "inset 0px 4px 0px #2FB0D5",
		borderRadius: 4,
		padding: 20,
		marginBottom: 90,
	},
	inputRoot: {
		backgroundColor: "#FFFFFF",
		border: "1px solid #E1E7ED",
		borderRadius: "4px",
		fontSize: "13x !important",
		// "&:hover": {
		//     border: "1px solid #2FB0D5",
		//     backgroundColor: "#FFFFFF"
		// }
	},
	inputStyle: {
		fontFamily: "MaisonNeue-Book !important",
		fontSize: "15x !important",
		padding: "8px 10px !important",
		color: "black",
		fontWeight: "bold",
		// opacity: 1,
		// "&&:after": {
		//     color: "#2FB0D5",
		// }
	},
	underline: {
		"&&&:before": {
			borderBottom: "none"
		},
		"&&:after": {
			borderBottom: "none"
		}
	},
	imageContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",		
		//marginTop: -40,
		// marginBottom: 50
		// paddingButtom:80
	},
	textFieldContainer: {
		padding: "10px 0px"
	},
	otpFieldContainer: {
		justifyContent: "center",
		alignSelf: "flex-start",
		padding: "20px 0px",
	},
	textContainer: {
		borderRadius: 4,
		border: "1px solid #E1E7ED",
		backgroundColor: "#F7F8FA, 100%",
		padding: "5px 10px",
		margin: "15px 0px"
	},
	textStyle: {
		fontFamily: "MaisonNeue-Book",
		fontSize: "14px !important",
		padding: "3px 0px",
		color: "#6E8CA8"
	},
	buttonVariant: {
		boxShadow: "0px 0px 0px 0px #E1E7ED",
		backgroundColor: "#1879BB",
		margin: "15px 0px",
		fontFamily: "MaisonNeue-Book",
		color: "#fff",
		borderRadius: 3,
		padding: "8px 20px",
		// height: "fit-content",
		// '&:hover': {
		//     backgroundColor: "#2FB0D5",
		// },
	},
	linkText: {
		fontFamily: "MaisonNeue-Book",
		fontSize: "14px !important",
		padding: "3px 5px",
		color: "#1844D6",
		cursor: "pointer"
	},
	errorText: {
		padding: 10,
		fontSize: 12,
		color: "#f44336",
		fontFamily: "MaisonNeue-Book"
	},
	cardTitle: {
		fontFamily: "MaisonNeue-Book",
		textAlign: "center",
		color: "#1F2F3A",
		fontWeight: "bold",
		fontSize: 17,
		paddingTop: "10px "
	},
	labTitle: {
		fontFamily: "MaisonNeue-Book",
		textAlign: "center",
		color: "#DEC498",
		fontWeight: "bold",
		fontSize: 10,

		//paddingButtom: "40px"
		// marginBottom:"40px"
	},
	otpTitle: {
		fontFamily: "MaisonNeue-Book",
		textAlign: "center",
		color: "gray",
		fontWeight: "bold",
		fontSize: 15,
		padding: "10px 0px"
	},
	resendOtpTitle: {
		fontFamily: "MaisonNeue-Book",
		textAlign: "center",
		color: "#1879BB",
		fontWeight: "bold",
		fontSize: 15,
		padding: "10px 0px"
	},
	internalUserTitle: {
		fontFamily: "MaisonNeue-Book",
		textAlign: "center",
		color: "#1879BB",
		fontWeight: "bold",
		fontSize: 15,
		padding: "10px 0px",
		textDecoration: "underline",
		cursor: "pointer"
	},
	donthaveTitle: {
		fontFamily: "MaisonNeue-Book",
		textAlign: "center",
		color: "#000000",
		fontWeight: "bold",
		fontSize: 15,
		padding: "10px 0px"
	},
	smstextTitle: {
		fontFamily: "MaisonNeue-Book",
		textAlign: "center",
		color: "#838383",
		fontWeight: "bold",
		fontSize: 15,
		padding: "10px 0px"
	},
	phoneNumbertextTitle: {
		fontFamily: "MaisonNeue-Book",
		textAlign: "left",
		color: "#838383",
		fontWeight: "bold",
		fontSize: 15,
		padding: "10px 0px"
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

class Login extends Component {
	constructor() {
		super();
		this.state = {
			phone_number: "",
			country_code: "",
			email: "",
			email_error: false,
			invalid_email_error: false,
			country_code_error: false,
			invalid_country_code_error: false,
			invalid_phone_number_error: false,
			remember_me: false,
			error_text: null,
			islogin: false,
			otp: '',
			otp_error: false,
			invalid_otp_error: false,
			countryCodes: ["+1"],
			selectedCountryCode: "+1",
			isLoading: false,
			email_disable: false,
			phone_disable: false,
			login_type: 'PN',
			date_of_birth: null,
			date_of_birth_error: false
		}

		this.onChange = this.onChange.bind(this)
	}

	contryCode = (code) => this.setState({ code, country_code_error: false, invalid_country_code_error: false })

	handleChange = (otp) => {
		 this.setState({ otp, otp_error: false, invalid_otp_error: false }, () => {
		if (otp.length === 6) {
			this.otpAction()
		}
	   });
     }

	onChange(event) {
		const re = /^[0-9\b]{1,10}$/;
		if (event.target.value === '' || re.test(event.target.value)) {
			if (event.target.value.length <= 10) {
				this.setState({ phone_number: event.target.value, phone_number_error: false, invalid_phone_number_error: false, error_text: null })
			}
		}
	}

	handleChangeAction = (event) => {
		this.setState({
			phone_number: event.target.value,
			login_type: 'PN',
			email_error: false,
			phone_number_error: false,
			invalid_email_error: false,
			invalid_phone_number_error: false,
			email_disable: event.target.value.length > 0 ? true : false
		});
	};

	validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	lowercaseFirstLetter = (string) => {
        this.setState({ email: string.charAt(0).toLowerCase() + string.slice(1), email_error: false, login_type: 'EM', invalid_email_error: false, phone_number_error: false, invalid_phone_number_error: false, phone_disable: event.target.value.length > 0 ? true : false })
	}
	  


	loginAction = () => {

		let { phone_number, email, selectedCountryCode, date_of_birth } = this.state;
		let isError = false;
		let item = {}
		console.log(`Date Of Birth --> ${date_of_birth} ---> ${moment(date_of_birth, 'MM/DD/YYYY').format('YYYY-MM-DD')}`)
		if (email.length < 1) {
			if (phone_number === "" || phone_number === null || phone_number === undefined) {
				this.setState({ phone_number_error: true })
				isError = true
			}
			if (phone_number.length < 10) {
				this.setState({ invalid_phone_number_error: true })
				isError = true
			}

			if(date_of_birth === null || date_of_birth === "" || moment(this.state.date_of_birth).isValid() === false){
				this.setState({ date_of_birth_error: true })
				isError = true
			}

			item.country_code = selectedCountryCode;
			item.phone = phone_number.replace(/[()" "-]/g, '');
			// item.date_of_birth = date_of_birth;
			item.date_of_birth = moment(date_of_birth, 'MM/DD/YYYY').format('YYYY-MM-DD');
			item.login_type = 'PN';
		}

		if (phone_number.length < 1) {
			if (email === "" || email === null || email === undefined) {
				this.setState({ email_error: true })
				isError = true
			} else {
				if (!this.validateEmail(email)) {
					this.setState({ invalid_email_error: true })
					isError = true
				}
			}

			if(date_of_birth === null || date_of_birth === "" || moment(this.state.date_of_birth).isValid() === false){
				this.setState({ date_of_birth_error: true })
				isError = true
			}

			item.email = email;
			// item.date_of_birth = date_of_birth;
			item.date_of_birth = moment(date_of_birth, 'MM/DD/YYYY').format('YYYY-MM-DD');
			item.login_type = 'EM';
		}


		if (isError === false) {
			this.setState({ isLoading: true });
			this.props.dispatch(postLogin(this, item))
		}
	}

	otpAction = () => {
		let { otp } = this.state;
		let isError = false;
		if (otp === "" || otp === null || otp === undefined) {
			this.setState({ otp_error: true })
			isError = true
		}
		if (otp.length < 6) {
			this.setState({ invalid_otp_error: true })
			isError = true
		}
		if (isError === false) {
			if (this.state.islogin === true) {
				// Router.push({ pathname: '/user-home' })
				this.props.dispatch(otpVerification(this))
			}
		}
	}

	reSendOtpAction = () => {
		let { phone_number, email, selectedCountryCode } = this.state;
		let isError = false;
		let item = {}
		if (email.length < 1) {
			item.country_code = selectedCountryCode;
			item.phone = phone_number.replace(/[()" "-]/g, '');
			item.login_type = 'PN';
		}

		if (phone_number.length < 1) {
			item.email = email;
			item.login_type = 'EM';
		}

		if (isError === false) {
			this.setState({ isLoading: true });
			this.props.dispatch(ResendPassword(this, item))
		}
	}

	render() {
		let { classes } = this.props;
		// console.log(`DOB --<>>> ${this.state.date_of_birth} -- ${moment(this.state.date_of_birth).isValid()}`)
		return (
			<div className={classes.container}>
				<Grid container justifyContent="flex-start">
					<Grid item xs={12} sm={6} md={3} >
						<Button variant="contained" onClick={() => Router.push({ pathname: '/' })} className={classes.homeButton} >
							<Typography fontWeight="bold" fontSize={15} textAlign="center" fontFamily="Futura-Heavy" color="white" style={{ textTransform: "capitalize" }} >Home </Typography>
						</Button>
					</Grid>
				</Grid>
				<div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
					<Grid container justifyContent="center">
						<Grid item xs={12} sm={6} md={3} >
							<div className={classes.card}>
								<div className={classes.imageContainer}>
								{/* <Image src={bloomicon} width="90" height="90" /> */}
								<Image src={bloomIconLogo} width="250" height="80" />
								</div>
								<div style={{ minHeight: "6vh" }} />
								{this.state.islogin === true ? <Typography className={classes.smstextTitle}>Enter OTP sent via sms</Typography> : null}
								{this.state.islogin === false ?
									<div className={classes.textFieldContainer}>
										{this.state.login_type === "PN" ?
											<div>
												<Typography className={classes.phoneNumbertextTitle}>Phone Number</Typography>
												<div style={{ display: "flex", flexDirection: 'column' }}>
													<div style={{ display: "flex", justifyContent: "row", alignItems: "center", paddingBottom: 3 }}>
														<TextField
															sx={{ width: 80, marginRight: 0.5 }}
															size="small"
															select
															disabled={this.state.phone_disable}
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
															placeholder={"(000) 000-0000"}
															//type={'verification code'}
															value={this.state.phone_number}
															onChange={this.handleChangeAction}
															disabled={this.state.phone_disable}
															name="textmask"
															id="formatted-text-mask-input"
															InputProps={{
																inputComponent: TextMaskCustom,
															}}
															onKeyPress={e => {
																if (e.key === "Enter") {
																	this.loginAction();
																}
															}}
														/>

													</div>
													{this.state.phone_number_error
														? <Typography style={{ color: '#d32f2f', fontSize: '0.75rem', textAlign: 'center' }}>Please enter phone number</Typography>
														: this.state.invalid_phone_number_error
															? <Typography style={{ color: '#d32f2f', fontSize: '0.75rem', textAlign: 'center' }}>Please enter valid phone number</Typography>
															: false
													}
												</div>
												<Typography className={classes.phoneNumbertextTitle}>Date Of Birth</Typography>
												<div style={{ display: "flex", flexDirection: 'column' }}>
													<div style={{ display: "flex", justifyContent: "row", alignItems: "center", paddingBottom: 3 }}>														
														{/* <CssField
															fullWidth
															size="small"
															type={'date'}
															value={this.state.date_of_birth}
															disabled={this.state.phone_disable}
															onChange={(event)=> this.setState({date_of_birth: event.target.value, date_of_birth_error: false})}
															onKeyPress={e => {
																if (e.key === "Enter") {
																	this.loginAction();
																}
															}}
														/> */}
														<InputMask
															placeholder={"MM/DD/YYYY"}
															fullWidth
															// style={{ borderBottomStyle: 'solid', color: this.state.date_of_birth_error ? "#F44336" : "rgba(0,0,0,0.9)", borderBottomWidth: this.state.date_of_birth_error || this.state.invalid_age_error || this.state.invalid_date_of_birth_error ? 2 : 1, borderBottomColor: this.state.date_of_birth_error || this.state.invalid_age_error || this.state.invalid_date_of_birth_error ? "#F44336" : 'gray' }}
															//type='tel'
															mask="99/99/9999"
															maskChar={null}
															value={this.state.date_of_birth}
															onChange={(event) => this.setState({ date_of_birth: event.target.value, date_of_birth_error: false })} >
															{(inputProps) =>
																<CssField
																	fullWidth
																	id="date_of_birth"
																	//label="Date of Birth"
																	name="date_of_birth"
																	autoComplete="off"
																	size="small"
																	{...inputProps}
																	disableunderline="true"
																	onChange={this.props.onChange}
																	onKeyPress={e => {
																		if (e.key === "Enter") {
																			this.loginAction();
																		}
																	}}
																	//helperText={this.state.date_of_birth_error === true ? <Typography className={classes.errorText}>Please enter date of birth</Typography> : this.state.invalid_date_of_birth_error || this.state.future_date_error ? <Typography className={classes.errorText}>{this.state.errorText}</Typography> : ""} 
																/>}
														</InputMask>

													</div>
													{this.state.date_of_birth_error
														&& <Typography style={{ color: '#d32f2f', fontSize: '0.75rem', textAlign: 'center' }}> {this.state.date_of_birth === "" || this.state.date_of_birth === null ? 'Please enter date of birth' : 'Please enter valid date of birth'}</Typography>														
													}
												</div>
												<div style={{ display: 'flex', alignItems: "center", justifyContent: "center", width: "100%" }}>
													<Typography className={classes.internalUserTitle} onClick={() => this.setState({ login_type: "EM", email_disable: false, phone_disable: true, phone_number: "" })} style={{ cursor: "pointer" }}>
														Use Email
													</Typography>
												</div>
											</div>
											:
											<div>
												<Typography className={classes.phoneNumbertextTitle}>Email</Typography>
												<div style={{ display: "flex", flexDirection: 'column' }}>
													<div style={{ display: "flex", justifyContent: "row", alignItems: "center", paddingBottom: 3 }}>
														<CssField
															fullWidth
															size="small"
															value={this.state.email}
															disabled={this.state.email_disable}
															onChange={(event) => this.lowercaseFirstLetter(event.target.value)}
															id="formatted-text-mask-input"
															onKeyPress={e => {
																if (e.key === "Enter") {
																	this.loginAction();
																}
															}}
														/>
													</div>
													{this.state.email_error
														? <Typography style={{ color: '#d32f2f', fontSize: '0.75rem', textAlign: 'center' }}>Please enter email</Typography>
														: this.state.invalid_email_error
															? <Typography style={{ color: '#d32f2f', fontSize: '0.75rem', textAlign: 'center' }}>Please enter valid email</Typography>
															: false
													}
												</div>
												<Typography className={classes.phoneNumbertextTitle}>Date Of Birth</Typography>
												<div style={{ display: "flex", flexDirection: 'column' }}>
													<div style={{ display: "flex", justifyContent: "row", alignItems: "center", paddingBottom: 3 }}>
														
														{/* <CssField
															fullWidth
															size="small"
															type={'date'}
															value={this.state.date_of_birth}
															disabled={this.state.email_disable}
															onChange={(event)=> this.setState({date_of_birth: event.target.value, date_of_birth_error: false})}
															onKeyPress={e => {
																if (e.key === "Enter") {
																	this.loginAction();
																}
															}}
														/> */}

														<InputMask
															placeholder={"MM/DD/YYYY"}
															fullWidth
															// style={{ borderBottomStyle: 'solid', color: this.state.date_of_birth_error ? "#F44336" : "rgba(0,0,0,0.9)", borderBottomWidth: this.state.date_of_birth_error || this.state.invalid_age_error || this.state.invalid_date_of_birth_error ? 2 : 1, borderBottomColor: this.state.date_of_birth_error || this.state.invalid_age_error || this.state.invalid_date_of_birth_error ? "#F44336" : 'gray' }}
															//type='tel'
															mask="99/99/9999"
															maskChar={null}
															value={this.state.date_of_birth}
															onChange={(event) => this.setState({ date_of_birth: event.target.value, date_of_birth_error: false })} >
															{(inputProps) =>
																<CssField
																	fullWidth
																	id="date_of_birth"
																	//label="Date of Birth"
																	name="date_of_birth"
																	autoComplete="off"
																	size="small"
																	{...inputProps}
																	disableunderline="true"
																	onChange={this.props.onChange}
																	onKeyPress={e => {
																		if (e.key === "Enter") {
																			this.loginAction();
																		}
																	}}
																	//helperText={this.state.date_of_birth_error === true ? <Typography className={classes.errorText}>Please enter date of birth</Typography> : this.state.invalid_date_of_birth_error || this.state.future_date_error ? <Typography className={classes.errorText}>{this.state.errorText}</Typography> : ""} 
																/>}
														</InputMask>

													</div>
													{this.state.date_of_birth_error
														&& <Typography style={{ color: '#d32f2f', fontSize: '0.75rem', textAlign: 'center' }}>{this.state.date_of_birth === "" || this.state.date_of_birth === null ? 'Please enter date of birth' : 'Please enter valid date of birth'}</Typography>
													}
												</div>
												<div style={{ display: 'flex', alignItems: "center", justifyContent: "center", width: "100%" }}>
													<Typography className={classes.internalUserTitle} onClick={() => this.setState({ login_type: "PN", email_disable: true, phone_disable: false, email: "" })} style={{ cursor: "pointer" }}>
														Use Phone
													</Typography>
												</div>
											</div>}
									</div>
									:
									<Grid
										item
										xs={12}
										container
										justify="center"
										alignItems="center"
										direction="column"
									> <OtpInput
											value={this.state.otp}
											shouldAutoFocus={true}
											onChange={this.handleChange}
											numInputs={6}
											isInputNum={true}

											separator={
												<span style={{ padding: 0 }}>
													<strong></strong>
												</span>
											}
											inputStyle={{
												width: "1.7rem",
												height: "1.7rem",
												margin: "0 0.4rem",
												fontSize: "1rem",
												borderRadius: 4,
												border: "1px solid rgba(0,0,0,0.3)",
												backgroundColor: "#B9CCE4"
											}}
											hasErrored={this.state.otp_error ? true : this.state.invalid_otp_error ? true : false}
										/>
										<div>
											<Typography style={{ fontSize: 13, color: "red", display: "flex", justifyContent: "center", marginTop: 4 }}>{this.state.otp_error === true ? "Please enter OTP" : this.state.invalid_otp_error === true ? "Please Enter 6 digit otp" : null}</Typography>
										</div>
									</Grid>
								}
								{this.state.islogin === false ?
									<div style={{ display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

										{this.state.isLoading === true
											? <CircularProgress />
											: <Button fullWidth variant="contained" className={classes.buttonVariant} onClick={() => this.loginAction()}>
												Log In
											</Button>
										}

										<div style={{ display: 'flex', alignItems: "center", justifyContent: "center", width: "50%" }}>
											<Link href="/internal_user_login">
												<Typography className={classes.internalUserTitle}>
													Employee Login
												</Typography>
											</Link>
										</div>
									</div> :
									<Button fullWidth variant="contained" className={classes.buttonVariant} onClick={() => this.otpAction()}>Verify</Button>}
								{this.state.islogin === true ? <Typography className={classes.resendOtpTitle} style={{cursor:"pointer"}} onClick={() => this.reSendOtpAction()}>Resend</Typography> : null}
							</div>
						</Grid>
					</Grid>
				</div>
			</div >
		)
	}
}

const mapStateToProps = (state) => {
	return {

	};
};
Login.layout = "login";

export default compose(withStyles(styles), connect(mapStateToProps))(Login);