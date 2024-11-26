import { useParams } from 'react-router-dom';
import destinos from '../assets/destinos';
import { Container, Row, Col, Carousel, Card, Button } from 'react-bootstrap';
import React, { useState } from 'react';

export const Hotel = () => {
    const { hotelId, destinoId } = useParams();

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const destino = destinos.filter(destino => destino.destinoId == destinoId)

    console.log(destino)

    let hotel = destino[0].hoteles.filter(hotel => hotel.hotelID == hotelId)

    hotel = hotel[0];

    return (

        <Container fluid>
            {/* Hero Section */}
            <div
                style={{
                    backgroundImage: `url(${hotel.gallery[0].cloudUri})`,
                    height: '400px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
            </div>

            {/* General Information */}
            <Container className="mt-4">
                <Row>
                    <Col md={6}>
                        <h1 className="h2-travel">{hotel.name}</h1>
                        <div>
                        <div
                            style={{
                                maxHeight: isExpanded ? 'none' : '300px', // Altura limitada cuando no está expandido
                                overflow: 'hidden', // Ocultar el contenido que excede el tamaño
                                transition: 'max-height 0.3s ease', // Transición suave al expandir/contraer
                            }}
                        >
                            <p>{hotel.description}</p>
                           
                        </div>
                        <button onClick={toggleDescription} style={{ marginTop: '10px' }}>
                                {isExpanded ? 'Mostrar menos' : 'Mostrar más'}
                            </button>
                        </div>
                    </Col>
                    <Col md={6}>
                        <Carousel>
                            {hotel.gallery.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        src={image.cloudUri}
                                        alt={`Imagen ${index + 1}`}
                                        className="d-block w-100"
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                </Row>
            </Container>

            {/* Gallery */}
            <Container className="mt-4">
                <Row>
                    <Col md={6}>

                        <h1 className="h2-travel">Destacados</h1>
                        <ul>
                            {hotel.importantFacilities.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </Col>
                    <Col md={6} className="mb-1">
                        <h1 className="h2-travel">Amenidades</h1>
                        <Card>
                            <Card.Body>
                                <Card.Text >
                                    {hotel.services.map((amenity, index) => (
                                        <a> #{amenity.name} </a>
                                    ))}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>

            {/* Amenities */}
            <Container className="mt-4">

            </Container>

            {/* Map */}
        </Container>
    );

}

export default Hotel;