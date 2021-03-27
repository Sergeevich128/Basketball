export interface IBetsConfig {
    minStake: number;
    maxStake: number;
}

const betsConfig: IBetsConfig = {
    minStake: .1,
    maxStake: 500,
}

const classList = (arr: (string | boolean | number | undefined)[]): string => arr.filter(Boolean).join(" ");

const urlParams = new URLSearchParams(window.location.search);
let platform_token = urlParams.get("platform_token");

const requestData = (url: string) => {
    return fetch(url, {cache: "no-store"})
        .then((res) => res.json())
}

export {
    betsConfig,
    requestData,
    platform_token,
    classList
};