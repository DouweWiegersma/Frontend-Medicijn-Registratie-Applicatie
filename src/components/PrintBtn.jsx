import {MdOutlineLocalPrintshop} from "react-icons/md";

function PrintBtn(){
    return(
        <>
            <div className="flex px-4 print:hidden">
                <button
                    onClick={() => window.print()}
                    className="m-4 rounded-lg bg-groen px-4 py-2 text-wit flex justify-center items-center gap-1 hover:bg-licht-groen hover:text-black"
                >
                    <MdOutlineLocalPrintshop/>
                    Afdrukken
                </button>
            </div>
        </>


    )
}
export default PrintBtn;