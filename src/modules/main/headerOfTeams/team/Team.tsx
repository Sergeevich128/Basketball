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
      if (team) {
          selectTeam(`${team.name}`)
      }
  }, [team?.id, team?.name]);

  const selectTeam = (name: string) => {
    if (sideOfShadow === "right" && name) {
      import(`../../../../data/images/logosWithLeftShadow/${name}.png`)
        .then(image => {
          setImage(image.default)
        })
    }

    if (sideOfShadow === "left" && name) {
      import(`../../../../data/images/logosWithRightShadow/${name}.png`)
        .then(image => {
          setImage(image.default)
        })
    }
  };

  return (
    <div className="team">
      <div style={{background: team?.bgColor}} className={sideOfShadow === "right" ? "bgRectangleRight" : "bgRectangleLeft"}/>
      <span>{team?.name}</span>
      {img && <img src={img} alt=""/>}
    </div>
  );
};

export default Team;