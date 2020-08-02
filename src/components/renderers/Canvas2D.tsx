import React, { useRef, useEffect } from "react";
import type { ReactNode } from "react";
import type { CSSProperties } from "linaria/react";

import { useAnimationFrame } from "Utils/useAnimationFrame";
import type { Vector } from "Utils/math";

/**
 * A wrapper component for running vanilla 2d canvas sketches. Handles rendering and cleanup.
 */
export const Canvas2DRenderer = ({
    sketch: setupSketch,
    settings = {},
    className,
    style,
    children
}: Canvas2DRendererProps) => {
    const canvas = useRef<HTMLCanvasElement>(null);
    const drawProps = useRef<Canvas2DDrawProps>({});
    const drawFunction = useRef<Canvas2DDrawFn>();

    const {
        dimensions = [window.innerWidth, window.innerHeight],
        isAnimated = true,
        animationSettings = {}
    } = settings;

    const [width, height] = dimensions;

    const { fps: throttledFps, delay, endAfter } = animationSettings;
    const {
        frameCount,
        elapsedTime,
        fps,
        startAnimation,
        stopAnimation,
        isPlaying,
        mouseHasEntered,
        mousePosition
    } = useAnimationFrame({
        willPlay: isAnimated ?? false,
        onFrame: () =>
            drawFunction.current?.({
                ...drawProps.current,
                frame: frameCount.current,
                time: elapsedTime.current,
                fps: fps.current,
                startAnimation,
                stopAnimation,
                isPlaying: isPlaying.current,
                mouseHasEntered: mouseHasEntered.current,
                mousePosition: mousePosition.current
                // onMouseMove, // TODO event callback props
                // onClick
            }),
        fps: throttledFps,
        delay,
        endAfter,
        domElementRef: canvas
    });

    useEffect(() => {
        const canvasEl = canvas.current;
        const ctx = canvasEl.getContext("2d");

        // <- Start fix - DPR for retina displays ->
        const dpr = window?.devicePixelRatio ?? 1;
        const rect = canvasEl.getBoundingClientRect();
        canvasEl.width = rect.width * dpr;
        canvasEl.height = rect.height * dpr;
        canvasEl.style.width = `${rect.width}px`;
        canvasEl.style.height = `${rect.height}px`;
        ctx.scale(2, 2);
        // <- End fix ->

        const initialSketchProps = {
            ctx,
            canvas: canvasEl,
            width,
            height,
            mouseHasEntered: false,
            mousePosition: [0, 0] as Vector<2>
        };

        const drawSketch = setupSketch(initialSketchProps);

        drawProps.current = initialSketchProps;
        drawFunction.current = drawSketch;

        drawSketch(initialSketchProps);

        return () => ctx.clearRect(0, 0, width, height);
    }, [setupSketch, settings]);

    return (
        <>
            <canvas
                ref={canvas}
                width={width}
                height={height}
                className={className}
                style={style}
            />
            {children}
        </>
    );
};

/**
 * React props for the CanvasWrapper2D component
 */
export interface Canvas2DRendererProps {
    /** The sketch function to be run */
    sketch: Canvas2DSetupFn;
    /** The setting for the sketch function */
    settings?: Canvas2DRendererSettings;

    className?: string;
    style?: CSSProperties;
    children?: ReactNode | HTMLElement;
}

/**
 * Settings for the 2d sketch
 */
export interface Canvas2DRendererSettings {
    /** The dimensions for the sketch, in pixels. Defaults to [windowWidth, windowHeight] */
    dimensions?: [number, number];

    /** Used to set if the sketch will be animated, defaults to true */
    isAnimated?: boolean;
    /** Animation setting for the sketch */
    animationSettings?: {
        /** The desired fps to throttle the sketch to - defaults to 60 */
        fps?: number;
        /** A delay (in ms) after which the animation will start */
        delay?: number;
        /** A time (in ms) after which the animation will be stopped */
        endAfter?: number;
    };
}

/**
 * Props to be recieved by the sketch.
 */
export interface Canvas2DDrawProps {
    /** the rendering context to call canvas methods on - in this case 2d */
    ctx?: CanvasRenderingContext2D;
    /** The DOM canvas element that is rendering the sketch */
    canvas?: HTMLCanvasElement;

    /** The width of the sketch - maps to dimensions[0] from the sketch settings */
    width?: number;
    /** The width of the sketch - maps to dimensions[1] from the sketch settings */
    height?: number;

    /** The current frames of the animation */
    frame?: number;
    /** The current elapsed time of the animation in ms */
    time?: number;
    /** The current fps of the animation (averaged over the last 10 frames) */
    fps?: number;
    /** A function that will stop the animation when called */
    stopAnimation?: () => void;
    /** A function that will restart the animation when called */
    startAnimation?: () => void;
    /** True if the animation is currenty running, otherwise false */
    isPlaying?: boolean;

    /** A boolean that is true if the mouse has interacted with the animation */
    mouseHasEntered?: boolean;
    /** A vector of current position of the mouse over the canvas - [mouseX, mouseY] */
    mousePosition?: Vector<2>;

    /** A callback that will be run every time the mouse moves across the canvas */
    onMouseMove?: () => void;
    /** A callback that will be run every time the user clicks on the canvas */
    onClick?: () => void;
}

/**
 * The setup function to be passed into the React component, with access to `Canvas2DSketchProps`.
 *
 * Use the contents of this function should contain all sketch state, with the drawing happening
 * inside it's return function.
 */
export type Canvas2DSetupFn = (props?: Canvas2DDrawProps) => Canvas2DDrawFn;

/**
 * The draw function returned by `Canvas2DSetupFn`, with access to `Canvas2DSketchProps`.
 *
 * If the sketch is animated, this function will be called every frame.
 */
export type Canvas2DDrawFn = (props?: Canvas2DDrawProps) => void;
