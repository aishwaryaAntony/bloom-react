import MainLayout from '../MainLayout';
import LoginLayout from '../LoginLayout';
import Lablayout from '../LabLayout';
import LaunchLayout from '../LaunchLayout';


const layouts = {
    default: MainLayout,
    login: LoginLayout,
    lab: Lablayout,
    launch: LaunchLayout
};

const LayoutWrapper = (props) => {
    // to get the text value of the assigned layout of each component
    const Layout = layouts[props.children.type.layout];
    // if we have a registered layout render children with said layout
    let User = typeof localStorage !== "undefined" && localStorage.getItem('user')
    const userObj = JSON.parse(User);
    let roleName = userObj !== null ? Object.keys(userObj).length > 0 ? userObj.userRoles[0].role.code : null : null
    if (roleName !== null) {
        if (Layout === "default") {
            return <MainLayout {...props}>{props.children}</MainLayout>;
        } else if (Layout === "lab") {
            return <Lablayout {...props}>{props.children}</Lablayout>;
        }
    }
    // if not render children with fragment
    return <Layout {...props}>{props.children}</ Layout>
};

export default LayoutWrapper;