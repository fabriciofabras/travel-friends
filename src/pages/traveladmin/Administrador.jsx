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

    const clientID = "105019582790-0k24vbs49hq850f60s4cgcerka7o4dih.apps.googleusercontent.com";  // Reemplaza con tu Client ID
    const redirectUri = "https://travel-friends-mu.vercel.app/administrador"; // Reemplaza con tu URL de redirección
    const scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
    const responseType = "token"; // O "code" si planeas usarlo en el backend para obtener el token de acceso
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&include_granted_scopes=true`;

    // Redirigir a la página de autenticación de Google
    window.location.href = authUrl;

    // validarUsuario(false);

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
