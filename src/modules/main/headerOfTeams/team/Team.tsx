import React, {FC, useEffect, useState} from 'react';
import './team.css';
import {ITeam} from "../teamsInfo";

interface Props {
    team: ITeam;
    sideOfShadow?: string;
    winner?: boolean;
}

const Team: FC<Props> = ({team, sideOfShadow, winner}) => {
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
            {sideOfShadow && <div style={{background: team?.bgColor}}
                                  className={sideOfShadow === "right" ? "bgRectangleRight" : "bgRectangleLeft"}/>}
            <span>{team?.name}</span>
            {img && <img src={img} alt=""/>}
            {winner && <svg className="winner" width="113" height="34" viewBox="0 0 113 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M81.9001 24.9092H101.917L112.016 5.33389H91.8178L81.9001 24.9092Z" fill="#D32803"/>
                <path d="M0.587891 5.33398H20.6046L30.7037 24.9093H10.5055L0.587891 5.33398Z" fill="#D32803"/>
                <path d="M12.6338 0.817383H99.9697L89.721 20.3927H22.8824L12.6338 0.817383Z" fill="#EB460C"/>
                <path
                    d="M28.3719 16.3223C28.0808 16.3223 27.9001 16.1717 27.8298 15.8705L26.053 6.21841L26.0379 6.09794C26.0379 6.0076 26.068 5.93231 26.1283 5.87208C26.1885 5.81184 26.2638 5.78173 26.3541 5.78173H27.7093C27.8398 5.78173 27.9352 5.80682 27.9954 5.85702C28.0557 5.89717 28.0958 5.97246 28.1159 6.08289L29.3657 12.8589L30.7059 8.49215C30.8063 8.24119 30.9719 8.1157 31.2028 8.1157H32.031C32.1615 8.1157 32.2669 8.15586 32.3472 8.23617C32.4275 8.30644 32.4827 8.39177 32.5128 8.49215L33.868 12.8589L35.1028 6.08289C35.1329 5.88211 35.2734 5.78173 35.5244 5.78173H36.8796C36.9599 5.78173 37.0302 5.81184 37.0904 5.87208C37.1507 5.93231 37.1808 6.0076 37.1808 6.09794C37.1808 6.14814 37.1757 6.18829 37.1657 6.21841L35.3889 15.8705C35.3688 16.0111 35.3086 16.1215 35.2082 16.2018C35.1178 16.2821 34.9974 16.3223 34.8468 16.3223H33.8229C33.6823 16.3223 33.5669 16.2871 33.4765 16.2169C33.3862 16.1366 33.3259 16.0462 33.2958 15.9458L31.6093 10.9466L29.9229 15.9458C29.8425 16.1968 29.6669 16.3223 29.3958 16.3223H28.3719ZM39.295 16.3223C39.1946 16.3223 39.1093 16.2871 39.039 16.2169C38.9687 16.1466 38.9336 16.0613 38.9336 15.9609V6.14312C38.9336 6.03269 38.9687 5.94736 39.039 5.88713C39.1093 5.81686 39.1946 5.78173 39.295 5.78173H40.7406C40.851 5.78173 40.9363 5.81686 40.9965 5.88713C41.0668 5.94736 41.1019 6.03269 41.1019 6.14312V15.9609C41.1019 16.0613 41.0668 16.1466 40.9965 16.2169C40.9363 16.2871 40.851 16.3223 40.7406 16.3223H39.295ZM43.8094 16.3223C43.709 16.3223 43.6237 16.2871 43.5534 16.2169C43.4832 16.1466 43.448 16.0613 43.448 15.9609V6.15818C43.448 6.04775 43.4782 5.9574 43.5384 5.88713C43.6087 5.81686 43.699 5.78173 43.8094 5.78173H44.9839C45.1747 5.78173 45.3202 5.86706 45.4206 6.03771L49.7272 12.7234V6.15818C49.7272 6.04775 49.7573 5.9574 49.8175 5.88713C49.8878 5.81686 49.9781 5.78173 50.0886 5.78173H51.3836C51.494 5.78173 51.5843 5.81686 51.6546 5.88713C51.7249 5.9574 51.76 6.04775 51.76 6.15818V15.9458C51.76 16.0562 51.7249 16.1466 51.6546 16.2169C51.5843 16.2871 51.499 16.3223 51.3986 16.3223H50.209C50.0083 16.3223 49.8577 16.2369 49.7573 16.0663L45.4658 9.53115V15.9609C45.4658 16.0613 45.4307 16.1466 45.3604 16.2169C45.3002 16.2871 45.2148 16.3223 45.1044 16.3223H43.8094ZM54.4558 16.3223C54.3555 16.3223 54.2701 16.2871 54.1999 16.2169C54.1296 16.1466 54.0944 16.0613 54.0944 15.9609V6.15818C54.0944 6.04775 54.1246 5.9574 54.1848 5.88713C54.2551 5.81686 54.3454 5.78173 54.4558 5.78173H55.6304C55.8211 5.78173 55.9666 5.86706 56.067 6.03771L60.3736 12.7234V6.15818C60.3736 6.04775 60.4037 5.9574 60.4639 5.88713C60.5342 5.81686 60.6246 5.78173 60.735 5.78173H62.03C62.1404 5.78173 62.2307 5.81686 62.301 5.88713C62.3713 5.9574 62.4064 6.04775 62.4064 6.15818V15.9458C62.4064 16.0562 62.3713 16.1466 62.301 16.2169C62.2307 16.2871 62.1454 16.3223 62.045 16.3223H60.8554C60.6547 16.3223 60.5041 16.2369 60.4037 16.0663L56.1122 9.53115V15.9609C56.1122 16.0613 56.0771 16.1466 56.0068 16.2169C55.9466 16.2871 55.8612 16.3223 55.7508 16.3223H54.4558ZM65.1023 16.3223C65.0019 16.3223 64.9165 16.2871 64.8463 16.2169C64.776 16.1466 64.7409 16.0613 64.7409 15.9609V6.15818C64.7409 6.04775 64.771 5.9574 64.8312 5.88713C64.9015 5.81686 64.9918 5.78173 65.1023 5.78173H71.7428C71.8532 5.78173 71.9436 5.81686 72.0138 5.88713C72.0841 5.9574 72.1192 6.04775 72.1192 6.15818V7.16706C72.1192 7.27748 72.0841 7.36783 72.0138 7.4381C71.9436 7.49833 71.8532 7.52844 71.7428 7.52844H66.8038V10.1636H71.4115C71.5219 10.1636 71.6123 10.1987 71.6826 10.269C71.7528 10.3393 71.788 10.4296 71.788 10.54V11.4887C71.788 11.5991 71.7528 11.6894 71.6826 11.7597C71.6123 11.82 71.5219 11.8501 71.4115 11.8501H66.8038V14.5755H71.8633C71.9737 14.5755 72.064 14.6107 72.1343 14.681C72.2046 14.7412 72.2397 14.8265 72.2397 14.9369V15.9609C72.2397 16.0713 72.2046 16.1616 72.1343 16.2319C72.064 16.2921 71.9737 16.3223 71.8633 16.3223H65.1023ZM74.484 16.3223C74.3837 16.3223 74.2983 16.2871 74.2281 16.2169C74.1578 16.1466 74.1227 16.0613 74.1227 15.9609V6.15818C74.1227 6.04775 74.1528 5.9574 74.213 5.88713C74.2833 5.81686 74.3736 5.78173 74.484 5.78173H78.384C79.6188 5.78173 80.5825 6.06783 81.2752 6.64003C81.9779 7.21223 82.3292 8.02536 82.3292 9.07941C82.3292 9.81223 82.1535 10.4296 81.8022 10.9315C81.4508 11.4234 80.9589 11.7798 80.3265 12.0006L82.5099 15.8404C82.54 15.9006 82.5551 15.9559 82.5551 16.006C82.5551 16.0964 82.5199 16.1717 82.4497 16.2319C82.3894 16.2921 82.3192 16.3223 82.2389 16.3223H80.8535C80.6929 16.3223 80.5674 16.2871 80.4771 16.2169C80.3867 16.1366 80.3064 16.0362 80.2362 15.9157L78.3088 12.347H76.2458V15.9609C76.2458 16.0613 76.2107 16.1466 76.1404 16.2169C76.0701 16.2871 75.9798 16.3223 75.8694 16.3223H74.484ZM78.3389 10.6304C78.9412 10.6304 79.3929 10.4999 79.6941 10.2389C79.9952 9.96783 80.1458 9.57632 80.1458 9.06435C80.1458 8.55238 79.9952 8.16088 79.6941 7.88984C79.3929 7.60875 78.9412 7.46821 78.3389 7.46821H76.2458V10.6304H78.3389ZM84.495 13.386C84.3946 13.386 84.3092 13.3508 84.239 13.2806C84.1687 13.2103 84.1336 13.125 84.1336 13.0246V6.14312C84.1336 6.03269 84.1687 5.94736 84.239 5.88713C84.3092 5.81686 84.3946 5.78173 84.495 5.78173H85.7448C85.8452 5.78173 85.9305 5.81686 86.0008 5.88713C86.071 5.9574 86.1062 6.04273 86.1062 6.14312V13.0246C86.1062 13.125 86.071 13.2103 86.0008 13.2806C85.9305 13.3508 85.8452 13.386 85.7448 13.386H84.495ZM84.4046 16.3223C84.3042 16.3223 84.2189 16.2871 84.1486 16.2169C84.0784 16.1466 84.0432 16.0613 84.0432 15.9609V14.5304C84.0432 14.4199 84.0784 14.3346 84.1486 14.2744C84.2189 14.2041 84.3042 14.169 84.4046 14.169H85.8201C85.9305 14.169 86.0208 14.2041 86.0911 14.2744C86.1614 14.3447 86.1965 14.43 86.1965 14.5304V15.9609C86.1965 16.0613 86.1614 16.1466 86.0911 16.2169C86.0208 16.2871 85.9305 16.3223 85.8201 16.3223H84.4046Z"
                    fill="white"/>
            </svg>
            }
        </div>
    );
};

export default Team;