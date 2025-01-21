import React, { useEffect, useState } from "react";
import "./Administrador.css";
import Sidebar from "../../components/traveladmin/Sidebar.jsx";
import Quotes from "./Quotes";
import Reservations from "./Reservations";
import Proposal from "./Proposal";
import Income from "./Income";
import { useNavigate } from "react-router-dom"; // Necesario para redirigir

function Administrador() {
  const [activePage, setActivePage] = useState("Quotes");
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate(); // Hook para redirección

  // Función para extraer el access_token de la URL
  const getAccessTokenFromUrl = () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    return params.get('access_token');
  };

  // Función para obtener la información del usuario con el access_token
  const getUserInfo = async (accessToken) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
      );
      const data = await response.json();
      setUserInfo(data); // Guardar la info del usuario en el estado
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // useEffect se ejecuta cuando el componente se monta (equivalente a window.onload)
  useEffect(() => {
    const accessToken = getAccessTokenFromUrl();
    if (accessToken) {
      console.log("Access Token:", accessToken)
      console.log("Location:", window.location)

      debugger;
      getUserInfo(accessToken); // Obtener la información del usuario
    } else {
      console.log("Location:", window.location)
      if(window.location.hostname==="localhost")
      {
        setUserInfo({name:"Pruebas locales",picture:""})
        console.log("Estamos en Localhost")
      }else{
        navigate("/ingreso"); // Redirigir si no hay token
      }
    }
  }, []); // El array vacío significa que se ejecuta una vez cuando el componente se monta


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

  return (<>
    {userInfo === null ? <div></div> : (
      <div className="dashboard mt-24">
        <Sidebar setActivePage={setActivePage} userInfo={userInfo} />
        <div className="content">{renderPage()}</div>
      </div>
    )}

  </>);
}

export default Administrador;
