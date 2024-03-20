import { PaletteMode } from "@mui/material";
import { PropsWithChildren, createContext, useMemo, useState } from "react";

export type ColorModeEngine = {
    colorMode: PaletteMode;
    toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeEngine>({
    colorMode: 'dark',
    toggleColorMode: () => {}
});

export default function ColorModeProvider(props: PropsWithChildren<{}>): JSX.Element {
    const { children } = props;
    const [colorMode, setColorMode] = useState<PaletteMode>(matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const colorModeEngine = useMemo<ColorModeEngine>(() => {
        return {
            toggleColorMode: () => setColorMode((prevMode: PaletteMode) =>
                prevMode === 'light' ? 'dark' : 'light',
            ),
            colorMode
        }
    }, [
        colorMode
    ])

    return <ColorModeContext.Provider value={colorModeEngine} >
        {children}
    </ColorModeContext.Provider>
}
