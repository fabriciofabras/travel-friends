
export const Nosotros = () => {

    return(
        <div className="mi-div-nosotros relative isolate px-2 pt-2 lg:px-2">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#075985] to-[#3277d1] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" ></div>
            </div>
            <div className="mx-auto max-w-full py-32 sm:py-48 lg:py-56">
                {/*  <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Announcing our next round of funding. <a href="#" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                    </div>
                </div> */}

                <div className="flex flex-auto flex-row">
                    
                    <div className="flex flex-col w-1/2 mx-10">
                            <a className="text-balance text-2xl font-bold text-sky-800 sm:text-6xl">Travel Friend's</a>
                            <p className="mt-6 text-lg leading-8 text-sky-800">Transformamos tus sueños, en viajes inolvidables</p>
                       
                    </div>

                </div>
            </div>
            
           
        </div>
    )
}