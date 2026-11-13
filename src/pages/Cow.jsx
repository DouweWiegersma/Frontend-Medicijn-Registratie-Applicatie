import {useMutation} from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import "../components/Form";
import { createCow } from "../api/createCow";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import NavBar from "../components/NavBar.jsx";
import Input from "../components/Input.jsx";
import FormBtn from "../components/FormBtn.jsx";
import {useForm} from "react-hook-form";
import TextArea from "../components/TextArea.jsx";

export default function Cow() {

    const {register,handleSubmit,
        formState: { errors },} = useForm({ defaultValues: {
            cowNumber: 0,
            name: "",
            birthDay: "",
            breed: "",
            note: "",}});

    const queryClient = useQueryClient();

    const createCowMutation = useMutation({
        mutationFn: createCow,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cows"]});
        },
    });

    function onSubmit(data) {
       createCowMutation.mutate(data);
    }

    return (
        <>

            <Header createTitle={false}/>
            <Hero title='Koe toevoegen' subtitle='Leg de diergegevens zorgvuldig vast' showDate={false}
                  caption='stalbeheer'/>

            <div className='mb-20 w-full p-[18px]'>
                <form onSubmit={handleSubmit(onSubmit)} className='p-[18px] border rounded-[22px] border-licht-groen  flex flex-col gap-2'>
                    <h2 className='flex justify-center text-3xl font-extrabold text-groen mt-5 mb-2'>Koe registreren</h2>

                    <Input type='number' name='cowNumber' labelName='Koe nummer' placeholder='Bijv. 7510'
                           {...register('cowNumber', { required: 'Koe nummer is verplicht',
                               valueAsNumber: true,
                               min: {
                                   value: 1,
                                   message: "Het nummer moet minimaal 1 zijn"},
                                   max: {
                                       value: 9999,
                                       message: "Het nummer mag maximaal 9999 zijn",
                                   }
                           })}
                           error={errors.cowNumber?.message}/>

                    <Input type='text' labelName='Naam' placeholder='Bijv. Bella'
                           {...register('name')}
                           error={errors.name?.message}/>

                    <Input type='date' labelName='Geboorte datum'
                           {...register('birthDay')}
                           error={errors.birthDay?.message}/>

                    <Input type='text' labelName='Ras' placeholder='...Holstein'
                           {...register('breed')}
                           error={errors.breed?.message}/>

                    <TextArea placeholder='Bijzonderheden over deze koe...' labelName='Notities' {...register('note')}
                              error={errors.note?.message}/>

                    <FormBtn buttonText='Koe opslaan'/>
                </form>
                {createCowMutation.isSuccess && (
                    <p className="px-[18px] text-green-700">
                        Koe is succesvol opgeslagen!
                    </p>
                )}

                {createCowMutation.isError && (
                    <p className="px-[18px] text-red-600">
                        {createCowMutation.error.message}
                    </p>
                )}

            </div>

                <div className="fixed bottom-0 w-full">
                    <NavBar />
                </div>


        </>
    );
}








