import { Button } from "react-bootstrap"
import hero from "../assets/hero.jpg"
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom";
export const Inicio = () => {

    const navigate = useNavigate();

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
                            <b class="text-balance text-2xl font-bold text-[#e35724] sm:text-6xl font-['Trebuchet']">travel</b>
                            <b class="text-balance text-2xl font-bold text-[#005ae0] sm:text-6xl font-['Trebuchet']">friends.com</b>
                            <p class="mt-6 text-lg leading-8 text-[#004c97] font-['Trebuchet']">Transformamos tus sueños, en viajes inolvidables</p>
                        </div>
                        <div class="px-10 pt-52 sm:pt-0 mt-10 flex items-center justify-center gap-x-6">
                            <Button href="/cotiza" variant="custom"
                                className="btn custom">Ver Promociones</Button>
                            <Button href="https://wa.me/5215512120049?text=Hola!%20quiero%20cotizar%20un%20viaje." variant="custom"
                                className="btn custom">Hablar con un agente <ChatBubbleOvalLeftIcon className="h-6 w-6 inline-block mr-2" /></Button>
                        </div>
                    </div>

                </div>
                <div class="grid grid-cols-1 sm:flex sm:flex-auto flex-row pt-32 gap-6">
                    <div class="ofertas-especiales flex w-10/12  flex-col pt-5 mx-8 sm:w-1/3 bg-[#004c97] bg-opacity-70 rounded-2xl"
                    onClick={() => navigate('/cotiza')}
                    style={{ cursor: 'pointer' }}>
                      {/*   <b class=" text-2xl text-center w-full font-bold text-slate-50">Ofertas exclusivas</b>
                        <p class="mt-5 text-2xl text-center text-slate-50">Descuentos y promociones especiales en vuelos y alojamientos. Planes de pago a la medida.</p>
                    */} </div>
                    <div class="planes flex  flex-col w-10/12  pt-5 mx-8 sm:w-1/3 bg-[#004c97] bg-opacity-70 rounded-2xl">
                        {/* <b class=" text-2xl text-center w-full font-bold text-slate-50">Atención personalizada</b>
                        <p class="mt-5 text-2xl text-center text-slate-50">Contacto directo con agentes; antes, durante y después del viaje.</p>
                */}     </div>
                    <div class="paquetes flex flex-col w-10/12 pt-5 mx-8 sm:w-1/3 bg-[#004c97] bg-opacity-70 rounded-2xl">
                       {/*  <b class=" text-2xl text-center w-full font-bold text-slate-50"></b>
                        <p class=" text-2xl mt-5 text-center text-slate-50"></p> */}
                    </div>
                </div>

            </div>


        </div>
    )
}