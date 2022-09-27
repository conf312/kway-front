import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header, Main, Detail, Faq, Inquiry, NoticeList, NoticeDetail } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path="/" element={ <Main/> }/>
        <Route exact path="/detail/:stationNm/:arsId/:gpsY/:gpsX" element={ <Detail/> }/>
        <Route exact path="/notice-list" element={ <NoticeList/> }/>
        <Route exact path="/notice-detail/:id" element={ <NoticeDetail/> }/>
        <Route exact path="/faq" element={ <Faq/> }/>
        <Route exact path="/inquiry" element={ <Inquiry/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
