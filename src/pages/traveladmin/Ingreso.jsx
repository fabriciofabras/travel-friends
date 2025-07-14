
function Ingreso() {

    const renderPage = () => {

        const clientID = "105019582790-0k24vbs49hq850f60s4cgcerka7o4dih.apps.googleusercontent.com";  // Reemplaza con tu Client ID
        const redirectUri = "https://travelfriends.com.mx/administrador"; // Reemplaza con tu URL de redirección
        const scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
        const responseType = "token"; // O "code" si planeas usarlo en el backend para obtener el token de acceso
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&include_granted_scopes=true`;

        // Redirigir a la página de autenticación de Google
        window.location.href = authUrl;
    }

    renderPage();

    return (
        <div className="dashboard mt-24">
            <div className="content">Ingresar</div>
        </div>
    )
}
export default Ingreso;
