import { Route, Routes } from "react-router-dom"
import { Inicio } from "../components/Inicio"
import { Nosotros } from "../components/Nosotros"
import { Contacto } from "../components/Contacto"
import { Cotiza } from "../components/Cotiza"
import { NavBar } from "../components/NavBar"
import { Favoritos } from "../components/Favoritos"
import { Hotel } from "../components/Hotel"

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
                <Route path="/nosotros" element={<Nosotros />}></Route>
                <Route path="/cotiza" element={<Cotiza />}></Route>
                <Route path="/contacto" element={<Contacto />}></Route>
                <Route path="/favoritos" element={<Favoritos />}></Route>
                <Route path="/hotel/:destinoId/:hotelId" element={<Hotel />}></Route>
                </Routes>
            </div> 


        </>
    )
}