import React from 'react';
import CrownImg from '../../../Assets/crown.png';

function KingBackground () {
    return (<>
                <img className="img-1" alt="" src={CrownImg} />
                <img className="img-2" alt="" src={CrownImg} />
            </>)
}

export default React.memo(KingBackground);
