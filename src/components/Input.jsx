function Input({ placeholder, type, labelName , ...props}){

    return (
        <>
            <label
                htmlFor={props.name}
                className="font-bold text-[11px] mt-3 mb-1">
                {labelName}
            </label>
        <input id={props.name} type={type} placeholder={placeholder} {...props} className='w-full rounded-lg border border-grijs p-3 text-sm outline-none'/>
            {props.error && (
                <p className="text-red-700 text-xs">
                    {props.error}
                </p>
            )}
        </>



    )
}

export default Input;