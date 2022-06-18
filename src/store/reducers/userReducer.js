import { FETCH_ALL_USERS, CREATE_USER, FETCH_ALL_ROLES, USER_CONTACTS } from "../actions/actionTypes";

const initialState = {
    all_users: [],
    all_roles: [],
    user_contacts: []
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_USERS:
            return {
                ...state,
                all_users: action.data
            }
        case CREATE_USER:
            return {
                ...state,
                all_users: state.all_users.find(x => x.id === action.data.id) !== undefined
                    ? state.all_users.map(x => x.id === action.data.id ? action.data : x)
                    : [...state.all_users, action.data]
            }
        case FETCH_ALL_ROLES:
            return {
                ...state,
                all_roles: action.data
            }
        case USER_CONTACTS:
            return {
                ...state,
                user_contacts: action.data
            }
        default:
            return state;

    }
}