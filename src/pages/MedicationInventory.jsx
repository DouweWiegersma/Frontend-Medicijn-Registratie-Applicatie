import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import NavBar from "../components/NavBar.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getMedicationInventory} from "../api/getMedicationInventory.js";
import { FaRegTrashAlt } from "react-icons/fa";
import {deleteOneMedicationInventory} from "../api/deleteOneMedicationInventory.js";
import PrintBtn from "../components/PrintBtn.jsx";


function MedicationInventory(){

    const { data: inventory = [] } = useQuery({
        queryKey: ["inventory"],
        queryFn: getMedicationInventory,
    });


    const queryClient = useQueryClient();
    const deleteOneMedicationInventoryMutation = useMutation({
        mutationFn: deleteOneMedicationInventory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["inventory"] });
        },

    });

    function deleteMedication(id){
        deleteOneMedicationInventoryMutation.mutate(id)
    }

    const availableInventory = inventory.filter(
        (item) => item.stockQuantity > 0
    );


    console.log(inventory)




    return (
        <>
            <div className="h-full">
                <div className="print:hidden">
                    <Header createTitle={false} />

                    <Hero
                        showDate={false}
                        title="Medicijn voorraad"
                        caption="stalbeheer"
                        subtitle="Altijd zicht op wat er in de kast staat."
                    />
                </div>

                <div className="mx-4 sm:mx-5 mt-5 mb-40 rounded-xl border border-licht-groen bg-white p-3 sm:p-5 print:m-0 print:border-0 print:p-0">

                    <div className="mb-5 flex items-center justify-between print:hidden">
                        <h2 className="text-xl sm:text-3xl font-extrabold text-groen">
                            Medicijnvoorraad
                        </h2>

                        <PrintBtn />
                    </div>

                    {/* DESKTOP EN PRINT: TABEL */}
                    <div className="hidden md:block print:block overflow-hidden rounded-lg border border-gray-200">
                        <table className="w-full table-fixed text-left text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="w-[25%] px-4 py-3">Batchnummer</th>
                                <th className="w-[35%] px-4 py-3">Medicijn</th>
                                <th className="w-[25%] px-4 py-3">Aantal</th>
                                <th className="w-[15%] px-4 py-3 print:hidden">Verwijderen</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                            {availableInventory.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 break-words">
                                        {item.batchNumber}
                                    </td>

                                    <td className="px-4 py-3 break-words">
                                        {item.medication.description || "-"}
                                    </td>

                                    <td className="px-4 py-3">
                                        {item.stockQuantity} {item.unit?.toLowerCase()}
                                    </td>

                                    <td className="px-4 py-3 print:hidden">
                                        <button
                                            onClick={() => deleteMedication(item.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                            title="Medicijn verwijderen"
                                        >
                                            <FaRegTrashAlt size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {availableInventory.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-4 py-8 text-center text-gray-500"
                                    >
                                        De medicijnvoorraad is leeg.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* MOBIEL: KAARTJES */}
                    <div className="block md:hidden print:hidden space-y-3">
                        {availableInventory.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                            >
                                <div className="mb-3 flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                            <span className="font-bold text-groen">
                                {item.medication.description || "Onbekend medicijn"}
                            </span>

                                    <button
                                        onClick={() => deleteMedication(item.id)}
                                        className="rounded-lg p-2 text-red-500 hover:bg-red-50 hover:text-red-700"
                                        title="Medicijn verwijderen"
                                    >
                                        <FaRegTrashAlt size={18} />
                                    </button>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between gap-3">
                                        <span className="text-gray-500">Batchnummer</span>
                                        <span className="text-right font-medium text-gray-800 break-all">
                                    {item.batchNumber}
                                </span>
                                    </div>

                                    <div className="flex justify-between gap-3">
                                        <span className="text-gray-500">Aantal</span>
                                        <span className="font-semibold text-gray-800">
                                    {item.stockQuantity} {item.unit?.toLowerCase()}
                                </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {availableInventory.length === 0 && (
                            <p className="py-8 text-center text-gray-500">
                                De medicijnvoorraad is leeg.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigatiebalk */}
            <div className="fixed bottom-0 w-full print:hidden">
                <NavBar />
            </div>
        </>
    )
}
export default MedicationInventory;