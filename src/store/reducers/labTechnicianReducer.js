import { USER_INFO_AND_USER_TEST} from "../actions/actionTypes";

const initialState = {
    userInfoAndUserTest: null,
};
export default function labTechnicianReducer(state = initialState, action) {
    switch (action.type) {
        case USER_INFO_AND_USER_TEST:
            return {
                ...state,
                userInfoAndUserTest: action.data
            };
        
        default:
            return state;
    }
};
