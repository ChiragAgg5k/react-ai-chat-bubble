import React from 'react';
import PropTypes from 'prop-types';

interface ChatBubbleProps {
    children?: React.ReactNode;
    className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
};

ChatBubble.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

ChatBubble.defaultProps = {
    children: null,
    className: '',
};

export default ChatBubble;