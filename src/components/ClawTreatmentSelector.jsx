import { PiCowThin } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { Controller } from "react-hook-form";
import { getDisease } from "../api/getDisease";

function ClawTreatmentSelector({ control }) {

const { data: diseases = [] } = useQuery({
    queryKey: ["diseases"],
    queryFn: getDisease,
});


const clawLabels = {
    LV: "Linksvoor",
    RV: "Rechtsvoor",
    LA: "Linksachter",
    RA: "Rechtsachter",
};

return (
    <Controller
        name="selectedClaws"
        control={control}
        rules={{
            validate: (value) =>
                value.length > 0 || "Selecteer minimaal één klauw",
        }}
        render={({ field, fieldState: { error: clawError } }) => (
            <>
                {clawError && (
                    <p className="text-red-500 text-sm text-center pt-4">
                        {clawError.message}
                    </p>
                )}

                <div className="w-full flex justify-center items-center mb-10 mt-10">
                    <div className="w-[123px] h-[89px] grid grid-cols-2 gap-[36px] relative">

                        {["LV", "RV", "LA", "RA"].map((claw) => (
                            <button
                                key={claw}
                                type="button"
                                className={`text-[9px] font-bold w-[48px] h-[42px] rounded-[14px] border
    ${field.value.includes(claw)
        ? "bg-groen text-wit border-groen"
        : "bg-wit text-groen border-licht-groen"}`}
                                onClick={() => {
                                    const selected = field.value.includes(claw)
                                        ? field.value.filter(item => item !== claw)
                                        : [...field.value, claw];

                                    field.onChange(selected);
                                }}
                            >
                                {claw}
                            </button>
                        ))}

                        <div className="absolute -z-10 left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 bg-licht-groen rounded-full w-[64px] h-[69px] flex items-center justify-center">
                            <PiCowThin className="w-[30px] h-[30px]" />
                        </div>
                    </div>
                </div>

                {field.value.map((claw) => (
                    <div key={claw} className="m-5 flex flex-col">

                        <label
                            htmlFor={`disease-${claw}`}
                            className="w-full p-[10px] bg-groen text-wit rounded-lg"
                        >
                            {clawLabels[claw]}
                        </label>

                        <Controller
                            name={`claws.${claw}`}
                            control={control}
                            rules={{
                                validate: (value) =>
                                    value != null || "Selecteer een aandoening",
                            }}
                            render={({ field: diseaseField, fieldState: { error } }) => (
                                <>
                                    <select
                                        {...diseaseField}
                                        id={`disease-${claw}`}
                                        value={diseaseField.value ?? ""}
                                        onChange={(e) =>
                                            diseaseField.onChange(
                                                e.target.value === ""
                                                    ? null
                                                    : Number(e.target.value)
                                            )
                                        }
                                        className="w-full p-5 bg-licht-groen rounded-lg"
                                    >
                                        <option value="">
                                            Maak een keuze!
                                        </option>

                                        {diseases.map((disease) => (
                                            <option
                                                key={disease.id}
                                                value={disease.id}
                                            >
                                                {disease.name}
                                            </option>
                                        ))}
                                    </select>

                                    {error && (
                                        <p className="text-red-500 text-sm pt-2">
                                            {error.message}
                                        </p>
                                    )}
                                </>
                            )}
                        />
                    </div>
                ))}
            </>
        )}
    />
);


}

export default ClawTreatmentSelector;
