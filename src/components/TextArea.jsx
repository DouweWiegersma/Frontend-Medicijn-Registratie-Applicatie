function TextArea({ labelName, placeholder, ...props}){

    return(
        <>

            <label
                htmlFor={props.name}
                className="font-bold text-[11px] mt-3 mb-1"
            >
                {labelName}
            </label>
            <textarea
                {...props}
                id={props.name}
                placeholder={placeholder}
                className="w-full rounded-lg border border-grijs p-3 text-sm outline-none min-h-[112px]"
            />
            {props.error && (
                <p className="text-red-700 text-xs">
                    {props.error}
                </p>
            )}



        </>


    )
}

export default TextArea;