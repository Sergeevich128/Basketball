import {REMOVE_RUN_DATA, REQUIRE_RESULT_DATA} from "../../../storages/constants";

export const requireResultData = () => ({
    type: REQUIRE_RESULT_DATA
});

export const removeRunData = () => ({
    type: REMOVE_RUN_DATA
});
