import {useMutation, useQueryClient} from "@tanstack/react-query";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import NavBar from "../components/NavBar.jsx";
import {createDisease} from "../api/createDisease.js";
import Input from "../components/Input.jsx";
import TextArea from "../components/TextArea.jsx";
import FormBtn from "../components/FormBtn.jsx";
import {useForm} from "react-hook-form";
import {useState} from "react";

function Disease() {

    const [message, setMessage] = useState(null);
    const queryClient = useQueryClient();
    const createDiseaseMutation = useMutation({
        mutationFn: createDisease,
        onSuccess: () => {
            setMessage({
                type: "success",
                text: "Ziekte succesvol opgeslagen!"
            });

            setTimeout(() => {
                setMessage(null);
            }, 1000);

            queryClient.invalidateQueries({ queryKey: ["disease"] });
        },

    });

    const {register,handleSubmit,
        formState: { errors },} = useForm({ defaultValues: {
            name: "",
            description: "",
            treatment: ""}});

    function onSubmit(data) {
        createDiseaseMutation.mutate(data);
    }


    return (
        <>
            <div className="mb-20">
                <Header createTitle={false} />

                <Hero
                    showDate={false}
                    title="Ziektes"
                    caption="Stalbeheer"
                    subtitle="Bouw je eigen behandelkennisbank."
                />
                <div className='mb-20 w-full p-[18px]'>
                <form onSubmit={handleSubmit(onSubmit)} className='p-[18px] border rounded-[22px] border-licht-groen  flex flex-col gap-2'>
                    <h2 className='flex justify-center text-3xl font-extrabold text-groen mt-5 mb-2'>Ziekte registreren</h2>
                    <Input type='text' placeholder='Bijv mastitus...' labelName='Naam' {...register('name', {
                        required: 'Naam moet worden ingevuld'
                    })} error={errors.name?.message} />

                    <TextArea labelName='Omschrijving' placeholder='Symptomen en diagnose...' {...register('description', {
                        required: 'Omschrijving moet worden ingevuld'
                    })} error={errors.description?.message}/>
                    <TextArea labelName='Hoe te behandelen' placeholder='Stappen, aandachtspunten en nazorg...'/>
                    <FormBtn buttonText={createDiseaseMutation.isPending ? 'Opslaan...' : 'Ziekte Opslaan'} type='submit'/>
                    {message && (
                        <p className={`px-[18px] ${
                            message.type === "success"
                                ? "text-green-700"
                                : "text-red-600"
                        }`}>
                            {message.type === "success" ? "✓ " : "✕ "}
                            {message.text}
                        </p>
                    )}
                </form>
                </div>
            <div className="fixed bottom-0 w-full">
                <NavBar />
            </div>
            </div>
        </>
    );
}

export default Disease;

