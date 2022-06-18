import { LOGIN_SUCCESS, LOGOUT, ALERT_DETAIL, TAB_SELECTED, VERIFICATION_CODE, IS_MOBILE_VIEW, IS_IPAD_VIEW } from "../actions/actionTypes"

const initialState = {
    user: null,
    openAlert: false,
    alertSeverity: null,
    alertMessage: null,
    rbt_schedules: null,
    selectedTab: 0,
    verification_code: null,
    isMobileView: null,
    isIpadView: null
}

export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.data
            }
        case LOGOUT:
            return initialState;

        case ALERT_DETAIL:
            return {
                ...state,
                openAlert: action.data,
                alertSeverity: action.severity,
                alertMessage: action.message,
            }
        case TAB_SELECTED:
            return {
                ...state,
                selectedTab: action.data,
            };
        case VERIFICATION_CODE:
            return {
                ...state,
                verification_code: action.data
            }
            case IS_MOBILE_VIEW:
            return {
                ...state,
                isMobileView: action.data
            }
            case IS_IPAD_VIEW:
            return {
                ...state,
                isIpadView: action.data
            }
        default:
            return state;
    }

}