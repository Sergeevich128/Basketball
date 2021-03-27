import React, {FC, useEffect, useRef} from 'react';
import {connect} from "react-redux";
import {IStore} from "../../../index";
import {selectTab} from "../../main/betSlip/actions";
import './tabs.css'

interface Props {
  tabs: string[];
  activeTab: string;
  addSelectedTab: Function;
}

const Tabs: FC<Props> = ({tabs, activeTab, addSelectedTab}) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const refUnderline = useRef<HTMLElement>(null);

  const handleTabClick = (name: string) => {
    addSelectedTab(name);
  }

  const changeUnderlineStyle = () => {
    const tab = tabsRef.current?.querySelector(`.active`) as HTMLDivElement;
    if (tab && tabsRef.current) {
      const left: number = tab.offsetLeft;
      if (refUnderline.current) {
        refUnderline.current.style.transform = `translateX(${left}px)`
        refUnderline.current.style.width = `${tab.offsetWidth}px`
      }
    }
  }

  window.addEventListener('resize', changeUnderlineStyle);

  useEffect(changeUnderlineStyle, [activeTab]);

  return (
    <div className="tabs-container" ref={tabsRef}>
      <div className="tabs">
        {tabs.map((tab) =>
          <div
            key={tab}
            className={`tab tab-${tab}` + (tab === activeTab ? " active" : "")}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>)}
      </div>
      <span ref={refUnderline} className="underline"/>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addSelectedTab: (name: string) => dispatch(selectTab(name))
  }
}

export default connect(
  ({bets: {tabs, activeTab}}: IStore) => ({
    tabs,
    activeTab
  }),
  mapDispatchToProps
)(Tabs);
