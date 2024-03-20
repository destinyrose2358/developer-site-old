import { AppBar, Box, IconButton, Toolbar, Tooltip, useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
// import SaveIcon from "@mui/icons-material/Save";
import LightDarkModeToggler from "./LightDarkModeToggler";
import SNavLink from "./links/SNavLink";

export default function NavBar() {
    const theme = useTheme();

    return (
        <Box>
            <AppBar position="relative">
                <Toolbar sx={{ display: "flex", justifyContent: "start" }}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "5px"
                        }}
                    >
                        <Tooltip title="Home">
                            <div>
                                <IconButton
                                    href="/"
                                    LinkComponent={SNavLink}
                                >
                                    <HomeIcon />
                                </IconButton>
                            </div>
                        </Tooltip>
                        {/* <Tooltip title="Projects">
                            <div>
                                <IconButton
                                    href="projects"
                                    LinkComponent={SNavLink}
                                >
                                    <SaveIcon />
                                </IconButton>
                            </div>
                        </Tooltip> */}
                    </Box>
                    <Box
                        style={{
                            height: "50px",
                            borderRadius: "5px",
                            marginLeft: "5px",
                            border: `rgba(${theme.palette.mode === "dark" ? "255,255,255,0.05" : "0,0,0,0.1"}) solid 5px`
                        }}
                    />
                    <LightDarkModeToggler/>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
