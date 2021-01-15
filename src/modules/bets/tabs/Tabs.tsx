import React, {FC, useEffect, useRef} from 'react';
import {IBetsState} from "../betsReducer";
import {connect} from "react-redux";
import {IStore} from "../../../index";
import {selectTab} from "../../selectedBets/actions";
import './tabs.css'

interface Props {
  bets: IBetsState;
  addSelectedTab: Function;
}

const Tabs: FC<Props> = ({bets, addSelectedTab}) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const refUnderline = useRef<HTMLElement>(null);

  const handleTabClick = (id: number) => {
    addSelectedTab(id);
  }

  const changeUnderlineStyle = () => {
    const tab = tabsRef.current?.querySelector(`.tab-${bets.activeTabId}`) as HTMLDivElement;
    if (tab && tabsRef.current) {
      const left: number = tab.offsetLeft - tabsRef.current.offsetLeft;
      if (refUnderline.current) {
        refUnderline.current.style.transform = `translateX(${left}px)`
        refUnderline.current.style.width = `${tab.offsetWidth}px`
      }
    }
  }

  window.addEventListener('resize', changeUnderlineStyle);

  useEffect(changeUnderlineStyle, [bets.activeTabId]);

  return (
    <div className="tabs-container" ref={tabsRef}>
      <div className="tabs">
        {bets.tabs.map((tab, index) => {
          return <div
            key={tab.id}
            className={`tab tab-${tab.id}` + (tab.id === bets.activeTabId ? ' active' : '')}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.name}
          </div>
        })}
      </div>
      <span ref={refUnderline} className="underline"/>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addSelectedTab: (id: number) => dispatch(selectTab(id))
  }
}

export default connect(
  ({bets}: IStore) => ({
    bets
  }),
  mapDispatchToProps
)(Tabs);
