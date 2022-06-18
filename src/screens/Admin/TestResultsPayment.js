import React, { Component } from 'react';
import { Toolbar, Grid, Typography, Button, Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper, styled, tableCellClasses, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { compose } from "redux";
import moment from 'moment';
import { fetchAllTestResultPayments } from "../../store/actions/testResultAction";
import { ACCOUNTAPI } from "../../api";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const styles = theme => ({
	card: {
		border: "1px solid #e5e5e5",
		boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
		borderRadius: 0,
		backgroundColor: "#fff"
	},
	paper: {
		borderRadius: 0,
		boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
		padding: "15px",
	},
	tableHead: {
		backgroundColor: "#fff",
	},
	tableCell: {
		fontSize: 14,
		padding: "10px 10px",
		whiteSpace: "wrap",
		fontFamily: 'Lato-Regular',
	},
	tableCell1: {
		fontSize: 14,
		width: 150,
		padding: "10px 10px",
		whiteSpace: "wrap",
		fontFamily: 'Lato-Regular',
		wordBreak: 'break-all'
	},
	tableHeadCell: {
		padding: "10px 10px",
		fontSize: 15,
		color: '#00bcd4',
		backgroundColor: '#fff',
		fontFamily: 'Lato-Bold',
		fontWeight: 'bold',
		textTransform: 'uppercase',		
		
	},
	tableHeadCell1: {
		padding: "10px 10px",
		width: 150,
		fontSize: 15,
		color: '#00bcd4',
		backgroundColor: '#fff',
		fontFamily: 'Lato-Bold',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		wordBreak: 'break-all'
	},
	rowDiv: {
		display: "flex"
	},
	submitingLoader: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 40,
		backgroundColor: '#ccc',
		padding: 40
	},
	rowDivDivider: {
		display: "flex",
		borderBottom: "1px solid #E1E7ED",
		padding: 5
	},
	tab: {
		padding: "0px 10px",
		margin: "5px 10px",
	},
	tabText: {
		fontSize: 16,
		cursor: "pointer"
	},
	selectedTab: {
		borderBottom: "4px solid blue",
		padding: "0px 10px",
		margin: "5px 10px",
		boxShadow: "3px 3px 3px 3px rgba(0,0,0,0)",
	},
	selectedTabText: {
		fontSize: 16,
		fontWeight: "bold"
	},
	linkStyle: {
		fontSize: 14,
		textDecoration: 'underline',
		color: '#0098cd'
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



class TestResultsPayment extends Component {
	constructor() {
		super()
		this.state = {
			selected_tab: "PENDING",
			currentData: {},
			dialogOpen: false,
			isLoading: false,
			openAlert: false,
			isSubmitting: false
		}
	}
	componentDidMount = () => {
		this.props.dispatch(fetchAllTestResultPayments(this))
	}

	handleSubmit = (id) => {
		try {
			this.setState({isSubmitting: true});
			ACCOUNTAPI.post(`test-result/re-submit/${id}`, {}).then((response) => {
				if(response.status === "success"){
					this.setState({openAlert: true, isSubmitting: false});
					this.toInitialState();
				}
				
			});
		} catch (error) {
			this.setState({ openAlert: false, isSubmitting: false});
		}
	}

	toInitialState = () => {
		this.props.dispatch(fetchAllTestResultPayments(this));
        this.setState({
            selected_tab: "PENDING",
			currentData: {},
			dialogOpen: false,
			isLoading: false,
			isSubmitting: false,
			// openAlert: false
        });
    }

	handleOpen = (id) => {
		this.setState({ isLoading: true, dialogOpen: true});
		try {
			ACCOUNTAPI.get(`test-result/${id}`).then((response) => {
				// console.log(`Resp ==> ${JSON.stringify(response)}`)
				if (response.status === "success") {
					this.setState({ isLoading: false, currentData: response.payload });
				}else{
					this.setState({ isLoading: false, currentData: {}, dialogOpen: false });
				}
			});
		} catch (error) {
			this.setState({ isLoading: false, currentData: {}, dialogOpen: false });
		}		
	}

	handleClose = () => {
		this.setState({
			currentData: {},
			dialogOpen: false
		});
	}

	render() {
		const { classes, testResultPayments } = this.props;
		const { selected_tab } = this.state;
		let filterPendingPayments = testResultPayments !== undefined ? testResultPayments.filter(payment => payment.payment_status !== 'IN SALESFORCE') : [];
		// let filterPaidPayments = testResultPayments !== undefined ? testResultPayments.filter(payment => payment.is_paid === true) : [];
		let filterPaidPayments = testResultPayments !== undefined ? testResultPayments.filter(payment => payment.payment_status === 'IN SALESFORCE') : [];
		// console.log(`TESt R P --> ${JSON.stringify(testResultPayments)}`)

		return (
			<div
				style={{
					margin: 10,
					backgroundColor: "white",
					backgroundRepeat: "no-repeat",
				}}>
				<Snackbar
                    open={this.state.openAlert}
                    onClose={() => this.setState({openAlert: false})}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    autoHideDuration={3000} >
                    <Alert icon={false} variant="filled" severity="success" >Test result created successfully.</Alert>
                </Snackbar>
				<Grid container spacing={4}>
					<Grid item xs={12} >
						<Typography fontWeight="bold" fontSize={18} color="#144787" style={{ padding: 5 }}>Test Results Payment</Typography>

						<Toolbar style={{ justifyContent: "space-between", padding: "10px 20px 2px 2px" }}>
							<div className={classes.rowDiv}>
								<div className={selected_tab === "PENDING" ? classes.selectedTab : classes.tab}>
									<Typography onClick={() => this.setState({ selected_tab: "PENDING" })} className={selected_tab === "PENDING" ? classes.selectedTabText : classes.tabText}>PENDING</Typography>
								</div>
								<div className={selected_tab === "PAID" ? classes.selectedTab : classes.tab}>
									<Typography onClick={() => this.setState({ selected_tab: "PAID" })} className={selected_tab === "PAID" ? classes.selectedTabText : classes.tabText}>IN SALESFORCE</Typography>
								</div>
							</div>
						</Toolbar>
						{
							this.state.isSubmitting === true 
							?	<div className={classes.submitingLoader}>
									<Typography className={classes.textStyle}>Re-Submitting Test Result ...</Typography>
								</div>
							:	<TableContainer component={Paper} className={classes.paper} >
									<Table className={classes.card}>
										<TableHead className={classes.tableHead}>
											<StyledTableRow>
												<StyledTableCell align="left" className={classes.tableHeadCell1}>Payment Ref#</StyledTableCell>
												<StyledTableCell align="left" className={classes.tableHeadCell}>Phone Number</StyledTableCell>
												<StyledTableCell align="left" className={classes.tableHeadCell}>Email</StyledTableCell>
												<StyledTableCell align="left" className={classes.tableHeadCell}>Test Type</StyledTableCell>
												<StyledTableCell align="left" className={classes.tableHeadCell}>Location</StyledTableCell>
												<StyledTableCell align="left" className={classes.tableHeadCell}>Payment Status</StyledTableCell>
												<StyledTableCell align="left" className={classes.tableHeadCell}>Paid At</StyledTableCell>
												<StyledTableCell align="left" className={classes.tableHeadCell}>Status</StyledTableCell>

											</StyledTableRow>
										</TableHead>
										<TableBody>
											{filterPendingPayments.map(item =>
												selected_tab === "PENDING" && <StyledTableRow>
													<StyledTableCell className={classes.tableCell1}>												
														<Typography className={classes.linkStyle} onClick={()=> this.handleOpen(item.id)}> {item.session_id}</Typography>
													</StyledTableCell>
													<StyledTableCell className={classes.tableCell}>{item.phone_number}</StyledTableCell>
													<StyledTableCell className={classes.tableCell}>{item.email} </StyledTableCell>
													<StyledTableCell className={classes.tableCell}>{item.test_type}</StyledTableCell>
													<StyledTableCell className={classes.tableCell}>{item.location}</StyledTableCell>
													<StyledTableCell className={classes.tableCell}>{item.payment_status}</StyledTableCell>
													<StyledTableCell className={classes.tableCell}>{item.paid_at !== null ? moment(item.paid_at).format("LLL") : "-"}</StyledTableCell>
													<StyledTableCell className={classes.tableCell}>
														{
															item.is_paid === true &&
															<Button
																className={classes.button}
																color="primary"
																variant="contained"
																onClick={
																	() => {
																		if(window.confirm('Are you sure want to re-submit?')){
																			this.handleSubmit(item.id)
																		}
																	}
																}>
																Re-Submit
															</Button>
														}
													</StyledTableCell>
												</StyledTableRow>
											)}

											{filterPaidPayments.map(item =>
												selected_tab === "PAID" && <StyledTableRow>
													<StyledTableCell className={classes.tableCell1}>
														<Typography className={classes.linkStyle} onClick={()=> this.handleOpen(item.id)}> {item.session_id}</Typography>
													</StyledTableCell>
													<StyledTableCell className={classes.tableCell}>{item.phone_number}</StyledTableCell>
													<StyledTableCell className={classes.tableCell}>{item.email} </StyledTableCell>
													<StyledTableCell className={classes.tableCell}>{item.test_type}</StyledTableCell>
													<StyledTableCell className={classes.tableCell}>{item.location}</StyledTableCell>
													<StyledTableCell className={classes.tableCell}>{item.payment_status}</StyledTableCell>
													<StyledTableCell className={classes.tableCell}>{item.paid_at !== null ? moment(item.paid_at).format("LLL") : "-"}</StyledTableCell>
													<StyledTableCell className={classes.tableCell}>{item.status}</StyledTableCell>
												</StyledTableRow>
											)}
										</TableBody>
									</Table>
								</TableContainer>
						}
					
						<Dialog maxWidth={"md"} open={this.state.dialogOpen} onClose={() => this.handleClose()}>
							<DialogContent style={{ overflowY: "auto", boxShadow: "inset 0px 4px 0px #1D8878", borderRadius: 4, padding: 10}}>
								<Grid container spacing={2} justifyContent="space-between" style={{ marginTop: -20, padding: "2% 5% 0 5%" }}>
									<Grid item xs={12}>
										<Typography className={classes.textStyle}>Data</Typography>
										{
											this.state.isLoading === true 
											? <div>
												<Typography className={classes.textStyle}>Loading ...</Typography>
											</div>
											:	<pre className={classes.textStyle}> {JSON.stringify(this.state.currentData, null, 4)}</pre>
										}
									</Grid>
									<Grid item xs={12} style={{ display: "flex", justifyContent: "center", padding: 9 }}>
										<DialogActions>
											<Button size="small" onClick={() => this.handleClose()} variant="contained" style={{ backgroundColor: "red" }} className={classes.cancelButton}>Cancel</Button>
										</DialogActions>
									</Grid>
								</Grid>
							</DialogContent>
						</Dialog>
					</Grid>
				</Grid>
			</div>
		)
	}


}
const mapStateToProps = (state) => {
	return {
		testResultPayments: state.testResultReducer.testResultPayments,
	}
};

TestResultsPayment.layout = "default";

export default compose(withStyles(styles), connect(mapStateToProps))(TestResultsPayment);