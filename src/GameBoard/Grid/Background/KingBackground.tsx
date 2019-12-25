import React from 'react';
import CrownImg from '../../../Assets/crown.png';
interface BackgroundProps {
    children: JSX.Element;
}
function KingBackground (props: BackgroundProps) {
    return (<>
                <img className="img-1" alt="" src={CrownImg} />
                <img className="img-2" alt="" src={CrownImg} />
                <img className="img-3" alt="" src={CrownImg} />
                <img className="img-4" alt="" src={CrownImg} />
                {props.children}
            </>)
}

export default KingBackground;
