function Kpi({topic, title, result, backgroundcolor, children}){
    return (
    <>
        <div className={`${backgroundcolor} w-[109px] h-[128px] rounded-lg flex flex-col justify-between items-center pl-[12px] pr-[12px] pt-[14px] pb-[14px]`}>
            <span className='font-bold text-[11px] flex flex-col justify-center items-center'>
                {title}
                {children}
            </span>
            <div className='flex flex-col justify-center items-center'>
                <span className='text-[30px] font-bold'>
                    {result}
                </span>
            <p className='text-kpi-topic'>
                {topic}
            </p>
            </div>



        </div>

    </>
    )
}

export default Kpi;