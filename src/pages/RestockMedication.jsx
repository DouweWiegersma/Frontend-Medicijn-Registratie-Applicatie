import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import NavBar from "../components/NavBar.jsx";
import Input from "../components/Input.jsx";
import {useForm} from "react-hook-form";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getMedication} from "../api/getMedication.js";
import FormBtn from "../components/FormBtn.jsx";
import {createMedicationInventory} from "../api/createMedicationInventory.js";


function RestockMedication(){

    const {register,handleSubmit,
        formState: { errors },} = useForm({ defaultValues: {
            medicationId: 0,
            batchNumber: "",
            stockQuantity: 0,
            unit: ""
        }});

    const { data: medications = [], isLoading } = useQuery({
        queryKey: ["medications"],
        queryFn: getMedication,
    });

    const queryClient = useQueryClient();
    const createMedicationInventoryMutation = useMutation({
        mutationFn: createMedicationInventory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["medicationInventory"] });
        },
    });

    function onSubmit(data) {
        createMedicationInventoryMutation.mutate(data)
    }


return (
    <>
        <div className="mb-20">
            <Header createTitle={false} />
            <Hero
                showDate={false}
                title="Registratie Medicatie"
                caption="Stalbeheer"
                subtitle="Houd je medicijnvoorraad op peil."
            />
            <div className='mb-20 w-full p-[18px]'>
            <form onSubmit={handleSubmit(onSubmit)} className='p-[18px] border rounded-[22px] border-licht-groen flex flex-col gap-2'>
                <h2 className='flex justify-center text-3xl font-extrabold text-groen mt-5 mb-2'>Voorraad bijwerken</h2>
                <div className='flex flex-col'>
                <label htmlFor="medicationId" className="font-bold text-[11px] mt-3 mb-1">Medicijn</label>
                <select className='w-full rounded-lg border border-grijs p-3 text-sm outline-none'
                    id="medicationId"
                    {...register("medicationId", {
                        required: "Selecteer een medicijn",
                        valueAsNumber: true,
                    })}
                >
                    <option value="">Selecteer een medicijn</option>
                    {medications.map((medication) => (
                        <option key={medication.id} value={medication.id}>
                            {medication.name}
                        </option>
                    ))}

                </select>
                    {errors.medicationId && (
                        <p className="text-red-700 text-xs">
                            {errors.medicationId?.message}
                        </p>
                    )}

                </div>
                <Input type='text' labelName='BatchNummer' {...register('batchNumber', {
                    required: 'Batchnummer moet worden ingevuld',
                    valueAsNumber: true,
                })}  />
                {errors.batchNumber && (
                    <p className="text-red-700 text-xs">
                        {errors.batchNumber?.message}
                    </p>
                )}
                <div className='grid grid-cols-2 gap-3'>
                    <div>
                <Input type='number' labelName='Hoeveelheid' placeholder='De hoeveelheid is op basis van het batchNummer' {...register('stockQuantity',{
                 required: 'Hoeveelheid moet worden ingevuld',
                 valueAsNumber: true,
                    min: {
                     value: 0,
                     message: 'Hoeveelheid mag niet negatief zijn!'
                    }}
                    )} />
                {errors.stockQuantity && (
                    <p className="text-red-700 text-xs">
                        {errors.stockQuantity?.message}
                    </p>
                )}
                    </div>
                <div>

                <label htmlFor="unit" className="font-bold text-[11px] mt-3 mb-1">
                    Eenheid
                </label>
                <select {...register('unit', {
                    required: 'Hoeveelheid moet worden ingevuld'
                })}
                        className='w-full rounded-lg border border-grijs p-3 text-sm outline-none'>
                    <option value='CC'>CC</option>
                    <option value='INJECTOR'>Injector</option>
                    <option value='INFUSION'>Infuus</option>
                    error={errors.unit?.message}
                </select>
                </div>
                </div>
                {errors.unit && (
                    <p className="text-red-700 text-xs">
                        {errors.unit?.message}
                    </p>
                )}

                <div className='mt-5'>
                <FormBtn buttonText={createMedicationInventoryMutation.isPending ? 'Opslaan...' : 'Medicatie toevoegen'} type='submit' />
                </div>
            </form>
                {createMedicationInventoryMutation.isSuccess && (
                    <p className="px-[18px] text-green-700">
                        Medicatie is succesvol toegevoegd!
                    </p>
                )}

        </div>
        </div>
        <div className="fixed bottom-0 w-full">
            <NavBar />
        </div>
    </>
);
}
export default RestockMedication;
