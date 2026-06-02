import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Form, Table, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import destinos from '../../assets/destinos';
import footer from '../../assets/footer.png';
import header from '../../assets/header.png';
import NationalQuote from './quoteTypes/NationalQuote';
import InternationalQuote from './quoteTypes/InternationalQuote';

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
  const [qouteType, setQouteType] = useState('national');

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

    const location = location_id;

    const updatedHotels = [...formData.hotels];

    updatedHotels[index].hotelID = location ? location : "";


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

/*       const res = await fetch(`https://travel-friends-server.vercel.app/api/hotels?q=${encodeURIComponent(query)}`);
 */      const res = await fetch(`http://localhost:3001/api/hotels?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setSuggestions(data.places || []);
      //   setSuggestions(data.data || []);
    } catch (error) {
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
    if (file) {
      setFlightImage(URL.createObjectURL(file));
    }
  };

  const handleFileChangeEquipaje = (e) => {
    const file = e.target.files[0];
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

    // Generar el enlace automáticamente cuando el nombre del hotel se selecciona
    if (field === "name") {

      if (mode === "notTyping") {

        setHotelInput(value);
        setFormData({ ...formData, [field]: value });
        return;
      }

      if (mode === "auto") {
        setHotelInput(value);
        setFormData({ ...formData, [field]: value });
        setIsTyping(true);
      } else {
        const hotel = hotelCatalog[0].hoteles.find((h) => h.name === value);
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


    const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
  };

  const updateDates = (update) => {
    setFormData({ ...formData, dates: update });

    setDates(update)
  }
  const generatePDF = async () => {

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


        if (showExtraFields) {

          rows = [
            [hotel.name, hotel.details, { content: formatCurrency(hotelAmount), styles: { halign: "right" } }],
            ["", hotel.extra, { content: formatCurrency(hotelExtraAmount), styles: { halign: "right" } }]
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

          if (formData?.includeTransfers) {
            rows.push([
              "",
              "Traslados",
              { content: formatCurrency(transferAmount || 0), styles: { halign: "right" } },
            ]);
          }

          if (formData?.includeFlights) {
            rows.push([
              "",
              "Vuelos",
              { content: formatCurrency(flightAmount || 0), styles: { halign: "right" } },
            ]);
          }

          rows.push(["", "Total", { content: formatCurrency(totalAmount), styles: { halign: "right", fontStyle: "bold" } }]);
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

    // AGREGAR IMAGENES DE TRIP ADVISOR 

    const hotelImages = await fetchHotelImages(formData.hotels);


    formData.hotels.forEach((hotel) => {


      const imagesData = hotelImages[hotel.hotelID]?.data.propertyDetailsSearch.propertyDetails[0].contentDetail.contentImages.hotelImages || [];
      //   const imagesData = hotelImages[hotel.hotelID]?.data.contentDetail.contentImages.hotelImages || [];

      if (imagesData.length === 0) return; // Saltar si no hay imágenes

      doc.addPage(); // Agregar una nueva página para el siguiente hotel
      doc.setFontSize(16);
      doc.text(`${hotel.name}`, 10, 30); // Título del hotel

      imagesData.slice(0, 16).forEach((imageData, index) => {
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

        let imageUrl = imageData.urls[0].value; // Usando la imagen de tamaño "large"

        if (imageUrl?.startsWith("//")) {
          imageUrl = "https:" + imageUrl;
        }

        // Usar la API URL para obtener el pathname sin los parámetros
        const pathname = new URL(imageUrl).pathname;


        // Extraer la extensión del archivo (sin parámetros)
        const extension = pathname.split('.').pop().toLowerCase();


        // Mapear extensión a formato aceptado por jsPDF
        let imageFormat;
        if (["jpg", "jpeg"].includes(extension)) {
          imageFormat = "JPEG";
        } else if (["png"].includes(extension)) {
          imageFormat = "PNG";
        } else if (["webp"].includes(extension)) {
          imageFormat = "WEBP"; // Solo en builds que lo soporten
        } else {
          return;
        }

        // Insertar la imagen
        doc.addImage(imageUrl, imageFormat, x, y, 85, 55);
      });
    });

    // Agregar imagen de footer a todas las páginas
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      addFooterImage(doc, footer);
      addHeaderImage(doc, header);

    }

    // Generar PDF
    doc.save("cotizacion.pdf");
  };


  const handleChangeQuote = (e) => {
    setQouteType(e.target.value);
  }
  // Función para obtener imágenes de los hoteles
  const fetchHotelImages = async (hotels) => {
    const hotelImages = {};

    try {
      // Hacer las peticiones para todos los hoteles en paralelo
      await Promise.all(
        hotels.map(async (hotel) => {
          let hotelId = hotel.hotelID

          const res = await fetch(`http://localhost:3001/api/hotelImages?q=${hotelId}`);
          const data = await res.json();
          hotelImages[hotel.hotelID] = data;
        })
      );
    } catch (error) {
    }

    return hotelImages;
  };


  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#333', fontWeight: '700', marginBottom: '10px' }}>Cotizaciones de Viaje</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>Gestiona y crea cotizaciones para tus clientes</p>
        <Button
          variant="primary"
          onClick={openModal}
          size="lg"
          style={{
            borderRadius: '6px',
            fontWeight: '600',
            backgroundColor: '#0057e0',
            border: 'none',
            paddingLeft: '25px',
            paddingRight: '25px',
          }}
        >
          + Nueva Cotización
        </Button>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}>
        <Table striped hover style={{ marginBottom: 0 }}>
          <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>
            <tr>
              <th style={{ padding: '15px', fontWeight: '600', color: '#333' }}>#</th>
              <th style={{ padding: '15px', fontWeight: '600', color: '#333' }}>Asesor</th>
              <th style={{ padding: '15px', fontWeight: '600', color: '#333' }}>Cliente</th>
              <th style={{ padding: '15px', fontWeight: '600', color: '#333' }}>Destino</th>
              <th style={{ padding: '15px', fontWeight: '600', color: '#333' }}>Fechas</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0e0e0', transition: 'background 0.2s' }}>
              <td style={{ padding: '15px', color: '#666' }}>1</td>
              <td style={{ padding: '15px', color: '#333', fontWeight: '500' }}>Juan Pérez</td>
              <td style={{ padding: '15px', color: '#333', fontWeight: '500' }}>María López</td>
              <td style={{ padding: '15px' }}><span style={{ backgroundColor: '#e3f2fd', color: '#0057e0', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Cancún</span></td>
              <td style={{ padding: '15px', color: '#666' }}>01/02/2025 - 08/02/2025</td>
            </tr>
            <tr style={{ backgroundColor: '#fafafa' }}>
              <td style={{ padding: '15px', color: '#666' }}>2</td>
              <td style={{ padding: '15px', color: '#333', fontWeight: '500' }}>Ana García</td>
              <td style={{ padding: '15px', color: '#333', fontWeight: '500' }}>Carlos Sánchez</td>
              <td style={{ padding: '15px' }}><span style={{ backgroundColor: '#fff3e0', color: '#f57c00', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Acapulco</span></td>
              <td style={{ padding: '15px', color: '#666' }}>15/03/2025 - 22/03/2025</td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Modal */}
      <Modal show={showModal} backdrop="static" keyboard={false} onHide={closeModal} size="xl" centered>
        <Modal.Header closeButton style={{ borderBottom: '2px solid #e0e0e0', padding: '20px' }}>
          <div>
            <Modal.Title style={{ fontSize: '1.4rem', fontWeight: '700', color: '#333', marginBottom: '10px' }}>
              Nueva Cotización
            </Modal.Title>

            {/* <p style={{ color: '#666', marginBottom: 0, fontSize: '0.9rem' }}>
              Selecciona el tipo de cotización que deseas crear
            </p> */}
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Form.Group>
              {/* <Form.Label style={{ fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                Tipo de Cotización
              </Form.Label> */}
              <div style={{ marginBottom: '20px', width: '200px' }}>
                <Form.Select
                  onChange={handleChangeQuote}
                  style={{
                    borderRadius: '6px',
                    border: '1px solid #e0e0e0',
                    padding: '10px 12px',
                    fontSize: '1rem',
                  }}
                >
                  <option value="national">Nacional</option>
                  <option value="international">Internacional</option>
                </Form.Select>
              </div>

            </Form.Group>
          </div>
        </Modal.Header>
        <Modal.Body style={{ padding: '10px' }}>


          {qouteType === 'national' && <NationalQuote />}
          {qouteType === 'international' && <InternationalQuote />}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Quotes;
