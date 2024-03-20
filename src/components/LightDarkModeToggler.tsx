import { Box, Tooltip, darken, lighten, useTheme } from "@mui/material";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createCirclePath } from "../utils/svgs/SVGHelpers";
import { ColorModeContext } from "../contexts/color-mode-context";

type ModeDependentData = {
    rayRotation: number;
    holeScale: number;
    holeRotation: number;
    centerShift: number;
}

const DELAY = 500;

export default function LightDarkModeToggler() {
    const rayCount = 12;
    const radius = 200;
    const innerRadius = useMemo(() => (radius * 0.95), [radius]);
    const sunRadius = useMemo(() => (radius * 0.7), [radius])
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const colors: ModeDependentData = useMemo(() => {
        return {
            isLight: theme.palette.mode === "light",
            ...theme.palette.mode === "light" ? {
                rayRotation: 0,
                holeScale: 0,
                holeRotation: -30,
                centerShift: 1
            } : {
                rayRotation: 180,
                holeScale: 1,
                holeRotation: 30,
                centerShift: 0
            }
        }
    }, [theme]);

    const [holeScaleTransition, setHoleScaleTransition] = useState(colors.holeScale);
    const [centerShiftTransition, setShiftCenterTransition] = useState(colors.centerShift);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    const togglerBodyPath = useMemo(() => {
        return [
            createCirclePath({
                r: sunRadius,
                cx: radius,
                cy: radius,
            }),
            createCirclePath({
                r: holeScaleTransition * (4 * sunRadius / 3),
                clockwise: true,
                cx: radius - (sunRadius / 3),
                cy: radius
            })
        ].join(" ");
    }, [
        holeScaleTransition,
        sunRadius,
        radius
    ]);

    useEffect(() => {
        if (!isTransitioning && holeScaleTransition !== colors.holeScale && centerShiftTransition !== colors.centerShift) {
            // animate the sun/moon transition
            setIsTransitioning(true);
            let start: number, previousTimeStamp: number;
            let done = false;
            const decreasingHole = Math.sign(holeScaleTransition - colors.holeScale) === 1;
            const decreasingCenter = Math.sign(centerShiftTransition - colors.centerShift) === 1;
            const step = (timeStamp: number) => {
                if (start === undefined) {
                    start = timeStamp
                }
                const elapsed = timeStamp - start;

                if (previousTimeStamp !== timeStamp) {
                    const newHoleScale = decreasingHole ? Math.max(1 - elapsed / DELAY, 0) : Math.min(elapsed / DELAY, 1);
                    const newCenterShift = decreasingCenter ? 1 - (elapsed / DELAY) : (elapsed / DELAY)
                    setHoleScaleTransition(newHoleScale);
                    setShiftCenterTransition(newCenterShift)
                    if ((decreasingHole && newHoleScale === 0) || (!decreasingHole && newHoleScale === 1)) done = true
                }

                // stop after 2 seconds
                if (elapsed < DELAY) {
                    previousTimeStamp = timeStamp;
                    if (!done) {
                        requestAnimationFrame(step);
                    } else {
                        setIsTransitioning(false);
                    }
                } else {
                    setIsTransitioning(false);
                }
            }

            requestAnimationFrame(step);
        }
    },[holeScaleTransition, centerShiftTransition, colors, isTransitioning]);

    const throttledToggleColorMode = useCallback(() => {
        if (!isTransitioning) colorMode.toggleColorMode()
    }, [isTransitioning, colorMode]);

    return (
        <Tooltip
            title={`Toggle to ${colorMode.colorMode === "light" ? "Dark" : "Light"} Mode`}
        >
            <Box
                onClick={throttledToggleColorMode}
                sx={{
                    height: "50px",
                    display: "flex",
                    width: "50px",
                    margin: "unset",
                    // marginLeft: "5px",
                    "&:hover": {
                        "& svg": {
                            margin: "0px",
                            "&.light": {
                                filter: "brightness(115%)"
                            },
                            "&.dark": {
                                filter: "brightness(85%)"
                            }
                        }
                    },
                    "& svg": {
                        margin: "2px",
                        transition: "filter .5s, font-size .5s, height .5s, margin .5s"
                    }
                }}
            >
                <svg
                    className={`color-toggle ${colorMode.colorMode}`}
                    viewBox={`${-60+centerShiftTransition*60} 0 ${2*radius+40} ${2*radius}`}
                    version="1.1"
                    id="svg5"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g>
                        {
                            Array.from(Array(rayCount).keys()).map(index => (
                                <g
                                    key={index}
                                    style={{
                                        transformOrigin: `${radius}px ${radius}px`,
                                        transform: `rotate(${(360 / rayCount) * index}deg)`
                                    }}
                                >
                                    <g
                                        style={{
                                            transformOrigin: `${radius}px ${radius + innerRadius - 60}px`,
                                            transform: `rotate(${colors.rayRotation}deg)`,
                                            fillOpacity: theme.palette.mode === "light" ? 1 : 0,
                                            strokeOpacity: theme.palette.mode === "light" ? 1 : 0,
                                            transition: "transform 1s, fill-opacity 0.75s ease 0.05s, stroke-opacity 0.75s ease 0.05s"
                                        }}
                                    >
                                        <path
                                            style={{
                                                fill: theme.palette.secondary.main,
                                                fillOpacity: "inherit",
                                                strokeOpacity: "inherit",
                                                fillRule: "nonzero"
                                            }}
                                            stroke={theme.palette.mode === "light" ? darken(theme.palette.secondary.dark, 0.2) : lighten(theme.palette.secondary.light, 0.2)}
                                            strokeWidth="5px"
                                            id={`ray-path-${index}`}
                                            d="M 0.0,0.0 40,0 20,40 Z"
                                            transform={`translate(${radius - 20},${radius + innerRadius - 40})`}
                                        />
                                    </g>
                                </g>
                            ))
                        }
                    </g>
                    <path
                        d={togglerBodyPath}
                        fill={theme.palette.mode === "light" ? theme.palette.secondary.main : theme.palette.secondary.light }
                        stroke={theme.palette.mode === "light" ? darken(theme.palette.secondary.dark, 0.2) : lighten(theme.palette.secondary.light, 0.2)}
                        strokeWidth="5px"
                        fillRule="evenodd"
                    />
                </svg>
            </Box>
        </Tooltip>
    )
}
