import { Button } from "react-bootstrap"
import hero from "../assets/hero.jpg";
import Slider from "react-slick";
import { ChatBubbleOvalLeftIcon, ShieldCheckIcon, UserGroupIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import ssl from "../assets/ssl.png"
import visa from "../assets/visa.png"
import pci from "../assets/pci.png"
import promo1 from "../assets/promociones/promo1.png"; // Ejemplo de imágenes
import promo2 from "../assets/promociones/promo2.png";
import promo3 from "../assets/promociones/promo3.png";
import promo4 from "../assets/promociones/promo4.png";
import promo5 from "../assets/promociones/promo5.png";
import promo6 from "../assets/promociones/promo6.png";
import promo7 from "../assets/promociones/promo7.png";

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
        arrows: false, // Deshabilita las flechas
    };

    return (
        <div class="xs:mi-div sm:relative sm:isolate sm:px-2 sm:pt-2 lg:px-2">
            <div class="absolute inset-x-0 -top-40 -z-10 overflow-hidden  sm:-top-80" aria-hidden="true">
                <div className="flex w-1/2 hidden sm:block">

                </div>            </div>
            <div class="mx-auto max-w-full pt-32 sm:pt-0 lg:py-40  lg-w-max">
                <div class="flex flex-auto flex-row">
                    <div class="flex w-1/2 hidden sm:block">
                        <Slider {...sliderSettings}>
                            <div>
                                <img
                                    src={promo1}
                                    alt="Promoción 1"
                                    className="rounded-lg shadow-lg mx-auto"
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
                            </div>
                        </Slider>
                    </div>
                    <div class="flex flex-col sm:w-1/2">
                        <div className="px-10 sm:px-0">
                            <b class="text-balance text-2xl font-bold text-[#e35724] sm:text-6xl font-['Trebuchet']">travel</b>
                            <b class="text-balance text-2xl font-bold text-[#005ae0] sm:text-6xl font-['Trebuchet']">friends.com</b>
                            <h1 className="py-4 text-2xl font-bold text-[#004c97] sm:text-4xl drop-shadow-lg">
                                Transformamos tus sueños en viajes inolvidables
                            </h1>
                            <p className="mt-4 text-lg text-[#004c97] sm:text-xl">
                                ¡Explora nuestros destinos y vive la mejor experiencia de viaje!
                            </p>                    </div>
                        <div class="px-10 sm:pt-0 mt-10 flex items-center justify-center gap-x-6">
                            <Button href="/cotiza" variant="custom" id="click_promociones"
                                className="btn custom px-4 py-2">Ver Promociones</Button>
                            <Button href="https://wa.me/5215512120049?text=Hola!%20quiero%20cotizar%20un%20viaje." variant="custom"
                                className="btn custom px-4 py-2">Hablar con un agente <ChatBubbleOvalLeftIcon className="h-6 w-6 inline-block mr-2" /></Button>
                        </div>
                    </div>

                </div>


                {/* Sección de categorías */}
                <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-3 px-6">
                    <div
                        className="ofertas-especiales bg-[#004c97] bg-opacity-70 text-white p-6 rounded-lg shadow-lg cursor-pointer"
                        onClick={() => navigate("/cotiza")}
                    >
                        <h2 className="text-2xl font-bold"></h2>
                        <p className="mt-2">
                        </p>
                    </div>
                    <div
                        className="paquetes bg-[#004c97] bg-opacity-70 text-white p-6 rounded-lg shadow-lg cursor-pointer"
                        onClick={() => navigate("/planes")}
                    >
                        <h2 className="text-2xl font-bold"></h2>
                        <p className="mt-2">
                        </p>
                    </div>
                    <div
                        className="planes bg-[#004c97] bg-opacity-70 text-white p-6 rounded-lg shadow-lg cursor-pointer"
                        onClick={() => navigate("/paquetes")}
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
                        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
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
                        </div>
                    </div>
                </section>

                {/* Nueva sección: Certificaciones y Sellos de Confianza */}
                <section className="py-4">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-[#004c97]">
                            Certificaciones y Sellos de Confianza
                        </h2>
                        <p className="text-lg text-gray-600 mt-2">
                            Nuestro compromiso es brindarte un servicio seguro y confiable.
                        </p>
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 items-center justify-center">
                            {/* Certificación 1 */}
                            <div>
                                <img
                                    src={ssl}
                                    alt="Certificado SSL"
                                    className="h-16 mx-auto"
                                />
                                <p className="mt-2 text-sm text-gray-700">Certificado SSL</p>
                            </div>
                            {/* Certificación 2 */}
                            <div>
                                <img
                                    src={visa}
                                    alt="Verified by Visa"
                                    className="h-16 mx-auto"
                                />
                            </div>
                            {/* Certificación 4 */}
                            <div>
                                <img
                                    src={pci}
                                    alt="PCI Compliance"
                                    className="h-16 mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}