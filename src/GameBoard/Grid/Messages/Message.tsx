import React from 'react';
interface MessageProps {
    message: string;
}

const Message = ({message}: MessageProps) => <h1 className="message">{message}</h1>

export default React.memo(Message);