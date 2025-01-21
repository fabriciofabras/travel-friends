import { Route, Routes } from "react-router-dom"
import { Inicio } from "../components/Inicio"
import { Nosotros } from "../components/Nosotros"
import { Contacto } from "../components/Contacto"
import { Cotiza } from "../components/Cotiza"
import { NavBar } from "../components/NavBar"
import { Favoritos } from "../components/Favoritos"
import { Hotel } from "../components/Hotel"
import Administrador from "../pages/traveladmin/Administrador"
import QuoteView from "../pages/traveladmin/QuoteView"
import Ingreso from "../pages/traveladmin/Ingreso"
import Politicas from "../pages/traveladmin/Politicas"
import Terminos from "../pages/traveladmin/Terminos"

export const TravelRoutes = () => {



    return (
        <>
            <div class="bg-white">
                <header class="absolute inset-x-0 top-0 z-50">
                    <NavBar></NavBar>

                </header>
            </div>



            <div>
                <Routes>
                    <Route path="/" element={<Inicio />}></Route>
                    <Route path="/inicio" element={<Inicio />}></Route>
                    <Route path="/administrador" element={<Administrador />}></Route>
                    <Route path="/ingreso" element={<Ingreso />}></Route>
                    <Route path="/quote" element={<QuoteView />}></Route>
                    <Route path="/nosotros" element={<Nosotros />}></Route>
                    <Route path="/cotiza" element={<Cotiza />}></Route>
                    <Route path="/contacto" element={<Contacto />}></Route>
                    <Route path="/favoritos" element={<Favoritos />}></Route>
                    <Route path="/politicas" element={<Politicas />}></Route>
                    <Route path="/terminos" element={<Terminos />}></Route>
                    <Route path="/hotel/:destinoId/:hotelId" element={<Hotel />}></Route>
                </Routes>
            </div>


        </>
    )
}