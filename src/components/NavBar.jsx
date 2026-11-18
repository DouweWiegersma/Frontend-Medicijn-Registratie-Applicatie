import { IoHomeOutline } from "react-icons/io5";
import { GiCow, GiClaws } from "react-icons/gi";
import { MdOutlineInventory2, MdFileDownloadDone } from "react-icons/md";
import { BiInjection } from "react-icons/bi";
import { FaDisease } from "react-icons/fa6";
import { FaFolderPlus, FaHospital } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import { Link } from "react-router-dom";

function NavBar() {

return (
    <div className='w-full h-[74px] border-t border-licht-groen bg-licht-oranje rounded-b-2xl gap-1 flex items-center overflow-x-auto flex-nowrap'>

        <div className='min-w-[75px] w-[75px] h-full flex items-center justify-center hover:bg-zandkleur'>
            <Link to="/" className='w-full h-full flex flex-col items-center justify-center gap-1'>
                <span className='w-8 h-8 flex items-center justify-center'>
                    <IoHomeOutline className='w-6 h-6' />
                </span>
                <p className='w-full h-3 text-[8px] text-center'>Overzicht</p>
            </Link>
        </div>

        <div className='min-w-[75px] w-[75px] h-full flex items-center justify-center hover:bg-zandkleur'>
            <Link to="/cows" className='w-full h-full flex flex-col items-center justify-center gap-1'>
                <span className='w-8 h-8 flex items-center justify-center'>
                    <GiCow className='w-6 h-6' />
                </span>
                <p className='w-full h-3 text-[8px] text-center'>Koeien</p>
            </Link>
        </div>

        <div className='min-w-[75px] w-[75px] h-full flex items-center justify-center hover:bg-zandkleur'>
            <Link to="/medication-inventory" className='w-full h-full flex flex-col items-center justify-center gap-1'>
                <span className='w-8 h-8 flex items-center justify-center'>
                    <MdOutlineInventory2 className='w-6 h-6' />
                </span>
                <p className='w-full h-3 text-[8px] text-center'>Voorraad</p>
            </Link>
        </div>

        <div className='min-w-[75px] w-[75px] h-full flex items-center justify-center hover:bg-zandkleur'>
            <Link to="/treatment" className='w-full h-full flex flex-col items-center justify-center gap-1'>
                <span className='w-8 h-8 flex items-center justify-center'>
                    <MdFileDownloadDone className='w-6 h-6' />
                </span>
                <p className='w-full h-3 text-[8px] text-center'>Behandelen</p>
            </Link>
        </div>

        <div className='min-w-[75px] w-[75px] h-full flex items-center justify-center hover:bg-zandkleur'>
            <Link to="/claw-treatment" className='w-full h-full flex flex-col items-center justify-center gap-1'>
                <span className='w-8 h-8 flex items-center justify-center'>
                    <GiClaws className='w-6 h-6' />
                </span>
                <p className='w-full h-3 text-[8px] text-center'>Klauwen</p>
            </Link>
        </div>

        <div className='min-w-[75px] w-[75px] h-full flex items-center justify-center hover:bg-zandkleur'>
            <Link to="/disease" className='w-full h-full flex flex-col items-center justify-center gap-1'>
                <span className='w-8 h-8 flex items-center justify-center'>
                    <FaDisease className='w-6 h-6' />
                </span>
                <p className='w-full h-3 text-[8px] text-center'>Ziektes</p>
            </Link>
        </div>

        <div className='min-w-[75px] w-[75px] h-full flex items-center justify-center hover:bg-zandkleur'>
            <Link to="/medication" className='w-full h-full flex flex-col items-center justify-center gap-1'>
                <span className='w-8 h-8 flex items-center justify-center'>
                    <BiInjection className='w-6 h-6' />
                </span>
                <p className='w-full h-3 text-[8px] text-center'>Medicatie</p>
            </Link>
        </div>

        <div className='min-w-[75px] w-[75px] h-full flex items-center justify-center hover:bg-zandkleur'>
            <Link to="/restock" className='w-full h-full flex flex-col items-center justify-center gap-1'>
                <span className='w-8 h-8 flex items-center justify-center'>
                    <FaFolderPlus className='w-6 h-6' />
                </span>
                <p className='w-full h-3 text-[8px] text-center'>Apotheek</p>
            </Link>
        </div>

        <div className='min-w-[75px] w-[75px] h-full flex items-center justify-center hover:bg-zandkleur'>
            <Link to="/history" className='w-full h-full flex flex-col items-center justify-center gap-1'>
                <span className='w-8 h-8 flex items-center justify-center'>
                    <BsBook className='w-6 h-6' />
                </span>
                <p className='w-full h-3 text-[8px] text-center'>Geschiedenis</p>
            </Link>
        </div>

        <div className='min-w-[75px] w-[75px] h-full flex items-center justify-center hover:bg-zandkleur'>
            <Link to="/clawhistory" className='w-full h-full flex flex-col items-center justify-center gap-1'>
                <span className='w-8 h-8 flex items-center justify-center'>
                    <FaHospital className='w-6 h-6' />
                </span>
                <p className='w-full h-3 text-[8px] text-center'>Klauwdata</p>
            </Link>
        </div>

        <div className='min-w-[75px] w-[75px] h-full flex items-center justify-center hover:bg-zandkleur'>
            <Link to="/clawdetails" className='w-full h-full flex flex-col items-center justify-center gap-1'>
                <span className='w-8 h-8 flex items-center justify-center'>
                    <FaHospital className='w-6 h-6' />
                </span>
                <p className='w-full h-3 text-[8px] text-center'>Koe Details</p>
            </Link>
        </div>

    </div>
);


}

export default NavBar;
