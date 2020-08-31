// import axios from 'axios';
import { updateDatabase, getFavorites } from '../firebase';
import ApolloClient, { gql } from 'apollo-boost';

let initialData = {
    fetching: false,
    array: [],
    current: {},
    favorites: []
};

// let URL = "https://rickandmortyapi.com/api/character";
let client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql"
});

let GET_CHARACTERS = "GET_CHARACTERS";
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";
let REMOVE_CHARACTER = "REMOVE_CHARACTER";
let ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
let GET_FAVORITES = "GET_FAVORITES";
let GET_FAVORITES_SUCCESS = "GET_FAVORITES_SUCCESS";
let GET_FAVORITES_ERROR = "GET_FAVORITES_ERROR";

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
        case ADD_TO_FAVORITES:
            return {...state, ...action.payload};
        case GET_FAVORITES:
            return {...state, fetching: true};
        case GET_FAVORITES_SUCCESS:
            return {...state, fetching: false, favorites: action.payload};
        case GET_FAVORITES_ERROR:
            return {...state, fetching: false, error: action.payload};
        default:
            return state;
    };

};

export let getCharactersAction = () => (dispatch, getState) => {

    let query = gql`{
        characters {
            results {
                name
                image
            }
        }
    }`;

    dispatch({
        type: GET_CHARACTERS
    });

    return client.query({
        query
    })
    .then( ({data, error}) => {
        if (error) {
            dispatch({
                type: GET_CHARACTERS_ERROR,
                payload: error
            });
            return;
        }
        dispatch({
            type: GET_CHARACTERS_SUCCESS,
            payload: data.characters.results
        });
    });

    /* return axios.get(URL)
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
        }); */

};

export let addToFavoritesAction = () => (dispatch, getState) => {

    let { array, favorites } = getState().characters;

    let { uid } = getState().user;

    let char = array.shift();

    favorites.push(char);

    updateDatabase(favorites,uid);

    dispatch({
        type: ADD_TO_FAVORITES,
        payload: {
            array: [...array],
            favorites: [...favorites]
        }
    });

};

export let getFavoritesFromDatabaseAction = () => (dispatch,getState) => {

    dispatch({
        type: GET_FAVORITES
    });

    let { uid } = getState().user;

    return getFavorites(uid)
        .then( array => {
            dispatch({
                type: GET_FAVORITES_SUCCESS,
                payload: [...array]
            });
        })
        .catch( err => {
            console.log(err);
            dispatch({
                type: GET_FAVORITES_ERROR,
                payload: err.message
            });
        });

};

export let removeCharacterAction = () => (dispatch, getState) => {

    let {array} = getState().characters;

    array.shift();

    dispatch({
        type: REMOVE_CHARACTER,
        payload: [...array]
    });

};