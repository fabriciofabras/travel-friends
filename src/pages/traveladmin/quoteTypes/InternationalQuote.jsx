
import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Form, Table, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import destinos from '../../../assets/destinos';
// import countries from '../../../assets/countries';
import footer from '../../../assets/footer.png';
import header from '../../../assets/header.png';

function InternationalQuote() {
            // Inicializar y sincronizar hoteles con formData para prellenado
            
        
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
    const [hotelCatalog, setHotelCatalog] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dates, setDates] = useState([null, null]);

    
    const [formData, setFormData] = useState(/** 
* Paste one or more documents here
*/
        /** 
* Paste one or more documents here
*/
        {
            "advisor": "",
            "clientName": "Areli",
            "quoteName": "Con sabor a Colombia",
            "dateRanges": [
                {
                    "startDate": "22/10/2026",
                    "endDate": "29/10/2026"
                },
                {
                    "startDate": "23/10/2026",
                    "endDate": "30/10/2026"
                },
                {
                    "startDate": "24/10/2026",
                    "endDate": "31/10/2026"
                },
                {
                    "startDate": "25/10/2026",
                    "endDate": "01/11/2026"
                },
                {
                    "startDate": "30/10/2026",
                    "endDate": "06/11/2026"
                }
            ],
            "price": {
                "byPerson": 0,
                "total": 0
            },
            "destination": "Colombia",
            "adults": "3",
            "children": "1",
            "hotelDetails": [],
            "extra": "",
            "rooms": 2,
            "extraAmount": "",
            "hotels": [
                {
                    "name": "",
                    "details": "",
                    "amount": "",
                    "ciudad": "Bogotá",
                    "hotel": "Best Western / Faranda Velverde / Morrison 114",
                    "tipo": "4 Estrellas"
                },
                {
                    "name": "",
                    "details": "",
                    "amount": "",
                    "ciudad": "Medellín",
                    "hotel": "Poblado Alejandria / Faranda Collection",
                    "tipo": "4 Estrellas"
                },
                {
                    "name": "",
                    "details": "",
                    "amount": "",
                    "hotel": "Holiday Inn Express / Caribe By Faranda / Capilla Del Mar",
                    "ciudad": "Cartagena",
                    "tipo": "4 Estrellas"
                }
            ],
            "days": "8",
            "nights": "7",
            "incluidedinTrip": [
                "Boleto de avión México – Bogotá – Medellín – Cartagena – Bogotá – México.",
                "Traslados aeropuerto – hotel – aeropuerto.",
                "02 noches de alojamiento en Bogotá en el hotel seleccionado.",
                "02 noches de alojamiento en Medellín en el hotel seleccionado.",
                "03 noches de alojamiento en Cartagena en el hotel seleccionado.",
                "Visita de Ciudad en Bogotá.",
                "Visita de Ciudad en Medellín con Comuna 13.",
                "Visita de Ciudad en Cartagena.",
                "Desayunos diarios.",
                "Guía de habla hispana.",
                "01 Sim Card por habitación con plan de datos para navegación y redes sociales.",
                "Documentos de viaje se entregarán en formato digital para descargar en su dispositivo móvil."
            ],
            "notIncludedinTrip": [
                "Tarjeta de Asistencia Turística (seguro de viajero). Consultar opciones.",
                "Ningún servicio no especificado.",
                "Excursiones marcadas como opcionales.",
                "Gastos personales y propinas a maleteros, trasladistas y meseros.",
                "Actividades acuáticas, snorkel, buceo con tanque, etc.",
                "Exceso de equipaje. Solo se contempla una maleta de 23 kilos por persona para los traslados. Cualquier pieza adicional genera un cargo extra."
            ],
            "itinerary": [
                {
                    "day": 1,
                    "title": "MÉXICO – MEDELLÍN – Visita de Ciudad y Comuna 13",
                    "detail": "Cita en el aeropuerto de la Ciudad de México para abordar el vuelo con destino a la Ciudad de Medellín, Colombia. (vuelo de madrugada). Arribo al aeropuerto de Medellín. Recepción, el guía lo espera con cartel del nombre del programa y/o logo de Mega Travel. Al llegar a “La Ciudad de la Eterna Primavera” haremos una pausa para almorzar (por cuenta de los pasajeros). Iniciaremos la visita panorámica por el reconocido sector del Poblado tomando la ruta hacía la reconocida Comuna 13, considerada por mucho tiempo como uno de los sectores más peligrosos del mundo y que hoy sorprende por su historia de resiliencia y transformación social a través del arte y la innovación; de la mano de un guía local caminaremos por sus particulares calles, apreciaremos los coloridos grafitis y haremos uso del primer sistema de escaleras eléctricas a cielo abierto en el mundo. Continuaremos visitando los lugares más representativos de la ciudad como Cerro Nutibara donde se encuentra la réplica de un pueblo tradicional antioqueño reflejado en las artesanías, gastronomía y arquitectura del lugar conocido como Pueblito Paisa; También podrás observar de forma panorámica la arquitectura de la ciudad y cerraremos nuestro city tour en el Parque Memorial Inflexión, un espacio urbano que hoy rinde homenaje a las víctimas de la época más difícil de violencia en Colombia, fue construido sobre el lugar que ocupaba el edificio Mónaco, antigua propiedad del líder del Cartel de Medellín, representando la memoria, esperanza y el cambio sin olvidar su historia. Será la oportunidad de explorar la renovación urbana y contemporánea que han dado forma a la identidad y cultura paisa. Al final del día registro en el hotel. Alojamiento en Medellín.(Check in a las 15:00 hrs). Alojamiento en Medellín."
                },
                {
                    "day": 2,
                    "title": "MEDELLÍN",
                    "detail": "Día libre para realizar actividades personales. Recomendamos un tour de día completo para conocer Guatapé.  Alojamiento en Medellín"
                },
                {
                    "day": 3,
                    "title": "MEDELLÍN",
                    "detail": "Día libre para realizar actividades personales. Recomendamos un tour de día completo para conocer Guatapé. Alojamiento en Medellín."
                },
                {
                    "day": 4,
                    "title": "MEDELLÍN - CARTAGENA ",
                    "detail": "A la hora indicada traslado al aeropuerto para tomar vuelo con destino a la Ciudad de Cartagena. Llegada, recepción y traslado al hotel elegido. Alojamiento en Cartagena."
                },
                {
                    "day": 5,
                    "title": "CARTAGENA - Visita de Ciudad con Castillo de San Felipe",
                    "detail": "Cartagena de Indias, es uno de los destinos más turísticos de este país. En ella, encuentras toda la alegría, el sabor y el color de la región caribe. Un representante los acompañara en este maravilloso recorrido por la ciudad.  Pasaremos por la moderna Bocagrande, con sus playas y zonas comerciales, continuaremos al barrio de Manga, donde el contraste entre la arquitectura republicana y los modernos edificios te asombrará. Llegaremos a una de las joyas de la ciudad: el Castillo o fuerte de San Felipe de Barajas, construido por los españoles, para defenderse de los piratas y posteriormente, de los ingleses, en el siglo XVII. Continuaremos con una breve caminata por el centro histórico de esta hermosa ciudad, visitando la iglesia San Pedro Claver, lugar donde se encuentran los restos del santo, conocido como el Apóstol de los Negros, y declarado defensor de los derechos humanos. Durante este recorrido, tendrás la posibilidad de visitar una joyería en la que encontrarás diversos artículos que muestran la belleza de las esmeraldas. Regreso al hotel, resto del día libre. Alojamiento en Cartagena."
                },
                {
                    "day": 6,
                    "title": "CARTAGENA - BOGOTÁ",
                    "detail": "Desayuno en el hotel. Check out 12:00 hrs. Se recomienda realizar tour a Isla Tierra Bomba - Atolón. A la hora indicada, traslado al aeropuerto para abordar vuelo con destino a Bogotá. Llegada, recepción y traslado al hotel. Alojamiento en Bogotá."
                },
                {
                    "day": 7,
                    "title": "BOGOTÁ -Visita de Ciudad, Monserrate y Museo Botero",
                    "detail": "A la hora indicada los recogerán en el hotel para dar inicio a la visita de ciudad. Comienza en el Museo de Botero, donde se encuentra la donación del artista colombiano Fernando Botero, que alberga 123 obras de su autoría y 85 obras de otros artistas internacionales. Continuaremos caminando y recorriendo las principales calles del Centro Histórico de forma panorámica dónde apreciaremos los principales atractivos arquitectónicos, históricos y culturales de Bogotá: el Teatro Colón, Palacio San Carlos, Plaza de Bolívar y la Catedral Primada de Colombia. Finalizaremos visitando la cima del Cerro de Monserrate, a través del funicular o teleférico, se estará ascendiendo 3.152 metros más cerca de las estrellas para conocer el santuario donde se venera la imagen del Señor Caído de Monserrate y la Virgen Morena de Monserrat, así como la vista panorámica de la ciudad. Alojamiento en Bogotá.\nNOTA: El museo Botero se encuentra cerrado todos los martes, se reemplazará visitando Museo del Oro. Los domingos Monserrate experimenta una notable congestión debido a la afluencia tanto de visitantes internacionales como de locales."
                },
                {
                    "day": 8,
                    "title": "BOGOTÁ – MÉXICO",
                    "detail": "A la hora convenida traslado al aeropuerto para tomar el vuelo regular con destino a la Ciudad de México."
                }
            ],
            "optionalTours": [],
            "telefono": "",
            "email": "",
            "name": "",
            "itineraryNotes": "",
            "createdAt": {
                "$date": "2026-01-10T19:45:14.224Z"
            },
            "numCountries": 1,
            "numCities": 3,
            "countriesList": [
                "Colombia"
            ],
            "citiesList": [
                "Bogotá",
                "Medellín",
                "Cartagena"
            ],
            "hotel": "s",
            "roomsList": [
                {
                    "adults": 1,
                    "juniors": 1,
                    "price": "2794"
                },
                {
                    "adults": 2,
                    "juniors": 0,
                    "price": "2794"
                }
            ],
            "currency": "USD"
        }
    );

    const [hotelInput, setHotelInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef(null);

    const [hotelFields, setHotelFields] = useState(() => {
                if (Array.isArray(formData.hotels)) {
                    // Asegura al menos un campo vacío si no hay hoteles
                    return formData.hotels.length > 0 ? formData.hotels.map(h => ({
                        name: h.name || h.hotel || '',
                        ciudad: h.ciudad || h.city || '',
                        details: h.details || '',
                        amount: h.amount || '',
                        tipo: h.tipo || h.category || ''
                    })) : [{ name: '', ciudad: '', details: '', amount: '', tipo: '' }];
                }
                return [{ name: '', ciudad: '', details: '', amount: '', tipo: '' }];
            });

            useEffect(() => {
                setFormData(prev => ({
                    ...prev,
                    hotels: hotelFields.map(h => ({
                        name: h.name,
                        ciudad: h.ciudad,
                        details: h.details,
                        amount: h.amount,
                        tipo: h.tipo
                    }))
                }));
            }, [hotelFields]);

    // Inicializar y sincronizar adultos, menores, días y noches con formData
        const [adults, setAdults] = useState(() => formData.adults || '');
        const [children, setChildren] = useState(() => formData.children || '');
        const [days, setDays] = useState(() => formData.days || '');
        const [nights, setNights] = useState(() => formData.nights || '');

        useEffect(() => {
            setFormData(prev => ({
                ...prev,
                adults,
                children,
                days,
                nights
            }));
        }, [adults, children, days, nights]);
        
    // Inicializar campos de países y ciudades desde formData para prellenado
    const [countryFields, setCountryFields] = useState(() => {
        if (formData.countriesList && Array.isArray(formData.countriesList)) {
            const arr = [...formData.countriesList];
            while (arr.length < 4) arr.push('');
            return arr;
        }
        return ['', '', '', ''];
    });
    const [cityFields, setCityFields] = useState(() => {
        if (formData.citiesList && Array.isArray(formData.citiesList)) {
            const arr = [...formData.citiesList];
            while (arr.length < 4) arr.push('');
            return arr;
        }
        return ['', '', '', ''];
    });
    const [numCountries, setNumCountries] = useState(() => {
        if (typeof formData.countries === 'number') return formData.countries;
        if (formData.countriesList && Array.isArray(formData.countriesList)) return formData.countriesList.length;
        return 0;
    });
    const [numCities, setNumCities] = useState(() => {
        if (typeof formData.cities === 'number') return formData.cities;
        if (formData.citiesList && Array.isArray(formData.citiesList)) return formData.citiesList.length;
        return 0;
    });

    // Sincronizar con formData (siempre escribir en formData)
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            countries: numCountries,
            cities: numCities,
            countriesList: countryFields.slice(0, numCountries).filter(c => c.trim() !== ''),
            citiesList: cityFields.slice(0, numCities).filter(c => c.trim() !== ''),
        }));
    }, [countryFields, cityFields, numCountries, numCities]);
    // Multiple date ranges state (keeps Date objects)
    const [dateRanges, setDateRanges] = useState(() => {
        try {
            const initial = formData?.dateRanges;
            if (Array.isArray(initial) && initial.length > 0) {
                const parse = (v) => {
                    if (!v) return null;
                    if (v instanceof Date) return v;
                    // expect dd/mm/yyyy or ISO
                    if (typeof v === 'string' && v.includes('/')) {
                        const [d, m, y] = v.split('/').map((s) => parseInt(s, 10));
                        return new Date(y, m - 1, d);
                    }
                    const d = new Date(v);
                    return isNaN(d.getTime()) ? null : d;
                };
                return initial.map((r) => ({ startDate: parse(r.startDate), endDate: parse(r.endDate) }));
            }
        } catch (e) { }
        return [{ startDate: null, endDate: null }];
    });
    
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

    // Keep formData.dateRanges in sync with dateRanges (store as dd/mm/yyyy strings)
    useEffect(() => {
        const formatDate = (dt) => {
            if (!dt) return '';
            const d = dt.getDate().toString().padStart(2, '0');
            const m = (dt.getMonth() + 1).toString().padStart(2, '0');
            const y = dt.getFullYear();
            return `${d}/${m}/${y}`;
        };

        const serialized = dateRanges.map((r) => ({ startDate: r.startDate ? formatDate(r.startDate) : '', endDate: r.endDate ? formatDate(r.endDate) : '' }));
        setFormData((prev) => ({ ...prev, dateRanges: serialized }));

        // Also update `dates` preview (first range) used elsewhere
        if (dateRanges[0]) {
            setDates([dateRanges[0].startDate, dateRanges[0].endDate]);
        } else {
            setDates([null, null]);
        }
    }, [dateRanges]);

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
 */      const res = await fetch(`https://travel-friends-server.vercel.app/api/hotels?q=${encodeURIComponent(query)}`);
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
    const [itineraryImage, setItineraryImage] = useState(null);

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

    const handleItineraryImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setItineraryImage(URL.createObjectURL(file));
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
            hotels: [{ name: "", ciudad: "" }], // Reinicia la lista de hoteles al cambiar destino
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

    const saveIdea = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/addIdea', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error('Error adding idea:', error);
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        //   generatePDF();
        saveIdea();

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

        console.log('Generando PDF...');
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
        doc.text(formData.quoteName, 80, 25);

        // Información principal
        doc.setFontSize(10);
        doc.text(`Estimado(a) ${formData.clientName} le compartimos la cotización solicitada para ${formData.destination}`, 15, 35);

        // === Información de países y ciudades ===
        let yInfo = 43;
        const paises = formData.countriesList || [];
        const ciudades = formData.citiesList || [];
        const numPaises = paises.length;
        const numCiudades = ciudades.length;
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        // Mostrar ambos en la misma línea después de los contadores
        let paisesCiudadesLinea = '';
        if (paises.length > 0) {
            paisesCiudadesLinea += paises.join(', ');
        }
        if (ciudades.length > 0) {
            if (paisesCiudadesLinea) paisesCiudadesLinea += ', ';
            paisesCiudadesLinea += ciudades.join(', ');
        }
        if (paisesCiudadesLinea) paisesCiudadesLinea += '.';
        doc.text(`Países: ${numPaises}. Ciudades: ${numCiudades}${paisesCiudadesLinea ? ' - ' + paisesCiudadesLinea : ''}`, 15, yInfo);
        yInfo += 7;
        // === Fin información países/ciudades ===

        // Fechas de viaje (ajustar startY para que no se encime)
        doc.autoTable({
            headStyles: {
                halign: "center"
            },
            head: [
                [
                    { content: "Fecha de Salida", styles: { fillColor: [0, 90, 224], textColor: [255, 255, 255], fontStyle: "bold" } },
                    { content: "Fecha de regreso", styles: { fillColor: [0, 90, 224], textColor: [255, 255, 255], fontStyle: "bold" } },
                ],
            ], columnStyles: {
                0: { cellWidth: 40, halign: "center" },
                1: { cellWidth: 40, halign: "center" }
            }, body: formData.dates.flatMap((date) => {
                let rows;
                rows = [
                    [date.startDate, date.endDate]
                ];
                return rows;
            }),
            startY: yInfo + 2,
        });


        // Habitación(es) - tabla detallada
        const formatCurrency = (value) => `$${Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        const rooms = formData.roomsList || [];
        const roomsBody = rooms.flatMap((room, idx) => {
            return [
                [`Habitación ${idx + 1}`, ``],

                [`Adulto`, `${room.adults || 0}`],
                [`Jr`, `${room.juniors || 0}`],
                [`Precio por habitación`, formatCurrency(room.price || 0) + " " + formData.currency],
                ["", ""],
            ];
        });

        const totalRoomsPrice = rooms.reduce((sum, r) => sum + Number(r.price || 0), 0);
        roomsBody.push(["Total", formatCurrency(totalRoomsPrice) + " " + formData.currency]);

        doc.autoTable({
            head: [[
                { content: "Habitaciones", styles: { fillColor: [0, 90, 224], textColor: [255, 255, 255], fontStyle: "bold" } },
                { content: "Total", styles: { fillColor: [0, 90, 224], textColor: [255, 255, 255], fontStyle: "bold", halign: "right" } }
            ]],
            body: roomsBody,
            /*             startY: doc.autoTable.previous.finalY + 8,
             */
            startY: yInfo + 2,
            margin: {
                left: 110 // ← eje X (horizontal)
            },
            columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 40, halign: 'right' } },
        });

        // Agregar listas de incluido/no incluido después de las tablas
        const listStartY = doc.autoTable.previous.finalY + 12;
        const pageWidth = doc.internal.pageSize.width;
        const columnWidth = (pageWidth - 40) / 2; // Dividir en dos columnas con margen
        const leftColX = 15;
        const rightColX = leftColX + columnWidth;
        let currentY = listStartY;

        // Función auxiliar para renderizar lista con bullets
        const renderList = (title, items, startX, startY) => {
            let y = startY;

            // Título
            doc.setFontSize(11);
            doc.setTextColor(0, 90, 224);
            doc.setFont(undefined, "bold");
            doc.text(title, startX, y);
            y += 7;

            // Items con bullets
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
            doc.setFont(undefined, "normal");
            const lineHeight = 5;

            items.forEach((item) => {
                if (item && item.trim()) {
                    const lines = doc.splitTextToSize(`• ${item}`, columnWidth - 5);
                    lines.forEach((line, idx) => {
                        if (y > 260) {
                            // Si se sale de la página, crear nueva página
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(line, startX + 2, y);
                        y += lineHeight;
                    });
                }
            });

            return y;
        };

        // Renderizar ambas listas lado a lado
        const includedEndY = renderList("El viaje incluye", formData.incluidedinTrip || [], leftColX, currentY);
        const notIncludedEndY = renderList("El viaje no incluye", formData.notIncludedinTrip || [], 110, currentY);

        // Actualizar currentY al máximo de ambas listas
        currentY = Math.max(includedEndY, notIncludedEndY) + 10;

        // Crear nueva página para el itinerario
        doc.addPage();
        addHeaderImage(doc, header);
        currentY = 45;

        // Renderizar itinerario
        const itineraryItems = formData.itinerary || [];
        if (itineraryItems.length > 0) {
            const itineraryWidth = pageWidth - 30; // Margen de 15 a cada lado
            const itineraryX = 15;

            itineraryItems.forEach((day, idx) => {
                // Verificar si necesitamos nueva página
                if (currentY > 240) {
                    doc.addPage();
                    addHeaderImage(doc, header);
                    currentY = 45;
                }

                // Título del día: "Día N - TITLE"
                doc.setFontSize(11);
                doc.setTextColor(0, 90, 224);
                doc.setFont(undefined, "bold");
                const dayTitle = `Día ${day.day} - ${day.title || ""}`;
                doc.text(dayTitle, itineraryX, currentY);
                currentY += 7;

                // Detalle del día con text wrapping
                doc.setFontSize(9);
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, "normal");
                const detailLines = doc.splitTextToSize(day.detail || "", itineraryWidth);

                detailLines.forEach((line) => {
                    if (currentY > 260) {
                        doc.addPage();
                        currentY = 20;
                    }
                    doc.text(line, itineraryX, currentY);
                    currentY += 5;
                });

                currentY += 4; // Espacio entre días
            });

            // Agregar notas del itinerario si existen
            if (formData.itineraryNotes && formData.itineraryNotes.trim()) {
                if (currentY > 240) {
                    doc.addPage();
                    currentY = 20;
                }

                currentY += 3;
                doc.setFontSize(10);
                doc.setTextColor(0, 90, 224);
                doc.setFont(undefined, "bold");
                doc.text("Notas del Itinerario", itineraryX, currentY);
                currentY += 6;

                doc.setFontSize(9);
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, "normal");
                const notesLines = doc.splitTextToSize(formData.itineraryNotes, itineraryWidth);
                notesLines.forEach((line) => {
                    if (currentY > 260) {
                        doc.addPage();
                        addHeaderImage(doc, header);
                        currentY = 20;
                    }
                    doc.text(line, itineraryX, currentY);
                    currentY += 5;
                });
            }

            // Agregar imagen del itinerario si existe
            if (itineraryImage) {
                if (currentY > 240) {
                    doc.addPage();
                    addHeaderImage(doc, header);
                    currentY = 20;
                }

                currentY += 8;
                const maxImgWidth = itineraryWidth;
                const maxImgHeight = 100;
                doc.addImage(itineraryImage, "PNG", itineraryX, currentY, maxImgWidth, maxImgHeight);
                currentY += maxImgHeight + 5;
            }
        }

        // --- Nueva página para tabla de hoteles ---
        doc.addPage();
        addHeaderImage(doc, header);
        const margin = 15;
        const startY = 45;
        const hotels = formData.hotels || [];
        const hotelsBody = hotels.map(h => [
            h.name || h.hotelName || h.hotel || '-',
            h.ciudad || h.city || '-',
            h.tipo || h.category || '-'
        ]);
        doc.autoTable({
            head: [[
                { content: "Hoteles previstos o similares", styles: { fillColor: [0, 90, 224], textColor: [255, 255, 255], fontStyle: 'bold' } },
                { content: "Ciudad", styles: { fillColor: [0, 90, 224], textColor: [255, 255, 255], fontStyle: 'bold' } },
                { content: "Tipo", styles: { fillColor: [0, 90, 224], textColor: [255, 255, 255], fontStyle: 'bold' } }
            ]],
            body: hotelsBody,
            startY,
            margin: { left: 35 },
            theme: 'striped',
            styles: { fontSize: 9 },
            columnStyles: {
                0: { cellWidth: 60 },
                1: { cellWidth: 40 },
                2: { cellWidth: 40 }
            }
        });

        // --- Nueva página para tabla de tours opcionales ---
        doc.addPage();
        addHeaderImage(doc, header);
        const marginTours = 15;
        const startYTours = 45;
        const tours = formData.optionalTours || [];
        // Si los tours son strings, convertir a filas de una columna
        const toursBody = Array.isArray(tours) && typeof tours[0] === 'string'
            ? tours.map(t => [t])
            : tours.map(t => [t.title || t.name || '-', t.price ? `$${Number(t.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : (t.note || '-')]);
        doc.autoTable({
            head: [[
                { content: "Tours opcionales", styles: { fillColor: [0, 90, 224], textColor: [255, 255, 255], fontStyle: 'bold' } },
                ...(toursBody[0] && toursBody[0].length > 1 ? [{ content: "Precio", styles: { fillColor: [0, 90, 224], textColor: [255, 255, 255], fontStyle: 'bold' } }] : [])
            ]],
            body: toursBody,
            startY: startYTours,
            margin: { left: marginTours },
            theme: 'striped',
            styles: { fontSize: 9 },
            columnStyles: toursBody[0] && toursBody[0].length > 1 ? {
                0: { cellWidth: 80 },
                1: { cellWidth: 40, halign: 'right' }
            } : { 0: { cellWidth: 120 } }
        });

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


    // Función para obtener imágenes de los hoteles
    const fetchHotelImages = async (hotels) => {
        const hotelImages = {};

        try {
            // Hacer las peticiones para todos los hoteles en paralelo
            await Promise.all(
                hotels.map(async (hotel) => {
                    let hotelId = hotel.hotelID

                    const res = await fetch(`https://travel-friends-server.vercel.app/api/hotelImages?q=${hotelId}`);
                    const data = await res.json();
                    hotelImages[hotel.hotelID] = data;
                })
            );
        } catch (error) {
        }

        return hotelImages;
    };

    // Funciones para manejar Items Incluidos
    const addIncludedItem = () => {
        setFormData({
            ...formData,
            incluidedinTrip: [...formData.incluidedinTrip, '']
        });
    };

    const removeIncludedItem = (index) => {
        setFormData({
            ...formData,
            incluidedinTrip: formData.incluidedinTrip.filter((_, i) => i !== index)
        });
    };

    const handleIncludedItemChange = (index, value) => {
        const updatedItems = [...formData.incluidedinTrip];
        updatedItems[index] = value;
        setFormData({
            ...formData,
            incluidedinTrip: updatedItems
        });
    };

    // Funciones para manejar Items No Incluidos
    const addNotIncludedItem = () => {
        setFormData({
            ...formData,
            notIncludedinTrip: [...formData.notIncludedinTrip, '']
        });
    };

    const removeNotIncludedItem = (index) => {
        setFormData({
            ...formData,
            notIncludedinTrip: formData.notIncludedinTrip.filter((_, i) => i !== index)
        });
    };

    const handleNotIncludedItemChange = (index, value) => {
        const updatedItems = [...formData.notIncludedinTrip];
        updatedItems[index] = value;
        setFormData({
            ...formData,
            notIncludedinTrip: updatedItems
        });
    };

    // Itinerary handlers
    const addItineraryDay = (afterIndex = null) => {
        const updated = [...(formData.itinerary || [])];
        const newDay = { day: updated.length + 1, title: "Nuevo Día", detail: "" };
        if (afterIndex === null) {
            updated.push(newDay);
        } else {
            updated.splice(afterIndex + 1, 0, newDay);
        }
        // reindex days
        const reindexed = updated.map((d, i) => ({ ...d, day: i + 1 }));
        setFormData({ ...formData, itinerary: reindexed });
    };

    const removeItineraryDay = (index) => {
        const updated = (formData.itinerary || []).filter((_, i) => i !== index).map((d, i) => ({ ...d, day: i + 1 }));
        setFormData({ ...formData, itinerary: updated });
    };

    const handleItineraryFieldChange = (index, field, value) => {
        const updated = [...(formData.itinerary || [])];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, itinerary: updated });
    };

    const handleItineraryNotesChange = (value) => {
        setFormData({ ...formData, itineraryNotes: value });
    };

    // Rooms handlers
    const addRoom = (afterIndex = null) => {
        const updated = [...(formData.roomsList || [])];
        const newRoom = { adults: 2, juniors: 0, price: 0 };
        if (afterIndex === null) updated.push(newRoom);
        else updated.splice(afterIndex + 1, 0, newRoom);
        setFormData({ ...formData, roomsList: updated, rooms: updated.length });
    };

    const removeRoom = (index) => {
        const updated = (formData.roomsList || []).filter((_, i) => i !== index);
        setFormData({ ...formData, roomsList: updated.length ? updated : [{ adults: 2, juniors: 0, price: 0 }], rooms: updated.length ? updated.length : 1 });
    };

    const updateRoomField = (index, field, value) => {
        const updated = [...(formData.roomsList || [])];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, roomsList: updated });
    };

    // Date ranges handlers
    const addDateRange = (afterIndex = null) => {
        const updated = [...dateRanges];
        const newRange = { startDate: null, endDate: null };
        if (afterIndex === null) updated.push(newRange);
        else updated.splice(afterIndex + 1, 0, newRange);
        setDateRanges(updated.map((r, i) => ({ ...r })));
    };

    const removeDateRange = (index) => {
        const updated = dateRanges.filter((_, i) => i !== index);
        setDateRanges(updated.length ? updated : [{ startDate: null, endDate: null }]);
    };

    const handleDateRangeChange = (index, update) => {
        const updated = [...dateRanges];
        if (Array.isArray(update)) {
            updated[index] = { startDate: update[0] || null, endDate: update[1] || null };
        } else {
            // single date selected (not expected) — fallback
            updated[index] = { startDate: update || null, endDate: updated[index].endDate || null };
        }
        setDateRanges(updated);
    };


    return (
        <div style={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: '10px' }}>
            <Form onSubmit={handleFormSubmit}>
                {/* Header Section */}
                <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
                    <h4 style={{ color: '#0057e0', fontWeight: '600', marginBottom: '15px' }}>Información del Viaje</h4>
                    <Row className="g-3">
                        <Col lg={3}>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Nombre de la Cotización</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="quoteName"
                                    value={formData.quoteName}
                                    onChange={handleFormChange}
                                    placeholder="Ej:Europa especial"
                                    style={{ borderRadius: '6px' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={3}>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Nombre del cliente *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="clientName"
                                    onChange={handleFormChange}
                                    placeholder="Ej: Juan García López"
                                    style={{ borderRadius: '6px' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={3}>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Teléfono *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefono"
                                    onChange={handleFormChange}
                                    placeholder=""
                                    style={{ borderRadius: '6px' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={3}>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Email *</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={handleFormChange}
                                    placeholder="cliente@email.com"
                                    style={{ borderRadius: '6px' }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>

                {/* Travel Details Section */}
                <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h4 style={{ color: '#0057e0', fontWeight: '600', margin: 0 }}>Detalles del Viaje</h4>

                    </div>
                    <Row className="g-3">
                        <Col lg={3}>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Fechas del viaje</Form.Label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {(dateRanges || []).map((range, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <DatePicker
                                                placeholderText="Seleccionar rango"
                                                selectsRange
                                                startDate={range.startDate}
                                                endDate={range.endDate}
                                                onChange={(update) => handleDateRangeChange(idx, update)}
                                                isClearable={true}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                                minDate={new Date()}
                                                wrapperClassName="w-100"
                                                {...(idx > 0 && dateRanges[0]?.startDate ? { openToDate: dateRanges[0].startDate } : {})}
                                            />
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                <Button variant="outline-success" size="sm" onClick={() => addDateRange(idx)} style={{ borderRadius: '6px' }}>+</Button>
                                                <Button variant="outline-danger" size="sm" onClick={() => removeDateRange(idx)} style={{ borderRadius: '6px' }}>-</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Form.Group>
                        </Col>
                        <Col lg={2}>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Destino *</Form.Label>
                                {!manualQuote ? (
                                    <Form.Control
                                        placeholder="Escribir destino"
                                        type="text"
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleFormChange}
                                        style={{ borderRadius: '6px' }}
                                    />
                                ) : (
                                    <Form.Select
                                        onChange={handleFormChange}
                                        name="destination"
                                        value={formData.destination}
                                        defaultValue=""
                                        style={{ borderRadius: '6px' }}
                                    >
                                        <option value="" disabled>Seleccione un destino</option>
                                        {destinos.map((destino) => (
                                            <option key={destino.destinoId} value={destino.destinoId}>
                                                {destino.destino}
                                            </option>
                                        ))}
                                    </Form.Select>
                                )}
                            </Form.Group>
                        </Col>
                        <Col lg={2}>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Adultos *</Form.Label>
                                <Form.Control
                                    placeholder="0"
                                    type="number"
                                    name="adults"
                                    min="0"
                                    onChange={handleFormChange}
                                    style={{ borderRadius: '6px' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={2}>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Menores</Form.Label>
                                <Form.Control
                                    placeholder="0"
                                    type="number"
                                    name="children"
                                    min="0"
                                    onChange={handleFormChange}
                                    style={{ borderRadius: '6px' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={1}>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Días</Form.Label>
                                <Form.Control
                                    placeholder="0"
                                    type="number"
                                    name="days"
                                    min="0"
                                    onChange={handleFormChange}
                                    style={{ borderRadius: '6px' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={1}>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Noches</Form.Label>
                                <Form.Control
                                    placeholder="0"
                                    type="number"
                                    name="nights"
                                    min="0"
                                    onChange={handleFormChange}
                                    style={{ borderRadius: '6px' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={1}>
                        </Col>
                        <Col lg={2}>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Número de países</Form.Label>
                                <Form.Control
                                    placeholder="0"
                                    type="number"
                                    min="0"
                                    max="4"
                                    value={numCountries}
                                    onChange={e => {
                                        let n = Math.max(0, Math.min(4, parseInt(e.target.value) || 0));
                                        setNumCountries(n);
                                        if (countryFields.length < n) {
                                            setCountryFields([...countryFields, ...Array(n - countryFields.length).fill('')]);
                                        }
                                    }}
                                    style={{ borderRadius: '6px', marginBottom: 8 }}
                                />
                                {[...Array(numCountries)].map((_, idx) => (
                                    <Form.Control
                                        key={idx}
                                        type="text"
                                        placeholder={`País #${idx + 1}`}
                                        value={countryFields[idx] || ''}
                                        onChange={e => {
                                            const newFields = [...countryFields];
                                            newFields[idx] = e.target.value;
                                            setCountryFields(newFields);
                                        }}
                                        style={{ borderRadius: '6px', marginBottom: 6 }}
                                    />
                                ))}
                            </Form.Group>
                        </Col>
                        <Col lg={3}>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Número de ciudades</Form.Label>
                                <Form.Control
                                    placeholder="0"
                                    type="number"
                                    min="0"
                                    max="4"
                                    value={numCities}
                                    onChange={e => {
                                        let n = Math.max(0, Math.min(4, parseInt(e.target.value) || 0));
                                        setNumCities(n);
                                        if (cityFields.length < n) {
                                            setCityFields([...cityFields, ...Array(n - cityFields.length).fill('')]);
                                        }
                                    }}
                                    style={{ borderRadius: '6px', marginBottom: 8 }}
                                />
                                {[...Array(numCities)].map((_, idx) => (
                                    <Form.Control
                                        key={idx}
                                        type="text"
                                        placeholder={`Ciudad #${idx + 1}`}
                                        value={cityFields[idx] || ''}
                                        onChange={e => {
                                            const newFields = [...cityFields];
                                            newFields[idx] = e.target.value;
                                            setCityFields(newFields);
                                        }}
                                        style={{ borderRadius: '6px', marginBottom: 6 }}
                                    />
                                ))}
                            </Form.Group>
                        </Col>
                    </Row>
                </div>


                {/* Rooms Section */}
                <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h4 style={{ color: '#0057e0', fontWeight: '600', margin: 0 }}>Habitaciones ({(formData.roomsList || []).length})</h4>
                        <Button variant="success" size="sm" onClick={() => addRoom(null)} style={{ borderRadius: '6px', fontWeight: '500' }}>+ Agregar Habitación</Button>
                    </div>

                    {(formData.roomsList || []).map((room, idx) => (
                        <div key={idx} style={{ marginBottom: '12px', padding: '12px', backgroundColor: '#f8fbff', borderRadius: '8px', border: '1px solid #e6f0ff' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <div style={{ fontWeight: '600' }}>Habitación #{idx + 1}</div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Button variant="outline-primary" size="sm" onClick={() => addRoom(idx)}>+ Después</Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => removeRoom(idx)}>Eliminar</Button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                    <div style={{ fontWeight: '500' }}>Adultos</div>
                                    <Button variant="outline-secondary" size="sm" onClick={() => updateRoomField(idx, 'adults', Math.max(0, (room.adults || 0) - 1))}>-</Button>
                                    <Form.Control type="number" value={room.adults} onChange={(e) => updateRoomField(idx, 'adults', Number(e.target.value))} style={{ width: '80px' }} />
                                    <Button variant="outline-secondary" size="sm" onClick={() => updateRoomField(idx, 'adults', (room.adults || 0) + 1)}>+</Button>
                                </div>

                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                    <div style={{ fontWeight: '500' }}>Juniors</div>
                                    <Button variant="outline-secondary" size="sm" onClick={() => updateRoomField(idx, 'juniors', Math.max(0, (room.juniors || 0) - 1))}>-</Button>
                                    <Form.Control type="number" value={room.juniors} onChange={(e) => updateRoomField(idx, 'juniors', Number(e.target.value))} style={{ width: '80px' }} />
                                    <Button variant="outline-secondary" size="sm" onClick={() => updateRoomField(idx, 'juniors', (room.juniors || 0) + 1)}>+</Button>
                                </div>
                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                    <div style={{ fontWeight: '500' }}>Precio</div>
                                    <Form.Control type="number" value={room.price} onChange={(e) => updateRoomField(idx, 'price', e.target.value)} style={{ width: '80px' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div style={{ fontWeight: '600', marginTop: '10px' }}>
                        <Form.Control
                            type="text"
                            value={formData.currency}
                            name='currency'
                            onChange={handleFormChange}
                            placeholder="Moneda (Ej: USD, MXN)"
                            style={{ borderRadius: '6px' }}
                        />

                    </div>
                </div>

                {/* Hotels Section */}
                <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h4 style={{ color: '#0057e0', fontWeight: '600', margin: 0 }}>Hoteles ({formData.hotels.length})</h4>
                        <Button
                            variant="success"
                            size="sm"
                            onClick={addHotel}
                            style={{ borderRadius: '6px', fontWeight: '500' }}
                        >
                            + Agregar Hotel
                        </Button>
                    </div>

                    {formData.hotels.map((hotel, index) => (
                        <div
                            key={index}
                            style={{
                                marginBottom: '20px',
                                padding: '20px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px',
                                border: '1px solid #e0e0e0',
                                transition: 'box-shadow 0.3s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,87,224,0.15)'}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                <span style={{ fontWeight: '600', color: '#333' }}>Hotel #{index + 1}</span>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => removeHotel(index)}
                                    style={{ borderRadius: '6px' }}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <Row className="g-3" style={{ marginBottom: '15px' }}>
                                <Col lg={3}>
                                    <Form.Group>
                                        <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Nombre del Hotel *</Form.Label>

                                        <div style={{ position: 'relative' }}>
                                            <Form.Control
                                                placeholder="Escribe el nombre del hotel"
                                                type="text"
                                                onChange={(e) => handleHotelChange(index, "hotel", e.target.value)}
                                                name="hotel"
                                                style={{ borderRadius: '6px' }}
                                            />
                                        </div>

                                    </Form.Group>
                                </Col>

                                <Col lg={3}>
                                    <Form.Group>
                                        <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>País/Ciudad</Form.Label>
                                        <Form.Control
                                            type='text'
                                            value={hotel.ciudad}
                                            onChange={(e) => handleHotelChange(index, "ciudad", e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={3}>
                                    <Form.Group>
                                        <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Tipo</Form.Label>
                                        <Form.Control
                                            type='text'
                                            value={hotel.tipo}
                                            onChange={(e) => handleHotelChange(index, "tipo", e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>


                        </div>
                    ))}
                </div>

                {/* Itinerary Section */}
                <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h4 style={{ color: '#0057e0', fontWeight: '600', margin: 0 }}>Itinerario del Viaje ({(formData.itinerary || []).length})</h4>
                        <Button variant="success" size="sm" onClick={() => addItineraryDay(null)} style={{ borderRadius: '6px', fontWeight: '500' }}>+ Agregar Día</Button>
                    </div>

                    {(formData.itinerary || []).map((dayObj, index) => (
                        <div key={index} style={{ marginBottom: '12px', padding: '12px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e6eefc' }}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                                <div style={{ fontWeight: '700', color: '#0057e0', minWidth: '72px' }}>DÍA {dayObj.day}</div>
                                <Form.Control
                                    type="text"
                                    placeholder="Título del día"
                                    value={dayObj.title || ''}
                                    onChange={(e) => handleItineraryFieldChange(index, 'title', e.target.value)}
                                    style={{ borderRadius: '6px', flex: 1 }}
                                />
                            </div>
                            <Form.Control
                                as="textarea"
                                placeholder="Detalle del día"
                                value={dayObj.detail || ''}
                                onChange={(e) => handleItineraryFieldChange(index, 'detail', e.target.value)}
                                onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`; }}
                                style={{ borderRadius: '6px', minHeight: '80px', resize: 'none', marginBottom: '8px' }}
                            />
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                <Button variant="outline-primary" size="sm" onClick={() => addItineraryDay(index)} style={{ borderRadius: '6px' }}>+ Día después</Button>
                                <Button variant="outline-danger" size="sm" onClick={() => removeItineraryDay(index)} style={{ borderRadius: '6px' }}>Eliminar</Button>
                            </div>
                        </div>
                    ))}

                    <Form.Group style={{ marginTop: '12px' }}>
                        <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Notas del Itinerario</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Notas adicionales sobre el itinerario..."
                            name="itineraryNotes"
                            value={formData.itineraryNotes || ''}
                            onChange={(e) => handleItineraryNotesChange(e.target.value)}
                            style={{ borderRadius: '6px', minHeight: '100px' }}
                        />
                    </Form.Group>

                    <Form.Group style={{ marginTop: '12px' }}>
                        <Form.Label style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '8px' }}>Imagen del Itinerario</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleItineraryImageChange}
                            style={{ borderRadius: '6px' }}
                        />
                        {itineraryImage && (
                            <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0f5ff', borderRadius: '6px' }}>
                                <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#0057e0' }}>Imagen seleccionada:</p>
                                <img src={itineraryImage} alt="Itinerary" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '6px' }} />
                            </div>
                        )}
                    </Form.Group>
                </div>

                {/* Included in Trip Section */}
                <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h4 style={{ color: '#0057e0', fontWeight: '600', margin: 0 }}>Incluido en el Viaje ({formData.incluidedinTrip.length})</h4>
                        <Button
                            variant="success"
                            size="sm"
                            onClick={addIncludedItem}
                            style={{ borderRadius: '6px', fontWeight: '500' }}
                        >
                            + Agregar Item
                        </Button>
                    </div>

                    <Row className="g-3">
                        {formData.incluidedinTrip.map((item, index) => (
                            <Col xs={12} md={6} lg={3} key={index}>
                                <div
                                    style={{
                                        padding: '15px',
                                        backgroundColor: '#f0f5ff',
                                        borderRadius: '8px',
                                        border: '1px solid #d0e0f0',
                                        borderLeft: '4px solid #0057e0',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                        transition: 'box-shadow 0.3s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,87,224,0.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                                >
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Ej: Boleto de avión, hospedaje..."
                                        value={item}
                                        onChange={(e) => handleIncludedItemChange(index, e.target.value)}
                                        onInput={(e) => {
                                            e.target.style.height = 'auto';
                                            e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
                                        }}
                                        style={{
                                            overflow: 'hidden',
                                            resize: 'none',
                                            borderRadius: '6px',
                                            fontSize: '0.9rem',
                                            minHeight: '60px',
                                            flex: 1,
                                        }}
                                    />
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => removeIncludedItem(index)}
                                        style={{ borderRadius: '6px', fontWeight: '500' }}
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Not Included in Trip Section */}
                <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h4 style={{ color: '#0057e0', fontWeight: '600', margin: 0 }}>No Incluido en el Viaje ({formData.notIncludedinTrip.length})</h4>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={addNotIncludedItem}
                            style={{ borderRadius: '6px', fontWeight: '500' }}
                        >
                            + Agregar Item
                        </Button>
                    </div>

                    <Row className="g-3">
                        {formData.notIncludedinTrip.map((item, index) => (
                            <Col xs={12} md={6} lg={3} key={index}>
                                <div
                                    style={{
                                        padding: '15px',
                                        backgroundColor: '#ffe8e8',
                                        borderRadius: '8px',
                                        border: '1px solid #ffcccc',
                                        borderLeft: '4px solid #e74c3c',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                        transition: 'box-shadow 0.3s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(231,76,60,0.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                                >
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Ej: Comidas personales, gastos..."
                                        value={item}
                                        onChange={(e) => handleNotIncludedItemChange(index, e.target.value)}
                                        onInput={(e) => {
                                            e.target.style.height = 'auto';
                                            e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
                                        }}
                                        style={{
                                            overflow: 'hidden',
                                            resize: 'none',
                                            borderRadius: '6px',
                                            fontSize: '0.9rem',
                                            minHeight: '60px',
                                            flex: 1,
                                        }}
                                    />
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => removeNotIncludedItem(index)}
                                        style={{ borderRadius: '6px', fontWeight: '500' }}
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Optional Tours Section */}
                <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h4 style={{ color: '#0057e0', fontWeight: '600', margin: 0 }}>Tours Opcionales ({formData.optionalTours.length})</h4>
                        <Button
                            variant="info"
                            size="sm"
                            onClick={() => setFormData({ ...formData, optionalTours: [...formData.optionalTours, ''] })}
                            style={{ borderRadius: '6px', fontWeight: '500' }}
                        >
                            + Agregar Tour
                        </Button>
                    </div>

                    <Row className="g-3">
                        {formData.optionalTours.map((item, index) => (
                            <Col xs={12} md={6} lg={3} key={index}>
                                <div
                                    style={{
                                        padding: '15px',
                                        backgroundColor: '#e8f4ff',
                                        borderRadius: '8px',
                                        border: '1px solid #b3e0ff',
                                        borderLeft: '4px solid #0099e6',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                        transition: 'box-shadow 0.3s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,153,230,0.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                                >
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Ej: Tour opcional, precio, detalles..."
                                        value={item}
                                        onChange={e => {
                                            const updated = [...formData.optionalTours];
                                            updated[index] = e.target.value;
                                            setFormData({ ...formData, optionalTours: updated });
                                        }}
                                        onInput={e => {
                                            e.target.style.height = 'auto';
                                            e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
                                        }}
                                        style={{
                                            overflow: 'hidden',
                                            resize: 'none',
                                            borderRadius: '6px',
                                            fontSize: '0.9rem',
                                            minHeight: '60px',
                                            flex: 1,
                                        }}
                                    />
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => {
                                            const updated = formData.optionalTours.filter((_, i) => i !== index);
                                            setFormData({ ...formData, optionalTours: updated });
                                        }}
                                        style={{ borderRadius: '6px', fontWeight: '500' }}
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
                {/* Submit Button */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '20px' }}>
                    <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        style={{
                            borderRadius: '6px',
                            fontWeight: '600',
                            paddingLeft: '30px',
                            paddingRight: '30px',
                            backgroundColor: '#008912ff',
                            border: 'none',
                        }}
                    >
                        Generar idea
                    </Button>
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '20px' }}>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={generatePDF}
                        style={{
                            borderRadius: '6px',
                            fontWeight: '600',
                            paddingLeft: '30px',
                            paddingRight: '30px',
                            backgroundColor: '#0057e0',
                            border: 'none',
                        }}
                    >
                        Generar PDF
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default InternationalQuote;
