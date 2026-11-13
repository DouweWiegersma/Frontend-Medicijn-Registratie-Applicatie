import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCows } from "../api/getCow.js";

function CowSelector({ selectedCow, onSelect, error1 }) {
    const [zoekterm, setZoekterm] = useState("");

    const { data: cows = [], isLoading } = useQuery({
        queryKey: ["cows"],
        queryFn: getCows,
    });

    const gefilterdeKoeien = cows.filter((koe) =>
        String(koe.cowNumber).includes(zoekterm)
    );

    return (
        <div className="flex flex-col gap-2 mt-5">
            {error1 && (
                <p className="text-red-500 text-sm">{error1}</p>
            )}
            <label htmlFor="koe" className="text-[12px] font-bold">
                Koe
            </label>

            <input
                id="koe"
                type="text"
                placeholder="Zoek op koenummer..."
                value={selectedCow ? String(selectedCow.cowNumber) : zoekterm}
                onChange={(e) => {
                    setZoekterm(e.target.value);
                    onSelect(null);
                }}
                className="w-full h-[47px] rounded-lg border border-grijs p-3 text-sm"
            />


            {isLoading && <p>Koeien laden...</p>}


            {selectedCow == null && zoekterm && (
                <ul className="rounded-lg border border-grijs bg-wit">
                    {gefilterdeKoeien.length > 0 ? (
                        gefilterdeKoeien.map((koe) => (
                            <li key={koe.id}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onSelect(koe);
                                        setZoekterm("");
                                    }}
                                    className="w-full p-3 text-left hover:bg-licht-groen"
                                >
                                    Koe {koe.cowNumber}
                                    {koe.name && ` - ${koe.name}`}
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="p-3 text-sm text-grijs">
                            Geen koeien gevonden
                        </li>
                    )}
                </ul>
            )}

            {selectedCow != null && (
                <p className="text-sm text-groen">
                   Geselecteerd: koe {selectedCow.cowNumber}
                </p>
            )}

        </div>
    );
}

export default CowSelector;