import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, UPDATE_PROFILE, LOGOUT } from "./actionTypes";
import { loadData, saveData } from "../../utils/localStorage"

const token = loadData("token");
const user = loadData("user");

const initState = {
    isAuth: token ? true : false,
    user: user || "",
    token: token || "",
    isLoading: false,
    isError: false,
    errMsg:""
}
export const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case LOGIN_SUCCESS: {
            saveData("token", payload.token);
            saveData("user", payload.user);
            return {
                ...state,
                isAuth: true,
                user: payload.user,
                token: payload.token,
                isLoading: false,
                isError: false,
                errMsg:""
            }
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                isAuth: false,
                token: "",
                isLoading: false,
                isError: true,
                errMsg:payload.message
            }
        }
        case REGISTER_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case REGISTER_SUCCESS: {
            saveData("token", payload.token);
            saveData("user", payload.user);
            return {
                ...state,
                isAuth: true,
                user: payload.user,
                token: payload.token,
                isLoading: false,
                isError: false,
                errMsg:""
            }
        }
        case REGISTER_FAILURE: {
            return {
                ...state,
                isAuth: false,
                token: "",
                isLoading: false,
                isError: true,
                errMsg:payload.message
            }
        }
        case UPDATE_PROFILE: {
            saveData("user", payload);
            return {
                ...state,
                user:payload
            }
        }
        case LOGOUT: {
            saveData("token", "");
            saveData("user", "");
            return {
                ...state,
                isAuth:false,
                user: "",
                token:""
            }
        }
        default:
            return state
    }
}