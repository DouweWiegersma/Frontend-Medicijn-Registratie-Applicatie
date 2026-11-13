import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import KpiGrid from "../components/KpiGrid.jsx";
import InfoPanel from "../components/InfoPanel.jsx";
import QuickRegister from "../components/QuickRegister.jsx";
import NavBar from "../components/NavBar.jsx";

function Home(){


    return(
        <>
            <div className='border-grijs border-l border-r pb-24'>
                <Header HeaderTitle='StalKompas' HeaderSubtitle='Gezond boeren'/>
                <Hero subtitle='Hier is de gezondheid van je veestapel.' showDate={true}/>
                <section className='pl-[16px] pr-[16px]'>
                    <KpiGrid />
                    <InfoPanel emptyStateDescription='Registreer je eerste behandelingen om hier een tijdlijn te zien.' emptyStateTitle='Nog geen behandelingen ' title='Laatste behandelingen' eyeBrow='Actueel' buttonOrState={true}/>
                    <QuickRegister/>
                </section>

            </div>
            <div className='fixed bottom-0 w-full'>
            <NavBar />
            </div>
        </>
    )
}

export default Home;