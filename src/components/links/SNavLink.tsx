import { styled, LinkProps as MuiLinkProps, Link as MuiLink, lighten, darken } from "@mui/material";
import { forwardRef } from "react";
import { NavLinkProps, NavLink } from "react-router-dom";

type SNavLinkProps = Omit<NavLinkProps, 'to'> & { href: NavLinkProps['to'] } & MuiLinkProps;

const CustomNavLink = forwardRef<
    HTMLAnchorElement,
    SNavLinkProps
>((props, ref) => {
    const { href, ...other } = props;
    // Map href (Material UI) -> to (react-router)
    return <NavLink ref={ref} to={href} {...other} />;
});

const StyledNavLink = styled(CustomNavLink)(({ theme }) => ({ 
    "&.active, &.active:hover": {
        cursor: "auto",
        color: theme.palette.mode === "light" ? lighten(theme.palette.text.primary, 0.1) : darken(theme.palette.text.primary, 0.1),
        backgroundColor: theme.palette.mode === "light" ? darken(theme.palette.primary.main, 0.15) : lighten(theme.palette.primary.main, 0.15)
    }
}));

const SNavLink = (props: SNavLinkProps) => <MuiLink component={StyledNavLink} {...props}/>;

export default SNavLink;
