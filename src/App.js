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
         <footer className="bg-[#0C2D6B] text-white py-6 text-center border-t-4 border-t-[#C8960C]">
                <p className="text-sm text-slate-300">&copy; 2025 Travel Friends. Todos los derechos reservados.</p>
                <div className="flex justify-center mt-3 space-x-6 text-sm">
                    <a href="/politica-de-privacidad" className="text-[#C8960C] hover:text-white transition-colors">
                        Políticas de Privacidad
                    </a>
                    <a href="/terminos-y-condiciones" className="text-[#C8960C] hover:text-white transition-colors">
                        Términos y Condiciones
                    </a>
                </div>
            </footer>
      </BrowserRouter>
    </main>
  );
}

export default App;
