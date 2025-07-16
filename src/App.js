import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { TravelRoutes } from './routes/TravelRoutes';


function App() {
  return (
    <main className="main-container text-sky-950 body-font">
      <BrowserRouter>
        <TravelRoutes />
         {/* Footer */}
         <footer className="bg-[#004c97] text-white py-4 text-center">
                <p>&copy; 2025 Travel Friends. Todos los derechos reservados.</p>
                <div className="flex justify-center mt-4 space-x-4">
                    <a href="/politica-de-privacidad" className="hover:underline">
                        Políticas de Privacidad
                    </a>
                    <a href="/terminos-y-condiciones" className="hover:underline">
                        Términos y Condiciones
                    </a>
                </div>
            </footer>
      </BrowserRouter>
    </main>
  );
}

export default App;
