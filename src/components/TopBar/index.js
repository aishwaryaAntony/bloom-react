import React, { Component } from "react";
import {
    AppBar, Hidden, Badge, Toolbar, Typography, IconButton, Box, Divider
    , Menu, MenuItem,
} from '@mui/material';
import clsx from 'clsx';
import { withStyles } from '@mui/styles';
import PropTypes from "prop-types";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { logout } from '../../store/actions/sessionAction'
import { connect } from 'react-redux';
import { compose } from "redux";
import Router, { withRouter } from 'next/router';
import Image from 'next/image';
import BloomLogoNew from "../../../public/images/BloomLogoNew.png";
import bloomiconLogo from "../../../public/images/Scottsdalefavicon.jpeg"


const styles = theme => ({
    root: {
        //  flexGrow: 1,
        // background: 'white',
        backgroundColor: '#e9f0f7',
        //background: "linear-gradient(to right, #0070A0, #1190C6, #56C4F3)",
        height: 55,
    },
    flexGrow: {
        flexGrow: 1
    },
    logoutButton: {
        backgroundColor: "#0070A0",
        borderRadius: "10",
        flexDirection: "row"
    },
    logoutText: {
        color: "#fff",
        fontFamily: "unicode.futurab",
        fontSize: 13,
        fontWeight: "500"
    }
})

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        }
    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    logOut = () => {
        this.props.dispatch(logout())
    }


    render() {
        const { classes, className, onSidebarOpen, ...rest } = this.props;

        const open = Boolean(this.state.anchorEl);
        const id = open ? 'simple-popover' : undefined;

        let User = typeof localStorage !== "undefined" && localStorage.getItem('user')
        const userObj = JSON.parse(User);
        let roleCode = userObj !== null && Object.keys(userObj).length > 0 ? userObj.userRoles[0].role.code : null



        return (
            <div>
                <AppBar
                    position="fixed"
                    //   color="default"
                    //   className={clsx(classes.root)}
                    {...rest}
                    color="default"
                    className={clsx(classes.root, className)}
                >
                    <div>
                        <Toolbar style={{ justifyContent: "space-between", }}>
                            {roleCode !== null && roleCode !== "LBT" ?
                                <Hidden lgUp>
                                    <MenuIcon style={{ color: "#0070A0" }} onClick={onSidebarOpen} />
                                </Hidden> :
                                <Hidden lgUp>
                                    <Typography style={{ color: 'white' }}>
                                    </Typography>
                                </Hidden>}
                            <Hidden lgDown>
                                <Typography style={{ color: 'white', width: roleCode !== null && roleCode === "LBT" ? 0 : 200 }}>
                                </Typography>
                            </Hidden>
                            <Hidden lgDown>
                                <div style={{ flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Image src={bloomiconLogo} width="30" height="30" alt="BloomLabs" />
                                    <Typography style={{ color: "#0070A0", marginLeft: 10, fontFamily: "HomepageBaukasten-Book", fontSize: 20, fontWeight: 'bold', textAlign: "center", alignItems: "center" }}>
                                        Bloom
                                    </Typography>
                                </div>
                            </Hidden>
                            {roleCode !== null && roleCode === "CSR" ?
                                <Hidden lgUp>
                                    <Typography style={{ color: "#0070A0", fontFamily: "HomepageBaukasten-Book", fontSize: 20, marginLeft: 0, fontWeight: 'bold', textAlign: "center" }}>
                                        {this.props.selectedTab === 0 ?
                                            "Home"
                                            : "Test Registration"}
                                    </Typography>
                                </Hidden> :
                                <Hidden lgUp>
                                    <div style={{ flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Image src={bloomiconLogo} width="30" height="30" alt="BloomLabs" />
                                        <Typography style={{ color: "#0070A0", marginLeft: 10, fontFamily: "HomepageBaukasten-Book", fontSize: 20, fontWeight: 'bold', textAlign: "center", alignItems: "center" }}>
                                            Bloom
                                        </Typography>
                                    </div>
                                </Hidden>
                            }
                            <div>
                                {/* <Badge badgeContent={2} color="error" >
                                    <NotificationsIcon style={{ color: 'red'}} />
                                </Badge> */}
                                <IconButton
                                    aria-describedby={id} variant="contained" onClick={this.handleClick} style={{ marginLeft: 10 }}>
                                    <AccountCircleIcon></AccountCircleIcon>
                                </IconButton>
                            </div>
                            <Menu
                                anchorEl={this.state.anchorEl}
                                open={open}
                                onClose={this.handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        minWidth: 200,
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 0,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <Box sx={{ my: 1.5, px: 2.5 }}>
                                    <Typography variant="subtitle1" noWrap>
                                        {userObj !== null && userObj !== undefined && userObj.first_name + " " + userObj.last_name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                        {userObj !== null && userObj !== undefined && userObj.email}
                                    </Typography>
                                </Box>
                                <Divider />
                                {roleCode !== null && roleCode === "CSR" &&
                                    <MenuItem onClick={() => Router.push({ pathname: '/customer/qr-code' })}>
                                        <ListItemIcon>
                                            <QrCode2Icon fontSize="small" />
                                        </ListItemIcon>
                                        QR Code
                                    </MenuItem>
                                }
                                <Divider />
                                <MenuItem onClick={() => this.logOut()}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Toolbar>
                    </div>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedTab: state.sessionReducer.selectedTab
})
TopBar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps))(TopBar); 
