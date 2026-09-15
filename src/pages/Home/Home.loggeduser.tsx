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
    ChevronRightIcon,
    LightBulbIcon,
} from "@heroicons/react/24/solid";

export default function HomeLoggedUser() {

    const currentUser = useStore(useAuthStore);
    const { dashboard } = useDashboardQuery();

    return (
        <div className="flex flex-col gap-6">
            {currentUser.user?.is_first_visit && <TutoAlert />}
            {currentUser.user?.lastNotif && <LastNotifAlert />}

            {/* Bannière compacte avec date */}
            <div className="flex items-center justify-between bg-test-100/10 border border-test-100/15 rounded-2xl px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-test-100/15 flex items-center justify-center">
                        <img src={smilingPostit} alt="" className="w-6 h-6" />
                    </div>
                    <Typography as="h2" className="text-lg font-semibold text-test-100">
                        Bonjour, {currentUser.user?.firstname}
                    </Typography>
                </div>
                <Typography className="text-sm text-test-100/70 capitalize">
                    {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </Typography>
            </div>

            {/* Encart conseil */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5">
                <LightBulbIcon className="w-4 h-4 text-test-400 shrink-0" />
                <Typography className="text-sm text-gray-600">
                    {currentUser.user?.is_first_visit
                        ? "Ajoutez vos premières classes et compétences pour commencer."
                        : "Vos élèves viennent d'être évalués ? N'oubliez pas de marquer leurs succès."}
                </Typography>
            </div>

            {/* Mini cards classes */}
            <Card className="rounded-2xl shadow-md p-5">
                <div className="flex items-center gap-2 mb-4">
                    <UsersIcon className="w-5 h-5 text-test-400" />
                    <Typography as="h2" className="text-xl font-semibold">
                        Mes classes
                    </Typography>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {/* {dashboard?.schoolClasses.map((sc) => ( */}
                    {[
                        { id: 1, name: "6E2", studentCount: 27, testCount: 2, color: "#54C3B2" },
                        { id: 2, name: "6E4", studentCount: 25, testCount: 3, color: "#F46030" },
                        { id: 3, name: "3E5", studentCount: 22, testCount: 1, color: "#FAC215" },
                    ].map((sc) => (
                        <Link
                            key={sc.id}
                            to={`/forms/${sc.id}`}
                            style={{ "--class-color": sc.color } as React.CSSProperties}
                            className="group relative bg-white border border-gray-100 border-t-[3px] rounded-xl px-3 py-3 transition-all hover:shadow-md hover:border-[var(--class-color)]"
                        >
                            <div
                                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
                                style={{ backgroundColor: sc.color }}
                            />

                            <div className="flex items-center gap-1.5">
                                <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: sc.color }}
                                />
                                <Typography className="font-medium text-sm truncate">{sc.name}</Typography>
                            </div>

                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1.5 transition-colors group-hover:text-[var(--class-color)]">
                                <UsersIcon className="w-3.5 h-3.5" />
                                {sc.studentCount} élèves
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5 transition-colors group-hover:text-[var(--class-color)]">
                                <ClipboardDocumentListIcon className="w-3.5 h-3.5" />
                                {sc.testCount} évaluations
                            </div>
                        </Link>
                    ))}
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
                <Link to="/forms" className="lg:w-1/3">
                    <Button className="w-full h-[52px] flex items-center justify-center gap-2 rounded-xl custom-shadow bg-test-300 text-black transition-transform hover:scale-[1.02]" size="md">
                        <UsersIcon className="w-4 h-4" />
                        <Typography className="font-[Teachers] font-extrabold text-base">
                            Mes classes
                        </Typography>
                    </Button>
                </Link>

                <Link to="/tests/new" className="lg:w-1/3">
                    <Button className="w-full h-[52px] flex items-center justify-center gap-2 rounded-xl custom-shadow bg-test-400 bg-opacity-80 text-black transition-transform hover:scale-[1.02]" size="md">
                        <PlusCircleIcon className="w-4 h-4" />
                        <Typography className="font-[Teachers] font-extrabold text-base">
                            Créer une éval<span className="hidden lg:inline">uation</span>
                        </Typography>
                    </Button>
                </Link>

                <Link to="/tests" className="lg:w-1/3">
                    <Button className="w-full h-[52px] flex items-center justify-center gap-2 rounded-xl custom-shadow bg-test-300 bg-opacity-80 text-black transition-transform hover:scale-[1.02]" size="md">
                        <ClipboardDocumentListIcon className="w-4 h-4" />
                        <Typography className="font-[Teachers] font-extrabold text-base">
                            Mes évaluations
                        </Typography>
                    </Button>
                </Link>
            </div>
        </div>
    );
}