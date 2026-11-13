import { IoHomeOutline } from "react-icons/io5";
import { GiCow } from "react-icons/gi";
import { MdOutlineInventory2 } from "react-icons/md";
import { GiClaws } from "react-icons/gi";
import { MdFileDownloadDone } from "react-icons/md";
import { BiInjection } from "react-icons/bi";
import { FaDisease } from "react-icons/fa6";
import { FaFolderPlus } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import { FaHospital } from "react-icons/fa";
import {Link} from "react-router-dom";
function NavBar(){

    return(
        <>
            <div className='w-full h-[74px] border-t border-licht-groen bg-licht-oranje rounded-b-2xl gap-1 flex items-center overflow-x-auto flex-nowrap'>

            <div className='min-w-[75px] w-[75px] h-full flex items-center justify-evenly hover:bg-zandkleur'>
                <Link to="/" className='flex flex-col items-center justify-center align-middle gap-1'>
                <span className='h-[32] w-[32] rounded-full'><IoHomeOutline/> </span>
                <p className='w-[33px] h-[12px] text-[8px] '>Overzicht</p>
            </Link>
            </div>

                <div className='min-w-[75px] w-[75px] h-full flex items-center justify-evenly hover:bg-zandkleur'>
                <Link to="/cows" className='flex flex-col items-center justify-center align-middle gap-1'>
                    <span className='h-[32] w-[32] rounded-full'><GiCow/> </span>
                    <p className='w-[33px] h-[12px] text-[8px]'>Koeien</p>
                </Link>
                </div>

                <div className='min-w-[75px] w-[75px] h-full flex items-center justify-evenly hover:bg-zandkleur'>
                <Link to="/medication-inventory" className='flex flex-col items-center justify-center align-middle gap-1'>
                    <span className='h-[32] w-[32] rounded-full'><MdOutlineInventory2/> </span>
                    <p className='w-[33px] h-[12px] text-[8px]'>Voorraad</p>
                </Link>
                </div>

                <div className='min-w-[75px] w-[75px] h-full flex items-center justify-evenly hover:bg-zandkleur'>
                <Link to="/treatment" className='flex flex-col items-center justify-center align-middle gap-1'>
                    <span className='h-[32] w-[32] rounded-full'> <MdFileDownloadDone/></span>
                    <p className='w-[33px] h-[12px] text-[8px]'>Behandelen</p>
                </Link>
                </div>

                <div className='min-w-[75px] w-[75px] h-full flex items-center justify-evenly hover:bg-zandkleur'>
                <Link to="/claw-treatment" className='flex flex-col items-center justify-center align-middle gap-1'>
                    <span className='h-[32] w-[32] rounded-full'><GiClaws/></span>
                    <p className='w-[33px] h-[12px] text-[8px]'>Klauwen</p>
                </Link>
                </div>

                <div className='min-w-[75px] w-[75px] h-full flex items-center justify-evenly hover:bg-zandkleur'>
                <Link to="/disease" className='flex flex-col items-center justify-center align-middle gap-1'>
                    <span className='h-[32] w-[32] rounded-full'><FaDisease/></span>
                    <p className='w-[33px] h-[12px] text-[8px]'>Ziektes</p>
                </Link>
                </div>

                <div className='min-w-[75px] w-[75px] h-full flex items-center justify-evenly hover:bg-zandkleur'>
                <Link to="/medication" className='flex flex-col items-center justify-center align-middle gap-1'>
                    <span className='h-[32] w-[32] rounded-full'> <BiInjection/></span>
                    <p className='w-[33px] h-[12px] text-[8px]'>Medicatie</p>
                </Link>
                </div>

                <div className='min-w-[75px] w-[75px] h-full flex items-center justify-evenly hover:bg-zandkleur'>
                <Link to="/restock" className='flex flex-col items-center justify-center align-middle gap-1'>
                    <span className='h-[32] w-[32] rounded-full'><FaFolderPlus/> </span>
                    <p className='w-[33px] h-[12px] text-[8px]'>Apotheek</p>
                </Link>
                </div>

                <div className='min-w-[75px] w-[75px] h-full flex items-center justify-evenly hover:bg-zandkleur'>
                    <Link to="/history" className='flex flex-col items-center justify-center align-middle gap-1'>
                        <span className='h-[32] w-[32] rounded-full'><BsBook/></span>
                        <p className=' h-[12px] text-[8px] w-full text-center'>Geschiedenis</p>
                    </Link>
                </div>

                <div className='min-w-[75px] w-[75px] h-full flex items-center justify-evenly hover:bg-zandkleur'>
                    <Link to="/clawhistory" className='flex flex-col items-center justify-center align-middle gap-1'>
                        <span className='h-[32] w-[32] rounded-full'><FaHospital/></span>
                        <p className=' h-[12px] text-[8px] w-full text-center'>Klauwdata</p>
                    </Link>
                </div>

                <div className='min-w-[75px] w-[75px] h-full flex items-center justify-evenly hover:bg-zandkleur'>
                    <Link to="/clawdetails" className='flex flex-col items-center justify-center align-middle gap-1'>
                        <span className='h-[32] w-[32] rounded-full'><FaHospital/></span>
                        <p className=' h-[12px] text-[8px] w-full text-center'>Koe Details</p>
                    </Link>
                </div>




            </div>
        </>
    )
}

export default NavBar;