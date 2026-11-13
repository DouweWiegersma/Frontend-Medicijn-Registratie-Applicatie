// import Header from "../components/Header.jsx";
// import Hero from "../components/Hero.jsx";
// import Form from "../components/Form.jsx";
// import { useState } from "react";
// import NavBar from "../components/NavBar.jsx";
// import CowSelector from "../components/CowSelector.jsx";
//
// function Treatment(){
//
//
//     return (
//
//         <>
//             <div className='mb-20'>
//             <Header/>
//             <Hero title='Koe behandelen' showDate={false} caption='Stalbeheer' subtitle='Koppel ziekte en medicatie direct'/>
//             <Form title='Nieuwe behandeling' btnText='Behandeling starten' textField={false} >
//                 <CowSelector/>
//                 <div className="flex flex-col gap-2 mt-5">
//                     <label htmlFor="disease" className="text-[12px] font-bold">
//                         Ziekte *
//                     </label>
//
//                     <select
//                         id="disease"
//                         name="disease"
//                         required
//                         defaultValue=""
//                         className="w-full h-[47px] rounded-lg border border-grijs bg-wit p-3 text-sm"
//                     >
//                         <option value="" disabled>
//                             Selecteer een ziekte
//                         </option>
//                         <option value="mastitis">Mastitis (uierontsteking)</option>
//                         <option value="lameness">Kreupelheid</option>
//                         <option value="milk_fever">Melkziekte</option>
//                         <option value="ketosis">Ketose</option>
//                         <option value="respiratory_infection">Luchtweginfectie</option>
//                         <option value="digestive_problems">Spijsverteringsproblemen</option>
//                         <option value="other">Anders</option>
//                     </select>
//                 </div>
//
//                 <div className="flex flex-col gap-2 mt-5">
//                     <label htmlFor="medication" className="text-[12px] font-bold">
//                         Medicatie uit voorraad *
//                     </label>
//
//                     <select
//                         id="medication"
//                         name="medication"
//                         required
//                         defaultValue=""
//                         className="w-full h-[47px] rounded-lg border border-grijs bg-wit p-3 text-sm"
//                     >
//                         <option value="" disabled>
//                             Selecteer medicatie uit voorraad
//                         </option>
//
//                         <option value="med-001">
//                             Medicijn A — 12 stuks op voorraad
//                         </option>
//
//                         <option value="med-002">
//                             Medicijn B — 8 flacons op voorraad
//                         </option>
//
//                         <option value="med-003">
//                             Medicijn C — 2 verpakkingen op voorraad
//                         </option>
//                     </select>
//                 </div>
//
//                 <div className='mt-5'>
//                 <label htmlFor='dosage' className='text-[12px] font-bold'>Hoeveelheid *</label>
//                 <input id='dosage' name='dosage' type='text' className='w-full rounded-lg border border-grijs p-3 h-[47px] text-sm outline-none' />
//                 </div>
//
//                 <div className='flex flex-col'>
//                     <label htmlFor='note' className='font-bold text-[11px] mt-3'>Notities
//                     </label>
//                     <textarea id="note" name="note" placeholder='Dosering, observaties en vervolg...' className='w-full rounded-lg border border-grijs p-3 h-[47px] text-sm outline-none min-h-[112px]' />
//                 </div>
//
//
//             </Form>
//             </div>
//
//             <div className='fixed bottom-0 w-full'>
//                 <NavBar />
//             </div>
//
//
//
//         </>
//     )
// }
// export default Treatment;

import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import NavBar from "../components/NavBar.jsx";
import CowSelector from "../components/CowSelector.jsx";
import {getDisease} from "../api/getDisease.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getMedicationInventory} from "../api/getMedicationInventory.js";
import Input from "../components/Input.jsx";
import TextArea from "../components/TextArea.jsx";
import {createTreatment} from "../api/createTreatment.js";
import FormBtn from "../components/FormBtn.jsx";
import {useForm} from "react-hook-form";
import {useState} from "react";


function Treatment() {

    const [selectedCow, setSelectedCow] = useState(null)
    // const cowId = selectedCow?.id;
    // const cowNumber = selectedCow?.cowNumber;
    const {handleSubmit, setValue, register,
        formState: { errors },} = useForm({ defaultValues: {
            dosage: 0,
            duration: 0,
            date: "",
            cowId: null,
            medicationInventoryId: null,
            diseaseId: null,
            unit: null
        }});

    const queryClient = useQueryClient();
    const createTreatmentMutation = useMutation({
        mutationFn: createTreatment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["treatment"] });
        },

    });

    const { data: diseases = [] } = useQuery({
        queryKey: ["diseases"],
        queryFn: getDisease,
    });



    const { data: inventory = [] } = useQuery({
        queryKey: ["inventory"],
        queryFn: getMedicationInventory,
    });

    function onSubmit(data){
        console.log("Treatment data:", data);
        createTreatmentMutation.mutate(data)
    }

    const availableInventory = inventory.filter(
        (item) => item.stockQuantity > 0
    );

return (
    <>
        <div className="mb-20">
            <Header />
            <Hero
                title="Koe behandelen"
                showDate={false}
                caption="Stalbeheer"
                subtitle="Koppel ziekte en medicatie direct"
            />
            <div className='mb-20 w-full p-[18px]'>
            <form onSubmit={handleSubmit(onSubmit)} className='p-[18px] border rounded-[22px] border-licht-groen  flex flex-col gap-2'>
                <h2 className='flex justify-center text-3xl font-extrabold text-groen mt-5 mb-2'>Behandel koe</h2>

                <CowSelector
                    selectedCow={selectedCow}
                    onSelect={(cow) => {
                        setSelectedCow(cow);
                        setValue("cowId", cow ? cow.id : null, {
                            shouldValidate: true,
                            shouldDirty: true
                        });
                    }}
                />

                <div>
                <label htmlFor='disease' className="font-bold text-[11px] mt-3 mb-1">Ziekte</label>
                <select id='disease' className='w-full rounded-lg border border-grijs p-3 text-sm outline-none' {...register("diseaseId", { valueAsNumber: true })}>
                    <option>Maak een keuze </option>
                    {diseases.map((disease) => (
                        <option key={disease.id} value={disease.id}>
                            {disease.name}
                        </option>
                    ))}
                </select>
                    {errors.diseaseId && (
                        <p className="text-red-500 text-sm">{errors.diseaseId.message}</p>
                    )}
                </div>

                <div>
                <label htmlFor='inventory' className="font-bold text-[11px] mt-3 mb-1">Medicatie uit voorraad</label>
                    <select
                        id="inventory"
                        className="w-full rounded-lg border border-grijs p-3 text-sm outline-none"
                        {...register("medicationInventoryId", {
                            valueAsNumber: true
                        })}
                        onChange={(e) => {
                            const selectedItem = inventory.find(
                                item => item.id === Number(e.target.value)
                            );
                            setValue("medicationId", selectedItem?.medication?.id ?? null);
                            setValue("unit", selectedItem?.unit ?? null);
                        }}>

                        <option value="">Maak een keuze</option>
                        {availableInventory.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.medication.name} ---- {item.batchNumber}
                            </option>
                        ))}
                    </select>
                </div>
                <Input labelName='Hoeveelheid' type='number' {...register('dosage', {valueAsNumber: true})}/>
                <Input labelName='Behandel periode' type='number' placeholder='Behandel periode...' {...register('duration', {valueAsNumber:true})}/>
                <Input labelName='datum' type='date' {...register('date')}/>
                <TextArea labelName='Notities' placeholder='Dosering, obeservatie, gevolg...' type='text' />
                <FormBtn buttonText='Behandel' type='submit'/>
            </form>
            </div>
        <div className="fixed bottom-0 w-full ">
            <NavBar />
        </div>
        </div>
    </>
);


}

export default Treatment;
