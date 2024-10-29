import hero from "../assets/hero.jpg"
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline"
export const Inicio = () => {

    return (
        <div class="relative isolate px-2 pt-2 lg:px-2">
            <div class="absolute inset-x-0 -top-40 -z-10 overflow-hidden  sm:-top-80" aria-hidden="true">
                <div ></div>
            </div>
            <div class="mx-auto max-w-full py-32 sm:py-48 lg:py-40  lg-w-max">
                {/*  <div class="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Announcing our next round of funding. <a href="#" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                    </div>
                </div> */}

                <div class="flex flex-auto flex-row">
                    <div class="flex w-1/2">

                    </div>
                    <div class="flex flex-col w-1/2">
                        <div>
                        <a class="text-balance text-2xl font-bold text-[#e35724] sm:text-6xl font-['Trebuchet']">travel</a>
                        <a class="text-balance text-2xl font-bold text-[#005ae0] sm:text-6xl font-['Trebuchet']">friends.com.mx</a>
                        <p class="mt-6 text-lg leading-8 text-[#004c97] font-['Trebuchet']">Transformamos tus sueños, en viajes inolvidables</p>
                        </div>
                        <div class="mt-10 flex items-center justify-center gap-x-6">
                            <a href="#" class="rounded-md bg-[#004c97] px-3.5 py-2.5 text-sm font-semibold text-white hover:text-[#004c97] shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cotizar alojamientos</a>
                            <a href="https://wa.me/5215618984696?text=Hola!%20quiero%20cotizar%20un%20viaje." class="rounded-md bg-[#004c97] px-3.5 py-2.5 text-sm font-semibold text-white hover:text-[#004c97] shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Hablar con un agente <ChatBubbleOvalLeftIcon className="h-6 w-6 inline-block mr-2"/></a>
                        </div>
                    </div>

                </div>
                <div class="flex flex-auto flex-row pt-10">
                    <div class="flex flex-col pt-5 mx-8 w-1/3 bg-[#004c97] bg-opacity-60 rounded-2xl">
                        <a class=" text-2xl text-center w-full font-bold text-slate-50">Ofertas exclusivas</a>
                        <p class="mt-5 text-2xl text-center text-slate-50">Descuentos y promociones especiales en vuelos y alojamientos. Planes de pago a la medida.</p>
                    </div>
                    <div class="flex  flex-col pt-5 mx-8 w-1/3 bg-sky-800 bg-opacity-60 rounded-2xl">
                        <a class=" text-2xl text-center w-full font-bold text-slate-50">Atención personalizada</a>
                        <p class="mt-5 text-2xl text-center text-slate-50">Contacto directo con agentes; antes, durante y después del viaje.</p>
                    </div>
                    <div class="flex  flex-col pt-5 mx-8 w-1/3 bg-sky-800 bg-opacity-60 rounded-2xl">
                        <a class=" text-2xl text-center w-full font-bold text-slate-50">Sin complicaciones</a>
                        <p class=" text-2xl mt-5 text-center text-slate-50">Resolvemos tu viaje: Alojamiento, vuelos, traslados y atracciones en un sólo paquete.</p>
                    </div>
                </div>

            </div>


        </div>
    )
}