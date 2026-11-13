import HamburgerMenu from "./HamburgerMenu.jsx";
import AuthButtons from "./AuthButtons.jsx";
function Header({HeaderTitle, HeaderSubtitle, createTitle}) {

    const staticTitle = 'KoeKompas';
    const staticSubtitle = 'Gezond boeren';

    return(
    <>
        <header className='bg-groen w-full h-[76px] flex justify-between items-center px-5 print:hidden'>
            <div className='flex gap-3'>
                <div >
                    <AuthButtons/>
                </div>

            <div className='flex flex-col'>
            <h2 className='text-wit font-bold'>{createTitle ? HeaderTitle : staticTitle}</h2>
            <p className='text-grijs'>{createTitle ? HeaderSubtitle : staticSubtitle}</p>

            </div>

            </div>

            <div>
            <HamburgerMenu />

            </div>


        </header>






    </>)


}

export default Header;