import React, { Component, useState } from 'react';
import { Toolbar, Grid, Typography, Button, Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper, styled, tableCellClasses, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import { BsPlusCircleFill } from "react-icons/bs";
import { connect } from 'react-redux';
import { fetchAllTestType, createTestType, updateTestType } from '../../store/actions/testTypeAction'
import { compose } from "redux";
import _ from 'underscore';
import dynamic from "next/dynamic";
import { EditorState, convertToRaw, ContentState,convertFromHTML } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)
import draftToHtml from 'draftjs-to-html';

const styles = theme => ({
    card: {
        border: "1px solid #e5e5e5",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        //marginTop: 15,
        borderRadius: 0,
        backgroundColor: "#fff"
    },
    papers: {
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
    textStyle: {
        padding: "8px"
    },
    tableCell: {
        fontSize: 14,
        padding: "10px 10px",
        whiteSpace: 'nowrap',
        fontFamily: 'Lato-Regular',
    },
    tableCell1: {
        fontSize: 14,
        padding: "10px 10px",
        fontFamily: 'Lato-Regular',
        minWidth: 100,
        maxWidth: 150
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
        color: '#00bcd4',      
        backgroundColor: '#fff',       
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
        color: '#283252',
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

class Testtype extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            dialogOpen: false,
            mode: "",
            code: "",
            code_error: false,
            name: "",
            name_error: false,
            description: "",
            message: "",
            status: "ACTIVE",
            editorState: EditorState.createEmpty(),
            message: 'Try the editor below!',
            rawMessage: '',
            display_name: '',
            display_name_error: false
        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }

    componentDidMount = () => {
        this.props.dispatch(fetchAllTestType())
    }

    handleChange = (editorState) => {
        this.setState({ editorState });
    }

    handleClick = (item, mode) => {
        this.setState({editorState: EditorState.createEmpty()})
        if (mode === "ADD") {
            this.setState({ mode: mode, dialogOpen: true })
        }
        else if(mode === "EDIT"){
           const html = item.description
            const blocksFromHTML = convertFromHTML(html)
            const content = ContentState.createFromBlockArray(blocksFromHTML)
            this.setState({editorState: EditorState.createWithContent(content)})          
            this.setState({
                id: item.id,
                dialogOpen: true,
                mode: mode,
                code: item.code,
                code_error: false,
                name: item.name,
                name_error: false,
                description: item.description,
                display_name: item.display_name,
                display_name_error: false
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
            description: "",
            display_name: "",
            display_name_error: false
        })
    }

    handleSubmit = (mode) => {
        let { id, name, description, code, display_name } = this.state
        let isError = false;
        if (name === "" || name === null) {
            this.setState({ name_error: true })
            isError = true;
        }

        if (code === "" || code === null) {
            this.setState({ code_error: true })
            isError = true;
        }

        if(display_name === "" || display_name === null){
            this.setState({display_name_error: true});
            isError = true;
        }

        if (isError === false) {
            let testTypeObj = {};
            testTypeObj.name = name;
            testTypeObj.code = code;
            testTypeObj.description = this.state.rawMessage;
            testTypeObj.display_name = display_name;
            testTypeObj.status = "ACTIVE"
            if (mode === "ADD") {
                this.props.dispatch(createTestType(this, testTypeObj))
            }
            else {
                this.props.dispatch(updateTestType(this, testTypeObj, id))
            }
        }
    }   
    onEditorStateChange(editorState) {
        this.setState({
            editorState,
            rawMessage: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div style={{margin: 10,backgroundColor: "white", backgroundRepeat: "no-repeat"}}>
                <Grid container spacing={4}>
                    <Grid item xs={12} >
                        <Toolbar style={{ justifyContent: "space-between", padding: "10px 20px 2px 2px" }}>
                            <Typography fontWeight="bold" fontSize={25} fontFamily="Futura-Heavy" color="#144787" style={{ padding: 5 }}>Test Types</Typography>
                            <Tooltip title="Add Test Types">
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
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Display Name</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Description</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Status</StyledTableCell>
                                        <StyledTableCell align="left" className={classes.tableHeadCell}>Actions</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.test_types !== null && this.props.test_types.length > 0 && _.sortBy(this.props.test_types).map((item, index) =>
                                        <StyledTableRow key={index}>
                                            <StyledTableCell className={classes.tableCell}>{item.name}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell}>{item.code}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell}>{item.display_name}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell1}><div dangerouslySetInnerHTML={{ __html: item.description }}></div></StyledTableCell>
                                            <StyledTableCell className={classes.tableCell}>{item.status}</StyledTableCell>
                                            <StyledTableCell className={classes.tableCell}> <Button className={classes.outlineButton} variant="outlined" onClick={() => this.handleClick(item, "EDIT")}>Edit</Button></StyledTableCell>
                                        </StyledTableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Dialog maxWidth={"md"} open={this.state.dialogOpen} onClose={() => this.handleClose()}>
                    <DialogContent style={{ overflowY: "auto", boxShadow: "inset 0px 4px 0px #1D8878", borderRadius: 4,padding: 10}}>
                        <DialogTitle id="form-dialog-title">
                            <Typography style={{ padding: "1% 2% 0 1%", fontFamily: "Futura-Heavy", fontSize: 15, fontWeight: "bold", color: "#1D8878" }}>{this.state.mode === "ADD" ? "Add Test Type" : "Update Test Type"}</Typography>
                        </DialogTitle>
                        <Grid container spacing={2} justifyContent="space-between" style={{ marginTop: -20, padding: "2% 5% 0 5%" }}>
                            <Grid item xs={6}>
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
                            <Grid item xs={6} style={{ paddingRight: 8 }}>
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
                            <Grid item xs={12} style={{ paddingRight: 8 }}>
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
                            </Grid>
                            <Grid item xs={12} style={{ paddingRight: 8 }}>
                                <Typography className={classes.textStyle}>Description</Typography>
                                <Editor placeholder="Description of Test type" editorState={this.state.editorState} editorStyle={{ border: '1px solid rgba(0, 0, 0, 0.05)', height: 200 }} onChange={this._handleChange}onEditorStateChange={this.onEditorStateChange}
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
        test_types: state.testTypeReducer.testType
    }
};

Testtype.layout = "default";
export default compose(withStyles(styles), connect(mapStateToProps))(Testtype);