import axios from 'axios';

let initialData = {
    fetching: false,
    array: [],
    current: {}
};
let URL = "https://rickandmortyapi.com/api/character";
let GET_CHARACTERS = "GET_CHARACTERS";
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";
let REMOVE_CHARACTER = "REMOVE_CHARACTER";

export default function reducer(state=initialData,action){

    switch(action.type){
        case GET_CHARACTERS:
            return {...state, fetching: true};
        case GET_CHARACTERS_SUCCESS:
            return {...state, fetching: false, array: action.payload};
        case GET_CHARACTERS_ERROR:
            return {...state, fetching: false, error: action.payload};
        case REMOVE_CHARACTER:
            return {...state, array: action.payload};
        default:
            return state;
    }

};

export let getCharactersAction = () => (dispatch, getState) => {

    dispatch({
        type: GET_CHARACTERS
    });

    return axios.get(URL)
        .then(res => {
            dispatch({
                type: GET_CHARACTERS_SUCCESS,
                payload: res.data.results
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_CHARACTERS_ERROR,
                payload: err.response.message
            });
        });

};

export let removeCharacterAction = () => (dispatch, getState) =>{

    let {array} = getState().characters;

    array.shift();

    dispatch({
        type: REMOVE_CHARACTER,
        payload: [...array]
    });

};