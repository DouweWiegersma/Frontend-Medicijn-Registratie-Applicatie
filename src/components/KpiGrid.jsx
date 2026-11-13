import Kpi from "./Kpi.jsx";
import {useQuery} from "@tanstack/react-query";
import {getCows} from "../api/getCow.js";
import {getMedicationInventory} from "../api/getMedicationInventory.js";
import {getTreatmentHistory} from "../api/getTreatmentHistory.js";
import { AiOutlineStock } from "react-icons/ai";
import { CiMedicalCross } from "react-icons/ci";
import { FaCow } from "react-icons/fa6";
function KpiGrid(){


    const { data: cows = [] } = useQuery({
        queryKey: ["cows"],
        queryFn: getCows,
    });

    const { data: inventory = [] } = useQuery({
        queryKey: ["inventory"],
        queryFn: getMedicationInventory,
    });

    const { data: treatments = [] } = useQuery({
        queryKey: ["treatments"],
        queryFn: getTreatmentHistory,
    });




    return(
    <>
        <div className='flex justify-around pt-[20px] gap-2 w-full'>

            <Kpi title='koeien' result={cows.length} backgroundcolor='bg-licht-groen' topic='geregistreerd'> <FaCow className='h-7 w-7' /> </Kpi>

            <Kpi title='voorraad' result={inventory.filter((item) => item.stockQuantity > 0).length} backgroundcolor='bg-zandkleur' topic='bijbestellen'> <AiOutlineStock className='w-7 h-7'/> </Kpi>

            <Kpi title='behandelingen' result={treatments.length} backgroundcolor='bg-licht-oranje' topic='behandel'><CiMedicalCross className='w-7 h-7'/> </Kpi>

        </div>
    </>
    )
}
export default KpiGrid;