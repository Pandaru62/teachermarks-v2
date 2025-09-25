import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  AcademicCapIcon,
  DocumentDuplicateIcon,
  SquaresPlusIcon,
  DocumentPlusIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { logOutClearCookies } from "../../../pages/auth/service/auth.service";
import { AxiosError } from "axios";
import NavBarLink from "./NavBarLink";

// profile menu component
const profileMenuItems = [
  {
    label: "Mon profil",
    icon: UserCircleIcon,
    link: "/profile"
  },
  {
    label: "Mes compétences",
    icon: SquaresPlusIcon,
    link: "/skills"
  },
  // {
  //   label: "Paramètres",
  //   icon: Cog6ToothIcon,
  //   path: "/settings"
  // },
  // {
  //   label: "Aide",
  //   icon: LifebuoyIcon,
  //   path: "/help"
  // }
];

export function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const mutation = useMutation({
    mutationFn: async () => {
      await logOutClearCookies();
    },
    onSuccess: () => {
      logout();
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      throw new Error(error.message);
    },
  });

  return {
    logout: () => mutation.mutate(),
  };
}

function ProfileMenu() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { logout } = useLogout();
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 48 48"><g fill="white"><path d="M32 20a8 8 0 1 1-16 0a8 8 0 0 1 16 0"></path><path fillRule="evenodd" d="M23.184 43.984C12.517 43.556 4 34.772 4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20h-.274q-.272 0-.542-.016M11.166 36.62a3.028 3.028 0 0 1 2.523-4.005c7.796-.863 12.874-.785 20.632.018a2.99 2.99 0 0 1 2.498 4.002A17.94 17.94 0 0 0 42 24c0-9.941-8.059-18-18-18S6 14.059 6 24c0 4.916 1.971 9.373 5.166 12.621" clipRule="evenodd"></path></g></svg>
          <ChevronDownIcon
            strokeWidth={2.5}
            color="white"
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      {useStore(useAuthStore).isAuthenticated && (
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, link }) => {
          return (
            <MenuItem
              key={label}
              className={`flex items-center gap-2 rounded`}
            >
              <Link to={link} className="flex size-full items-center gap-2" onClick={closeMenu}>
                {React.createElement(icon, {
                  className: `h-4 w-4`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                >
                  {label}
                </Typography>
              </Link>
            </MenuItem>
          );
        })}
        <MenuItem
          className={`flex items-center gap-2 rounded`}
          onClick={logout}
        >
          {React.createElement(PowerIcon, {
            className: `h-4 w-4`,
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="red"
          >
            Déconnexion
          </Typography>
        </MenuItem>
      </MenuList>
      )}
    </Menu>
  );
}

 
// nav list component
const loggedNavListItems = [
  {
    label: "Mes classes",
    icon: AcademicCapIcon,
    link: "/forms"
  },
  {
    label: "Mes évaluations",
    icon: DocumentDuplicateIcon,
    link: "/tests"
  },
  {
    label: "Nouvelle évaluation",
    icon: DocumentPlusIcon,
    link: "/tests/new"
  }
];

const visitorNavListItems = [
  {
    label: "Connexion",
    icon: UserIcon,
    link: "/signin"
  },
  {
    label: "Inscription",
    icon: UserIcon,
    link: "/signup"
  }
];
 
function NavList() {
  const { isAuthenticated } = useAuthStore();
  const { logout } = useLogout();

  return (
    <ul className="po mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {isAuthenticated ? (
      <>
        {loggedNavListItems.map(({ label, icon, link }) => (
          <NavBarLink label={label} icon={icon} link={link} key={link}/>
        ))}
        <div className="lg:hidden">
          <hr />
          {profileMenuItems.map(({ label, icon, link }) => (
            <NavBarLink label={label} icon={icon} link={link} key={link}/>
          ))}
          <hr />
          <MenuItem
            className={`flex items-center gap-2 rounded`}
            onClick={logout}
          >
            {React.createElement(PowerIcon, {
              className: `h-4 w-4`,
              color: "red"
            })}
            <Typography
              as="span"
              variant="small"
              className="font-bold"
              color="red"
            >
              Déconnexion
            </Typography>
          </MenuItem>
        </div>
      </>
      ) : (visitorNavListItems.map(({ label, link, icon}) => (
          <NavBarLink label={label} icon={icon} link={link} key={link}/>
      ))) }
    </ul>
  );
}
 
export default function Header() {

  const { isAuthenticated } = useAuthStore();

  const location = useLocation()

  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  // closes the mobile menu after click
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);
 
  const toggleIsNavOpen = () => setIsMobileNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsMobileNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto mb-3 max-w-screen-xl p-2 lg:rounded-full lg:pl-6 bg-[#076A87] bg-opacity-100">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-100">
        <Typography
          as="a"
          href="/"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
            <img src="/Logo_TeacherMarks/OrangeM.png" alt="Teachermarks" className="w-[205px] h-auto"/>
        </Typography>
        {isAuthenticated ? (
        <>
          <div className="hidden lg:flex justify-center w-4/5">
            <NavList />
          </div>
          <div className="ml-auto hidden lg:flex">
            <ProfileMenu />
          </div>
        </>
        ) : (
        <div className="hidden lg:flex ml-auto me-2">
          {visitorNavListItems.map(({label, link, icon}) => 
            <NavBarLink label={label} icon={icon} link={link} key={link}/>
          )}
        </div>
        )}
        
        <IconButton
          size="lg"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="mr-2 lg:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><g fill="white"><path d="M8 6.983a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2zM7 12a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1m1 3.017a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z"/><path fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-2 0a8 8 0 1 1-16 0a8 8 0 0 1 16 0" clipRule="evenodd"/></g></svg>
        </IconButton>
      </div>
      <Collapse open={isMobileNavOpen} className="overflow-scroll">
          <NavList />
      </Collapse>

    </Navbar>
  );
}

