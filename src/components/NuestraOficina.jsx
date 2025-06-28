import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Container, Row, Col, CardBody, Card, Button } from 'react-bootstrap';
import oficina1 from "../assets/oficina1.jpeg";
import oficina2 from "../assets/oficina2.jpeg";
import oficina3 from "../assets/oficina3.jpeg";
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';

const SeccionOficina = () => {
    return (
        <div className="p-6 bg-white">
            <h2 className="text-3xl font-bold mb-4 text-center">Conoce Nuestras Oficinas</h2>
            <p className="text-lg text-center mb-6">Visítanos y obtén atención personalizada para planear tu viaje soñado.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <img src={oficina1} alt="Oficina" className="rounded-xl w-full h-64 object-cover" />
                <img src={oficina2} alt="Oficina" className="rounded-xl w-full h-64 object-cover" />
                <img src={oficina3} alt="Oficina" className="rounded-xl w-full h-64 object-cover" />
            </div>

            <Card className="p-4 bg-gray-100 rounded-xl">
                <CardBody className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Ubicación</h3>
                    <p><MapPin className="inline mr-2" /> Av. Vía Adolfo López Mateos 201, Col. Santa Cruz Acatlán, Naucalpan, Méx., Santa Cruz Acatlán, 53150 Naucalpan, Méx., México</p>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3731.6477822280053!2d-99.2540596486978!3d19.48235346667536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d203e2faa1372b%3A0xb97a28bff339e42d!2sPlaza%20San%20Mateo!5e0!3m2!1ses!2smx!4v1746942936608!5m2!1ses!2smx"
                        className="w-full h-64 mt-4 rounded-xl"
                        allowFullScreen=""
                        loading="lazy"></iframe>

                    <h3 className="text-2xl font-bold mt-4 mb-2">Horario de Atención</h3>
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

export default SeccionOficina;
