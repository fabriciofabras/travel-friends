import { Route, Routes } from "react-router-dom"
import { Inicio } from "../components/Inicio"
import { Nosotros } from "../components/Nosotros"
import { Contacto } from "../components/Contacto"
import { Cotiza } from "../components/Cotiza"
import { NavBar } from "../components/NavBar"

export const TravelRoutes = () => {



    return (
        <>
            <div class="bg-white">
                <header class="absolute inset-x-0 top-0 z-50">
                    <NavBar></NavBar>
                    
                </header>
            </div>
            
 

            <div className="container">
                <Routes>
                <Route path="/inicio" element={<Inicio />}></Route>
                <Route path="/nosotros" element={<Nosotros />}></Route>
                <Route path="/cotiza" element={<Cotiza />}></Route>
                <Route path="/contacto" element={<Contacto />}></Route>
                </Routes>
            </div> 


        </>
    )
}