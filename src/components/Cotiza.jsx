import { Button } from "react-bootstrap"
import hero from "../assets/hero.jpg"
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline"
import { StarIcon } from '@heroicons/react/24/solid'; // Outline style
import promotions from "../assets/promotions"
import { Helmet } from "react-helmet";

export const Cotiza = () => {

    const promociones = promotions;

    return (
        <div className="relative isolate px-2 pt-2 lg:px-2">
            <Helmet>
                <title>Agencia de Viajes en Satélite | Travel Friends</title>
                <meta name="description" content="Cotiza tu viaje con Travel Friends. Diseñamos paquetes a medida desde Naucalpan y Satélite. Rápido, fácil y con atención cara a cara." />
            </Helmet>
            <div className="absolute inset-x-0 -top-40 -z-10 overflow-hidden  sm:-top-80" aria-hidden="true">
                <div ></div>
            </div>
            <div className="mx-auto max-w-full py-32 lg-w-max">
                {/*  <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Announcing our next round of funding. <a href="#" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                    </div>
                </div> */}


                <div className="grid grid-cols-1 sm:grid-cols-3  gap-6 ">

                    {
                        promociones.Promotions.map((promocion, index) => {
                            let promotionDetail = JSON.parse(promocion.PromotionDetail);
                            promotionDetail = promotionDetail.PromotionHotelDetail;
                            console.log("promotionDetail")
                            console.log(promotionDetail)
                            return (
                                <div className="flex flex-col  w-3/3 rounded-2xl">
                                    <img className="rounded-lg" src={promocion.UrlImage}></img>
                                    <div className="m-2 mb-0">
                                        <h1 className="titulo-promociones">{promocion.Name}
                                            <div className="flex space-x-1">
                                                {


                                                    Array.from({ length: promotionDetail.Category }, (_, index) => (
                                                        <StarIcon className="h-4 w-4 text-yellow-500"></StarIcon>
                                                    )

                                                    )}
                                            </div>
                                        </h1>
                                        <p className="descripcion-promociones">
                                            {promocion.Description}, {promocion.Adults} adultos {promocion.Kids ? `${promocion.Kids} menores` : ""} 
                                        </p>
                                        <hr className="border-t-1 border-gray-300 my-2" />

                                        <p className="descripcion-promociones">
                                            {promotionDetail.Room} -  {promotionDetail.MealPlan}
                                        </p>


                                    </div>
                                    <footer className="text-right m-2 mt-0 grid grid-cols-1 gap-3">
                                        <div>
                                            <p className="text-[#7e7e7e]">
                                                desde
                                            </p>
                                            <p className="precio">
                                                ${(Math.round(promocion.Total)).toLocaleString()}.00 MXN
                                            </p>
                                            <p className="text-[#7e7e7e]">
                                                precio total
                                            </p>
                                        </div>

                                        <div className="pt-2">

                                            <Button href={`https://wa.me/5215512120049?text=Hola!%20quiero%20reclamar%20esta%20oferta:${promocion.Name}.`} variant="custom"
                                                className="btn custom">Reclamar oferta</Button>
                                        </div>
                                        <div>
                                            <p className="policies-promociones pt-2">
                                                {promocion.Policies}
                                            </p>
                                        </div>
                                    </footer>

                                </div>
                            )
                        }
                        )

                    }

                </div>

            </div>




        </div>
    )
}