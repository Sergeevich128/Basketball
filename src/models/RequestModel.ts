import {platform_token, url} from "../core/constants";
// import {eventId} from "../modules/main/betSlip/betSlipReducer";

interface IInit {
    method: string;
    headers: {[key: string]: string};
    cache: "no-store";
    body?: string;
}

const stringifyJSON = (obj: any): string => Object.keys(obj)
    .map((x) => `${encodeURIComponent(x)}=${encodeURIComponent(obj[x])}`)
    .join('&');

const requestData = (url: string, method?: string, body?: Object) => {
    const init: IInit = {
        method: method || 'GET',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        cache: "no-store",
    }
    console.log(init)
    if (body) {
        init.body = stringifyJSON(body);
    }
    return fetch(url, init)
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            return result;
        })
        .catch((err) => console.log(err))
}


export default class RequestModel {
    static getNextTeams = (): Promise<any> => {
        return requestData(`${url}/virtualBasketballInstant/game/newEvent?platform_token=${platform_token}`)
    };

    static getPrevTeams = (): Promise<any> => {
        return requestData(`${url}/virtualBasketballInstant/game/newEvent?rebet=0&platform_token=${platform_token}`)
    };

    static getInitData = (): Promise<any> => {
        return requestData(`${url}/virtualBasketballInstant/game/init?platform_token=${platform_token}`)
    };

    // static getNewEventData = (): Promise<any> => {
    //     return requestData(`${url}/virtualBasketballInstant/game/newEvent?platform_token=${platform_token}`)
    // };

    static getPlacedBets = (body: {}): Promise<any> => {
        return requestData(`${url}/virtualBasketballInstant/bets/place?platform_token=${platform_token}`, "POST", body)
    };

    static getGameResults = (eventId: number): Promise<any> => {
        return requestData(`${url}/virtualBasketballInstant/bets/eventResults?skipPos=-1&eventId=${eventId}&platform_token=${platform_token}`)
    };

    // static getResults = (): Promise<any> => {
    //     return requestData(`https://qa-virtuals-bask_last.leap-gaming.com/virtualBasketballInstant/bets/eventResults?eventId=${eventId}&skipPos=0&platform_token=${platform_token}`)
    // }
}