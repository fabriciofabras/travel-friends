import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carlos from "../assets/carlos.png";
import sofia from "../assets/sofia.png";
import ana from "../assets/ana.png";
import jorge from "../assets/jorge.png";
import mariana from "../assets/mariana.png";

const testimonials = [
  {
    id: 1,
    name: "Sofia Lopez",
    image: sofia, // Reemplaza con URL de imagen real
    review:
      "Travel Friends facilitó mis vacaciones, desde la planificación hasta la ejecución. ¡Recomiendo mucho su servicio personalizado!",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Mendez",
    image: carlos, // Reemplaza con URL de imagen real
    review:
      "La flexibilidad en las opciones de pago nos permitió viajar sin preocupaciones financieras. ¡Gracias, Travel Friends!",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Martínez",
    image: ana, // Reemplaza con URL de imagen real
    review:
      "Viajar con Travel Friends fue una experiencia increíble. Me ayudaron a encontrar el mejor destino para mi familia. ¡Volveré a viajar con ellos!",
    rating: 5,
  },
  {
    id: 4,
    name: "Jorge Ramirez",
    image: jorge, // Reemplaza con URL de imagen real
    review:
      "El equipo de Travel Friends siempre estuvo atento a nuestras necesidades. Fue como tener un asesor personal de viajes. ¡Excelente servicio!",
    rating: 5,
  },
  {
    id: 5,
    name: "Mariana Gómez",
    image: mariana, // Reemplaza con URL de imagen real
    review:
      "Me encantó la facilidad para organizar todo en un solo lugar. Desde el vuelo hasta las actividades, Travel Friends se encargó de todo.",
    rating: 5,
  }
  // Agrega más testimonios aquí
];

const TestimonialsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonial-container">
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <h3>{testimonial.name}</h3>
            <div className="stars">
              {"⭐".repeat(testimonial.rating)}
            </div>
            <p>{testimonial.review}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialsCarousel;
