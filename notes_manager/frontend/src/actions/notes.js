import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { GET_NOTES, DELETE_NOTE, CREATE_NOTE, GET_ERRORS } from "./types";
import { tokenConfig } from "./auth";

// GET NOTES
export const getNotes = () => (dispatch, getState) => {
    axios
        .get("http://localhost:8000/api/notes/", tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_NOTES,
                payload: res.data
            });
        }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE NOTE
export const deleteNote = (id) => (dispatch, getState) => {
    axios
        .delete(`http://localhost:8000/api/notes/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ deleteNote: "Note Deleted" }));
            dispatch({
                type: DELETE_NOTE,
                payload: id
            });
        }).catch((err) => console.log(err));
};

// CREATE NOTE
export const createNote = (note) => (dispatch, getState) => {
    axios
        .post("http://localhost:8000/api/notes/", note, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ createNote: "Note Created" }));
            dispatch({
                type: CREATE_NOTE,
                payload: res.data
            });
        }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};