import { CREATE_USER_TEST_REGISTRATION, USER_QRCODE, SAVE_USER_TEST_REGISTRATION } from "../actions/actionTypes";

const initialState = {
    createUserByForm: [],
    userQrCode: undefined,
    savedTests: {}
}

export default function formReducer(state = initialState, action) {
    switch ( action.type ){
        case CREATE_USER_TEST_REGISTRATION:
            return {
                ...state,
                createUserByForm: [...state.createUserByForm, action.data]
            };
        case USER_QRCODE:
            return {
                ...state,
                userQrCode: action.data
            };
        case SAVE_USER_TEST_REGISTRATION:
            return {
                ...state,
                savedTests: action.data
            }
        default :
        return state;    
    }
}