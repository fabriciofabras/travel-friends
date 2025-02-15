import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const ReservationModal = ({ show, handleClose, reservation, onUpdate }) => {
  const [paymentStatus, setPaymentStatus] = useState(reservation.paymentStatus);
  const [paymentTrip, setPaymentTrip] = useState(reservation.paymentTrip);

  const handleUpdate = async () => {
    try {
      const updatedReservation = {
        ...reservation,
        paymentStatus,
        paymentTrip,
      };

      await axios.put(`http://localhost:5000/api/reservations/${reservation._id}`, updatedReservation);

      onUpdate(updatedReservation); // Actualiza la UI después del éxito
      handleClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al actualizar la reservación:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de la Reservación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Nombre:</strong> {reservation.nombre}</p>
        <p><strong>Destino:</strong> {reservation.destino}</p>
        <p><strong>Fecha:</strong> {new Date(reservation.fecha).toLocaleDateString("es-MX")}</p>
        <p><strong>Pasajeros:</strong> {reservation.pasajeros}</p>

        <Form.Group className="mb-3">
          <Form.Label><strong>Estado de Pago</strong></Form.Label>
          <Form.Select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
            <option value="pending">Pendiente</option>
            <option value="paid">Pagado</option>
            <option value="canceled">Cancelado</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><strong>Pago del Viaje</strong></Form.Label>
          <Form.Select value={paymentTrip} onChange={(e) => setPaymentTrip(e.target.value)}>
            <option value="not-paid">No Pagado</option>
            <option value="paid">Pagado</option>
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        <Button variant="primary" onClick={handleUpdate}>Guardar Cambios</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReservationModal;
