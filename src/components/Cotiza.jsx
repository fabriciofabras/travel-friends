import { Button } from "react-bootstrap"
import hero from "../assets/hero.jpg"
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline"
import { StarIcon } from '@heroicons/react/24/solid'; // Outline style
import promotions from "../assets/promotions"
export const Cotiza = () => {

    const promociones = promotions;

    return (
        <div class="relative isolate px-2 pt-2 lg:px-2">
            <div class="absolute inset-x-0 -top-40 -z-10 overflow-hidden  sm:-top-80" aria-hidden="true">
                <div ></div>
            </div>
            <div class="mx-auto max-w-full py-32 lg-w-max">
                {/*  <div class="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Announcing our next round of funding. <a href="#" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                    </div>
                </div> */}


                <div class="grid grid-cols-1 sm:grid-cols-3  gap-6 ">

                    {
                        promociones.Promotions.map((promocion, index) => {
                            let promotionDetail = JSON.parse(promocion.PromotionDetail);
                            promotionDetail = promotionDetail.PromotionHotelDetail;
                            console.log("promotionDetail")
                            console.log(promotionDetail)
                            return (
                                <div class="flex flex-col  w-3/3 rounded-2xl">
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
                                            {promocion.Description}, {promocion.Adults} adultos.
                                        </p>
                                        <hr class="border-t-1 border-gray-300 my-2" />

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

                                            <a href={`https://wa.me/5215618984696?text=Hola!%20quiero%20reclamar%20esta%20oferta:${promocion.Name}.`} class="rounded-md border-2 border-white bg-[#004c97] px-3.5 py-2.5 text-sm font-semibold text-white hover:text-[#004c97] shadow-sm hover:bg-white hover:border-2 hover:border-[#004c97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Reclamar oferta</a>
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