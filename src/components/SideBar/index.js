import { Button, List, ListItem, Drawer } from '@mui/material';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
// import HomeIcon from '@mui/icons-material/Home';
// import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { connect } from 'react-redux';
// import { compose } from "redux";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import HomeIcon from '@mui/icons-material/Home';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 200,
        display: "flex",
        // backgroundColor: "#2B8194",
        // backgroundColor: '#0065cd',
        backgroundColor: 'rgb(2, 68, 158)',
        [MyComponent()]: {
            // paddingTop: "55px",
        }
    },
    button: {
        color: "#fff",
        alignItems: "center",
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        fontFamily: "Futura-Book",
        fontSize: 15
    },
    icon: {
        color: "#000",
        width: 15,
        height: 15,
        display: 'flex',
        alignItems: 'center',
        marginRight: 30
    },
    item: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: "20px"
    },
    active: {
        //color: "#2B99CD",
        //color: "#fff",
        borderRadius: "0px",
        // backgroundColor: "#E5F6FD",
        // backgroundColor: "#57aaff",
        backgroundColor: '#0065cd',
        borderRight: '3px solid rgb(38, 135, 196)',
        fontFamily: "Futura-Book",
        fontWeight: "bold",
        '& $icon': {
            // color: "#2B99CD",
            color: 'white'
        }
    }
}))

function MyComponent() {
    const matches = theme.breakpoints.up('lg');
    return matches;
}

const SideBar = (props) => {
    const { open, variant, onClose, className, ...rest } = props;
    const classes = useStyles();
    const router = useRouter()


    let User = typeof localStorage !== "undefined" && localStorage.getItem('user')
    const userObj = JSON.parse(User);
    let roleName = userObj !== null ? Object.keys(userObj).length > 0 ? userObj.userRoles[0].role.code : null : null


    let pages = []
    if (roleName !== null) {
        switch (roleName) {
            case "ADM":
                pages = [
                    {
                        title: "Location",
                        href: "/admin/location",
                        icon: <LocationOnIcon style={{ marginRight: 10 }} />
                    },
                    {
                        title: "Test Type",
                        href: "/admin/test-type",
                        icon: <MedicalServicesIcon style={{ marginRight: 10 }} />
                    },
                    {
                        title: "Location Test Type",
                        href: "/admin/location-test-type",
                        icon: <AddLocationIcon style={{ marginRight: 10 }} />
                    },
                    {
                        title: "Users and Access",
                        href: "/admin/users_access",
                        icon: <GroupIcon style={{ marginRight: 10 }} />
                    },
                    {
                        title: "Test Results Payment",
                        href: "/admin/test-results-payment",
                        icon: <ListAltIcon style={{ marginRight: 10 }} />
                    },

                ]
                break;
            case "CSR":
                pages = [
                    {
                        title: "Home",
                        href: "/customer/user-home",
                        icon: <HomeIcon style={{ marginRight: 10 }} />
                    },
                    // {
                    //     title: "Test Registration",
                    //     href: "/customer/test-registration-form",
                    //     icon: <ListAltIcon style={{ marginRight: 10 }} />
                    // },
                    {
                        title: "Schedule Appointment",
                        href: "/customer/scheduleAppointment",
                        icon: <ListAltIcon style={{ marginRight: 10 }} />
                    },
                    {
                        title: "Provide Feedback",
                        href: "/customer/provide-feedback",
                        icon: <FeedbackIcon style={{ marginRight: 10 }} />
                    }
                ]
                break;
            case "LBT":
                pages = [
                    {
                        title: "Home",
                        href: "/lab-technician/lab-tech-home",
                        icon: <PersonIcon style={{ marginRight: 10 }} />
                    }
                ]
                break;
            default:
                pages = [];
        }
    }
    return (
        <div>
            <Drawer
                PaperProps={{ elevation: 3 }}
                anchor="left"
                classes={{ paper: classes.drawer }}
                onClose={onClose}
                open={open}
                variant={variant}
            >
                <List style={{ marginTop: 50 }}>
                    {pages.length > 0 && pages.map((item, index) => (
                        <Link href={item.href} passHref key={index} >
                            <ListItem
                                onClick={() => variant !== 'persistent' && onClose()}
                                className={router.pathname == item.href ? classes.active : classes.button}
                                disableGutters
                                key={index}>
                                <Button
                                    className={classes.button}
                                    href={item.href}
                                    startIcon={item.icon}>
                                    {item.title}
                                </Button>
                            </ListItem>
                        </Link>
                    ))
                    }
                </List>
            </Drawer>
        </div>
    )
}

SideBar.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired,
}

export default SideBar;
