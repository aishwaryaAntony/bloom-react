import { combineReducers } from 'redux'
import sessionReducer from './sessionReducer';
import locationReducer from './locationReducer';
import locationTestTypeReducer from './locationTestTypeReducer';
import testTypeReducer from './testTypeReducer';
import formReducer from './formReducer';
import labTechnicianReducer from './labTechnicianReducer';
import userReducer from "./userReducer";
import testResultReducer from "./testResultReducer";

const allReducers = combineReducers({
    sessionReducer,
    locationReducer,
    locationTestTypeReducer,
    testTypeReducer,
    formReducer,
    labTechnicianReducer,
    userReducer,
    testResultReducer
});
export default allReducers;