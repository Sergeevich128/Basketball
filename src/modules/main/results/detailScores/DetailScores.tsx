import React, {FC} from 'react';
import "./detailScore.css"
import {IDetailScores} from "../winBetsReducer";
import {classList} from "../../../../core/constants";

interface Props {
    detailScores: IDetailScores;
}

const DetailScores: FC<Props> = (detailScores) => (
        <div className="result-statistics">
            {Object.values(detailScores.detailScores).map(([firstNumber, lastNumber], index) =>
                <div className="result-statistic" key={index}>
                    <span className={classList([
                        "num",
                        firstNumber > lastNumber && "won",
                        firstNumber < lastNumber && "lost"])}>{firstNumber}</span>
                    <span className="colon">Q{++index}</span>
                    <svg className="colon-rectangle" width="37" height="5" viewBox="0 0 37 5" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.538086 4.57324H36.6771L31.7937 0.0558686H5.42145L0.538086 4.57324Z" fill="#EB460C"/>
                    </svg>
                    <span className={classList([
                        "num",
                        firstNumber < lastNumber && "won",
                        firstNumber > lastNumber && "lost"])}>{lastNumber}</span>
                </div>)}
        </div>
    );

export default DetailScores;