import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE, UPDATE_PROFILE, LOGOUT } from "./actionTypes"
import axios from "axios"

const updateProfile = (payload) => {
    return {
        type: UPDATE_PROFILE,
        payload
    }
}
const loginRequest =()=>{
    return {
        type:LOGIN_REQUEST
    }
}

const loginSuccess =(payload)=>{
    return {
        type:LOGIN_SUCCESS,
        payload
    }
}

const loginFailure =(payload)=>{
    return {
        type:LOGIN_FAILURE,
        payload
    }
}

const logOut = () => {
    return {
        type: LOGOUT
    }
}

const loginUser=(payload)=>(dispatch)=>{
    const requestAction = loginRequest();
    dispatch(requestAction);
    axios.post("https://reddit-new.herokuapp.com/login", payload)
        .then((res) => {
            console.log('res:', res)
            const successAction = loginSuccess(res.data);
            dispatch(successAction);
        })
        .catch((err) => {
            console.log('err:', err.response.data)
            const failureAction = loginFailure(err.response.data);
            dispatch(failureAction);
        });
}
//---------------------------Register--------------------
const registerRequest =()=>{
    return {
        type:REGISTER_REQUEST
    }
}

const registerSuccess =(payload)=>{
    return {
        type:REGISTER_SUCCESS,
        payload
    }
}

const registerFailure =(payload)=>{
    return {
        type:REGISTER_FAILURE,
        payload
    }
}

const registerUser = (payload) => (dispatch) => {
    const requestAction = registerRequest();
    dispatch(requestAction);
    axios.post("https://reddit-new.herokuapp.com/register", payload)
        .then((res) => {
            const successAction = registerSuccess(res.data);
            dispatch(successAction);
        })
        .catch((err) => {
            console.log(err.response.data)
            const failureAction = registerFailure(err.response.data);
            dispatch(failureAction);
        });
}

export {
    loginRequest,
    loginSuccess,
    loginFailure,
    loginUser,
    registerRequest,
    registerSuccess,
    registerFailure,
    registerUser,
    updateProfile,
    logOut
}