import React, {FC, useEffect} from 'react';

interface Props {
    returnBetGroups: Function;
    iconStarLogic: Function;
}

const BetGroupsMobile: FC<Props> = ({returnBetGroups, iconStarLogic}) => {
    iconStarLogic()
    return (
        <>
            {returnBetGroups(0, false)}
        </>
    );
};

export default BetGroupsMobile;