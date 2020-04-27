import React from "react";
import { css } from "linaria";

// eslint-disable-next-line react/jsx-props-no-spreading
const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;

export const globalStyles = css`
    :global() {
        @font-face {
            font-family: "Untitled Sans";
            font-weight: normal;
            font-display: block;
            src: url("/static/fonts/UntitledSansWeb-Regular.woff2");
        }

        @font-face {
            font-family: "Untitled Sans";
            font-weight: bold;
            font-display: block;
            src: url("/static/fonts/UntitledSansWeb-Medium.woff2");
        }

        body {
            font-family: "Untitled Sans", helvetica neue, helvetica, arial,
                sans-serif;
            font-size: 16px;
            line-height: 1.2;
            color: #ffffff;
            background-color: #212121;
            text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            max-width: max-content;
            margin: 0;
            padding: 0;
            overflow-y: hidden;
        }

        a,
        a:visited {
            text-decoration: none;
            display: inline-block;
            color: #fff;
            background-color: #4a4a4a;
            padding: 0 0.1em;
            line-height: normal;
        }

        a:hover {
            color: #212121;
            background-color: #eee;
        }

        header {
            margin-bottom: 35px;
            width: max-content;
            transform: scale(1.02, 1);
            transform-origin: left;

            h1 {
                margin-block-end: 0.5em;
                white-space: nowrap;
                font-size: 3em;
                font-weight: bold;
                margin-right: 1em;

                a {
                    text-decoration: underline;
                    background-color: initial;

                    :hover {
                        background-color: #eee;
                    }
                }
            }
        }
    }

    @media (max-width: 769px) {
        body {
            font-size: 15px;
        }

        header {
            margin-bottom: 30px;

            h1 {
                font-size: 2.36em;
            }
        }
    }
`;
