import React, { useState } from 'react';
import { Button, Table, Modal, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Reservations() {
  const [showModal, setShowModal] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    clientName: '',
    telefono: '',
    email: '',
    dates: [null, null],
    destination: '',
    adults: 0,
    children: 0,
    hotels: [],
    includeTransfers: false,
    transferAmount: '',
    includeFlights: false,
    flightAmount: '',
    paymentLink: ''
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (update) => {
    setFormData({ ...formData, dates: update });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = { ...formData, status: 'Pendiente', id: reservations.length + 1 };
    setReservations([...reservations, newReservation]);
    closeModal();
  };

  const generatePaymentLink = (reservationId) => {
    const paymentUrl = `https://www.mercadopago.com/link_de_pago/${reservationId}`;
    setReservations(reservations.map(res => res.id === reservationId ? { ...res, paymentLink: paymentUrl } : res));
  };

  return (
    <div>
      <h2>Reservaciones</h2>
      <Button variant="primary" onClick={openModal}>Nueva Reservación</Button>
      
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Destino</th>
            <th>Fechas</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res, index) => (
            <tr key={index}>
              <td>{res.id}</td>
              <td>{res.clientName}</td>
              <td>{res.destination}</td>
              <td>{res.dates[0]?.toLocaleDateString()} - {res.dates[1]?.toLocaleDateString()}</td>
              <td>{res.status}</td>
              <td>
                <Button variant="success" onClick={() => generatePaymentLink(res.id)}>Generar Pago</Button>
                {res.paymentLink && <a href={res.paymentLink} target="_blank" rel="noopener noreferrer" className="ms-2">Ver Pago</a>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nueva Reservación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={4}><Form.Control type="text" name="clientName" onChange={handleFormChange} placeholder="Nombre del cliente" /></Col>
              <Col md={4}><Form.Control type="text" name="telefono" onChange={handleFormChange} placeholder="Teléfono (10 dígitos)" /></Col>
              <Col md={4}><Form.Control type="email" name="email" onChange={handleFormChange} placeholder="Email" /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}><DatePicker selectsRange startDate={formData.dates[0]} endDate={formData.dates[1]} onChange={handleDateChange} className="form-control" /></Col>
              <Col md={4}><Form.Control type="text" name="destination" onChange={handleFormChange} placeholder="Destino" /></Col>
              <Col md={2}><Form.Control type="number" name="adults" onChange={handleFormChange} placeholder="Adultos" min="0" /></Col>
              <Col md={2}><Form.Control type="number" name="children" onChange={handleFormChange} placeholder="Menores" min="0" /></Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3">Guardar Reservación</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Reservations;
