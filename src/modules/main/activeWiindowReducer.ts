import {SWITCH_ACTIVE_WINDOW} from "../../storages/constants";

const activeWindow: IActiveWindow = "Preview";

export interface IActiveWindow {
    [key: number]: string
}

export interface IActiveWindowReducer {
    activeWindow: IActiveWindow
}

const initialState = {
    activeWindow
}

const activeWindowReducer = (state: IActiveWindowReducer = initialState, action: any) => {
    if (action.type === SWITCH_ACTIVE_WINDOW) {
        return {...state, activeWindow: action.value}
    }
    return state;
}

export default activeWindowReducer;