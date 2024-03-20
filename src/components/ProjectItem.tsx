import { GitHub } from "@mui/icons-material";
import { Box, Card, Container, IconButton, Tooltip, Typography } from "@mui/material";

export type ProjectItemProps = {
    title: string;
    description: string;
    wip?: boolean;
    links: {
        githubLink?: string;
    }
}

export function ProjectItem(
    props: ProjectItemProps
) {
    const { title, description, wip = false, links: { githubLink } } = props;

    return <Card
        variant="outlined"
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "400px",
        }}
    >
        <div
            style={{
                display: "flex",
                justifyContent: wip ? "space-between" : "center",
                width: "100%",
                height: "50px",
                overflow: "hidden"
            }}
        >
            <div/>
            <Typography
                variant="h6"
                sx={{
                    paddingTop: "5px",
                    paddingBottom: "5px"
                }}
            >
                {title}
            </Typography>
            {
                wip ? (
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center"
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                background: "#aa0000",
                                borderTop: "#770000 solid 3px",
                                borderBottom: "#770000 solid 3px",
                                width: "120px",
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transform: "translate(35px, -2.5px) rotate(45deg)"
                            }}
                        >
                            <Typography
                                style={{
                                    color: "white",
                                    fontWeight: 700
                                }}
                            >wip</Typography>
                        </div>
                    </div>
                ) : null
            }
        </div>
        <Container
            color="white"
            sx={{
                flex: 1,
                border: "none",
                padding: "10px"
            }}
        >
            <Typography>{description}</Typography>
        </Container>
        <Box
            sx={{
                width: "100%",
                padding: "5px",
                display: "flex",
                alignItems: "center"
            }}
        >
            {
                <Tooltip
                    title={`${githubLink ? "Go To Project Repo" : "Private Repo"}`}
                >
                    <div>
                        <IconButton
                            {
                                ...githubLink ? {
                                    target:"_blank",
                                    rel:"noreferrer",
                                    href: githubLink,
                                    sx: {
                                        "&:hover": {
                                            filter: `brightness(0.9)`
                                        }
                                    }
                                } : {
                                    disabled: true
                                }
                            }
                        >
                            <GitHub
                                style={{
                                    fill: githubLink ? "white" : "#777777"
                                }}
                            />
                        </IconButton>
                    </div>
                </Tooltip>
            }            
        </Box>
    </Card>
}
