import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "Sofia Lopez",
    image: "https://via.placeholder.com/50", // Reemplaza con URL de imagen real
    review:
      "Travel Friends facilitó mis vacaciones, desde la planificación hasta la ejecución. ¡Recomiendo mucho su servicio personalizado!",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Mendez",
    image: "https://via.placeholder.com/50", // Reemplaza con URL de imagen real
    review:
      "La flexibilidad en las opciones de pago nos permitió viajar sin preocupaciones financieras. ¡Gracias, Travel Friends!",
    rating: 5,
  },
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
