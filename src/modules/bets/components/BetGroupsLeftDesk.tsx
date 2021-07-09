import React, {FC, useEffect} from 'react';

interface Props {
    returnBetGroups: Function;
    iconStarLogic: Function;
}

const BetGroupsLeftDesk: FC<Props> = ({returnBetGroups, iconStarLogic}) => {
    iconStarLogic()
    return (
        <>
            {returnBetGroups(0, true)}
        </>
    );
};

export default BetGroupsLeftDesk;