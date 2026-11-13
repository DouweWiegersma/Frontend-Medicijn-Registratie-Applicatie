import { GoArrowRight } from "react-icons/go";

function QuickActionBtn({text, types, height}){

    return(

        <>
            <button type={types} className={`${height} bg-groen w-full h-[44px] p-[12px] text-[12px] rounded-[12px] border-licht-groen border-1 text-wit flex justify-between items-center`}> {text} <span> <GoArrowRight /> </span></button>
        </>
    )
}
 export default QuickActionBtn;