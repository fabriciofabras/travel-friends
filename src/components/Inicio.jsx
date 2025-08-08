import { Button } from "react-bootstrap"
import hero from "../assets/hero.jpg";
import Slider from "react-slick";
import { ChatBubbleOvalLeftIcon, ShieldCheckIcon, UserGroupIcon, CreditCardIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import ssl from "../assets/ssl.avif"
import rnt from "../assets/rnt.png"
import mercadopago from "../assets/mercadopago.avif"
import visa from "../assets/visa.avif"
import pci from "../assets/pci.avif"
import promo1 from "../assets/promociones/promo1.avif"; // Ejemplo de imágenes
import promo2 from "../assets/promociones/promo2.avif";
import promo3 from "../assets/promociones/promo3.avif";
import promo4 from "../assets/promociones/promo4.avif";
import promo5 from "../assets/promociones/promo5.avif";
import promo6 from "../assets/promociones/promo6.avif";
import promo7 from "../assets/promociones/promo7.avif";
import promo8 from "../assets/promociones/promo8.avif";
import promo9 from "../assets/promociones/promo9.avif";
import promo10 from "../assets/promociones/promo10.avif";
import promo11 from "../assets/promociones/promo11.avif";
import promo12 from "../assets/promociones/promo12.avif";
import TestimonialsCarousel from "./TestimonialsCarousel";
import { Helmet } from "react-helmet";

export const Inicio = () => {

    const navigate = useNavigate();

    // Configuración del slider
    const sliderSettings = {
        dots: true, // Muestra los puntos de navegación
        infinite: true, // Hace el slider infinito
        speed: 500, // Velocidad de transición
        slidesToShow: 1, // Número de imágenes visibles al mismo tiempo
        slidesToScroll: 1, // Número de imágenes que se mueven al hacer scroll
        autoplay: true, // Habilita el auto-play
        autoplaySpeed: 3000, // Velocidad del auto-play
        arrows: true, // Deshabilita las flechas
    };

    return (
        <div className="xs:mi-div sm:relative sm:isolate sm:px-2 sm:pt-2 lg:px-2">
            <Helmet>
                <title>Agencia de Viajes en Naucalpan y Satélite | Travel Friends</title>
                <meta
                    name="description"
                    content="Explora paquetes turísticos y promociones especiales desde Naucalpan, Satélite y zona norte de CDMX con Travel Friends. Atención personalizada y oficina física."
                />
            </Helmet>
            <div className="absolute inset-x-0 -top-40 -z-10 overflow-hidden  sm:-top-80" aria-hidden="true">
                <div className="flex w-1/2 hidden sm:block">

                </div>            </div>
            <div className="mx-auto max-w-full pt-32 sm:pt-0 lg:py-40  lg-w-max">
                <div className="flex flex-col-reverse sm:flex-row flex-wrap">
                    <div className="flex flex-col mt-10 w-full sm:mt-0 sm:w-1/2 sm:px-6">
                        <Slider {...sliderSettings}>
                            <div>
                                <img
                                    src={promo1}
                                    alt="Promoción 1"
                                    className="rounded-lg shadow-lg mx-auto"
                                    fetchpriority="high"
                                />
                            </div>
                            <div>
                                <img
                                    src={promo2}
                                    alt="Promoción 2"
                                    className="rounded-lg shadow-lg mx-auto"
                                />
                            </div>
                            <div>
                                <img
                                    src={promo3}
                                    alt="Promoción 3"
                                    className="rounded-lg shadow-lg mx-auto"
                                />
                            </div>
                            <div>
                                <img
                                    src={promo4}
                                    alt="Promoción 4"
                                    className="rounded-lg shadow-lg mx-auto"
                                />
                            </div>
                            <div>
                                <img
                                    src={promo5}
                                    alt="Promoción 5"
                                    className="rounded-lg shadow-lg mx-auto"
                                />
                            </div>
                            <div>
                                <img
                                    src={promo6}
                                    alt="Promoción 6"
                                    className="rounded-lg shadow-lg mx-auto"
                                />
                            </div>
                            <div>
                                <img
                                    src={promo7}
                                    alt="Promoción 7"
                                    className="rounded-lg shadow-lg mx-auto"
                                />
                            </div><div>
                                <img
                                    src={promo8}
                                    alt="Promoción 8"
                                    className="rounded-lg shadow-lg mx-auto"
                                />
                            </div>
                            <div>
                                <img
                                    src={promo9}
                                    alt="Promoción 9"
                                    className="rounded-lg shadow-lg mx-auto"
                                />
                            </div>
                            <div>
                                <img
                                    src={promo10}
                                    alt="Promoción 9"
                                    className="rounded-lg shadow-lg mx-auto"
                                />
                            </div>
                            <div>
                                <img
                                    src={promo11}
                                    alt="Promoción 8"
                                    className="rounded-lg shadow-lg mx-auto"
                                />
                            </div>
                            <div>
                                <img
                                    src={promo12}
                                    alt="Promoción 8"
                                    className="rounded-lg shadow-lg mx-auto"
                                />
                            </div>
                        </Slider>
                    </div>
                    <div className="flex flex-col w-full sm:w-1/2">
                        <div className="px-10 sm:px-0">
                            <b className="text-balance text-2xl font-bold text-[#e35724] sm:text-6xl font-['Trebuchet']">travel</b>
                            <b className="text-balance text-2xl font-bold text-[#005ae0] sm:text-6xl font-['Trebuchet']">friends.com</b>
                            <h1 className="visually-hidden">
                                Agencia de viajes en Naucalpan, Satélite y zona norte CDMX
                            </h1>
                            <h2 className="py-4 text-2xl font-bold text-[#004c97] sm:text-4xl drop-shadow-lg">
                                Transformamos tus sueños en viajes inolvidables
                            </h2>
                            <p className="mt-4 text-lg text-[#004c97] sm:text-xl">
                                ¡Explora nuestros destinos y vive la mejor experiencia de viaje!
                            </p>                    </div>
                        <div className="px-10 sm:pt-0 mt-10 flex items-center justify-center gap-x-6">
                            <Button href="/promociones" variant="custom" id="click_promociones"
                                className="btn custom px-4 py-2">Ver Promociones</Button>
                            <Button
                                href="https://wa.me/5215512120049?text=Hola!%20quiero%20cotizar%20un%20viaje."
                                className="btn btn-success px-4 py-2"
                            >Hablar con un agente <ChatBubbleOvalLeftIcon className="h-6 w-6 inline-block mr-2" /></Button>
                        </div>

                        {/*   <div className="flex flex-col">
                        <TestimonialsCarousel />


                        </div> */}
                    </div>


                </div>

                {/* Nueva sección: contenido SEO local */}
                <section className="mt-16 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-[#004c97]">Agencia de viajes en Naucalpan, Satélite y alrededores</h2>
                        <p className="mt-4 text-lg text-gray-700">
                            En <strong>Travel Friends</strong> nos especializamos en ofrecer viajes a medida para nuestros clientes en la zona norte de la Ciudad de México. Si te encuentras en Naucalpan, Lomas Verdes, Boulevares, Satélite o zonas cercanas, estás en el lugar correcto. Tenemos promociones todo incluido a Cancún, Acapulco, Los Cabos y otros destinos nacionales e internacionales. Nuestro equipo de asesores está disponible para ayudarte a planear el viaje perfecto, con atención personalizada, opciones flexibles de pago y un compromiso total con la calidad del servicio. ¡Viajar no tiene por qué ser caro!
                        </p>

                        <p className="mt-4 text-lg text-gray-700">
                            Contamos con el <strong>Registro Nacional de Turismo (RNT)</strong> lo cual nos certifica como una agencia de viajes confiable y nos puedes encontrar en la página de consulta de <a href="https://rnt-consulta.sectur.gob.mx/" className="hover:underline">
                        SECTUR
                    </a>  con el folio:0415057f860ba

                        </p>
                    </div>
                </section>

                {/* Sección de categorías */}
                <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 px-6">
                    <div
                        className="ofertas-especiales bg-[#004c97] bg-opacity-70 text-white p-6 rounded-lg shadow-lg cursor-pointer"
                        onClick={() => navigate("/promociones")}
                    >
                        <h2 className="text-2xl font-bold"></h2>
                        <p className="mt-2">
                        </p>
                    </div>
                    <div
                        className="paquetes bg-[#004c97] bg-opacity-70 text-white p-6 rounded-lg shadow-lg cursor-pointer"
                        onClick={() => navigate("/promociones")}
                    >
                        <h2 className="text-2xl font-bold"></h2>
                        <p className="mt-2">
                        </p>
                    </div>
                    <div
                        className="planes bg-[#004c97] bg-opacity-70 text-white p-6 rounded-lg shadow-lg cursor-pointer"
                        onClick={() => navigate("/promociones")}
                    >
                        <h2 className="text-2xl font-bold"></h2>
                        <p className="mt-2">
                        </p>
                    </div>
                </div>
                {/* Nueva sección: Por qué elegirnos */}
                <section className="py-4 bg-white">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold  text-[#004c97]">
                            ¿Por qué elegirnos?
                        </h2>
                        <p className="text-lg text-gray-600 mt-4">
                            Descubre las razones por las que somos la mejor opción para planificar tu próximo viaje.
                        </p>
                        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-4">
                            {/* Beneficio 1 */}
                            <div className="flex flex-col items-center text-center">
                                <ShieldCheckIcon className="h-16 w-16 text-[#004c97]" />
                                <h3 className="mt-4 text-xl font-bold text-gray-800">Seguridad Garantizada</h3>
                                <p className="mt-2 text-gray-600">
                                    Realiza tus pagos y transacciones de forma segura con nuestras plataformas certificadas.
                                </p>
                            </div>
                            {/* Beneficio 2 */}
                            <div className="flex flex-col items-center text-center">
                                <UserGroupIcon className="h-16 w-16 text-[#004c97]" />
                                <h3 className="mt-4 text-xl font-bold text-gray-800">Atención Personalizada</h3>
                                <p className="mt-2 text-gray-600">
                                    Nuestros agentes están contigo antes, durante y después de tu viaje.
                                </p>
                            </div>
                            {/* Beneficio 3 */}
                            <div className="flex flex-col items-center text-center">
                                <CreditCardIcon className="h-16 w-16 text-[#004c97]" />
                                <h3 className="mt-4 text-xl font-bold text-gray-800">Facilidades de Pago</h3>
                                <p className="mt-2 text-gray-600">
                                    Ofrecemos planes de pago flexibles que se adaptan a tus necesidades.
                                </p>
                            </div>
                            {/* Beneficio 4 */}
                            <div className="flex flex-col items-center text-center">
                                <BuildingOffice2Icon className="h-16 w-16 text-[#004c97]" />
                                <h3 className="mt-4 text-xl font-bold text-gray-800">Oficina Física</h3>
                                <p className="mt-2 text-gray-600">
                                    Visítanos en nuestra oficina y realiza tus pagos de forma presencial. Estamos disponibles para brindarte atención directa y personalizada.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Nueva sección: Certificaciones y Sellos de Confianza */}
                <section className="py-0">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-[#004c97]">
                            Certificaciones y Sellos de Confianza
                        </h2>
                        <p className="text-lg text-gray-600 mt-2">
                            Nuestro compromiso es brindarte un servicio seguro y confiable.
                        </p>
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-center">
                            {/* Certificación 0 */}
                            <div>
                                <img
                                    src={rnt}
                                    alt="Certificado SSL"
                                    className="h-16 mx-auto"
                                />
                            </div>
                            {/* Certificación 1 */}
                            <div>
                                <img
                                    src={ssl}
                                    alt="Certificado SSL"
                                    className="h-16 mx-auto"
                                />
                            </div>
                            {/* Certificación 1 */}
                            <div>
                                <img
                                    src={mercadopago}
                                    alt="Mercado Pago"
                                    className="h-16 mx-auto"
                                />
                            </div>
                            {/* Certificación 2 */}
                            <div>
                                <img
                                    src={visa}
                                    alt="Verified by Visa"
                                    className="h-16 mx-auto"
                                />
                            </div>
                            {/* Certificación 4 
                            <div>
                                <img
                                    src={pci}
                                    alt="PCI Compliance"
                                    className="h-16 mx-auto"
                                />
                            </div>
                            */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}