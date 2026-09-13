// components/ui/BottomNav.tsx
import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    UsersIcon,
    PlusCircleIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import {
    HomeIcon as HomeOutline,
    UsersIcon as UsersOutline,
    PlusCircleIcon as PlusCircleOutline,
    ClipboardDocumentListIcon as ClipboardOutline,
} from "@heroicons/react/24/outline";

const navItems = [
    { to: "/", label: "Accueil", Icon: HomeIcon, IconOutline: HomeOutline },
    { to: "/forms", label: "Classes", Icon: UsersIcon, IconOutline: UsersOutline },
    { to: "/tests/new", label: "Créer", Icon: PlusCircleIcon, IconOutline: PlusCircleOutline },
    { to: "/tests", label: "Évaluations", Icon: ClipboardDocumentListIcon, IconOutline: ClipboardOutline },
];

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <ul className="flex justify-around items-center h-16">
                {navItems.map(({ to, label, Icon, IconOutline }) => (
                    <li key={to} className="flex-1">
                        <NavLink
                            to={to}
                            end={to === "/"}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center gap-0.5 h-full transition-colors ${
                                    isActive ? "text-test-400" : "text-gray-400"
                                }`
                            }
                        >
                            {({ isActive }) =>
                                isActive ? (
                                    <>
                                        <Icon className="w-6 h-6" />
                                        <span className="text-[11px] font-semibold">{label}</span>
                                    </>
                                ) : (
                                    <>
                                        <IconOutline className="w-6 h-6" />
                                        <span className="text-[11px]">{label}</span>
                                    </>
                                )
                            }
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}