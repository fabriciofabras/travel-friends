import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Container, Row, Col, CardBody, Card, Button } from 'react-bootstrap';
import oficina1 from "../assets/oficina1.jpeg";
import oficina2 from "../assets/oficina2.jpeg";
import oficina3 from "../assets/oficina3.jpeg";
import renatur from "../assets/renatur.jpg";
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import { Helmet } from "react-helmet";
import { ShieldCheck, Users, Building2, CreditCard, FileCheck } from "lucide-react";

const ViajaSeguro = () => {

    const items = [
        {
            icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
            title: "Agencia formal y confiable",
            text: "Más de 2 años de experiencia ofreciendo viajes seguros a todas las playas de México, Europa y Centroamerica"
        },
        {
            icon: <Users className="w-10 h-10 text-green-600" />,
            title: "Atención personalizada",
            text: "Te acompañamos desde la cotización hasta tu regreso, ya sea por WhatsApp, videollamada o en persona."
        },
        {
            icon: <Building2 className="w-10 h-10 text-orange-600" />,
            title: "Proveedores verificados",
            text: "Trabajamos solo con hoteles y aerolíneas reconocidas, garantizando calidad y seguridad."
        },
        {
            icon: <CreditCard className="w-10 h-10 text-purple-600" />,
            title: "Pagos seguros y accesibles",
            text: "Aceptamos tarjetas, transferencias y depósitos en tiendas de conveniencia, con opción a meses sin intereses."
        },
        {
            icon: <FileCheck className="w-10 h-10 text-red-600" />,
            title: "Transparencia total",
            text: "Recibe contratos y comprobantes claros desde el inicio, sin letras chiquitas."
        },
    ];

    return (
        <div className="p-20 bg-white">
            <Helmet>
                <title>Viaja seguro con Travel Friends, Agencia de Viajes</title>
                <meta name="description" content="Visita la oficina de Travel Friends en Naucalpan. Realiza tus pagos presencialmente y recibe atención personalizada cara a cara para planear tu viaje ideal." />
            </Helmet>

          {/*   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <img src={oficina1} alt="Oficina" className="rounded-xl w-full h-64 object-cover" />
                <img src={oficina2} alt="Oficina" className="rounded-xl w-full h-64 object-cover" />
                <img src={renatur} alt="Oficina" className="rounded-xl w-full h-64 object-cover" />
            </div> */}

            <Card className="p-4 bg-gray-100 rounded-xl">
                <CardBody className="text-left">
                    <h2 className="text-3xl font-bold mb-4 text-center">¿Por qué es seguro reservar con Travel Friends?</h2>

                    <p> En Travel Friends sabemos que al planear un viaje no solo buscas buenos precios, también tranquilidad y confianza. Por eso hemos creado un proceso de compra seguro, transparente y respaldado en cada paso:

                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
                            >
                                {item.icon}
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-gray-600 text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-2xl font-bold mt-4 mb-2">🌎 Con Travel Friends, tu única preocupación será elegir el destino y disfrutar.
                        📩 Escríbenos hoy y viaja con la confianza de estar en buenas manos.</h3>
                    <p>Lunes a Sábado: 10:00 AM - 7:00 PM</p>

                    <h3 className="text-2xl font-bold mt-4 mb-2">Contacto</h3>
                    <p><Phone className="inline mr-2" /> +52 55 1212 0049</p>
                    <p><Mail className="inline mr-2" /> contacto@travelfriends.com.mx</p>

                    <Button href="https://wa.me/5215512120049?text=Hola!%20Quiero%20agendar%20una%20cita." variant="custom"
                        className="btn custom px-4 py-2">Agendar una cita <ChatBubbleOvalLeftIcon className="h-6 w-6 inline-block mr-2" /></Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default ViajaSeguro;
