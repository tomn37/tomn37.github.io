import React, { useState } from 'react'
interface FadedMessageProps {
    message: string
}
function FadedMessage(props: FadedMessageProps) {
    const [shouldRender, setShouldRender] = useState(true)
    if (shouldRender && props.message) {
        setShouldRender(false);
        return <h1 className="faded-message">{props.message}</h1>;
    }

    return null;
}

export default FadedMessage;