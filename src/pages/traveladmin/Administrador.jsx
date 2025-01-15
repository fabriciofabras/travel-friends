import React, { useState } from "react";
import "./Administrador.css";
import Sidebar from "../../components/traveladmin/Sidebar.jsx";
import Quotes from "./Quotes";
import Reservations from "./Reservations";
import Proposal from "./Proposal";
import Income from "./Income";

function Administrador() {
  const [activePage, setActivePage] = useState("Quotes");

  const renderPage = () => {
    switch (activePage) {
      case "Quotes":
        return <Quotes />;
      case "Reservations":
        return <Reservations />;
      case "Proposal":
        return <Proposal />;
      case "Income":
        return <Income />;
      default:
        return <Quotes />;
    }
  };

  return (
    <div className="dashboard mt-24">
      <Sidebar setActivePage={setActivePage} />
      <div className="content">{renderPage()}</div>
    </div>
  );
}

export default Administrador;
