import { Button, Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useStore } from "zustand";
import { useAuthStore } from "../../hooks/useAuthStore";
import TutoAlert from "../../components/ui/tutoAlert";
import smilingPostit from "../../assets/smiling_postit.svg";
import LastNotifAlert from "../../components/ui/lastNotifAlert";
import useDashboardQuery from "../../hooks/dashboard/useDashboardQuery";
import {
    ClipboardDocumentListIcon,
    PlusCircleIcon,
    UsersIcon,
    AcademicCapIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/solid";

export default function HomeLoggedUser() {

    const currentUser = useStore(useAuthStore);
    const { dashboard } = useDashboardQuery();

    return (
        <div className="flex flex-col gap-6">
            {currentUser.user?.is_first_visit && <TutoAlert />}
            {currentUser.user?.lastNotif && <LastNotifAlert />}

            {/* Bannière de bienvenue */}
            <Card className="relative overflow-hidden rounded-2xl bg-test-200 text-black px-6 py-6 shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1 space-y-2 text-center md:text-left">
                        <Typography as="h2" className="text-2xl md:text-3xl font-bold">
                            Bonjour <span className="text-white">{currentUser.user?.firstname} {currentUser.user?.lastname}</span> !
                        </Typography>

                        {currentUser.user?.is_first_visit ? (
                            <>
                                <Typography as="p" className="text-lg opacity-90">
                                    Vous êtes sur le point de commencer un suivi plus intuitif et rapide des compétences de vos élèves.
                                </Typography>
                                <Typography as="p" className="text-lg font-semibold">
                                    Nous vous invitons à ajouter vos premières informations.
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography as="p" className="text-lg opacity-90">
                                    Vos élèves viennent d'être évalués ?
                                </Typography>
                                <Typography as="p" className="text-lg font-semibold">
                                    N'oubliez pas de marquer leurs succès.
                                </Typography>
                            </>
                        )}
                    </div>

                    <img
                        src={smilingPostit}
                        alt="smiling post-it"
                        className="w-24 h-24 md:w-32 md:h-32 shrink-0 drop-shadow-lg"
                    />
                </div>
            </Card>

            {/* Dernières évaluations */}
            <Card className="rounded-2xl shadow-md p-5">
                <div className="flex items-center gap-2 mb-4">
                    <ClipboardDocumentListIcon className="w-5 h-5 text-test-400" />
                    <Typography as="h2" className="text-xl font-semibold">
                        Dernières évaluations
                    </Typography>
                </div>

                {dashboard && dashboard.lastTests.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                        {dashboard.lastTests.map((test) => (
                            <li key={test.id}>
                                <Link
                                    to={`/tests/${test.id}`}
                                    className="flex items-center justify-between gap-3 py-3 px-2 -mx-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                                >
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-medium truncate">{test.name}</span>
                                        <span className="text-sm text-gray-500 truncate">
                                            {new Date(test.date).toLocaleDateString("fr-FR", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                            {" · "}
                                            Classe : {test.schoolclass.name}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <span
                                            className={`text-sm font-semibold px-3 py-1 rounded-full ${
                                                test.completion === 100
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-amber-100 text-amber-700"
                                            }`}
                                        >
                                            {test.completion} %
                                        </span>
                                        <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Typography as="p" className="text-gray-500 text-sm italic py-4 text-center">
                        Aucune évaluation récente pour le moment.
                    </Typography>
                )}
            </Card>

            {/* Actions rapides - visibles seulement sur desktop, mobile utilise la BottomNav */}
            <div className="hidden lg:flex lg:flex-row gap-3">
                <Link to="/forms" className="lg:w-1/2">
                    <Button className="w-full h-[70px] flex items-center justify-center gap-2 rounded-2xl custom-shadow bg-test-300 text-black transition-transform hover:scale-[1.02]" size="lg">
                        <UsersIcon className="w-5 h-5" />
                        <Typography className="font-[Teachers] font-extrabold text-lg xl:text-2xl">
                            Mes classes
                        </Typography>
                    </Button>
                </Link>

                {currentUser.user?.is_first_visit ? (
                    <Link to="/skills" className="lg:w-1/2">
                        <Button className="w-full h-[70px] flex items-center justify-center gap-2 rounded-2xl custom-shadow bg-test-300 text-black transition-transform hover:scale-[1.02]" size="lg">
                            <AcademicCapIcon className="w-5 h-5" />
                            <Typography className="font-[Teachers] font-extrabold text-lg xl:text-2xl">
                                Mes compétences
                            </Typography>
                        </Button>
                    </Link>
                ) : (
                    <>
                        <Link to="/tests/new" className="lg:w-1/2">
                            <Button className="w-full h-[70px] flex items-center justify-center gap-2 rounded-2xl custom-shadow bg-test-400 bg-opacity-80 text-black transition-transform hover:scale-[1.02]" size="lg">
                                <PlusCircleIcon className="w-5 h-5" />
                                <Typography className="font-[Teachers] font-extrabold text-lg xl:text-2xl">
                                    Créer une éval<span className="hidden lg:inline">uation</span>
                                </Typography>
                            </Button>
                        </Link>
                        <Link to="/tests" className="lg:w-1/2">
                            <Button className="w-full h-[70px] flex items-center justify-center gap-2 rounded-2xl custom-shadow bg-test-300 bg-opacity-80 text-black transition-transform hover:scale-[1.02]" size="lg">
                                <ClipboardDocumentListIcon className="w-5 h-5" />
                                <Typography className="font-[Teachers] font-extrabold text-lg xl:text-2xl">
                                    Mes évaluations
                                </Typography>
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}