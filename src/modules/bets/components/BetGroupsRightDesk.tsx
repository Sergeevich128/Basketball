import React, {FC, useEffect} from 'react';

interface Props {
    returnBetGroups: Function;
    iconStarLogic: Function;
}

const BetGroupsRightDesk: FC<Props> = ({returnBetGroups, iconStarLogic}) => {
    iconStarLogic()
    return (
        <>
            {returnBetGroups(1, true)}
        </>
    );
};

export default BetGroupsRightDesk;