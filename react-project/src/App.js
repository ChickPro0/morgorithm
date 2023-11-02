import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="space" >
        {/* <Header /> */}
        {/* <Login /> */}
        <Routes>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/header' element={<Header></Header>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
