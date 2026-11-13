import Hero from "../components/Hero.jsx";
import Header from "../components/Header.jsx";
import {useQuery} from "@tanstack/react-query";
import {getTreatmentHistory} from "../api/getTreatmentHistory.js";
import {useState} from "react";
import NavBar from "../components/NavBar.jsx";
import PrintBtn from "../components/PrintBtn.jsx";

function TreatmentHistory(){
    const { data: treatments = [] } = useQuery({
        queryKey: ["treatment"],
        queryFn: getTreatmentHistory,
    });



    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const totalPages = Math.ceil(treatments.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentTreatments = treatments.slice(
        startIndex,
        startIndex + itemsPerPage
    );
    return(
        <>
            <Header />

            <Hero
                showDate={false}
                title="Behandel"
                caption="stalbeheer"
                subtitle="geschiedenis"
            />

            <PrintBtn />

            <div className="mx-4">
                <h2 className="mt-5 mb-5 flex justify-center text-2xl sm:text-3xl font-extrabold text-groen">
                    Behandelingsoverzicht
                </h2>

                <div className="w-full rounded-xl border border-grijs bg-white p-3 sm:p-5">
                    <div className="hidden md:block overflow-hidden rounded-lg border print:block border-grijs">
                        <table className="w-full table-fixed text-left text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-3">Datum</th>
                                <th className="px-4 py-3">Koe</th>
                                <th className="px-4 py-3">Medicatie</th>
                                <th className="px-4 py-3">Dosering</th>
                                <th className="px-4 py-3">Ziekte</th>
                                <th className="px-4 py-3">Batchnr.</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                            {currentTreatments.map((treatment) => (
                                <tr key={treatment.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        {treatment.date
                                            ? new Date(treatment.date + "T00:00:00").toLocaleDateString("nl-NL")
                                            : "-"}
                                    </td>
                                    <td className="px-4 py-3">{treatment.cowNumber}</td>
                                    <td className="px-4 py-3 break-words">{treatment.medicationName}</td>
                                    <td className="px-4 py-3">
                                        {treatment.dosage} {treatment.unit?.toLowerCase()}
                                    </td>
                                    <td className="px-4 py-3 break-words">{treatment.diseaseName}</td>
                                    <td className="px-4 py-3 break-words">{treatment.batchNumber}</td>
                                </tr>
                            ))}

                            {currentTreatments.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                                        Geen behandelingen gevonden.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>


                    <div className="block md:hidden space-y-3 print:hidden">
                        {currentTreatments.map((treatment) => (
                            <div
                                key={treatment.id}
                                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                            >
                                <div className="mb-3 flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                            <span className="font-bold text-groen">
                                Koe {treatment.cowNumber}
                            </span>

                                    <span className="text-sm text-gray-500">
                                {treatment.date
                                    ? new Date(treatment.date + "T00:00:00").toLocaleDateString("nl-NL")
                                    : "-"}
                            </span>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between gap-3">
                                        <span className="text-gray-500">Medicatie</span>
                                        <span className="text-right font-medium text-gray-800">
                                    {treatment.medicationName || "-"}
                                </span>
                                    </div>

                                    <div className="flex justify-between gap-3">
                                        <span className="text-gray-500">Dosering</span>
                                        <span className="text-right text-gray-800">
                                    {treatment.dosage} {treatment.unit?.toLowerCase()}
                                </span>
                                    </div>

                                    <div className="flex justify-between gap-3">
                                        <span className="text-gray-500">Ziekte</span>
                                        <span className="text-right text-gray-800">
                                    {treatment.diseaseName || "-"}
                                </span>
                                    </div>

                                    <div className="flex justify-between gap-3">
                                        <span className="text-gray-500">Batchnummer</span>
                                        <span className="text-right text-gray-800 break-all">
                                    {treatment.batchNumber || "-"}
                                </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {currentTreatments.length === 0 && (
                            <p className="py-8 text-center text-gray-500">
                                Geen behandelingen gevonden.
                            </p>
                        )}
                    </div>
                </div>

                {/* Paginering */}
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

            <div className="fixed bottom-0 w-full print:hidden">
                <NavBar />
            </div>
        </>
    )
}

export default TreatmentHistory;