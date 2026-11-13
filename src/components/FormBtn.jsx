

function FormBtn({buttonText}){
    return(
        <button type='submit' className='bg-groen w-full h-[44px] p-[12px] text-[12px] rounded-[12px] border-licht-groen border-1 text-wit flex justify-between items-center hover:bg-licht-groen hover:border-2 hover:border-groen hover:text-groen'>
            {buttonText}
        </button>
    )
}

export default FormBtn;