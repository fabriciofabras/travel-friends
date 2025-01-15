import React from "react";
import { Col, Row } from "react-bootstrap";

import "./Sidebar.css";

function Sidebar({ setActivePage, userInfo }) {
  return (
    <div className="sidebar">
      {userInfo === null ? (
        <a href="#"
          className="hover:text-white text-2x1 p-F4">
          Entrar
        </a>
      ) : (
        <div className="text-white justify-center align-center">
          <Row>
            <Col>
              <img style={{ borderRadius: "50%", width: "75px" }} src={userInfo.picture}></img>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{userInfo.name}</p>
            </Col>
          </Row>
        </div>
      )}

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
