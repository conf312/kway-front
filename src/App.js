import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header, Main, Detail } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="bg-gray">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route exact path="/" element={ <Main/> }/>
          <Route exact path="/detail/:stationNm/:arsId" element={ <Detail/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
