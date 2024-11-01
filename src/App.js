import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { TravelRoutes } from './routes/TravelRoutes';


function App() {
  return (
    <main className="main-container text-sky-950 body-font">
      <BrowserRouter>
        <TravelRoutes />
      </BrowserRouter>
    </main>
  );
}

export default App;
