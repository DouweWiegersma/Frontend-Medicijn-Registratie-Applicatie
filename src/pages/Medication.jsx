import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import NavBar from "../components/NavBar.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createMedication} from "../api/createMedication.js";
import FormBtn from "../components/FormBtn.jsx";
import {useForm} from "react-hook-form";
import Input from "../components/Input.jsx";
import TextArea from "../components/TextArea.jsx";


function Medication() {

    const {register,handleSubmit,
        formState: { errors },} = useForm({ defaultValues: {
            name: "",
            description: "",
            milkWithholdingPeriod: null,
            meatWithdrawalPeriod: null,
            milkTime: "",
            meatTime: "",
            unit: ""
        }});

    const queryClient = useQueryClient();

    const createMedicationMutation = useMutation({
        mutationFn: createMedication,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["medication"] });
        },
    });

    function onSubmit(data) {
        createMedicationMutation.mutate(data)
    }

    return (
        <>
            <div className="mb-20">
                <Header createTitle={false} />
                <Hero
                    showDate={false}
                    title="Medicatie"
                    caption="Stalbeheer"
                    subtitle="Registreer middelen en wachttijden"
                />
                <div className='mb-20 w-full p-[18px]'>
                    <form onSubmit={handleSubmit(onSubmit)} className='p-[18px] border rounded-[22px] border-licht-groen  flex flex-col gap-2'>
                        <h2 className='flex justify-center text-3xl font-extrabold text-groen mt-5 mb-2'>Nieuw Medicijn</h2>
                        <Input type='text' labelName='naam' placeholder='Bijv Avuloxil...' {...register('name', {
                        required: 'naam moet worden ingevuld'
                        })} error={errors.name?.message}/>

                        <div>
                            <label htmlFor="unit"
                                   className="font-bold text-[11px] mt-3 mb-1"> Medicijn Eenheid </label>
                            <select
                                {...register('unit', {
                                    required: 'Hoeveelheid moet worden ingevuld'
                                })}
                                className="w-full rounded-lg border border-grijs bg-wit p-3 h-[47px] text-sm"
                            >
                                <option>Wat is de éénheid van dit medicijn</option>
                                <option value="CC">CC</option>
                                <option value="INJECTOR">injector</option>
                                <option value="INFUSION">Infuus</option>
                                <option value="ML">ML</option>
                            </select>
                        </div>

                        <TextArea labelName='Omschrijving' placeholder='Werking en gebruik...' {...register('description', {
                        required: 'omschrijving moet worden ingevuld'
                        })} error={errors.description?.message}/>


                        <div className='w-full grid grid-cols-2 gap-5'>
                        <div>
                        <Input type='number' labelName='Wachtijd Melk' {...register('milkWithholdingPeriod', {
                            required: 'Wachtijd melk moet worden ingevuld',
                            valueAsNumber: true,
                                min:{
                                value: 0,
                                    message: 'Wachtijd melk mag niet negatief zijn'
                        }
                        })} error={errors.milkWithholdingPeriod?.message}/>
                        </div>

                            <div>
                                <label
                                    htmlFor="milkUnit"
                                    className="font-bold text-[11px] mt-3 mb-1"
                                >
                                    Eenheid (Melk)
                                </label>
                                <select
                                    {...register('milkTime', {
                                        required: 'Melk eenheid moet worden geselecteerd'
                                    })}
                                    className="w-full rounded-lg border border-grijs bg-wit p-3 h-[47px] text-sm"
                                >
                                    <option value="DAYS">Dagen</option>
                                    <option value="HOURS">Uur</option>
                                </select>
                            </div>
                        </div>


                        <div className='w-full grid grid-cols-2 gap-5'>
                            <div>
                        <Input type='number' labelName='Wachtijd Vlees' {...register('meatWithdrawalPeriod', {
                            required: 'Wachtijd vlees moet worden ingevuld',
                            valueAsNumber: true,
                            min:{
                                value: 0,
                                message: 'Wachtijd vlees mag niet negatief zijn'
                            }
                        })} error={errors.meatWithdrawalPeriod?.message}/>
                            </div>
                            <div>
                            <label
                                htmlFor="meatUnit"
                                className="font-bold text-[11px] mt-3 mb-1"
                            >
                                Eenheid (Vlees)
                            </label>
                            <select
                                {...register('meatTime', {
                                    required: 'Vlees eenheid moet worden geselecteerd',
                                })}
                                className="w-full rounded-lg border border-grijs bg-wit p-3 h-[47px] text-sm"
                            >
                                <option value="DAYS">Dagen</option>
                                <option value="HOURS">Uur</option>
                            </select>
                        </div>
                        </div>

                        <div className='w-full grid grid-cols-1 gap-5'>
                            <div>
                        {/*<Input type='number' labelName='Hoeveelheid' {...register('volume',{*/}
                        {/*    required: 'Hoeveelheid moet worden ingevuld',*/}
                        {/*    min: {*/}
                        {/*        value: 0,*/}
                        {/*        message: 'Hoeveelheid is te laag'*/}
                        {/*    }*/}
                        {/*})} error={errors.volume?.message}/>*/}
                            </div>

                        </div>

                        <FormBtn buttonText={createMedicationMutation.isPending ? 'Opslaan...' : 'Medicatie Opslaan'} type='submit'/>
                    </form>
                </div>

            </div>
            <div className="fixed bottom-0 w-full">
                <NavBar />
            </div>
        </>
    );
}

export default Medication;

