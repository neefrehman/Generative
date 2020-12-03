import React from "react";
import { css, Global, useTheme } from "@emotion/react";

/**
 * To be placed in Head of _document.tsx - as a workaround for layout shift with critical CSS
 * @link https://github.com/emotion-js/emotion/issues/2154#issuecomment-737482603
 */
export const FontFaceWorkaround = () => (
    <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
            __html: `@font-face{font-family:"Fleuron";font-weight:normal;font-display:block;src:url("/static/fonts/fleuronregular.woff2");}`,
        }}
    />
);

export const GlobalStyles = () => {
    const { colors } = useTheme();

    const globalStyles = css`
        /* @font-face {
            font-family: "Fleuron";
            font-weight: normal;
            font-display: block;
            src: url("/static/fonts/fleuronregular.woff2");
        } */

        * {
            margin: 0;
        }

        html {
            height: -webkit-fill-available;
        }

        body {
            font-family: "Fleuron", helvetica, arial, sans-serif;
            line-height: 1.2;
            color: ${colors.white};
            background-color: ${colors.offBlack};
            text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            max-width: max-content;
            margin: 0;
            padding: 0;
            height: 100vh;
            height: -webkit-fill-available;
            overflow-y: hidden;
            --edgeButtonMargin: clamp(28px, 3vw, 40px);
        }

        h1 {
            font-size: clamp(3rem, 4vw, 3.4rem);
            font-weight: 400;

            a {
                font-family: inherit;
                text-decoration: underline;
                background-color: initial;

                :hover {
                    background-color: ${colors.offWhite};
                }
            }
        }

        a,
        a:visited,
        button {
            font-family: helvetica neue, helvetica, arial, sans-serif;
            font-size: inherit;
            text-decoration: none;
            display: inline-block;
            color: ${colors.white};
            background-color: ${colors.grey};
            border: none;
            padding: 0 0.1em;
            cursor: pointer;
            line-height: normal;

            :hover {
                color: #212121;
                background-color: ${colors.offWhite};
            }
        }
    `;

    return <Global styles={globalStyles} />;
};