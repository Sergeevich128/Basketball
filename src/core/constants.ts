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
let url = urlParams.get("url");

export {
    betsConfig,
    platform_token,
    url,
    classList
};