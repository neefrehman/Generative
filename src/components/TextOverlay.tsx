import React, { useState, useEffect } from "react";
import { styled } from "linaria/react";

const StyledText = styled.p`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%) scale(1.05, 1);
    transform-origin: center;
    margin-block-start: 0;

    font-size: 6em;
    font-weight: bold;
    letter-spacing: -1px;
    color: #616161;
    opacity: 0.75;
    text-transform: uppercase;
    text-align: center;

    @media (max-width: 769px) {
        font-size: 4em;
    }
`;

interface TextOverlayProps {
    text: string;
    timeout?: number | boolean;
}

const TextOverlay = ({ text, timeout }: TextOverlayProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const timeoutMs = typeof timeout === "number" ? timeout : 500;

    useEffect(() => {
        let visibilityTimeout: NodeJS.Timeout;
        if (timeout) {
            visibilityTimeout = setTimeout(
                () => setIsVisible(false),
                timeoutMs
            );
        }

        return () => clearTimeout(visibilityTimeout);
    }, []);

    return <>{isVisible && <StyledText>{text}</StyledText>}</>;
};

export default TextOverlay;