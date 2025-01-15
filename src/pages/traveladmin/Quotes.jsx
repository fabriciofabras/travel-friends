import React, { useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import destinos from '../../assets/destinos';
import logo from '../../assets/logo.png';
import footer from '../../assets/footer.png';
import header from '../../assets/header.png';

function Quotes() {
  const [showExtraFields, setShowExtraFields] = useState(false);

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
    destino = destino[0].destino;
    setFormData({
      ...formData,
      destination: destino,
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
    }

    setFormData({ ...formData, hotels: updatedHotels });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    closeModal();
    generatePDF();
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
    const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const addHeaderImage = (doc, footer) => {
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;

      // Ajusta las dimensiones de la imagen según sea necesario
      const imgWidth = pageWidth; // Ancho de la imagen (ajustado al ancho de la página)
      const imgHeight = 65; // Altura de la imagen
      const x = 0; // Posición horizontal (comienza en el borde izquierdo)
      const y = 0; // Posición vertical (al final de la página)

      doc.addImage(footer, "PNG", x, y, imgWidth, imgHeight);
    };

    doc.setPage(2);
    addHeaderImage(doc, header);



    // Título
    doc.setFontSize(12);
    doc.text("Cotización de Viaje", 80, 25);

    // Información principal
    doc.setFontSize(10);
/*     doc.text(`Asesor de viaje: ${formData.advisor}`, 120, 15);
 */    doc.text(`Estimado(a) ${formData.clientName} le compartimos la cotización solicitada para el plan vacacional en ${formData.destination}`, 15, 35);
    doc.text(
      `del ${formatFecha(dates[0])} al ${formatFecha(dates[1])} para ${formData.adults} ${formData.adults > 1 ? 'adultos' : 'adulto'}${formData.children > 0 ? `, ${formData.children}` : '.'} ${formData.children > 0 ? formData.children > 1 ? 'menores.' : 'menor.' : ''}`,
      15,
      40
    );

    // Detalles del hotel
    doc.autoTable({
      head: [
        [
          { content: "Nombre del Hotel", styles: { fillColor: [0, 90, 224], textColor: [255, 255, 255], fontStyle: "bold" } },
          { content: "Detalles", styles: { fillColor: [0, 90, 224], textColor: [255, 255, 255], fontStyle: "bold" } },
          { content: "Monto (MXN)", styles: { fillColor: [0, 90, 224], textColor: [255, 255, 255], fontStyle: "bold", halign: "right" } }
        ],
      ], body: formData.hotels.flatMap((hotel) => {
        const formatCurrency = (value) => {
          return `$${Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }; // Formato con comas y 2 decimales
        const hotelAmount = Number(hotel.amount || 0);
        const hotelExtraAmount = Number(hotel.extraAmount || 0);
        const transferAmount = Number(formData.transferAmount || 0);
        const flightAmount = Number(formData.flightAmount || 0);
        const totalAmount = hotelAmount + transferAmount + flightAmount;

        let rows;

        console.log("hotel.extraAmount", hotelExtraAmount)
        if (showExtraFields) {

          rows = [
            [hotel.name, hotel.details, { content: formatCurrency(hotelAmount), styles: { halign: "right" } }],
            ["", hotel.extra, { content: formatCurrency(hotelExtraAmount), styles: { halign: "right" } }],
            ["", "Traslados", { content: formatCurrency(transferAmount), styles: { halign: "right" } }],
            ["", "Vuelos", { content: formatCurrency(flightAmount), styles: { halign: "right" } }],
            ["", "Total", { content: formatCurrency(totalAmount), styles: { halign: "right", fontStyle: "bold" } }],
            ,

            [
              {
                content: `${hotel.link}`,
                colSpan: 3, // Ocupa el ancho completo de las tres columnas
                styles: { textColor: "#0000EE", fontStyle: "italic" },
                underline: true, // Estilo de texto (azul y cursiva para indicar enlace)
              },
            ]
          ];
        } else {

          rows = [
            [hotel.name, hotel.details, { content: formatCurrency(hotelAmount), styles: { halign: "right" } }],
            ["", "Traslados", { content: formatCurrency(transferAmount), styles: { halign: "right" } }],
            ["", "Vuelos", { content: formatCurrency(flightAmount), styles: { halign: "right" } }],
            ["", "Total", { content: formatCurrency(totalAmount), styles: { halign: "right", fontStyle: "bold" } }],
            ,

            [
              {
                content: `${hotel.link}`,
                colSpan: 3, // Ocupa el ancho completo de las tres columnas
                styles: { textColor: "#0000EE", fontStyle: "italic" },
                underline: true, // Estilo de texto (azul y cursiva para indicar enlace)
              },
            ]
          ];

        }

        return rows;
      }),
      startY: 45,
      didDrawCell: (data) => {
        const { column, cell, row } = data;
        const hotelLink = row.raw[3]; // Columna que contiene el enlace

        if (column.index === 0 && hotelLink) {
          // Sólo añade un enlace si está en la columna del nombre del hotel
          doc.link(
            cell.x, // Coordenada X de la celda
            cell.y, // Coordenada Y de la celda
            cell.width, // Ancho de la celda
            cell.height, // Altura de la celda
            { url: hotelLink } // URL del enlace
          );
        }
      },
    });


    // Verificar si hay más de 3 hoteles
    if (formData.hotels.length > 3) {
      // Agregar una nueva página para los vuelos
      doc.addPage();

    } else {
      // Continuar en la misma página
      doc.text("Vuelos:", 10, doc.autoTable.previous.finalY + 10);
    }

    // Ajusta las dimensiones de la imagen según sea necesario
    const pageWidth = doc.internal.pageSize.width;

    const imgWidth = 110; // Ancho de la imagen (ajustado al ancho de la página)
    const imgHeight = 60; // Altura de la imagen
    const x = 50; // Posición horizontal (comienza en el borde izquierdo)
    const y = 150; // Posición vertical (al final de la página)



    const addFooterImage = (doc, footer) => {
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;

      // Ajusta las dimensiones de la imagen según sea necesario
      const imgWidth = pageWidth; // Ancho de la imagen (ajustado al ancho de la página)
      const imgHeight = 60; // Altura de la imagen
      const x = 0; // Posición horizontal (comienza en el borde izquierdo)
      const y = pageHeight - imgHeight; // Posición vertical (al final de la página)

      doc.addImage(footer, "PNG", x, y, imgWidth, imgHeight);
    };

    // Agregar imagen de footer a todas las páginas
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      addFooterImage(doc, footer);
    }

    doc.setPage(2);
    addHeaderImage(doc, header);



    const startY = formData.hotels.length > 3 ? 20 : doc.autoTable.previous.finalY + 10;
    /*     doc.text("Cotización de Vuelos:", 10, startY);
     */
    // Renderizar imagen de vuelo (si existe)
    if (flightImage) {
      const imgWidth = 100; // Ajustar el ancho de la imagen
      const imgHeight = 50; // Ajustar el alto de la imagen
      doc.addImage(flightImage, "PNG", 55, startY, imgWidth, imgHeight);
      doc.addImage(flightImageEquipaje, "PNG", 55, startY + 50, imgWidth, 40);

    }

    // Función para serializar formData
    const serializeFormData = (data) => {
      const params = new URLSearchParams();

      // Serializar datos simples
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "object" && !Array.isArray(value)) {
          // Manejar objetos (como fechas)
          Object.entries(value).forEach(([subKey, subValue]) => {
            params.append(`${key}[${subKey}]`, subValue);
          });
        } else if (Array.isArray(value)) {
          // Manejar arrays (hoteles)
          value.forEach((item, index) => {
            Object.entries(item).forEach(([itemKey, itemValue]) => {
              params.append(`${key}[${index}][${itemKey}]`, itemValue);
            });
          });
        } else {
          params.append(key, value);
        }
      });

      return params.toString();
    };

    // URL base
    const baseURL = "http://localhost:3000/quote/";

    // Serializar formData y generar URL
    const serializedData = encodeURIComponent(JSON.stringify(formData));
    const url = `localhost:3000/quote?formData=${serializedData}`;
    console.log(url);


    /*     doc.addImage(flightImage, "PNG", 55, 180, 100, 50);
        doc.addImage(flightImageEquipaje, "PNG", 55, 235, 100, 40); */

    // Generar PDF
    doc.save("cotizacion.pdf");
  };

  return (
    <div>
      <h2>Cotizaciones</h2>
      <Button variant="primary" onClick={openModal}>
        Nueva
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Asesor</th>
            <th>Cliente</th>
            <th>Destino</th>
            <th>Fechas</th>
          </tr>
        </thead>
        <tbody>
          {/* Ejemplo de datos dummie */}
          <tr>
            <td>1</td>
            <td>Juan Pérez</td>
            <td>María López</td>
            <td>Cancún</td>
            <td>01/02/2025 - 08/02/2025</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Ana García</td>
            <td>Carlos Sánchez</td>
            <td>Acapulco</td>
            <td>15/03/2025 - 22/03/2025</td>
          </tr>
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nueva Cotización</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Asesor de viaje</Form.Label>
              <Form.Control
                type="text"
                name="advisor"
                onChange={handleFormChange}
                placeholder="Nombre del asesor"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del cliente</Form.Label>
              <Form.Control
                type="text"
                name="clientName"
                onChange={handleFormChange}
                placeholder="Nombre del cliente"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fechas</Form.Label>
              <DatePicker
                selectsRange
                startDate={dates[0]}
                endDate={dates[1]}
                onChange={(update) => setDates(update)}
                isClearable={true}
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Destino</Form.Label>
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
            <Form.Group className="mb-3">
              <Form.Label>Adultos</Form.Label>
              <Form.Control
                type="number"
                name="adults"
                min="0"
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Menores</Form.Label>
              <Form.Control
                type="number"
                name="children"
                min="0"
                onChange={handleFormChange}
              />
            </Form.Group>

            <h5>Hoteles</h5>
            {formData.hotels.map((hotel, index) => (
              <div key={index} className="mb-3">
                <Form.Group className="mb-2">
                  <Form.Group className="mb-3">
                    <Form.Label>Hotel</Form.Label>
                    <Form.Select
                      name="hotel"
                      onChange={(e) =>
                        handleHotelChange(index, "name", e.target.value)
                      }
                      value={hotel.name} // Aquí usamos el valor específico para cada hotel
                      disabled={!formData.destination} // Deshabilita el campo si no hay destino seleccionado
                    >
                      <option value="" disabled>
                        Seleccione un hotel
                      </option>
                      {filteredHoteles.map((hotel) => (
                        <option key={hotel.hotelID} value={hotel.name}>
                          {hotel.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Detalles</Form.Label>
                  <Form.Control
                    type="text"
                    value={hotel.details}
                    onChange={(e) =>
                      handleHotelChange(index, "details", e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Monto (MXN)</Form.Label>
                  <Form.Control
                    type="number"
                    value={hotel.amount}
                    onChange={(e) =>
                      handleHotelChange(index, "amount", e.target.value)
                    }
                  />
                </Form.Group>

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
                        value={hotel.extraAmount}
                        onChange={(e) =>
                          handleHotelChange(index, "extraAmount", e.target.value)
                        }
                      />
                    </Form.Group>
                  </div>
                )}
                <Button
                  variant="danger"
                  onClick={() => removeHotel(index)}
                  className="mt-2"
                >
                  Quitar Hotel
                </Button>
              </div>
            ))}
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
                    value={formData.transferAmount || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, transferAmount: e.target.value })
                    }
                  />
                </Form.Group>)}
            </Form.Group>
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
                      value={formData.flightAmount || ""}
                      onChange={(e) => setFormData({ ...formData, flightAmount: e.target.value })}
                    />
                  </Form.Group>
                  <label>
                    Subir imagen de vuelo:
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                  </label>
                  <label>
                    Detalle equipaje:
                    <input type="file" accept="image/*" onChange={handleFileChangeEquipaje} />
                  </label>
                </div>
              )}
            </Form.Group>
            <Button variant="success" onClick={addHotel} className="mt-3">
              Agregar Hotel
            </Button>
            <Button variant="primary" type="submit">
              Guardar y Generar PDF
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Quotes;
