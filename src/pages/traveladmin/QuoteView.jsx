import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Card, Badge, Carousel } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import destinos from "../../assets/destinos";
import { CalendarIcon } from '@heroicons/react/24/outline'; // Outline style
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid'; // Outline style

import PaymentComponent from "./PaymentComponent";
import ConfirmationComponent from "./ConfirmationComponent";

function QuoteView() {

  const [paymentMercadoPago, setPaymentMercadoPago] = useState(false)
  const [paymentId, setPaymentId] = useState(null)
  const [paymentStep, setPaymentStep] = useState(1)
  const [amount,setAmount] = useState(0);
  const [description, setDescription] = useState('')
  const onContinuarAlPago = () => {

    setPaymentStep(2)
  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const mapContainer = useRef(null); // Referencia al contenedor del mapa

  const formData = {};
  queryParams.forEach((value, key) => {
    formData[key] = value;
  });

  const formatFecha = (fecha) => {
    // Convertir a objeto Date si no lo es
    const dateObject = fecha instanceof Date ? fecha : new Date(fecha);

    // Verificar si la fecha es válida
    if (isNaN(dateObject.getTime())) {
      console.error("Fecha no válida:", fecha);
      return "Fecha no válida";
    }

    const opciones = { day: 'numeric', month: 'short' };
    const formattedDate = new Intl.DateTimeFormat("es-ES", opciones).format(dateObject);

    // Capitalizar la primera letra del mes
    const capitalizedMonth = formattedDate.replace(/\b(\w)/, char => char.toUpperCase());
    return capitalizedMonth;
  };

  const hotelAmount = Number(formData.amount || 0);
  const hotelExtraAmount = Number(formData.extraAmount || 0);
  const transferAmount = Number(formData.transferAmount || 0);
  const flightAmount = Number(formData.flightAmount || 0);
  const totalAmount = hotelAmount + hotelExtraAmount + transferAmount + flightAmount;

  const detalleDestino = destinos.filter((destino) => destino.destinoId == formData.destinoId)

  console.log("detalleDestino", detalleDestino)
  let detalleHotel = detalleDestino[0].hoteles.filter((hotel) => hotel.hotelID == formData.hotelID);

  detalleHotel = detalleHotel[0];
  console.log("hotel", detalleHotel)

  useEffect(() => {

    const hotelAmount = Number(formData.amount || 0);
    const hotelExtraAmount = Number(formData.extraAmount || 0);
    const transferAmount = Number(formData.transferAmount || 0);
    const flightAmount = Number(formData.flightAmount || 0);
    const totalAmount = hotelAmount + hotelExtraAmount + transferAmount + flightAmount;

    setAmount(totalAmount)

    setDescription(formData.details)

    // Inicializar el mapa


    const map = ""

  }, []);

  const formatCurrency = (amount) => {
    if (typeof amount !== "number") return "";
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  console.log("formData")
  console.log(formData)

  const fechas = formData.dates.split(",")
  const checkIn = fechas[0];
  const checkOut = fechas[1];

  const handleChange = (e) => {
    console.log("Handle change")
  };

  const crearPreferencia = async () => {
    const response = await fetch('https://travel-friends-server.vercel.app/crear-preferencia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            title: 'Producto 1',
            unit_price: 100,
            quantity: 1,
          },
        ],
      }),
    });
    const data = await response.json();
    return data.id; // El ID de la preferencia
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Enviar datos al servidor (puedes usar fetch o axios)
    console.log("Datos enviados:", Object.fromEntries(data.entries()));
  };

  const handlePago = (step) =>{
    setPaymentStep(step)
  }

  const renderPago = () => {
    switch (paymentStep) {
      case 1:
        return (<Card style={{ backgroundColor: "rgba(206, 206, 206, 0.2)", color: '#fff' }} className="p-4 mb-4  text-black">
          <Form onSubmit={handleSubmit}>
            <h5>Invitado 1</h5>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="guestName"
                disabled
                placeholder="Name"
                value={formData.clientName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="phone"
                disabled
                placeholder="Phone"
                value={formData.telefono}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                disabled
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <h5>Detalle de Tarifa</h5>
            <Form.Group className="mb-3">
              <Row>
                <Col md={6}>
                  <Form.Label>Hotel</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    disabled
                    name="amount"
                    value={formatCurrency(hotelAmount)} // Formatear el valor aquí
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <Form.Label>Traslados</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    disabled
                    name="transferAmount"
                    value={formatCurrency(transferAmount)} // Formatear el valor aquí

                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <Form.Label>Vuelos</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    disabled
                    name="flightAmount"
                    value={formatCurrency(flightAmount)} // Formatear el valor aquí
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <Form.Label>Total</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="vuelos"
                    disabled
                    value={formatCurrency(totalAmount)} // Formatear el valor aquí
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>

                </Col>
              </Row>
            </Form.Group>

            <Button onClick={onContinuarAlPago} variant="primary" className="w-100">
              Continuar al Pago
            </Button>
          </Form>
        </Card>);
      case 2:
        return (
            <PaymentComponent description={description} amount={amount} handlePago={handlePago} setPaymentId={setPaymentId}
            />
         );
      case 3:
        return (<Row className="mt-2">

          <Col md={12}>
            <ConfirmationComponent paymentId={paymentId}
            />
          </Col>
        </Row>);
      default:
        return <p>Estado desconocido</p>;
    }
  };

  return (
    <Container fluid style={{ backgroundColor: '#ffffff', color: '#fff' }} className="text-black py-36">
      <Row>
        {/* Información del huésped */}
        <Col md={6} className="px-5">
          <h2 className=" text-[#000000]">Detalle de la Reservación</h2>
          {renderPago()}

        </Col>

        {/* Información del hotel */}
        <Col md={6} className="px-5">
          <Row>
            <Card style={{
              backgroundColor: "rgba(206, 206, 206, 0.2)",
              color: '#fff'
            }} className="mb-4 p-4 text-black">

              <Row>
                <Col md={6}>
                  <h4>{detalleHotel.name}</h4>
                  <p><MapPinIcon className="h-4"></MapPinIcon>  {detalleHotel.location.street}. {detalleHotel.location.city}, {detalleHotel.location.state}.</p>
                  <div className="flex space-x-1">
                    {


                      Array.from({ length: detalleHotel.stars }, (_, index) => (
                        <StarIcon className="h-4 w-4 text-yellow-500"></StarIcon>
                      )

                      )}
                  </div>
                </Col>
                <Col md={6} >
                  <div
                    ref={mapContainer}
                    style={{ width: "100%", height: "180px", borderRadius: "8px" }}
                  />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>

                  <div style={{ borderRadius: "8px" }}>

                    <Carousel >
                      {detalleHotel.gallery.map((image, index) => (
                        <Carousel.Item key={index}>
                          <img
                            src={image.cloudUri}
                            alt={`Imagen ${index + 1}`}
                            className="d-block w-100"
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>

                </Col>

                <Col>
                  <h5>Habitación</h5>

                  <p>
                    {formData.details}
                  </p>
                </Col>
              </Row>




            </Card>
          </Row>
          <Row>
            <Row>
              <Card
                style={{
                  backgroundColor: "rgba(206, 206, 206, 0.2)",
                  color: "#fff",
                  borderRadius: "12px",
                }}
                className="mb-4 p-3 text-black d-flex align-items-center"
              >
                <Row className="w-100 align-items-center">
                  {/* Check-in */}
                  <Col md={5} className="text-center">
                    <p className="text-sm text-gray-400 mb-1">Check-in</p>
                    <div className="flex items-center justify-center">
                      <CalendarIcon style={{ width: "20px", height: "20px", marginRight: "8px" }} />
                      <span>{formatFecha(checkIn)} {detalleHotel.rooms[0].checkInTime} hrs.</span>
                    </div>
                  </Col>

                  {/* Separador */}
                  <Col md={2} className="d-flex justify-content-center align-items-center">
                    <div style={{ height: "1px", width: "80%", backgroundColor: "gray" }}></div>
                  </Col>

                  {/* Check-out */}
                  <Col md={5} className="text-center">
                    <p className="text-sm text-gray-400 mb-1">Check-out</p>
                    <div className="flex items-center justify-center">
                      <CalendarIcon style={{ width: "20px", height: "20px", marginRight: "8px" }} />
                      <span>{formatFecha(checkOut)}  {detalleHotel.rooms[0].checkOutTime} hrs.</span>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Row>
          </Row>
          <Row><Card style={{ backgroundColor: 'rgba(206,206,206,0.2)', color: '#000000' }} className="p-4">
            <h5>Servicios</h5>
            <Row>
              {detalleHotel.services.map((facility, index) => (
                <Col key={index} className="mb-2 text-xs">
                  {facility.name}{" "}
                  {facility.hasExtraCharge && (
                    <Badge bg="warning" text="dark">
                      Cargo extra
                    </Badge>
                  )}
                </Col>
              ))}
            </Row>


          </Card>
          </Row>

        </Col >
      </Row >
    </Container >
  );
}

export default QuoteView;
