import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function QuoteView() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const formData = {};
  queryParams.forEach((value, key) => {
    formData[key] = value;
  });

  /*  const [formData, setFormData] = useState({
     guestName: "",
     phone: "",
     email: "",
     gender: "",
     age: "",
     agentCommission: "20",
     nights: 7,
     nightlyRate: 119,
     transactionFee: 4,
     total: 903,
     cancellationPolicy: false,
   }); */

  const handleChange = (e) => {
    /*  const { name, value, type, checked } = e.target;
     setFormData({
       ...formData,
       [name]: type === "checkbox" ? checked : value,
     }); */

    console.log("Handle change")
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

  return (
    <Container fluid className="bg-dark text-light py-36">
      <Row>
        {/* Información del huésped */}
        <Col md={6} className="px-5">
          <h2 className="mb-4">Detalle de la Reservación</h2>
          <Card className="p-4 mb-4 bg-secondary text-light">
            <Form onSubmit={handleSubmit}>
              <h5>Invitado 1</h5>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="guestName"
                  disabled
                  placeholder="Name"
                  value={formData.guestName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="phone"
                  disabled
                  placeholder="Phone"
                  value={formData.phone}
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
                      name="agentCommission"
                      value={formData.agentCommission}
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
                      name="traslados"
                      value={formData.traslados}
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
                      name="vuelos"
                      value={formData.vuelos}
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
                      value={formData.vuelos}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Form.Group>
              
              <Button type="submit" variant="primary" className="w-100">
                Continuar al Pago
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Información del hotel */}
        <Col md={6} className="px-5">
          <Card className="mb-4 p-4 bg-secondary text-light">
            <h4>Hotel Bristol, A Luxury Collection Hotel, Warsaw</h4>
            <p>Sadowa 19, Warsaw, 36001, CZ</p>
            <p>★★★★☆ 4.0</p>
            <p>
              Deluxe Room, 2 Twin Beds, Non Smoking <br />
              (Fully refundable before)
            </p>
            <Row>
              <Col>
                <p>Check-in: Mo, 19 Dec (04:00 PM)</p>
              </Col>
              <Col>
                <p>Check-out: Mo, 19 Dec (11:00 AM)</p>
              </Col>
            </Row>
          </Card>

          <Card className="p-4 bg-secondary text-light">
            <h5>Facilities</h5>
            <Row>
              <Col>Swimming pool</Col>
              <Col>Room service</Col>
              <Col>Airport shuttle</Col>
              <Col>Good Breakfast</Col>
              <Col>Bar</Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default QuoteView;
