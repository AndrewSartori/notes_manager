import { GET_NOTES, DELETE_NOTE, CREATE_NOTE } from "../actions/types.js";

const initialState = {
    notes: []
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_NOTES:
            return{
                ...state,
                notes: action.payload
            };
        case DELETE_NOTE:
            return{
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload)
            };
        case CREATE_NOTE:
            return{
                ...state,
                notes: [...state.notes, action.payload]
            };
        default: 
            return state;
    }
}