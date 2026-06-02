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
            icon: <ShieldCheck className="w-8 h-8 text-white" />,
            bg: "#0C2D6B",
            title: "Agencia formal y confiable",
            text: "Más de 2 años de experiencia ofreciendo viajes seguros a todas las playas de México, Europa y Centroamerica"
        },
        {
            icon: <Users className="w-8 h-8 text-white" />,
            bg: "#C8960C",
            title: "Atención personalizada",
            text: "Te acompañamos desde la cotización hasta tu regreso, ya sea por WhatsApp, videollamada o en persona."
        },
        {
            icon: <Building2 className="w-8 h-8 text-white" />,
            bg: "#0C2D6B",
            title: "Proveedores verificados",
            text: "Trabajamos solo con hoteles y aerolíneas reconocidas, garantizando calidad y seguridad."
        },
        {
            icon: <CreditCard className="w-8 h-8 text-white" />,
            bg: "#C8960C",
            title: "Pagos seguros y accesibles",
            text: "Aceptamos tarjetas, transferencias y depósitos en tiendas de conveniencia, con opción a meses sin intereses."
        },
        {
            icon: <FileCheck className="w-8 h-8 text-white" />,
            bg: "#1565C0",
            title: "Transparencia total",
            text: "Recibe contratos y comprobantes claros desde el inicio, sin letras chiquitas."
        },
    ];

    return (
        <div className="px-6 pt-36 sm:pt-32 pb-16 bg-gradient-to-b from-white to-slate-50">
            <Helmet>
                <title>Viaja seguro con Travel Friends, Agencia de Viajes</title>
                <meta name="description" content="Visita la oficina de Travel Friends en Naucalpan. Realiza tus pagos presencialmente y recibe atención personalizada cara a cara para planear tu viaje ideal." />
            </Helmet>

            <div className="max-w-4xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold text-[#1565C0]">¿Por qué es seguro reservar con Travel Friends?</h2>
                <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-[#C8960C]"></div>
                <p className="mt-4 text-gray-600">En Travel Friends sabemos que al planear un viaje no solo buscas buenos precios, también tranquilidad y confianza. Por eso hemos creado un proceso de compra seguro, transparente y respaldado en cada paso.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow border-b-4"
                        style={{ borderBottomColor: item.bg }}
                    >
                        <div className="rounded-full p-3" style={{ backgroundColor: item.bg }}>
                            {item.icon}
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-[#1565C0]">
                            {item.title}
                        </h3>
                        <p className="mt-2 text-gray-600 text-sm">{item.text}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12 max-w-2xl mx-auto bg-[#0C2D6B] rounded-2xl p-8 text-white text-center shadow-lg">
                <h3 className="text-xl font-bold mb-2">Con Travel Friends, tu única preocupación será elegir el destino y disfrutar.</h3>
                <p className="text-slate-300 mb-4">Lunes a Sábado: 10:00 AM - 7:00 PM</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm mb-6">
                    <span><Phone className="inline mr-2 w-4 h-4" /> +52 55 1212 0049</span>
                    <span><Mail className="inline mr-2 w-4 h-4" /> contacto@travelfriends.com.mx</span>
                </div>
                <Button href="https://wa.me/5215512120049?text=Hola!%20Quiero%20agendar%20una%20cita."
                    className="inline-flex items-center gap-2 px-10 py-3 bg-[#C8960C] border-2 border-[#C8960C] text-white font-semibold rounded-lg hover:bg-[#E8B420] hover:border-[#E8B420] transition-colors text-base">
                    Agendar una cita <ChatBubbleOvalLeftIcon className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
};

export default ViajaSeguro;
