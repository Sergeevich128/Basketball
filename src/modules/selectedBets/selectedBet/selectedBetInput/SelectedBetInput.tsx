import React, {FC, ForwardedRef} from 'react';
import {IDeviceInfo} from "../../../bets/deviceInfo";
import {connect} from "react-redux";
import {IStore} from "../../../../index";

interface Props {
  onStakeChange: Function;
  deviceInfo?: IDeviceInfo;
  value: number;
  showStakeAccordion?: any;
}

const SelectedBetInput: FC<Props> = React.forwardRef(({value, showStakeAccordion, deviceInfo, onStakeChange}, ref: ForwardedRef<HTMLDivElement>) => {

  return (
    <div ref={ref}>
      {deviceInfo?.isDesktop
        ? <input
          type="number"
          className="selected-bet-input"
          value={value}
          onFocus={showStakeAccordion}
          onChange={(event) => onStakeChange(event)}
        />
        : <span
          className="selected-bet-input"
          onClick={showStakeAccordion}
        >
          {value}
      </span>
      }
    </div>
  );
});

export default connect(
  ({deviceInfo}: IStore) => ({
    deviceInfo
  }),
  null,
  null,
  {forwardRef: true}
)(SelectedBetInput);
