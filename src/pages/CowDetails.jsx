import {useQuery} from "@tanstack/react-query";
import {getOneCow} from "../api/getOneCow.js";
import {useParams} from "react-router-dom";

function CowDetails(){

    console.log("CowDetails component wordt geladen");
    const { id } = useParams();
    const { data: cow, isLoading, } = useQuery({
        queryKey: ["cow", id],
        queryFn: () => {
            console.log("React Query roept getOneCow aan met:", id);
            return getOneCow(id);
        },
        enabled: !!id,
    });

    if (isLoading) {
        return <p>Koegegevens laden...</p>;
    }
    if (!cow) {
        return <p>Koe niet gevonden.</p>;
    }
    return(
        <>
            <div>
                    <h1>Koe details</h1>
                    <p>Gekozen koe ID: {id}</p>
                    <p>Koe nummer: {cow.cowNumber}</p>
                    <p>{cow.breed}</p>
                    <p>{cow.name}</p>
                    <p>{cow.note}</p>
                   <p>{new Date(cow.birthDay).toLocaleDateString("nl-NL")}</p>
            </div>
        </>

    )
}

export default CowDetails;