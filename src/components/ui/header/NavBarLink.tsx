import { Typography, MenuItem } from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router-dom";

interface NavBarLinkProps {
    label: string;
    link: string;
    icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {title?: string; titleId?: string;} & React.RefAttributes<SVGSVGElement>>;
}

export default function NavBarLink({label, link, icon} : NavBarLinkProps) {
    return(
        <NavLink key={label} to={link}>
            <Typography
              variant="small"
              color="white"
              className="font-semibold"
            >
              <MenuItem className="flex items-center gap-2 lg:rounded-lg">
                {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                <span > {label}</span>
              </MenuItem>
            </Typography>
        </NavLink>
    )
}