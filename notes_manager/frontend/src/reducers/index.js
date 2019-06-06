import { combineReducers } from "redux";
import notes from "./notes";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
    notes, 
    errors,
    messages,
    auth
});