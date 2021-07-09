import React, {FC} from 'react';
import SimpleBar from "simplebar-react";
import {IDeviceInfo} from "../bets/deviceInfo";
import {connect} from "react-redux";
import {IStore} from "../../index";

interface Props {
    deviceInfo: IDeviceInfo;
    content: any;
}

const ReturnContent: FC<Props> = ({deviceInfo, content}) =>
    deviceInfo.isDesktop ?
        <SimpleBar style={{height: window.innerHeight}} autoHide={false}>
            {content}
        </SimpleBar> :
        content
;

export default connect(
    ({deviceInfo}: IStore) => ({deviceInfo})
)(ReturnContent)