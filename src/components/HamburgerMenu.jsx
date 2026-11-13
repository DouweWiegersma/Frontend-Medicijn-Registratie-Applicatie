import { Link } from "react-router-dom";
import { useState} from "react";
import { IoHomeOutline } from "react-icons/io5";
import { GiCow } from "react-icons/gi";
import { MdOutlineInventory2 } from "react-icons/md";
import { GiClaws } from "react-icons/gi";
import { MdFileDownloadDone } from "react-icons/md";
import { BiInjection } from "react-icons/bi";
import { FaDisease } from "react-icons/fa6";
import { FaFolderPlus } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsBook } from "react-icons/bs";
import { FaHospital } from "react-icons/fa";


function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex items-center'>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex items center "
      >
          <RxHamburgerMenu className='text-wit h-10 w-10 hover:text-licht-groen'/>
      </button>
      {isOpen && (
        <nav className="absolute right-5 top-16 z-50 w-52 rounded-xl bg-wit p-4 shadow-lg">
          <ul className="flex flex-col gap-2 text-sm text-groen ">
            <li>
                <Link
                    to="/" className="block">
                  <div className='flex items-center gap-8 text-lg p-1 rounded-lg hover:bg-licht-groen w-full h-full'><IoHomeOutline/> Overzicht</div>
                </Link>
            </li>
            <li >
              <Link to="/cows" className="block">
                  <div className='flex items-center gap-8 text-lg p-1 rounded-lg hover:bg-licht-groen w-full h-full'><GiCow/> Koeien</div>
              </Link>
            </li>
            <li>
              <Link to="/disease" className="block">
                  <div className='flex items-center gap-8 text-lg p-1 rounded-lg hover:bg-licht-groen w-full h-full'><FaDisease/> Ziektes</div>
              </Link>
            </li>
            <li>
              <Link to="/medication" className="block">
                  <div className='flex items-center gap-8 text-lg p-1 rounded-lg hover:bg-licht-groen w-full h-full'><BiInjection/> Medicatie</div>
              </Link>
            </li>
              <li>
                  <Link to="/medication-inventory" className="block">
                      <div className='flex items-center gap-8 text-lg p-1 rounded-lg hover:bg-licht-groen w-full h-full'><MdOutlineInventory2/> Vorraad</div>
                  </Link>
              </li>
              <li>
                  <Link to="/treatment" className="block">
                      <div className='flex items-center gap-8 text-lg p-1 rounded-lg hover:bg-licht-groen w-full h-full'><MdFileDownloadDone/> Behandelen</div>
                  </Link>
              </li>
              <li>
                  <Link to="/claw-treatment" className="block">
                      <div className='flex items-center gap-8 text-lg p-1 rounded-lg hover:bg-licht-groen w-full h-full'><GiClaws/> Klauwen</div>
                  </Link>
              </li>
              <li>
                  <Link to="/history" className="block">
                      <div className='flex items-center gap-8 text-lg p-1 rounded-lg hover:bg-licht-groen w-full h-full'><FaFolderPlus/> Geschiedenis</div>
                  </Link>
              </li>

              <li>
                  <Link to="/clawhistory" className="block">
                      <div className='flex items-center gap-8 text-lg p-1 rounded-lg hover:bg-licht-groen w-full h-full'><FaHospital/> Klauwdata</div>
                  </Link>
              </li>

              <li>
                  <Link to="/restock" className="block">
                      <div className='flex items-center gap-8 text-lg p-1 rounded-lg hover:bg-licht-groen w-full h-full'><BsBook/> Apotheek</div>
                  </Link>
              </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default HamburgerMenu;
