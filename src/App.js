import './styles/App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ContactForm from './pages/ContactForm';

function App() {
  const location = useLocation();
  const loginPageRoute = "/LoginPage"
  return (
    <div className="App">
        {loginPageRoute === location.pathname ? <Header showMenu={false} showProfileSegment={false}/> : <Header/>}
        <Routes>
          <Route path="/" element={<Navigate to="/HomePage" />} />
          <Route exact path='/LoginPage' element={<LoginPage/>}></Route>
          <Route exact path='/HomePage'element={<HomePage/>}></Route>
          <Route exact path='/ContactForm' element={<ContactForm/>}></Route>
          <Route path="*" element={<Navigate to="/HomePage" />} />
        </Routes>
    </div>
  );
}

export default App;
