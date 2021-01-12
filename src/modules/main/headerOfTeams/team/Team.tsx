import React, {FC, useEffect, useState} from 'react';
import './team.css';
import {ITeam} from "../teamsInfo";

interface Props {
  team: ITeam;
  sideOfShadow: string;
}

const Team: FC<Props> = ({team, sideOfShadow}) => {
  const [img, setImage] = useState(undefined);

  useEffect(() => {
    selectTeam(`${team.firstName}_${team.lastName}`);
  }, [team.id]);

  const selectTeam = (name: string) => {
    if (sideOfShadow === "right") {
      import(`../../../../data/images/logosWithLeftShadow/${name}.png`)
        .then(image => {
          setImage(image.default)
        })
    }

    if (sideOfShadow === "left") {
      import(`../../../../data/images/logosWithRightShadow/${name}.png`)
        .then(image => {
          setImage(image.default)
        })
    }
  };

  return (
    <div className="team">
      <div style={{background: team.bgColor}} className={sideOfShadow === "right" ? "bgRectangleRight" : "bgRectangleLeft"}/>
      <h4><span>{team.firstName}</span> <span>{team.lastName}</span></h4>
      {img && <img src={img} alt=""/>}
    </div>
  );
};

export default Team;