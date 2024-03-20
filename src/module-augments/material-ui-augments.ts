import { PaletteColor, PaletteColorOptions } from "@mui/material";


declare module "@mui/material" {
    

    interface Palette {
        tertiary: PaletteColor;
    }

    interface PalleteOptions {
        tertiary?: PaletteColorOptions;
    }
}