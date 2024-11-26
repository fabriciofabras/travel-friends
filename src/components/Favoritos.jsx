import { Button } from "react-bootstrap"
import hero from "../assets/hero.jpg"
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline"
import { StarIcon } from '@heroicons/react/24/solid'; // Outline style
import promotions from "../assets/promotions"
import destinos from "../assets/destinos"
import { useNavigate } from 'react-router-dom';

export const Favoritos = () => {

    const promociones = promotions;

    const navigate = useNavigate();

    const handleClick = (destinoId, id) => {

        console.log(destinoId)
        console.log(id)
        navigate(`/hotel/${destinoId}/${id}`);
    };

    return (
        <div class="relative isolate px-2 pt-2 lg:px-2">
            <div class="absolute inset-x-0 -top-40 -z-10 overflow-hidden  sm:-top-80" aria-hidden="true">
                <div ></div>
            </div>
            <div class="mx-auto max-w-full py-32 lg-w-max">
                {/*  <div class="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Announcing our next round of funding. <b href="#" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></b>
                    </div>
                </div> */}

                <b className="h2-travel">Destinos Favoritos</b>
                <div class="grid grid-cols-1 sm:grid-cols-1  gap-6 ">
                    {
                        destinos.map((destino, index) => {

                            return (<>
                                <b className="h3-travel">{destino.titulo}</b>
                                <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">

                                    {
                                        destino.hoteles.map((hotel, index) => {
                                            return (
                                                <div class="flex flex-col  w-3/3 rounded-2xl">
                                                    <img className="rounded-lg" src={hotel.gallery[0].cloudUri}></img>
                                                    <div className="m-2 mb-0">
                                                        <h1 className="titulo-promociones">{hotel.name}
                                                            <div className="flex space-x-1">
                                                                {


                                                                    Array.from({ length: hotel.stars }, (_, index) => (
                                                                        <StarIcon className="h-4 w-4 text-yellow-500"></StarIcon>
                                                                    )

                                                                    )}
                                                            </div>
                                                        </h1>
                                                        <p className="descripcion-promociones">
                                                            {hotel.title}
                                                        </p>
                                                        <hr class="border-t-1 border-gray-300 my-2" />

                                                        <p className="descripcion-promociones">

                                                        </p>


                                                    </div>
                                                    <footer className="text-right m-2 mt-0 grid grid-cols-1 gap-3">


                                                        <div className="pt-2">
                                                            <Button variant="custom"
                                                            className="btn custom"
                                                                onClick={() => handleClick(destino.destinoId, hotel.hotelID)}
                                                                >Ver detalles</Button>
                                                        </div>
                                                        <div>
                                                            <p className="policies-promociones pt-2">
                                                                .
                                                            </p>
                                                        </div>
                                                    </footer>

                                                </div>
                                            )
                                        })
                                    }
                                </div>


                            </>

                            )
                        }

                        )
                    }



                </div>

            </div>




        </div>
    )
}