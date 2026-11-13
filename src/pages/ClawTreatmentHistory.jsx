import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import {useQuery} from "@tanstack/react-query";
import {getClawTreatmentHistory} from "../api/getClawTreatmentHistory.js";
import NavBar from "../components/NavBar.jsx";
import {useState} from "react";
import PrintBtn from "../components/PrintBtn.jsx";

function ClawTreatmentHistory(){


    const { data: clawtreatments = [] } = useQuery({
        queryKey: ["clawtreatments"],
        queryFn: getClawTreatmentHistory,
    });


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const totalPages = Math.ceil(clawtreatments.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentTreatments = clawtreatments.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return(

        <>
            {/* Header en titel: niet afdrukken */}
            <div className="print:hidden">
                <Header />

                <Hero
                    showDate={false}
                    title="Klauw geschiedenis"
                    caption="Stalbeheer"
                />

                <PrintBtn />
            </div>

            <div className="w-full p-4 mb-20 print:p-0 print:mb-0">

                <h2 className="flex justify-center text-2xl sm:text-3xl font-extrabold text-groen mt-5 mb-5">
                    Klauwgeschiedenis
                </h2>

                {/* DESKTOP EN PRINT: TABEL */}
                <div className="hidden md:block print:block overflow-hidden rounded-xl border border-gray-300">
                    <table className="w-full table-fixed text-left text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3">Koe</th>
                            <th className="px-4 py-3">Datum</th>
                            <th className="px-4 py-3">LA</th>
                            <th className="px-4 py-3">RA</th>
                            <th className="px-4 py-3">LV</th>
                            <th className="px-4 py-3">RV</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                        {currentTreatments.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-semibold">
                                    {item.cowNumber}
                                </td>

                                <td className="px-4 py-3">
                                    {item.dateClawTreatment
                                        ? new Date(item.dateClawTreatment + "T00:00:00").toLocaleDateString("nl-NL")
                                        : "-"}
                                </td>

                                {["LA", "RA", "LV", "RV"].map((position) => {
                                    const claw = item.claws?.find(
                                        (claw) => claw.clawPosition === position
                                    );

                                    return (
                                        <td key={position} className="px-4 py-3 break-words">
                                            {claw?.diseaseName || "-"}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}

                        {currentTreatments.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                                    Geen klauwbehandelingen gevonden.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* MOBIEL: KAARTJES */}
                <div className="block md:hidden print:hidden space-y-3">
                    {currentTreatments.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                        >
                            <div className="mb-3 flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                        <span className="font-bold text-groen">
                            Koe {item.cowNumber}
                        </span>

                                <span className="text-sm text-gray-500">
                            {item.dateClawTreatment
                                ? new Date(item.dateClawTreatment + "T00:00:00").toLocaleDateString("nl-NL")
                                : "-"}
                        </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {["LV", "RV", "LA", "RA"].map((position) => {
                                    const claw = item.claws?.find(
                                        (claw) => claw.clawPosition === position
                                    );

                                    return (
                                        <div
                                            key={position}
                                            className="rounded-lg bg-gray-50 p-3"
                                        >
                                            <p className="text-sm font-bold text-gray-600">
                                                {position}
                                            </p>

                                            <p className="mt-1 text-sm text-gray-800">
                                                {claw?.diseaseName || "Geen aandoening"}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {currentTreatments.length === 0 && (
                        <p className="py-8 text-center text-gray-500">
                            Geen klauwbehandelingen gevonden.
                        </p>
                    )}
                </div>

                {/* PAGINERING */}
                <div className="mt-6 mb-24 flex items-center justify-center gap-4 print:hidden">
                    <button
                        onClick={() => setCurrentPage((page) => page - 1)}
                        disabled={currentPage === 1}
                        className="rounded-lg bg-gray-200 px-4 py-2 disabled:opacity-40"
                    >
                        Vorige
                    </button>

                    <span className="text-sm">
                Pagina {currentPage} van {totalPages}
            </span>

                    <button
                        onClick={() => setCurrentPage((page) => page + 1)}
                        disabled={currentPage === totalPages}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-40"
                    >
                        Volgende
                    </button>
                </div>
            </div>

            {/* Navigatiebalk */}
            <div className="fixed bottom-0 w-full print:hidden">
                <NavBar />
            </div>
        </>
    )

}

export default ClawTreatmentHistory;