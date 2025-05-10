import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Form, Table, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import destinos from '../../assets/destinos';
import logo from '../../assets/logo.png';
import footer from '../../assets/footer.png';
import header from '../../assets/header.png';
import axios from 'axios';


function Quotes() {
  const options = {
    method: 'GET', headers: {
      accept: 'application/json', origin: 'https://travel-friends-mu.vercel.app',
      referer: 'https://travel-friends-mu.vercel.app'
    }
  };

  const [activeHotelIndex, setActiveHotelIndex] = useState(null);

  const [showExtraFields, setShowExtraFields] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [manualQuote, setManualQuote] = useState(false)
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);

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

  const [hotelInput, setHotelInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (hotelInput.length < 5 || !isTyping) {
      setSuggestions([]);
      return;
    }

    // Limpiar el debounce anterior si existe
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Establecer nuevo timeout para hacer la petición después de 2 segundos sin escribir
    debounceRef.current = setTimeout(() => {
      fetchHotels(hotelInput);
    }, 2000);

    return () => clearTimeout(debounceRef.current);
  }, [hotelInput, isTyping]);

  const handleInputChange = (e) => {
    setHotelInput(e.target.value);
    handleFormChange(e); // seguir usando tu lógica original si necesitas almacenar este valor
    setIsTyping(true);

  };

  const handleSuggestionClick = (index, hotelName, location_id) => {

    console.log("index", index)
    console.log("hotelName", hotelName)
    console.log("location_id", location_id)

    const updatedHotels = [...formData.hotels];

    updatedHotels[index].hotelID = location_id ? location_id : "";


    setFormData({ ...formData, hotels: updatedHotels });

    setSuggestions([]);
    setIsTyping(false); // ✅ Esto evita que se dispare la búsqueda después de seleccionar

    // Simular un evento para actualizar el estado padre si es necesario
    handleFormChange({ target: { name: 'hotel', value: hotelName } });

    handleHotelChange(index, 'name', hotelName, 'notTyping')

  };


  const fetchHotels = async (query) => {

    try {
      setLoading(true);

      const res = await fetch(`https://travel-friends-server.vercel.app/api/hotels?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      console.log("response.data", data);
      setSuggestions(data.data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const [selectedDestino, setSelectedDestino] = useState("");

  const [flightImage, setFlightImage] = useState(null);
  const [flightImageEquipaje, setFlightImageEquipaje] = useState(null);
  const [hotelImage, setHotelImage] = useState(null);

  // Manejador de eventos para el checkbox
  const handleCheckboxChange = (e) => {
    setShowExtraFields(e.target.checked);
  };


  // Manejador de eventos para el cambio a manual
  const handleChangeManual = (e) => {
    setManualQuote(e.target.checked);
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

  const [hotelImages, setHotelImages] = useState([]);


  const handleFileChangeHotel = (event, hotelId) => {
    const files = Array.from(event.target.files);

    const compressImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.3) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            // Crear un canvas para redimensionar la imagen
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            let width = img.width;
            let height = img.height;

            // Mantener proporción al redimensionar
            if (width > maxWidth || height > maxHeight) {
              const aspectRatio = width / height;
              if (width > height) {
                width = maxWidth;
                height = maxWidth / aspectRatio;
              } else {
                height = maxHeight;
                width = maxHeight * aspectRatio;
              }
            }

            canvas.width = width;
            canvas.height = height;

            // Dibujar la imagen en el canvas con el nuevo tamaño
            ctx.drawImage(img, 0, 0, width, height);

            // Convertir a JPEG (compatible con jsPDF)
            const outputFormat = file.type === "image/avif" ? "image/jpeg" : file.type;
            const compressedBase64 = canvas.toDataURL(outputFormat, quality);

            resolve({ name: file.name, base64: compressedBase64 });
          };
        };
      });
    };


    // Procesar todas las imágenes con compresión
    const promises = files.map((file) => compressImage(file));

    Promise.all(promises).then((compressedImages) => {
      setHotelImages((prevImages) => ({
        ...prevImages,
        [hotelId]: [...(prevImages[hotelId] || []), ...compressedImages],
      }));
    });
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



  const handleHotelChange = (index, field, value, mode) => {
    const updatedHotels = [...formData.hotels];
    updatedHotels[index][field] = value;

    console.log("Field", field)
    // Generar el enlace automáticamente cuando el nombre del hotel se selecciona
    if (field === "name") {

      if (mode === "notTyping") {
        console.log("updated hoteles", updatedHotels)
        setHotelInput(value);
        setFormData({ ...formData, [field]: value });
        return;
      }

      if (mode === "auto") {

        console.log("value", value)

        setHotelInput(value);
        setFormData({ ...formData, [field]: value });
        setIsTyping(true);
      } else {

        console.log("value", value)
        console.log("hotelCatalog", hotelCatalog)
        const hotel = hotelCatalog[0].hoteles.find((h) => h.name === value);

        console.log("hotel", hotel)

        const hotelId = hotel.hotelID !== undefined ? hotel.hotelID : hotel.hotelId;

        updatedHotels[index].hotelID = hotel ? hotel.hotelID : "";
      }
    }

    setFormData({ ...formData, hotels: updatedHotels });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
  const generatePDF = async () => {

    console.log(formData)
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
      ], columnStyles: {
        0: { cellWidth: 60 } // Fijamos el ancho de la primera columna a 80 (puedes ajustarlo)
      }, body: formData.hotels.flatMap((hotel) => {
        const formatCurrency = (value) => {
          return `$${Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }; // Formato con comas y 2 decimales
        const hotelAmount = Number(hotel.amount || 0);
        const hotelExtraAmount = Number(hotel.extraAmount || 0);
        const transferAmount = Number(formData.transferAmount || 0);
        const flightAmount = Number(formData.flightAmount || 0);
        const totalAmount = hotelAmount + hotelExtraAmount + transferAmount + flightAmount;

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

            /*  [
               {
                 content: `${hotel.link}`,
                 colSpan: 3, // Ocupa el ancho completo de las tres columnas
                 styles: { textColor: "#0000EE", fontStyle: "italic" },
                 underline: true, // Estilo de texto (azul y cursiva para indicar enlace)
               },
             ] */
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
                /*                 content: `${hotel.link}`,
                
                
                
                 */
                content: ``,
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
      if (formData.includeTransfers === true) {
        doc.text("Vuelos:", 10, doc.autoTable.previous.finalY + 10);
      }
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



    doc.setPage(2);

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

    // AGREGAR IMAGENES DE TRIP ADVISOR 

    const hotelImages = await fetchHotelImages(formData.hotels);

    console.log("hotelIMAGENES:", hotelImages);


    formData.hotels.forEach((hotel) => {
      const imagesData = hotelImages[hotel.hotelID]?.data || [];

      if (imagesData.length === 0) return; // Saltar si no hay imágenes

      doc.addPage(); // Agregar una nueva página para el siguiente hotel
      doc.setFontSize(16);
      doc.text(`${hotel.name}`, 10, 30); // Título del hotel

      imagesData.forEach((imageData, index) => {
        const imagesPerPage = 8; // Máximo de imágenes por página
        const colWidth = 95; // Espacio entre columnas
        const rowHeight = 60; // Espacio entre filas
        const marginX = 15;
        const marginY = 40;

        // Calcular posición en columnas
        const col = index % 2;
        const row = Math.floor(index / 2) % (imagesPerPage / 2);

        const x = marginX + col * colWidth;
        const y = marginY + row * rowHeight;

        // Si el índice actual es múltiplo de imagesPerPage, agregar nueva página
        if (index > 0 && index % imagesPerPage === 0) {
          doc.addPage();
        }

        const imageUrl = imageData.images.large.url; // Usando la imagen de tamaño "large"
        doc.addImage(imageUrl, "JPEG", x, y, 85, 55);
      });
    });

    // Agregar imagen de footer a todas las páginas
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      addFooterImage(doc, footer);
      addHeaderImage(doc, header);

    }

    /*       doc.addImage(hotelImage, "PNG", 55, startY, imgWidth, imgHeight);
     */

    /*     doc.addImage(flightImage, "PNG", 55, 180, 100, 50);
        doc.addImage(flightImageEquipaje, "PNG", 55, 235, 100, 40); */

    // Generar PDF
    doc.save("cotizacion.pdf");
  };


  // Función para obtener imágenes de los hoteles
  const fetchHotelImages = async (hotels) => {
    const hotelImages = {};

    try {
      // Hacer las peticiones para todos los hoteles en paralelo
      await Promise.all(
        hotels.map(async (hotel) => {
          const res = await fetch(`https://travel-friends-server.vercel.app/api/hotelImages?q=${hotel.hotelID}`);
          const data = await res.json();
          hotelImages[hotel.hotelID] = data;
        })
      );

      console.log("Imágenes de hoteles:", hotelImages);
    } catch (error) {
      console.error("Error fetching hotel images:", error);
    }

    return hotelImages;
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
            {/* Información principal */}
            <Row>
              <Col md={4}>
                <h5 className="mb-4">Información del viaje</h5>

              </Col>

              <Col md={4}>
                <label>
                  <input
                    type="checkbox"
                    checked={manualQuote}
                    onChange={handleChangeManual}
                  />
                  Manual
                </label>

              </Col>


            </Row>
            <Row className="mb-3">
              {/* <Col md={4}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="advisor"
                    onChange={handleFormChange}
                    placeholder="Nombre del asesor"
                  />
                </Form.Group>
              </Col> */}
              <Col md={4}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="clientName"
                    onChange={handleFormChange}
                    placeholder="Nombre del cliente"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="telefono"
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
                  {!manualQuote ? (<Form.Control placeholder="Destino" type="text" name="destination" value={formData.destination}
                    onChange={handleFormChange} />
                  ) : (<Form.Select
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
                  </Form.Select>)
                  }

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


            {/* Sección de hoteles */}
            <h5 className="mb-2">Hoteles</h5>
            {formData.hotels.map((hotel, index) => (
              <div key={index} className="mb-4 p-3 border rounded">
                <Row>
                  <Col md={4}>
                    <Form.Group>
                      {!manualQuote ? (

                        <div style={{ position: 'relative' }}>
                          <Form.Control
                            onFocus={() => setActiveHotelIndex(index)}
                            placeholder="Hotel"
                            type="text"
                            value={hotel.name}
                            name="hotel"
                            onChange={(e) => handleHotelChange(index, "name", e.target.value, "auto")} autoComplete="off"
                          />
                          {loading && activeHotelIndex === index && <div>Cargando...</div>}
                          {activeHotelIndex === index && suggestions.length > 0 && (
                            <ul
                              style={{
                                position: 'absolute',
                                zIndex: 1000,
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                width: '100%',
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                maxHeight: '200px',
                                overflowY: 'auto',
                              }}
                            >
                              {suggestions.map((hotel, index2) => (
                                <li
                                  key={index}
                                  onClick={() => handleSuggestionClick(index, hotel.name, hotel.location_id)}
                                  style={{ padding: '8px', cursor: 'pointer' }}
                                >
                                  {hotel.name}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                      ) : (
                        <Form.Select
                          name="hotel"
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
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      {/* <Form.Control
                        placeholder="Detalle de la habitación"
                        type="text"
                        value={hotel.details}
                        onChange={(e) => handleHotelChange(index, "details", e.target.value)}
                      /> */}
                      <Form.Control
                        as="textarea"
                        placeholder="Detalle de la habitación"
                        value={hotel.details}
                        onChange={(e) => handleHotelChange(index, "details", e.target.value)}
                        onInput={(e) => {
                          e.target.style.height = 'auto'; // Reinicia altura para reducir si se borra texto
                          e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta a la altura del contenido
                        }}
                        style={{
                          overflow: 'hidden',
                          resize: 'none',
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Control
                        placeholder="Monto"
                        type="number"
                        value={hotel.amount}
                        onChange={(e) => handleHotelChange(index, "amount", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="">
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Imagenes</Form.Label>
                      <Form.Control type="file" multiple accept="image/*" onChange={(event) => handleFileChangeHotel(event, index)} />
                    </Form.Group>
                  </Col>
                  <Col md={7}>
                    <label>
                      <input
                        type="checkbox"
                        checked={showExtraFields}
                        onChange={handleCheckboxChange}
                      />
                      Extra
                    </label>
                    {showExtraFields && (
                      <Row>
                        <Col md={8}>
                          <Form.Group className="mb-2">
                            <Form.Control
                              as="textarea"
                              placeholder="Detalle extra"
                              type="text"
                              value={hotel.extra}
                              onChange={(e) =>
                                handleHotelChange(index, "extra", e.target.value)
                              }
                              onInput={(e) => {
                                e.target.style.height = 'auto'; // Reinicia altura para reducir si se borra texto
                                e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta a la altura del contenido
                              }}
                              style={{
                                overflow: 'hidden',
                                resize: 'none',
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-2">
                            <Form.Control
                              type="number"
                              placeholder="Monto"
                              value={hotel.extraAmount}
                              onChange={(e) =>
                                handleHotelChange(index, "extraAmount", e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    )}
                  </Col>
                  <Col md={2} className="mb-4 p-2">
                    <Button variant="danger" onClick={() => removeHotel(index)} >
                      Quitar
                    </Button>
                  </Col>
                </Row>
                <Row>

                </Row>
              </div>



            ))}
            <Button variant="success" onClick={addHotel} className="mb-2">
              Agregar Hotel
            </Button>

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
              Guardar y Generar PDF
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div >
  );
}

export default Quotes;
