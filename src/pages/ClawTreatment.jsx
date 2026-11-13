import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import CowSelector from "../components/CowSelector.jsx";
import NavBar from "../components/NavBar.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createClawTreatment} from "../api/createClawTreatment.js";
import FormBtn from "../components/FormBtn.jsx";
import {useForm, Controller} from "react-hook-form";
import ClawTreatmentSelector from "../components/ClawTreatmentSelector.jsx";
import TextArea from "../components/TextArea.jsx";
import Input from "../components/Input.jsx";

function ClawTreatment(){
    const { control, handleSubmit, register, formState: { errors },} = useForm({
        defaultValues: {
            note: "",
            cowNumber: null,
            selectedClaws: [],
            claws: {
                LV: null,
                RV: null,
                LA: null,
                RA: null,
            },
        },
    });
    const queryClient = useQueryClient();
    const createClawTreatmentMutation = useMutation({
        mutationFn: createClawTreatment,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["clawTreatment"]});
        },
    });

    function onSubmit(data) {
        const positions = ["LV", "RV", "LA", "RA"];

        const request = {
            cowNumber: data.cowNumber.cowNumber,
            note: data.note,
            dateClawTreatment: data.dateClawTreatment || null,

            claws: positions.map((position) => ({
                clawPosition: position,
                diseaseId: data.claws[position] ?? null,
            })),
        };

        console.log("Request:", JSON.stringify(request, null, 2));
        createClawTreatmentMutation.mutate(request);
    }

    // function onSubmit(data) {
    //     const request = {
    //         cowNumber: data.cowNumber.cowNumber,
    //         note: data.note,
    //         dateClawTreatment: data.dateClawTreatment
    //             ? data.dateClawTreatment
    //             : null,
    //         claws: data.selectedClaws.filter((position) => data.claws[position] !== null)
    //             .map((position) => ({
    //             clawPosition: position,
    //             diseaseId: data.claws[position],
    //         })),
    //     };
    //     console.log("Request:", JSON.stringify(request, null, 2));
    //     createClawTreatmentMutation.mutate(request);
    // }

        return (
            <>

                <div className="mb-20">
                    <Header createTitle={false}/>
                    <Hero
                        showDate={false}
                        title="Klauwgezondheid"
                        caption="Stalbeheer"
                        subtitle="Registreer iedere klauwbehandeling"
                    />

                    <div className='mb-20 w-full p-[18px]'>
                        <form onSubmit={handleSubmit(onSubmit)} className='p-[18px] border rounded-[22px] border-licht-groen flex flex-col gap-2'>
                            <h2 className='flex justify-center text-3xl font-extrabold text-groen mt-5 mb-2'>Klauw registreren</h2>
                            <Controller
                                name="cowNumber"
                                control={control}
                                rules={{
                                    required: "Selecteer een koe" }}
                                render={({ field }) => (
                                    <CowSelector
                                        selectedCow={field.value}
                                        onSelect={field.onChange}
                                        error1={errors.cowNumber?.message}
                                    />
                                )}
                            />
                            <ClawTreatmentSelector control={control} error1={errors.selectedClaws?.message}  />
                            <Input type='date' labelName='Behandel dag' {...register('dateClawTreatment' )}
                                   error={errors.dateClawTreatment?.message} />
                            <TextArea placeholder='Notities...' labelName='Notities' {...register('note')} error={errors.note?.message} />

                            <FormBtn   buttonText={createClawTreatmentMutation.isPending
                                ? "Opslaan..."
                                : "Behandeling opslaan"} type='submit'/>
                        </form>
                        {createClawTreatmentMutation.isSuccess && (
                            <p className="px-[18px] text-green-700">
                                Klauw behandeling is succesvol opgeslagen!
                            </p>
                        )}

                        {createClawTreatmentMutation.isError && (
                            <p className="px-[18px] text-red-600">
                                {createClawTreatmentMutation.error.message}
                            </p>
                        )}
                    </div>

                    <div className="fixed bottom-0 w-full">
                        <NavBar />
                    </div>
                </div>
            </>
        );
    }

export default ClawTreatment;

