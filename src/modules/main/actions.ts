import {SET_PREVIEW_DATA, SWITCH_ACTIVE_WINDOW} from "../../storages/constants";
import {IPreviewData} from "./mainReducer";

export const switchWindow = (value: string) => ({
    type: SWITCH_ACTIVE_WINDOW,
    value
})

export const setPreviewData = (data: IPreviewData) => ({
    type: SET_PREVIEW_DATA,
    data
})