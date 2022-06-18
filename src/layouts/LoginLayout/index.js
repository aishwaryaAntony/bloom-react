import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ALERT_DETAIL } from "../../store/actions/actionTypes";
import { compose } from "redux";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const LoginLayout = props => {
  const { children, openAlert, alertSeverity, alertMessage, } = props;
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Snackbar
        open={openAlert}
        onClose={() => props.dispatch({ type: ALERT_DETAIL, data: false, message: "", severity: "success" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000} >
        <Alert icon={false} variant="filled" severity={alertSeverity}>{alertMessage}</Alert>
      </Snackbar>
      <main>
        {children}
      </main>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    openAlert: state.sessionReducer.openAlert,
    alertSeverity: state.sessionReducer.alertSeverity,
    alertMessage: state.sessionReducer.alertMessage
  };
};
LoginLayout.propTypes = {
  children: PropTypes.node,
};

export default compose(connect(mapStateToProps))(LoginLayout);
