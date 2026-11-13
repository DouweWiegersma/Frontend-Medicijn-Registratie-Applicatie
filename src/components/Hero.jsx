function Hero({ title , subtitle, caption , showDate} ){
    const today = new Date();
    const date = today.toLocaleDateString("nl-NL", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

    const uur = today.getHours();
    let welcomeMessage;
    if (uur < 6) {
        welcomeMessage = "Goedenacht";
    } else if (uur < 12) {
        welcomeMessage = "Goedemorgen";
    } else if (uur < 18) {
        welcomeMessage = "Goedemiddag";
    } else {
        welcomeMessage = "Goedenavond";
    }



    return(
    <>
        <div className='h-[133px] bg-groen p-[22px] rounded-b-3xl print:hidden'>
            <p className='text-geel'> {showDate ? date : caption} </p>
            <h1 className='text-wit'>{showDate ? welcomeMessage : title}</h1>
            <p className='text-[14px] text-grijs'>{subtitle}</p>
        </div>

    </>
    )

}

export default Hero;