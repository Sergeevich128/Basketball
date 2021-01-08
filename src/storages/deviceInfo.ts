import {DEVICE_TYPE} from "./constants";
import {sendDeviceInfo} from "./actions";
import store from "./store";

export interface IDeviceInfo {
    isMobile: boolean;
    isDesktop: boolean;
    isTablet: boolean;
}

window.addEventListener('resize', event => {
    store.dispatch(sendDeviceInfo(getDeviceInfo()))
}, false);

const getDeviceInfo = (): IDeviceInfo => {
    const width = window.innerWidth;
    return {
        isDesktop: width >= 992,
        isTablet: width >= 768 && width < 992,
        isMobile: width < 768
    }
}

const deviceInfo = (state = getDeviceInfo(), action: any) => {
    switch (action.type) {
        case DEVICE_TYPE:
            return action.info
    }
    return state
}


export default deviceInfo;