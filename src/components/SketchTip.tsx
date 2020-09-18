import React, { useState, useLayoutEffect, ReactElement } from "react";
import { styled } from "linaria/react";

const StyledTipContainer = styled.div<{ isVisible: boolean }>`
    --edgeMargin: 40px;
    position: fixed;
    top: var(--edgeMargin);
    right: var(--edgeMargin);
    text-align: right;
    overflow-x: hidden;

    div {
        border: none;
        font-family: helvetica neue, helvetica, arial, sans-serif;
        font-size: 0.95em;
        padding: 0.05em 0.5em;
        background-color: rgb(85, 85, 85, 0.7);

        transform: translateX(
            ${props => (props.isVisible ? 0 : "calc(100% - 1.5em)")}
        );
        transition: transform 500ms;

        ::before {
            content: "i";
            font-size: 0.9em;
            font-family: monaco, monospace;
            padding: 0 0.5em 0 0;
        }

        :hover,
        :focus,
        :focus-within {
            transform: translateX(0);
            background-color: #eee;
            color: #212121;
        }

        /* :focus {outline: none;} */
        /* :focus-visible {outline: initial;} */

        a {
            text-decoration: underline;
            color: inherit;
            background-color: inherit;

            :hover {
                text-decoration: none;
            }
        }
    }

    @media (max-width: 769px) {
        --edgeMargin: 33px;
    }
`;

interface SketchTipProps {
    tip: string | ReactElement;
    timeout?: number;
}

export const SketchTip = ({ tip, timeout = 2500 }: SketchTipProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useLayoutEffect(() => {
        setIsVisible(true);
        const shrinkTimeout = setTimeout(() => setIsVisible(false), timeout);
        return () => clearTimeout(shrinkTimeout);
    }, [timeout]);

    const handleTouch = () => {
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), timeout);
    };

    return (
        <StyledTipContainer isVisible={isVisible}>
            <div
                role="button"
                aria-label="info"
                aria-expanded={isVisible}
                tabIndex={0}
                onTouchStart={handleTouch}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onFocus={() => setIsVisible(true)}
                onBlur={() => setIsVisible(false)}
            >
                <span role="tooltip">{tip}</span>
            </div>
        </StyledTipContainer>
    );
};
