import hero from "../assets/hero.jpg"
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline"
export const Inicio = () => {

    return (
        <div class="mi-div relative isolate px-2 pt-2 lg:px-2">
            <div class="absolute inset-x-0 -top-40 -z-10 overflow-hidden  sm:-top-80" aria-hidden="true">
                <div ></div>
            </div>
            <div class="mx-auto max-w-full pt-32 sm:pt-0 lg:py-40  lg-w-max">
                <div class="flex flex-auto flex-row">
                    <div class="flex w-1/2 hidden sm:block">

                    </div>
                    <div class="flex flex-col sm:w-1/2">
                        <div className="px-10 sm:px-0">
                            <a class="text-balance text-2xl font-bold text-[#e35724] sm:text-6xl font-['Trebuchet']">travel</a>
                            <a class="text-balance text-2xl font-bold text-[#005ae0] sm:text-6xl font-['Trebuchet']">friends.com</a>
                            <p class="mt-6 text-lg leading-8 text-[#004c97] font-['Trebuchet']">Transformamos tus sueños, en viajes inolvidables</p>
                        </div>
                        <div class="px-10 pt-52 sm:pt-0 mt-10 flex items-center justify-center gap-x-6">
                            <a href="/cotiza" className="min-h-14 sm:min-h-10 rounded-md bg-[#004c97] px-3.5 py-2.5 text-sm font-semibold text-white hover:text-[#004c97] shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ver Promociones</a>
                            <a href="https://wa.me/5215512120049?text=Hola!%20quiero%20cotizar%20un%20viaje." className="min-h-14 sm:min-h-10 rounded-md bg-[#004c97] px-3.5 py-2.5 text-sm font-semibold text-white hover:text-[#004c97] shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Hablar con un agente <ChatBubbleOvalLeftIcon className="h-6 w-6 inline-block mr-2" /></a>
                        </div>
                    </div>

                </div>
                <div class="grid grid-cols-1 sm:flex sm:flex-auto flex-row pt-10 gap-6">
                    <div class="flex flex-col pt-5 mx-8 sm:w-1/3 bg-[#004c97] bg-opacity-70 rounded-2xl">
                        <a class=" text-2xl text-center w-full font-bold text-slate-50">Ofertas exclusivas</a>
                        <p class="mt-5 text-2xl text-center text-slate-50">Descuentos y promociones especiales en vuelos y alojamientos. Planes de pago a la medida.</p>
                    </div>
                    <div class="flex  flex-col pt-5 mx-8 sm:w-1/3 bg-[#004c97] bg-opacity-70 rounded-2xl">
                        <a class=" text-2xl text-center w-full font-bold text-slate-50">Atención personalizada</a>
                        <p class="mt-5 text-2xl text-center text-slate-50">Contacto directo con agentes; antes, durante y después del viaje.</p>
                    </div>
                    <div class="flex  flex-col pt-5 mx-8 sm:w-1/3 bg-[#004c97] bg-opacity-70 rounded-2xl">
                        <a class=" text-2xl text-center w-full font-bold text-slate-50">Sin complicaciones</a>
                        <p class=" text-2xl mt-5 text-center text-slate-50">Resolvemos tu viaje: Alojamiento, vuelos, traslados y atracciones en un sólo paquete.</p>
                    </div>
                </div>

            </div>


        </div>
    )
}