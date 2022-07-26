import * as actionTypes from "../actions/actionTypes";
import {ACTIVE_ACTION_SHEET, Active_Action_Sheet} from "../actions/actionTypes";

const initialState = {
    isDark: true,
    isLoading: true,
    hasError: false,
    showSideMenu: false,
    activeOrderLayout: false,
    activeActionSheet: {
        menu: false,
        subMenu: false,
    },
    info: {
        type: null,
        message: null,
    }
};

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_THEME:
            return {
                ...state,
                isDark: action.isDark,
            };
        case actionTypes.SET_INFO_MESSAGE:
            return {
                ...state,
                info: {
                    type: action.messageType,
                    message: action.message,
                }
            };
        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case actionTypes.SET_ERROR:
            return {
                ...state,
                hasError: action.error,
            };
        case actionTypes.SET_SHOW_SIDE_MENU:
            return {
                ...state,
                showSideMenu: action.isOpen,
            };
        case actionTypes.ACTIVE_ORDER_LAYOUT:
            return {
                ...state,
                activeOrderLayout: action.active,
            };

        case actionTypes.ACTIVE_ACTION_SHEET:
            return {
                ...state,
                activeActionSheet: {
                    ...state.activeActionSheet,
                    ...action.status,
                }
            };
        default:
            return state;
    }
};

export default globalReducer;
