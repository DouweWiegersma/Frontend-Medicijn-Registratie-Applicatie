
import {useQuery} from "@tanstack/react-query";
import {getTreatmentHistory} from "../api/getTreatmentHistory.js";

function InfoPanel({eyeBrow, title})
{
    const { data: treatments = [] } = useQuery({
        queryKey: ["treatment"],
        queryFn: getTreatmentHistory,
    });
    console.log(treatments)


    return (
        <>

            <section className='w-full h-[41px] flex justify-between mt-[28px] mb-[22px]'>
                <div className='w-full'>
                <p className='text-[12px] text-licht-groen font-bold tracking-wider'>{eyeBrow}</p>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-[20px] '>{title}</h2>
                </div>
                </div>
            </section>
            <div>
                <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full table-fixed text-left text-xs sm:text-sm">
                        <thead className="bg-gray-100 text-gray-600">
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
                        {treatments.slice(0, 5).map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    {new Date(item.date + "T00:00:00").toLocaleDateString("nl-NL")}
                                </td>
                                <td className="px-4 py-3">{item.cowNumber}</td>
                                <td className="px-4 py-3">{item.medicationName}</td>
                                <td className="px-4 py-3">
                                    {item.dosage} {item.unit.toLowerCase()}
                                </td>
                                <td className="px-4 py-3">{item.diseaseName}</td>
                                <td className="px-4 py-3">{item.batchNumber}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>


                <div className="block md:hidden space-y-3">
                    {treatments.slice(0, 5).map((item) => (
                        <div
                            key={item.id}
                            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                        >
                            <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-800">
                    Koe {item.cowNumber}
                </span>

                                <span className="text-sm text-gray-500">
                    {new Date(item.date + "T00:00:00").toLocaleDateString("nl-NL")}
                </span>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between gap-3">
                                    <span className="text-gray-500">Medicatie</span>
                                    <span className="font-medium text-gray-800">
                        {item.medicationName}
                    </span>
                                </div>

                                <div className="flex justify-between gap-3">
                                    <span className="text-gray-500">Dosering</span>
                                    <span className="text-gray-800">
                        {item.dosage} {item.unit.toLowerCase()}
                    </span>
                                </div>

                                <div className="flex justify-between gap-3">
                                    <span className="text-gray-500">Ziekte</span>
                                    <span className="text-gray-800">{item.diseaseName}</span>
                                </div>

                                <div className="flex justify-between gap-3">
                                    <span className="text-gray-500">Batchnummer</span>
                                    <span className="text-gray-800">{item.batchNumber}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default InfoPanel;