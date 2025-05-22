import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  PowerIcon,
  AcademicCapIcon,
  DocumentDuplicateIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/solid";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import { useAuthStore } from "../../hooks/useAuthStore";

// profile menu component
const profileMenuItems = [
  {
    label: "Mon profil",
    icon: UserCircleIcon,
    path: "/profile"
  },
  {
    label: "Paramètres",
    icon: Cog6ToothIcon,
    path: "/settings"
  },
  {
    label: "Aide",
    icon: LifebuoyIcon,
    path: "/help"
  }
];

function ProfileMenu() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const { logout } = useAuthStore();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      {useStore(useAuthStore).isAuthenticated && (
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path }) => {
          return (
            <MenuItem
              key={label}
              className={`flex items-center gap-2 rounded`}
            >
              <Link to={path} className="flex size-full items-center gap-2" onClick={closeMenu}>
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
          onClick={handleLogout}
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
    label: "Ajouter une évaluation",
    icon: FolderPlusIcon,
    link: "test/new"
  },
];

const visitorNavListItems = [
  {
    label: "Connexion",
    link: "/signin"
  },
  {
    label: "Inscription",
    link: "/signup"
  }
];
 
function NavList() {
  const { isAuthenticated } = useAuthStore();

  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {isAuthenticated ? (loggedNavListItems.map(({ label, icon, link }) => (
        <NavLink key={label} to={link}>
          {({isActive}) => (
          <Typography
            variant="small"
            color="gray"
            className="text-blue-gray-500"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              <span className={isActive ? "font-bold text-gray-700" : "text-gray-900"}> {label}</span>
            </MenuItem>
          </Typography>
          )}
        </NavLink>
      ))) : (visitorNavListItems.map(({ label, link }) => (
          <NavLink key={label} to={link}>
            {({isActive}) => (
            <Typography
              variant="small"
              color="gray"
              className="text-blue-gray-500"
            >
              <MenuItem className="flex items-center gap-2 lg:rounded-full">
                <span className={isActive ? "font-bold text-gray-700" : "text-gray-900"}> {label}</span>
              </MenuItem>
            </Typography>
            )}
          </NavLink>
      ))) }
    </ul>
  );
}
 
export default function Header() {

  const { isAuthenticated } = useAuthStore();

  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
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
            {/* <span className="font-logo text-2xl text-white">Teachermarks</span> */}
            <img src="src\assets\Logo_TeacherMarks\OrangeM.png" alt="logo" className="w-[205px] h-auto"/>
        </Typography>
        {isAuthenticated ? (
        <>
          <div className="hidden lg:flex justify-center w-4/5">
            <NavList />
          </div>
          <div className="ml-auto ">
            <ProfileMenu />
          </div>
        </>
        ) : (
        <div className="hidden lg:flex ml-auto">
          {visitorNavListItems.map(({label, link}) => 
          <Link key={label} to={link} className="me-5">
            <Button color="white" variant="outlined">{label}</Button>
          </Link>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><g fill="white"><path d="M8 6.983a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2zM7 12a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1m1 3.017a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z"/><path fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-2 0a8 8 0 1 1-16 0a8 8 0 0 1 16 0" clipRule="evenodd"/></g></svg>
        </IconButton>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
          <NavList />
      </Collapse>
    </Navbar>
  );
}

