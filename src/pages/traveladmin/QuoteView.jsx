import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const QuoteView = () => {

  const location = useLocation();
  const [formData, setFormData] = useState(null);
  useEffect(() => {
    // Parsear datos de la URL
    const queryParams = new URLSearchParams(location.search);
    const data = queryParams.get("formData");

    if (data) {
      try {
        // Decodificar el JSON
        const parsedData = JSON.parse(decodeURIComponent(data));
        setFormData(parsedData);
      } catch (error) {
        console.error("Error parsing formData from URL:", error);
      }
    }
  }, [location.search]);

  const formatCurrency = (value) => {
    return `$${Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const totalAmount =
    Number(formData.hotels[0].amount) +
    Number(formData.transferAmount) +
    Number(formData.flightAmount);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px", lineHeight: 1.6 }}>
      <h2 style={{ textAlign: "center", color: "#0056b3" }}>Cotización de Viaje</h2>
      <p>
        Estimado(a) <strong>{formData.clientName}</strong>, le compartimos la cotización
        solicitada para el plan vacacional en <strong>{formData.destination}</strong> del
        <strong> {formData.dates[0]}</strong> al <strong>{formData.dates[1]}</strong> para
        <strong> {formData.adults}</strong> adulto{formData.adults > 1 ? "s" : ""}.
      </p>

      <table style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#0056b3", color: "#fff" }}>Nombre del Hotel</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#0056b3", color: "#fff" }}>Detalles</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#0056b3", color: "#fff", textAlign: "right" }}>Monto (MXN)</th>
          </tr>
        </thead>
        <tbody>
          {formData.hotels.map((hotel, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <a href={hotel.link} target="_blank" rel="noopener noreferrer" style={{ color: "#0056b3", textDecoration: "underline" }}>
                  {hotel.name}
                </a>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{hotel.details}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>{formatCurrency(hotel.amount)}</td>
            </tr>
          ))}
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}></td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Traslados</td>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>{formatCurrency(formData.transferAmount)}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}></td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Vuelos</td>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>{formatCurrency(formData.flightAmount)}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}></td>
            <td style={{ border: "1px solid #ddd", padding: "8px", fontWeight: "bold" }}>Total</td>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right", fontWeight: "bold" }}>{formatCurrency(totalAmount)}</td>
          </tr>
        </tbody>
      </table>

      <h3>Vuelos:</h3>
      <p>Información adicional sobre vuelos (si aplica).</p>
    </div>
  );
};

export default QuoteView;