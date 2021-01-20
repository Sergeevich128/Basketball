import React, {FC} from 'react';
import {connect} from "react-redux";
import {IStore} from "../../../index";
import {IBalance} from "./userBalance";
import "./balance.css"

interface Props {
  userBalance: IBalance;
}

const Balance:FC<Props> = ({userBalance}) => {
  return (
    <div className="balance">{userBalance.currency} {userBalance.value}</div>
  );
};

export default connect(
  ({userBalance}:IStore) => ({
    userBalance
  })
)(Balance);