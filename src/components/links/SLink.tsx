import { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material"

const CustomLink = forwardRef<
    HTMLAnchorElement,
    Omit<LinkProps, 'to'> & {
        href: LinkProps['to'];
    }
>((props, ref) => {
    const { href, ...other } = props;
    return <Link ref={ref} to={href} {...other} />;
});

const SLink = (props: Omit<LinkProps, "to"> & {
    href: LinkProps['to'];
} & MuiLinkProps) => <MuiLink component={CustomLink} {...props} />;

export default SLink;
