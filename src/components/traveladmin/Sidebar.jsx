import React from "react";
import "./Sidebar.css";

function Sidebar({ setActivePage }) {
  return (
    <div className="sidebar">
      <h1 className="logo">Travel Admin</h1>
      <ul className="menuAdmin">
        <li onClick={() => setActivePage("Quotes")}>Cotizaciones</li>
        <li onClick={() => setActivePage("Reservations")}>Reservaciones</li>
        <li onClick={() => setActivePage("Proposal")}>Proposal</li>
        <li onClick={() => setActivePage("Income")}>Ingresos</li>
      </ul>
    </div>
  );
}

export default Sidebar;
