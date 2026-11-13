import QuickActionBtn from "./QuickActionBtn.jsx";
//
// function Form({title, identifier, placeholder, btnText, children, textField, value, onChange, onSubmit}){
//
//
//     return(
//         <>
//             <div className='w-full p-[18px]'>
//             <form className='p-[18px] border rounded-[22px] border-licht-groen' onSubmit={onSubmit} >
//             <h2 className='font-bold font-georgia' >{title}</h2>
//                 <label htmlFor='id' className='font-bold text-[11px] mt-3'>{identifier}
//                 </label>
//                 {textField &&
//             <input
//                 value={value}
//                 id='id'
//                 type='text'
//                 placeholder={placeholder}
//                 className="w-full rounded-lg border border-grijs p-3 h-[47px] text-sm outline-none"
//                 onChange={onChange}
//             />}
//                 {children}
//                 <div className='mt-5'>
//                 <QuickActionBtn text={btnText}  types="submit" height='h-[52px]' />
//                 </div>
//
//
//
//
//             </form>
//             </div>
//
//
//
//         </>
//     )
// }
//  export default Form;
//


import { useForm } from "react-hook-form";
function Form({
                  fields = [],
                  defaultValues = {},
                  onSubmit,
                  btnText,
                  title,
                  children,
                  childrenFirst = false,
                  isPending = false,
              }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: "onSubmit",
    });


const renderError = (name) => {
    if (!errors[name]) return null;

    return (
        <p className="mt-1 text-sm text-red-700">
            {errors[name].message}
        </p>
    );
};

const renderFields = () =>
    fields.map((field) => (
        <div key={field.name} className="flex flex-col">
            <label
                htmlFor={field.name}
                className="font-bold text-[11px] mt-3 mb-1"
            >
                {field.label}
            </label>

            {field.type === "textarea" ? (
                <textarea
                    id={field.name}
                    placeholder={field.placeholder}
                    {...register(field.name, field.validation)}
                    className="w-full rounded-lg border border-grijs p-3 text-sm outline-none min-h-[112px]"
                />
            ) : field.type === "file" ? (
                <input
                    id={field.name}
                    type="file"
                    {...register(field.name, field.validation)}
                    className="w-full rounded-lg border border-grijs p-3 text-sm outline-none"
                />
            ) : (
                <input
                    id={field.name}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    {...register(field.name, {
                        ...field.validation,
                        valueAsNumber:
                            field.type === "number",
                    })}
                    className="w-full rounded-lg border border-grijs p-3 h-[47px] text-sm outline-none"
                />
            )}

            {renderError(field.name)}
        </div>
    ));

const renderChildren = () => {
    if (typeof children === "function") {
        return children({ register, errors });
    }

    return children;
};

return (
    <div className="w-full p-[18px]">
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="p-[18px] border rounded-[22px] border-licht-groen"
        >
            <h2 className="font-bold font-georgia">{title}</h2>

            {childrenFirst && renderChildren()}
            {renderFields()}
            {!childrenFirst && renderChildren()}

            <div className="mt-5">
                <QuickActionBtn
                    text={isPending ? "Bezig met opslaan..." : btnText}
                    types="submit"
                    height="h-[52px]"
                    disabled={isPending}
                />
            </div>
        </form>
    </div>
);


}

export default Form;

