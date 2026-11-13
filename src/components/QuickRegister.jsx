import QuickActionBtn from "./QuickActionBtn.jsx";
import {Link} from "react-router-dom";

function QuickRegister(){

    return(
    <>
        <div className='w-full h-[188px] bg-groen p-[18px] rounded-[22px] mt-3.5 flex flex-col'>

            <div>
                <p className='text-[10px] text-geel tracking-widest font-extrabold uppercas'>snel registreren</p>
                <h2 className='text-wit text-[20px] font-georgia tracking-wide font-extrabold'>
                    Wat wil je doen?
                </h2>
            </div>

            <div className='grid grid-cols-2 gap-4 w-full'>
                <Link to='/cows'>
               <QuickActionBtn text='koe'/>
                </Link>
                <Link to='/treatment'>
                <QuickActionBtn text='behandeling' />
                </Link>
                <Link to='/claw-treatment'>
                <QuickActionBtn text='klauw' />
                </Link>
                <Link to='/medication-inventory'>
                <QuickActionBtn text='voorraad' />
                </Link>
            </div>




        </div>


    </>
    )
}
 export default QuickRegister;