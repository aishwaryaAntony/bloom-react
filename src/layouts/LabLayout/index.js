import * as React from 'react';
import TopBar from '../../components/TopBar'
import SideBar from '../../components/SideBar'
import { makeStyles, } from "@mui/styles";
import { useState } from 'react';
import { useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import clsx from 'clsx';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ALERT_DETAIL } from "../../store/actions/actionTypes";
import { compose } from "redux";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Hidden, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { TAB_SELECTED } from '../../store/actions/actionTypes'
import HomeIcon from '@mui/icons-material/Home';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useRouter } from "next/router";
import { isMobile } from '../../helpers/constants'

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});

const useStyles = makeStyles(theme => ({
    root: {

        height: '100%',
        paddingTop: 56,
        [MyComponent()]: {
            paddingTop: 56,
        }
    },
    shiftContent: {
        paddingLeft: 200
    },
    content: {
        height: '100%'
    },
    rootForTab: {
        background: '#3498db',
        width: '100%',
        position: "fixed",
        bottom: 0,
        zIndex: 1,
        color: 'white',
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    roots: {
        color: '#bdc3c7',
        "&$selected": {
            color: "#fff"
        }
    },
    selected: {},

}));

function MyComponent() {
    const matches = theme.breakpoints.up('sm');
    return matches;
}

const Lablayout = props => {
    const { children, openAlert, alertSeverity, alertMessage, } = props;
    const router = useRouter();

    const classes = useStyles();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const isIpad = useMediaQuery(theme.breakpoints.up("sm"));
    const [openSidebar, setOpenSidebar] = useState(false);

    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    let User = typeof localStorage !== "undefined" && localStorage.getItem('user')
    const userObj = JSON.parse(User);
    let roleCode = userObj !== null && Object.keys(userObj).length > 0 ? userObj.userRoles[0].role.code : null


    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };
    const tabChange = (newValue) => {
        props.dispatch({ type: TAB_SELECTED, data: newValue })
    }
    const onLink = (href) => {
        router.push(href);
    };


    return (
        <div
            className={clsx({
                [classes.root]: true,
                // [classes.shiftContent]: isDesktop
            })}
        >
            <TopBar onSidebarOpen={handleSidebarOpen} />
            <Snackbar
                open={openAlert}
                onClose={() => props.dispatch({ type: ALERT_DETAIL, data: false, message: "", severity: "success" })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000} >
                <Alert icon={false} variant="filled" severity={alertSeverity} >{alertMessage}</Alert>
            </Snackbar>
            <main >
                {children}
            </main>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        openAlert: state.sessionReducer.openAlert,
        alertSeverity: state.sessionReducer.alertSeverity,
        alertMessage: state.sessionReducer.alertMessage,
        selectedTab: state.sessionReducer.selectedTab,
    };
};

Lablayout.propTypes = {
    children: PropTypes.node,
};
export default compose(connect(mapStateToProps))(Lablayout);