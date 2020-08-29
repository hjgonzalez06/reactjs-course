import { loginWithGoogle, logoutWithGoogle } from "../firebase";

let initialData = {
    fetching: false,
    loggedIn: false
};
let LOGIN = "LOGIN";
let LOGIN_SUCCESS = "LOGIN_SUCCESS";
let LOGIN_ERROR = "LOGIN_ERROR";
let LOG_OUT = "LOG_OUT";

export default function reducer(state = initialData,action){

    switch(action.type){
        case LOGIN:
            return {...state, fetching: true};
        case LOGIN_SUCCESS:
            return {...state, fetching: false, loggedIn: true, ...action.payload};
        case LOGIN_ERROR:
            return {...state, fetching: false, error: action.payload};
        case LOG_OUT:
            return {...initialData};
        default:
            return state;
    };

};

function saveStorage(storage){

    localStorage.storage = JSON.stringify(storage);

};

export let doGoogleLoginAction = () => (dispatch, getState) => {

    dispatch({
        type: LOGIN
    });

    return loginWithGoogle()
        .then(user => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }
            })
            saveStorage(getState());
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: LOGIN_ERROR,
                payload: err.message
            });
        });

};

export let restoreSessionAction = () => dispatch => {

    let storage = localStorage.getItem('storage');

    storage = JSON.parse(storage);

    if (storage && storage.user) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: storage.user
        });
    };

};

export let doGoogleLogoutAction = () => (dispatch, getState) => {

    logoutWithGoogle();

    dispatch({
        type: LOG_OUT
    });

    localStorage.removeItem('storage');

};