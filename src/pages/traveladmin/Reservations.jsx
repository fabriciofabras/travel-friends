import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import destinos from '../../assets/destinos';
import logo from '../../assets/logo.png';
import footer from '../../assets/footer.png';
import header from '../../assets/header.png';
import axios from "axios";
import ReservationModal from "./ReservationModal";


function Reservations() {

  const [showExtraFields, setShowExtraFields] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dates, setDates] = useState([null, null]);
  const [hotelCatalog, setHotelCatalog] = useState([]);
  const [formData, setFormData] = useState({
    advisor: "",
    clientName: "",
    destination: "",
    adults: 0,
    children: 0,
    hotelDetails: [],
    extra: "",
    extraAmount: "",
    hotels: [
      { name: "", details: "", amount: "", link: "" }, // Hotel inicial
    ],
  });

  const [selectedDestino, setSelectedDestino] = useState("");

  const [flightImage, setFlightImage] = useState(null);
  const [flightImageEquipaje, setFlightImageEquipaje] = useState(null);


  useEffect(() => {
    fetch("https://travel-friends-mu.vercel.app/api/reservations") // URL de tu backend
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createReservation(formData);
      alert("Reservación creada con éxito: " + response.id);
      setFormData({ nombre: "", destino: "", fecha: "", pasajeros: 1 }); // Reiniciar formulario
    } catch (error) {
      alert("Error al crear la reservación");
    }
  };

  // Manejador de eventos para el checkbox
  const handleCheckboxChange = (e) => {
    setShowExtraFields(e.target.checked);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setFlightImage(URL.createObjectURL(file));
    }
  };

  const handleFileChangeEquipaje = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setFlightImageEquipaje(URL.createObjectURL(file));
    }
  };


  const handleDestinoChange = (e) => {
    console.log("e.target.value", e.target)
    setSelectedDestino(e.target.value);
    setHotelCatalog(destinos.filter((destino) => destino.destinoId == e.target.value))

    let destino = destinos.filter((destino) => destino.destinoId == e.target.value);
    const destinoId = destino[0].destinoId;

    destino = destino[0].destino;
    setFormData({
      ...formData,
      destination: destino,
      destinoId: destinoId,
      hotels: [{ name: "", details: "", amount: "" }], // Reinicia la lista de hoteles al cambiar destino
    });
  };

  const filteredHoteles = destinos.find(
    (destino) => destino.destinoId === parseInt(selectedDestino)
  )?.hoteles || [];

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleHotelChange = (index, field, value) => {
    const updatedHotels = [...formData.hotels];
    updatedHotels[index][field] = value;

    console.log("Field", field)
    // Generar el enlace automáticamente cuando el nombre del hotel se selecciona
    if (field === "name") {

      console.log("value", value)
      console.log("hotelCatalog", hotelCatalog)
      const hotel = hotelCatalog[0].hoteles.find((h) => h.name === value);

      console.log("hotel", hotel)

      updatedHotels[index].link = hotel ? `https://travel-friends-mu.vercel.app/hotel/${hotelCatalog[0].destinoId}/${hotel.hotelID}` : "";
      updatedHotels[index].hotelID = hotel ? hotel.hotelID : "";
    }

    setFormData({ ...formData, hotels: updatedHotels });
  };


  const addHotel = () => {
    setFormData({
      ...formData,
      hotels: [...formData.hotels, { name: "", details: "", amount: "" }],
    });
  };

  const removeHotel = (index) => {
    const updatedHotels = formData.hotels.filter((_, i) => i !== index);
    setFormData({ ...formData, hotels: updatedHotels });
  };

  const formatFecha = (fecha) => {
    console.log("fecha")

    console.log(fecha)

    const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
  };

  const updateDates = (update) => {

    console.log(update)
    setFormData({ ...formData, dates: update });

    setDates(update)
  }
  const generateLink = () => {

    const serializeFormDataForHotels = (formData) => {
      const baseURL = "https://travel-friends-mu.vercel.app/quote";

      // Iterar sobre los hoteles en el arreglo
      return formData.hotels.map((hotel, index) => {
        const params = new URLSearchParams();

        // Serializar datos simples fuera de `hotels`
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== "hotels") {
            if (typeof value === "object" && !Array.isArray(value)) {
              // Manejar objetos (como fechas)
              Object.entries(value).forEach(([subKey, subValue]) => {
                params.append(`${key}[${subKey}]`, subValue);
              });
            } else {
              params.append(key, value);
            }
          }
        });

        // Agregar datos específicos del hotel actual
        Object.entries(hotel).forEach(([key, value]) => {
          params.append(key, value); // Claves simples como "name", "amount", etc.
        });

        // Construir la URL para el hotel actual
        return `${baseURL}?${params.toString()}`;
      });
    };

    const dataSerializada = serializeFormDataForHotels(formData)

    console.log(dataSerializada[0]);

    console.log("Generate PDF")
  }

  const [reservations, setReservations] = useState([]);

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

  const API_URL = "https://travel-friends-mu.vercel.app/api/reservation"; // URL del backend

  const createReservation = async (reservationData) => {
    try {
      const response = await axios.post(API_URL, reservationData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear la reservación:", error);
      throw error;
    }
  };

  const handleOpenModalEdit = (reservation) => {
    setSelectedReservation(reservation);
    setShowModalEdit(true);
  };

  const handleUpdateReservation = (updatedReservation) => {
    setReservations(reservations.map(res => res._id === updatedReservation._id ? updatedReservation : res));
  };

  return (
    <div>
      <h2>Reservaciones</h2>
      <Button variant="primary" onClick={openModal}>Nueva Reservación</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Destino</th>
            <th>Hotel</th>
            <th>Fechas</th>
            <th>Estatus</th>
            <th>Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res, index) => (
            <tr key={index}>
              <td>{res.name}</td>
              <td>{res.destination}</td>
              <td>{res.hotels[0].name}</td>
              <td>{res.dates[0].substring(0,10)} - {res.dates[1].substring(0,10)}</td>
              <td>{res.travelStatus}</td>
              <td>{res.paymentStatus}</td>
              <td>
                <Button variant="success" onClick={() => generatePaymentLink(res.id)}>Generar Pago</Button>
                {res.paymentLink && <a href={res.paymentLink} target="_blank" rel="noopener noreferrer" className="ms-2">Ver Pago</a>}
                <button onClick={() => handleOpenModalEdit(res)}>Ver Detalle</button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nueva Reservación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            {/* Información principal */}
            <h5 className="mb-4">Información del viaje</h5>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={handleFormChange}
                    placeholder="Nombre del cliente"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    onChange={handleFormChange}
                    placeholder="Teléfono (10 dígitos)"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="email"
                    onChange={handleFormChange}
                    placeholder="email"
                  />
                </Form.Group>
              </Col>

            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <DatePicker
                    placeholderText="Fechas"
                    selectsRange
                    name="travelDate"
                    startDate={dates[0]}
                    endDate={dates[1]}
                    onChange={(update) => updateDates(update)}
                    isClearable={true}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Select
                    onChange={handleDestinoChange}
                    name="destination"
                    value={formData.destination}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Seleccione un destino
                    </option>
                    {destinos.map((destino) => (
                      <option key={destino.destinoId} value={destino.destinoId}>
                        {destino.destino}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Control placeholder="Adultos" type="number" name="adults" min="0" onChange={handleFormChange} />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Control placeholder="Menores" type="number" name="children" min="0" onChange={handleFormChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Select
                    onChange={handleFormChange}
                    name="travelStatus"
                    value={formData.tripStatus}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Estatus del viaje
                    </option>
                    <option value={"Proposal"}>
                      Proposal
                    </option>
                    <option value={"Reservado"}>
                      Reservado
                    </option>
                    <option value={"En curso"}>
                      En curso
                    </option>
                    <option value={"Finalizado"}>
                      Finalizado
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Select
                    onChange={handleFormChange}
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Estatus de Pago
                    </option>
                    <option value={"Pendiente"}>
                      Pendiente
                    </option>
                    <option value={"Pagado"}>
                      Pagado
                    </option>
                    <option value={"Parcialidades"}>
                      Parcialidades
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>


            {/* Sección de hoteles */}
            <h5 className="mb-4">Hoteles</h5>
            {formData.hotels.map((hotel, index) => (
              <div key={index} className="mb-4 p-3 border rounded">
                <Row>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Select
                        name="hotelName"
                        onChange={(e) => handleHotelChange(index, "name", e.target.value)}
                        value={hotel.name}
                        disabled={!formData.destination}
                      >
                        <option value="" disabled>
                          Seleccione un hotel
                        </option>
                        {filteredHoteles.map((hotelOption) => (
                          <option key={hotelOption.hotelID} value={hotelOption.name}>
                            {hotelOption.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Control
                        name="roomName"
                        placeholder="Detalle de la habitación"
                        type="text"
                        value={hotel.details}
                        onChange={(e) => handleHotelChange(index, "details", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Control
                        placeholder="Monto(MXN)"
                        type="number"
                        name="hotelPrice"
                        value={hotel.amount}
                        onChange={(e) => handleHotelChange(index, "amount", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>
                      <input
                        type="checkbox"
                        checked={showExtraFields}
                        onChange={handleCheckboxChange}
                      />
                      Mostrar campos extra
                    </label>
                    {showExtraFields && (
                      <div>
                        <Form.Group className="mb-2">
                          <Form.Label>Extra</Form.Label>
                          <Form.Control
                            type="text"
                            name="extra"
                            value={hotel.extra}
                            onChange={(e) =>
                              handleHotelChange(index, "extra", e.target.value)
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Monto Extra (MXN)</Form.Label>
                          <Form.Control
                            type="number"
                            name="extraAmount"
                            value={hotel.extraAmount}
                            onChange={(e) =>
                              handleHotelChange(index, "extraAmount", e.target.value)
                            }
                          />
                        </Form.Group>
                      </div>
                    )}
                  </Col>
                </Row>
              </div>



            ))}

            {/* Opciones adicionales */}
            <h5 className="mb-4">Opciones adicionales</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Incluye traslados"
                    onChange={(e) => setFormData({ ...formData, includeTransfers: e.target.checked })}
                  />
                  {formData.includeTransfers && (
                    <Form.Group className="mt-2">
                      <Form.Label>Monto de traslados (MXN)</Form.Label>
                      <Form.Control
                        type="number"
                        name="transferPrice"
                        value={formData.transferAmount || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, transferAmount: e.target.value })
                        }
                      />
                    </Form.Group>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Incluye vuelos"
                    onChange={(e) => setFormData({ ...formData, includeFlights: e.target.checked })}
                  />
                  {formData.includeFlights && (
                    <div>
                      <Form.Group className="mt-2">
                        <Form.Label>Monto del vuelo (MXN)</Form.Label>
                        <Form.Control
                          type="number"
                          name="flightPrice"
                          value={formData.flightAmount || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, flightAmount: e.target.value })
                          }
                        />
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Label>Subir itinerario de vuelo</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Subir detalle de equipaje</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleFileChangeEquipaje} />
                      </Form.Group>
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Botón para guardar */}
            <Button variant="primary" type="submit" className="mt-3">
              Guardar Reservación
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {selectedReservation && (
        <ReservationModal
          show={showModalEdit}
          handleClose={() => setShowModal(false)}
          reservation={selectedReservation}
          onUpdate={handleUpdateReservation}
        />
      )}
    </div>
  );
}

export default Reservations;
