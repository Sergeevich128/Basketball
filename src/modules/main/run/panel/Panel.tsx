import React, {FC, ReactNode} from 'react';
import "./panel.css"

interface Props {
    children: ReactNode;
}

const Panel: FC<Props> = ({children}) => {
    return (
        <div className="panel">
            {children}
        </div>
    );
};

export default Panel;